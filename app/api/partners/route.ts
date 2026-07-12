import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Node runtime (fetch + fs) and never cache the list.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CHANNEL PARTNER registrations — kept in their OWN Google Sheet tab ("Partners"),
 * separate from marketing leads, so the client has a clean channel-partner Excel.
 *
 * It reuses the SAME Apps Script Web App as leads: set PARTNERS_WEBHOOK_URL to route
 * partners to a different deployment, or leave it unset to fall back to LEADS_WEBHOOK_URL.
 * The payload carries `sheet: "Partners"` so the Apps Script writes to the Partners tab.
 * Updated Apps Script + setup steps: see PARTNERS-GOOGLE-SHEET-SETUP.md.
 */
const WEBHOOK_URL = process.env.PARTNERS_WEBHOOK_URL || process.env.LEADS_WEBHOOK_URL || "";
const SHEET = "Partners";

// Local-dev fallback only (a no-op on read-only serverless filesystems).
const PARTNERS_FILE = path.join(process.cwd(), "data", "partners.json");

function readFilePartners(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(PARTNERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(PARTNERS_FILE, "utf-8")) as Record<string, unknown>[];
  } catch {
    return [];
  }
}

function writeFilePartners(rows: Record<string, unknown>[]): void {
  try {
    if (!fs.existsSync(path.dirname(PARTNERS_FILE))) {
      fs.mkdirSync(path.dirname(PARTNERS_FILE), { recursive: true });
    }
    fs.writeFileSync(PARTNERS_FILE, JSON.stringify(rows, null, 2), "utf-8");
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

    const partner = {
      id: `PARTNER-${Date.now()}`,
      name: body.name || "",
      phone: body.phone,
      email: body.email || "",
      partnerType: body.partnerType || "",
      city: body.city || "",
      experience: body.experience || "",
      source: body.source || "partner-page",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // 1) Persist to the Partners sheet tab (primary; works on serverless).
    let deliveredToSheet = false;
    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "create", sheet: SHEET, lead: partner }),
          redirect: "follow",
        });
        deliveredToSheet = res.ok;
        if (!res.ok) console.error("Partners webhook returned", res.status);
      } catch (e) {
        console.error("Partners webhook failed:", e);
      }
    } else {
      console.warn("PARTNERS_WEBHOOK_URL / LEADS_WEBHOOK_URL not set — partner saved to local dev file only.");
    }

    // 2) Best-effort local mirror (development only).
    const rows = readFilePartners();
    rows.push(partner);
    writeFilePartners(rows);

    console.log("New partner registration:", partner.id, partner.partnerType, deliveredToSheet ? "→ sheet" : "(no sheet)");
    return NextResponse.json({ success: true, message: "Partner registration captured", id: partner.id });
  } catch (err) {
    console.error("Partner capture error:", err);
    return NextResponse.json({ success: false, error: "Failed to capture registration" }, { status: 500 });
  }
}

export async function GET() {
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(`${WEBHOOK_URL}?action=list&sheet=${SHEET}`, { cache: "no-store", redirect: "follow" });
      if (res.ok) {
        const data = await res.json();
        const partners = (data.leads || data.partners || data || []) as Record<string, unknown>[];
        return NextResponse.json({ partners, total: partners.length });
      }
      console.error("Partners list returned", res.status);
    } catch (e) {
      console.error("Partners list failed:", e);
    }
  }
  const partners = readFilePartners();
  return NextResponse.json({ partners, total: partners.length });
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
          body: JSON.stringify({ action: "update", sheet: SHEET, id, status }),
          redirect: "follow",
        });
        if (res.ok) return NextResponse.json({ success: true });
      } catch (e) {
        console.error("Partners update failed:", e);
      }
    }

    const rows = readFilePartners();
    const idx = rows.findIndex((l) => l.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }
    rows[idx] = { ...rows[idx], status, updatedAt: new Date().toISOString() };
    writeFilePartners(rows);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
