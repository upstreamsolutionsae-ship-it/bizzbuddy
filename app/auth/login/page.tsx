"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NAVY = "#0f2d5e";
const ROLES = [
  { label: "MSME", icon: "🏭", value: "SME" },
  { label: "Investor", icon: "💰", value: "INVESTOR" },
  { label: "DSA Partner", icon: "🤝", value: "CHANNEL_PARTNER" },
];
const DEMOS = [
  { label: "SME Demo: sme@demo.com", email: "sme@demo.com", password: "demo123" },
  { label: "Partner Demo: partner@demo.com", email: "partner@demo.com", password: "demo123" },
  { label: "Admin Demo: admin@demo.com", email: "admin@demo.com", password: "admin123" },
];
const ROLE_ROUTES: Record<string, string> = {
  SME: "/dashboard/sme",
  INVESTOR: "/dashboard/investor",
  CHANNEL_PARTNER: "/dashboard/partner",
  ADMIN: "/dashboard/admin",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("SME");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const result = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false); return;
    }
    const session = await getSession();
    const role = (session?.user as any)?.role || selectedRole;
    router.push(ROLE_ROUTES[role] || "/dashboard/sme");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #2ecc71, #27ae60)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 22 }}>B</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 800, fontSize: 24, color: "white" }}>BizzBuddy</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>by SDM Fintech</div>
            </div>
          </Link>
        </div>

        <div style={{ background: "white", borderRadius: 24, padding: 40, boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 6, textAlign: "center" }}>Welcome Back</h1>
          <p style={{ color: "#64748b", textAlign: "center", marginBottom: 28, fontSize: 14 }}>Login to your BizzBuddy account</p>

          {/* Role Selector */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
            {ROLES.map(r => (
              <button key={r.value} onClick={() => setSelectedRole(r.value)} style={{ padding: "12px 8px", border: selectedRole === r.value ? `2px solid ${NAVY}` : "2px solid #e2e8f0", borderRadius: 12, background: selectedRole === r.value ? "#eff6ff" : "#f8fafc", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: selectedRole === r.value ? NAVY : "#64748b" }}>{r.label}</div>
              </button>
            ))}
          </div>

          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: "#dc2626" }}>⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com"
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: "'Inter', sans-serif" }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
                <Link href="#" style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>Forgot Password?</Link>
              </div>
              <input type="password" required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Enter your password"
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" as const, fontFamily: "'Inter', sans-serif" }} />
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", marginTop: 20, padding: "13px", background: loading ? "#93c5fd" : `linear-gradient(135deg, ${NAVY}, #1a3f7a)`, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#64748b" }}>
            Don&apos;t have an account? <Link href="/auth/register" style={{ color: "#1d4ed8", fontWeight: 700, textDecoration: "none" }}>Register Free →</Link>
          </p>

          {/* Demo Accounts */}
          <div style={{ marginTop: 24, padding: "16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase" as const, letterSpacing: 1 }}>Demo Accounts</div>
            {DEMOS.map(d => (
              <button key={d.email} onClick={() => setForm({ email: d.email, password: d.password })}
                style={{ display: "block", width: "100%", padding: "8px 12px", background: "white", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#374151", cursor: "pointer", marginBottom: 6, textAlign: "left" as const, fontFamily: "'Inter', sans-serif" }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
