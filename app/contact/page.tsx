"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const CONTACTS = [
  { icon: "📍", title: "Head Office", desc: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078" },
  { icon: "📞", title: "Phone", desc: "+91 9910850208 | +91 9899630125" },
  { icon: "📞", title: "Phone", desc: "+91 9217541553 | +91 9413823781" },
  { icon: "📧", title: "Email", desc: "sdmfintechconsultants@gmail.com" },
  { icon: "💬", title: "WhatsApp", desc: "+91 9910850208" },
  { icon: "🕘", title: "Office Hours", desc: "Mon–Sat, 9 AM – 7 PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, phone: form.phone, business: form.subject, loanType: "Contact Enquiry", source: "contact-page" }),
    });
    setDone(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#1a202c" }}>
      <Navbar />

      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Contact Us</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "60px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>Our advisors are available Mon–Sat, 9 AM – 7 PM</p>
      </section>

      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48 }}>
          {/* Contact info */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 28 }}>Get in Touch</h2>
            {CONTACTS.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 22 }}>
                <div style={{ width: 46, height: 46, background: "#eff6ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, border: "1px solid #bfdbfe" }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{c.desc}</div>
                </div>
              </div>
            ))}

            {/* Social links placeholder */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>Follow Us</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ l: "f", t: "Facebook" }, { l: "in", t: "LinkedIn" }, { l: "X", t: "Twitter" }, { l: "▶", t: "YouTube" }].map((s) => (
                  <a key={s.t} href={`#${s.t.toLowerCase()}`} title={s.t} style={{ width: 36, height: 36, background: NAVY, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>{s.l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Message form */}
          {done ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "#64748b", fontSize: 14 }}>We will get back to you within 4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 14, border: "1px solid #e2e8f0" }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Send a Message</h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>We will respond within 4 business hours</p>
              {(
                [
                  ["name", "text", "Your Name *", true],
                  ["email", "email", "Email Address *", true],
                  ["phone", "tel", "Phone Number", false],
                  ["subject", "text", "Subject", false],
                ] as [keyof typeof form, string, string, boolean][]
              ).map(([name, type, ph, req]) => (
                <input
                  key={name}
                  type={type}
                  placeholder={ph}
                  required={req}
                  value={form[name]}
                  onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                  style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif" }}
                  onFocus={(e) => (e.target.style.borderColor = BLUE)}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              ))}
              <textarea
                placeholder="Your message *"
                required
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={4}
                style={{ padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", resize: "none", fontFamily: "'Inter', sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = BLUE)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <button type="submit" style={{ padding: "13px", background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                Send Message →
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "24px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech. All rights reserved. | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
