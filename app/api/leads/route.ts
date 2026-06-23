import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");
// Optional external / existing-client data source (read-only). Future model output drops here.
const EXTERNAL_FILE = path.join(process.cwd(), "data", "external-leads.json");

function readLeads(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(path.dirname(LEADS_FILE))) {
      fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, "[]", "utf-8");
      return [];
    }
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as Record<string, unknown>[];
  } catch {
    return [];
  }
}

// Read-only merge of the external repository so existing/previous client records and
// model-generated top-up leads show up in admin without ever being overwritten.
function readExternalLeads(): Record<string, unknown>[] {
  try {
    if (!fs.existsSync(EXTERNAL_FILE)) return [];
    const raw = fs.readFileSync(EXTERNAL_FILE, "utf-8");
    const data = JSON.parse(raw) as Record<string, unknown>[];
    return data.map((l) => ({ status: "New", ...l, origin: "external" }));
  } catch {
    return [];
  }
}

function writeLeads(leads: Record<string, unknown>[]): void {
  if (!fs.existsSync(path.dirname(LEADS_FILE))) {
    fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
  }
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.phone) {
      return NextResponse.json({ success: false, error: "Phone is required" }, { status: 400 });
    }

    const leads = readLeads();
    // Category identifies the service/source of the lead for the backend.
    // Falls back to loanType for older forms that only send loanType.
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
    leads.push(newLead);
    writeLeads(leads);

    console.log("New lead captured:", newLead);
    return NextResponse.json({ success: true, message: "Lead captured successfully", id: newLead.id });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json({ success: false, error: "Failed to capture lead" }, { status: 500 });
  }
}

export async function GET() {
  const leads = [...readExternalLeads(), ...readLeads()];
  return NextResponse.json({ leads, total: leads.length });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const leads = readLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }
    leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
    writeLeads(leads);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
