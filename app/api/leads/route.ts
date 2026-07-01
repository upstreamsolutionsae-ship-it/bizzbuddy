import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Run on Node (needs fetch + fs) and never cache the leads list.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * PRIMARY STORE: Google Sheet via an Apps Script Web App.
 * Set LEADS_WEBHOOK_URL to the deployed Web App URL in `.env.local` (local) and in
 * Vercel → Project → Settings → Environment Variables (production). Setup steps and the
 * Apps Script code are in `LEADS-GOOGLE-SHEET-SETUP.md`.
 *
 * Why not a file? On Vercel the filesystem is read-only/ephemeral, so `data/leads.json`
 * silently loses every lead. The Sheet webhook persists leads off-box and lets the client
 * open/filter/share them directly in Google Sheets.
 */
const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL || "";

// Local-dev fallback only (best-effort; a no-op on read-only serverless filesystems).
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");
const EXTERNAL_FILE = path.join(process.cwd(), "data", "external-leads.json");

function readFileLeads(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(LEADS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8")) as Record<string, unknown>[];
  } catch {
    return [];
  }
}

function readExternalLeads(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(EXTERNAL_FILE)) return [];
    const data = JSON.parse(fs.readFileSync(EXTERNAL_FILE, "utf-8")) as Record<string, unknown>[];
    return data.map((l) => ({ status: "New", ...l, origin: "external" }));
  } catch {
    return [];
  }
}

function writeFileLeads(leads: Record<string, unknown>[]): void {
  // Best-effort: succeeds locally, silently ignored when the filesystem is read-only.
  try {
    if (!fs.existsSync(path.dirname(LEADS_FILE))) {
      fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch {
    /* read-only serverless filesystem — the Sheet webhook is the real store */
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.phone) {
      return NextResponse.json({ success: false, error: "Phone is required" }, { status: 400 });
    }

    // Category identifies the service/source of the lead. Falls back to loanType for older forms.
    const category = body.category || body.loanType || "General Enquiry";
    const newLead = {
      ...body,
      id: `LEAD-${Date.now()}`,
      name: body.name || "",
      phone: body.phone,
      email: body.email || "",
      business: body.business || "",
      city: body.city || "",
      category,
      service: category,
      loan: body.loan || "",
      loanType: body.loanType || category,
      details: body.details || "",
      source: body.source || "website",
      origin: "website",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // 1) Persist to the Google Sheet (primary, works on serverless).
    let deliveredToSheet = false;
    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "create", lead: newLead }),
          redirect: "follow",
        });
        deliveredToSheet = res.ok;
        if (!res.ok) console.error("Sheet webhook returned", res.status);
      } catch (e) {
        console.error("Sheet webhook failed:", e);
      }
    } else {
      console.warn("LEADS_WEBHOOK_URL is not set — lead will only hit the local dev file.");
    }

    // 2) Best-effort local mirror (development only).
    const leads = readFileLeads();
    leads.push(newLead);
    writeFileLeads(leads);

    console.log("New lead captured:", newLead.id, newLead.category, deliveredToSheet ? "→ sheet" : "(no sheet)");
    return NextResponse.json({ success: true, message: "Lead captured successfully", id: newLead.id });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ success: false, error: "Failed to capture lead" }, { status: 500 });
  }
}

export async function GET() {
  // Read from the Sheet so /admin/leads works in production too.
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(`${WEBHOOK_URL}?action=list`, { cache: "no-store", redirect: "follow" });
      if (res.ok) {
        const data = await res.json();
        const leads = (data.leads || data || []) as Record<string, unknown>[];
        return NextResponse.json({ leads, total: leads.length });
      }
      console.error("Sheet list returned", res.status);
    } catch (e) {
      console.error("Sheet list failed:", e);
    }
  }
  // Fallback: local dev file + optional external repository.
  const leads = [...readExternalLeads(), ...readFileLeads()];
  return NextResponse.json({ leads, total: leads.length });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", id, status }),
          redirect: "follow",
        });
        if (res.ok) return NextResponse.json({ success: true });
      } catch (e) {
        console.error("Sheet update failed:", e);
      }
    }

    // Local dev fallback.
    const leads = readFileLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }
    leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
    writeFileLeads(leads);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
