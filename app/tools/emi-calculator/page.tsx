"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const LOAN_ROUTES: [string, string][] = [
  ["Home Loan", "/loans/home-loan"],
  ["Personal Loan", "/loans/personal-loan"],
  ["Business Loan", "/loans/business-loan"],
  ["Working Capital", "/loans/working-capital"],
  ["Loan Against Property", "/loans/loan-against-property"],
];

export default function EMICalculatorPage() {
  const router = useRouter();
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(5);

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return { emi: principal / n, totalPayable: principal, totalInterest: 0 };
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - principal;
    return { emi, totalPayable, totalInterest };
  }, [principal, rate, tenure]);

  const pct = totalPayable > 0 ? Math.round((principal / totalPayable) * 100) : 0;

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Tools</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>EMI Calculator</span>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)", padding: "56px 5%", textAlign: "center", borderBottom: "1px solid #e8eef7" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: NAVY, marginBottom: 12 }}>EMI Calculator</h1>
        <p style={{ color: "#475569", fontSize: 16 }}>Calculate your monthly loan EMI instantly</p>
      </section>

      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
          {/* Sliders */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 32 }}>Enter Loan Details</h2>

            {[
              { label: "Loan Amount", value: principal, setValue: setPrincipal, min: 100000, max: 250000000, step: 100000, display: fmt(principal), minLabel: "₹1 L", maxLabel: "₹25 Cr" },
              { label: "Interest Rate (% p.a.)", value: rate, setValue: setRate, min: 5, max: 25, step: 0.25, display: `${rate}%`, minLabel: "5%", maxLabel: "25%" },
              { label: "Loan Tenure (Years)", value: tenure, setValue: setTenure, min: 1, max: 30, step: 1, display: `${tenure} Yr${tenure > 1 ? "s" : ""}`, minLabel: "1 Yr", maxLabel: "30 Yrs" },
            ].map(({ label, value, setValue, min, max, step, display, minLabel, maxLabel }) => (
              <div key={label} style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{label}</label>
                  <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{display}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  style={{ width: "100%", accentColor: BLUE }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: "#94a3b8" }}>
                  <span>{minLabel}</span>
                  <span>{maxLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: NAVY, borderRadius: 20, padding: 32, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 600 }}>MONTHLY EMI</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#93c5fd" }}>{fmt(Math.round(emi))}</div>
            </div>

            {/* Pie visual */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e2e8f0" }}>
              <div style={{ marginBottom: 16, textAlign: "center" }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: `conic-gradient(${NAVY} 0% ${pct}%, #93c5fd ${pct}% 100%)`,
                    margin: "0 auto 16px",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: NAVY, display: "inline-block" }} />
                  <span style={{ fontSize: 13, color: "#64748b" }}>Principal</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{fmt(Math.round(principal))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#93c5fd", display: "inline-block" }} />
                  <span style={{ fontSize: 13, color: "#64748b" }}>Total Interest</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>{fmt(Math.round(totalInterest))}</span>
              </div>
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Total Payable</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{fmt(Math.round(totalPayable))}</span>
              </div>
            </div>

            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) router.push(e.target.value);
              }}
              style={{
                background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`,
                color: "#fff",
                padding: "14px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            >
              <option value="" disabled>
                Apply for Loan ▾
              </option>
              {LOAN_ROUTES.map(([label, href]) => (
                <option key={href} value={href} style={{ background: "#fff", color: "#1a202c" }}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "20px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
