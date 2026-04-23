"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NAVY = "#0f2d5e";
const ROLES = [
  { label: "MSME / Business", value: "SME", desc: "Apply for loans, equity, financial advisory" },
  { label: "Investor", value: "INVESTOR", desc: "Invest in growing MSMEs" },
  { label: "Channel Partner (DSA)", value: "CHANNEL_PARTNER", desc: "Refer clients and earn commissions" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("SME");
  const [form, setForm] = useState({ name: "", businessName: "", email: "", phone: "", password: "", confirm: "", city: "", turnover: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, role }) });
    const data = await res.json();
    if (!data.success) { setError(data.error || "Registration failed."); setLoading(false); return; }
    setDone(true);
    setTimeout(() => router.push("/auth/login"), 2000);
    setLoading(false);
  };

  const inp = (name: keyof typeof form, type: string, placeholder: string, required = false) => (
    <input type={type} placeholder={placeholder} required={required} value={form[name]}
      onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
      style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: "'Inter', sans-serif" }} />
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontWeight: 800, fontSize: 28, color: "#fff" }}>Bizz<span style={{ color: "#2ecc71" }}>Buddy</span></div>
          </Link>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 6, fontSize: 14 }}>Join thousands of MSMEs growing with BizzBuddy</p>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: 36, boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 20 }}>Create Your Account</h1>

          {/* Role Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {ROLES.map(r => (
              <button key={r.value} onClick={() => setRole(r.value)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: role === r.value ? `2px solid #1d4ed8` : "2px solid #e2e8f0", borderRadius: 10, background: role === r.value ? "#eff6ff" : "#f8fafc", cursor: "pointer", textAlign: "left" as const, fontFamily: "'Inter', sans-serif" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: role === r.value ? "#1d4ed8" : "#374151" }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{r.desc}</div>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: role === r.value ? "5px solid #1d4ed8" : "2px solid #cbd5e1", flexShrink: 0 }} />
              </button>
            ))}
          </div>

          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#dc2626" }}>{error}</div>}
          {done && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#16a34a" }}>Account created! Redirecting to login...</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Full Name *</label>
                {inp("name", "text", "John Doe", true)}
              </div>
              {role === "SME" && <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Business Name *</label>
                {inp("businessName", "text", "ABC Enterprises Pvt. Ltd.", true)}
              </div>}
              <div style={{ gridColumn: "1/-1" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Email Address *</label>
                {inp("email", "email", "you@example.com", true)}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Phone Number</label>
                {inp("phone", "tel", "+91 98765 43210")}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>City</label>
                {inp("city", "text", "Mumbai")}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Password *</label>
                {inp("password", "password", "Min 8 characters", true)}
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Confirm Password *</label>
                {inp("confirm", "password", "Repeat password", true)}
              </div>
            </div>
            <button type="submit" disabled={loading || done} style={{ width: "100%", marginTop: 20, padding: "13px", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif" }}>
              {loading ? "Creating account..." : done ? "Account created!" : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "#64748b" }}>
            Already have an account? <Link href="/auth/login" style={{ color: "#1d4ed8", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
