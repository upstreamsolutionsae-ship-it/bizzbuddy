import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

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

function writeLeads(leads: Record<string, unknown>[]): void {
  if (!fs.existsSync(path.dirname(LEADS_FILE))) {
    fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
  }
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: "Name and phone are required" }, { status: 400 });
    }

    const leads = readLeads();
    const newLead = {
      id: `LEAD-${Date.now()}`,
      name: body.name,
      phone: body.phone,
      business: body.business || "",
      city: body.city || "",
      loan: body.loan || "",
      loanType: body.loanType || "",
      source: body.source || "website",
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
  const leads = readLeads();
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
