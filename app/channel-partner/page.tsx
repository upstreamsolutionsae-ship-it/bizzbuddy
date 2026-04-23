"use client";
import Link from "next/link";
import { useState } from "react";

const NAVY = "#0f2d5e";
const GREEN = "#2ecc71";

export default function ChannelPartnerPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", experience: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type: "DSA_ONBOARDING" }) });
    setDone(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: NAVY, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ textDecoration: "none" }}><span style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>Bizz<span style={{ color: GREEN }}>Buddy</span></span></Link>
        <Link href="/auth/login" style={{ background: GREEN, color: "#fff", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Login</Link>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, padding: "60px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(46,204,113,0.2)", color: GREEN, padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>JOIN OUR PARTNER NETWORK</div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>Become a BizzBuddy<br /><span style={{ color: GREEN }}>Channel Partner</span></h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              DSAs, brokers, and financial advisors — join India&apos;s fastest growing MSME financing platform and earn superior commissions.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {[["₹1L+", "Avg. Monthly Earning"], ["2 Days", "Onboarding Time"], ["50+", "Lender Options"]].map(([v, l]) => (
                <div key={l}><div style={{ fontSize: 22, fontWeight: 900, color: GREEN }}>{v}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</div></div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 20, padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Join as DSA / Channel Partner</h3>
            {done ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <h3 style={{ color: NAVY, fontWeight: 800 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>Our team will call you within 24 hours to complete onboarding.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {([["name", "text", "Full Name *", true], ["phone", "tel", "Mobile Number *", true], ["email", "email", "Email Address", false], ["city", "text", "City", false]] as [keyof typeof form, string, string, boolean][]).map(([name, type, ph, req]) => (
                  <input key={name} type={type} placeholder={ph} required={req} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} style={{ padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif" }} />
                ))}
                <select value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} style={{ padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  <option value="">Years of Experience</option>
                  {["0–2 years", "2–5 years", "5–10 years", "10+ years"].map(o => <option key={o}>{o}</option>)}
                </select>
                <button type="submit" style={{ padding: "13px", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Join Now →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: NAVY, textAlign: "center", marginBottom: 40 }}>Why Partner with BizzBuddy?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { icon: "💰", title: "Higher Payouts", desc: "Earn up to 2% commission on every disbursed loan. Top partners earn ₹1L+ monthly." },
              { icon: "⚡", title: "Faster Logins", desc: "Pre-qualified leads with complete documentation support. Less time on paperwork, more time on business." },
              { icon: "📊", title: "CAM Support", desc: "Our credit team prepares Credit Appraisal Memos (CAMs) so your login success rate is 3x higher." },
              { icon: "👨‍💼", title: "Dedicated RM", desc: "Every partner gets a dedicated Relationship Manager for escalations and priority processing." },
              { icon: "🎓", title: "Training & Certification", desc: "Regular training on new products, credit parameters, and lender preferences." },
              { icon: "📱", title: "Partner Dashboard", desc: "Real-time tracking of leads, applications, status updates, and commission statements." },
            ].map(b => (
              <div key={b.title} style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#f8fafc", padding: "60px 5%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, marginBottom: 40 }}>How Partner Earnings Work</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[["Onboard MSMEs", "Refer businesses looking for loans or equity. Use your existing network."], ["Earn Points", "Every successful referral earns points towards higher commission tiers."], ["Convert to Cash", "Commission paid directly to your bank within 7 days of disbursement."]].map(([title, desc], i) => (
              <div key={title} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 16px" }}>0{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
