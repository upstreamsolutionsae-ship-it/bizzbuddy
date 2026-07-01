import { NextRequest, NextResponse } from "next/server";

// Contact-form queries are captured into the same Google Sheet as leads so the client has
// a single place to see every enquiry. Shares LEADS_WEBHOOK_URL (see LEADS-GOOGLE-SHEET-SETUP.md).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, error: "Name, email, and message required" }, { status: 400 });
    }

    const lead = {
      id: `LEAD-${Date.now()}`,
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      business: body.business || "",
      city: body.city || "",
      category: body.category || "General Enquiry",
      service: body.category || "General Enquiry",
      loan: "",
      loanType: body.category || "General Enquiry",
      details: body.message || "",
      source: body.source || "contact-form",
      origin: "website",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    if (WEBHOOK_URL) {
      try {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "create", lead }),
          redirect: "follow",
        });
        if (!res.ok) console.error("Contact → sheet webhook returned", res.status);
      } catch (e) {
        console.error("Contact → sheet webhook failed:", e);
      }
    } else {
      console.warn("LEADS_WEBHOOK_URL not set — contact submission logged only:", lead.id);
    }

    console.log("Contact submission captured:", lead.id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}
