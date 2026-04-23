"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

export default function EligibilityCheckPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    loanType: "",
    employment: "",
    income: "",
    cibil: "",
    age: "",
    existingEmi: "",
    amount: "",
  });
  const [result, setResult] = useState<{ eligible: boolean; maxAmount: string; rate: string; reason: string } | null>(null);

  const calculate = () => {
    const income = Number(form.income);
    const emi = Number(form.existingEmi) || 0;
    const disposable = income - emi;
    const maxEMI = disposable * 0.55;
    const cibil = Number(form.cibil);

    if (cibil < 600) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "CIBIL score below 600. Improve credit score first." });
    } else if (Number(form.age) < 21 || Number(form.age) > 65) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "Age not within eligible range (21–65 years)." });
    } else if (income < 20000) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "Monthly income below minimum requirement." });
    } else {
      const tenureMonths = 60;
      const r = 0.0092;
      const maxLoan = Math.round((maxEMI / r) * (1 - Math.pow(1 + r, -tenureMonths)));
      const rate = cibil >= 750 ? "10.5%–12%" : cibil >= 700 ? "12%–14%" : "14%–16%";
      setResult({
        eligible: true,
        maxAmount: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(maxLoan),
        rate,
        reason: `Based on your income of ₹${income.toLocaleString("en-IN")}/month and CIBIL score of ${cibil}.`,
      });
    }
    setStep(3);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Tools</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Eligibility Check</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "56px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Loan Eligibility Check</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16 }}>Find out how much loan you are eligible for — in 2 minutes</p>
      </section>

      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Steps indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: s <= step ? NAVY : "#e2e8f0", color: s <= step ? "#fff" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{s}</div>
                {s < 3 && <div style={{ width: 40, height: 2, background: s < step ? NAVY : "#e2e8f0" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Basic Information</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Type of Loan</label>
                    <select value={form.loanType} onChange={(e) => setForm((p) => ({ ...p, loanType: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                      <option value="">Select loan type</option>
                      {["Home Loan", "Personal Loan", "Business Loan", "Car Loan", "Loan Against Property"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Employment Type</label>
                    <select value={form.employment} onChange={(e) => setForm((p) => ({ ...p, employment: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                      <option value="">Select employment type</option>
                      {["Salaried", "Self-Employed", "Business Owner", "Professional (Doctor/CA/Lawyer)"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Age (years)</label>
                    <input type="number" placeholder="e.g. 32" value={form.age} onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={() => setStep(2)} disabled={!form.loanType || !form.employment || !form.age} style={{ background: form.loanType && form.employment && form.age ? `linear-gradient(135deg, ${NAVY}, ${BLUE})` : "#e2e8f0", color: form.loanType && form.employment && form.age ? "#fff" : "#94a3b8", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: form.loanType && form.employment && form.age ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif", marginTop: 8 }}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 24 }}>Financial Details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Monthly Income (₹)</label>
                    <input type="number" placeholder="e.g. 60000" value={form.income} onChange={(e) => setForm((p) => ({ ...p, income: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Existing Monthly EMIs (₹)</label>
                    <input type="number" placeholder="Enter 0 if none" value={form.existingEmi} onChange={(e) => setForm((p) => ({ ...p, existingEmi: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>CIBIL Credit Score (approximate)</label>
                    <select value={form.cibil} onChange={(e) => setForm((p) => ({ ...p, cibil: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                      <option value="">Select CIBIL range</option>
                      <option value="780">750+ (Excellent)</option>
                      <option value="720">700–749 (Good)</option>
                      <option value="670">650–699 (Average)</option>
                      <option value="620">600–649 (Poor)</option>
                      <option value="550">Below 600 (Very Poor)</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, background: "#f1f5f9", color: "#374151", padding: "13px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Back</button>
                    <button onClick={calculate} disabled={!form.income || !form.cibil} style={{ flex: 2, background: form.income && form.cibil ? `linear-gradient(135deg, ${NAVY}, ${BLUE})` : "#e2e8f0", color: form.income && form.cibil ? "#fff" : "#94a3b8", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: form.income && form.cibil ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif" }}>
                      Check Eligibility →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && result && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>{result.eligible ? "✅" : "⚠️"}</div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: result.eligible ? "#15803d" : "#dc2626", marginBottom: 12 }}>
                  {result.eligible ? "You Are Eligible!" : "Not Eligible Yet"}
                </h2>
                {result.eligible ? (
                  <>
                    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Estimated Eligible Amount</div>
                      <div style={{ fontSize: 36, fontWeight: 900, color: NAVY }}>{result.maxAmount}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 8 }}>Interest rate range: {result.rate} p.a.</div>
                    </div>
                    <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>{result.reason}</p>
                    <Link href="/loans/business-loan" style={{ display: "block", background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 12 }}>Apply Now →</Link>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>{result.reason}</p>
                    <Link href="/credit-report" style={{ display: "block", background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 12 }}>Improve Credit Score</Link>
                  </>
                )}
                <button onClick={() => { setStep(1); setResult(null); setForm({ loanType: "", employment: "", income: "", cibil: "", age: "", existingEmi: "", amount: "" }); }} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }}>Start Over</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "20px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link> | Results are indicative, not a guarantee.
      </footer>
    </div>
  );
}
