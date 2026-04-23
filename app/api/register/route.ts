import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;
    if (!email || !password || !name || !role) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }
    // In production: hash password and save to DB
    console.log("New user registration:", { email, name, role });
    return NextResponse.json({ success: true, message: "Account created successfully" });
  } catch {
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
