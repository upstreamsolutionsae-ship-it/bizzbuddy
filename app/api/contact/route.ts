import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, error: "Name, email, and message required" }, { status: 400 });
    }
    console.log("Contact submission:", body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}
