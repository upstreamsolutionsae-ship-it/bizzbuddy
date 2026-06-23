"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

const LOAN_ROUTE: Record<string, string> = {
  "Home Loan": "/loans/home-loan",
  "Personal Loan": "/loans/personal-loan",
  "Business Loan": "/loans/business-loan",
  "Working Capital": "/loans/working-capital",
  "Loan Against Property": "/loans/loan-against-property",
};

type Result = {
  eligible: boolean;
  leadOnly?: boolean;
  maxAmount: string;
  rate: string;
  reason: string;
  disclaimer?: string;
};

export default function EligibilityCheckPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    loanType: "",
    employment: "",
    income: "",
    cibil: "",
    age: "",
    existingEmi: "",
    tenure: "",
    phone: "",
    amount: "",
  });
  const [result, setResult] = useState<Result | null>(null);

  // Business Loan & LAP depend on too many factors — collect a mobile number and route to an executive.
  const isLeadOnly = form.loanType === "Business Loan" || form.loanType === "Loan Against Property";

  const submitLead = async () => {
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone,
        category: form.loanType,
        loanType: form.loanType,
        employment: form.employment,
        age: form.age,
        income: form.income,
        source: "eligibility-tool",
      }),
    });
    setResult({ eligible: true, leadOnly: true, maxAmount: "", rate: "", reason: "" });
    setStep(3);
  };

  // Annual interest rate (and display range) by loan type + selected CIBIL range.
  const RATE_TABLE: Record<string, Record<string, { r: number; label: string }>> = {
    "Home Loan": {
      "750+": { r: 0.085, label: "8.5%–9.25%" },
      "700–749": { r: 0.0925, label: "9.25%–10%" },
      "650–699": { r: 0.10, label: "10%–11%" },
      "600–649": { r: 0.1075, label: "10.75%–12%" },
    },
    "Personal Loan": {
      "750+": { r: 0.105, label: "10.5%–12%" },
      "700–749": { r: 0.13, label: "13%–15%" },
      "650–699": { r: 0.155, label: "15%–18%" },
      "600–649": { r: 0.18, label: "18%–22%" },
    },
    "Working Capital": {
      "750+": { r: 0.13, label: "13%–15%" },
      "700–749": { r: 0.145, label: "14.5%–16%" },
      "650–699": { r: 0.16, label: "16%–18%" },
      "600–649": { r: 0.18, label: "18%–20%" },
    },
  };
  const DEFAULT_RATE: Record<string, { r: number; label: string }> = {
    "750+": { r: 0.115, label: "11.5%–13%" },
    "700–749": { r: 0.135, label: "13.5%–15%" },
    "650–699": { r: 0.155, label: "15%–17%" },
    "600–649": { r: 0.18, label: "18%–20%" },
  };

  const calculate = () => {
    const income = Number(form.income);
    const emi = Number(form.existingEmi) || 0;
    const disposable = Math.max(0, income - emi);
    // FOIR — lenders typically allow ~55% of net income to go toward EMIs.
    const maxEMI = disposable * 0.55;
    const cibilRange = form.cibil; // selected range label, e.g. "750+"
    const tenureYears = Number(form.tenure) || 0;

    const disclaimer = "This is a tentative amount which may vary from lender to lender as per their policy.";

    if (cibilRange === "Below 600") {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "CIBIL score below 600. Improve your credit score first.", disclaimer });
    } else if (Number(form.age) < 21 || Number(form.age) > 65) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "Age not within eligible range (21–65 years).", disclaimer });
    } else if (income < 20000) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "Monthly income below the minimum requirement.", disclaimer });
    } else if (tenureYears <= 0) {
      setResult({ eligible: false, maxAmount: "—", rate: "—", reason: "Please select an expected loan tenure to estimate eligibility.", disclaimer });
    } else {
      const rateInfo = (RATE_TABLE[form.loanType] || DEFAULT_RATE)[cibilRange] || DEFAULT_RATE[cibilRange] || { r: 0.12, label: "12%–15%" };
      const monthly = rateInfo.r / 12;
      const n = tenureYears * 12;
      const maxLoan = Math.round((maxEMI / monthly) * (1 - Math.pow(1 + monthly, -n)));
      setResult({
        eligible: true,
        maxAmount: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(maxLoan),
        rate: rateInfo.label,
        reason: `Based on your income of ₹${income.toLocaleString("en-IN")}/month, selected CIBIL range of ${cibilRange}, and a ${tenureYears}-year tenure.`,
        disclaimer,
      });
    }
    setStep(3);
  };

  const applyHref = LOAN_ROUTE[form.loanType] || "/loans/business-loan";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/tools" style={{ color: BLUE, textDecoration: "none" }}>Tools</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Eligibility Check</span>
        </div>
      </div>

      <section style={{ background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)", padding: "56px 5%", textAlign: "center", borderBottom: "1px solid #e8eef7" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: NAVY, marginBottom: 12 }}>Loan Eligibility Check</h1>
        <p style={{ color: "#475569", fontSize: 16 }}>Find out how much loan you are eligible for — in 2 minutes</p>
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
                      {["Home Loan", "Personal Loan", "Business Loan", "Working Capital", "Loan Against Property"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Employment Type</label>
                    <select value={form.employment} onChange={(e) => setForm((p) => ({ ...p, employment: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                      <option value="">Select employment type</option>
                      {["Salaried", "Self-Employed / Business Owner", "Professional (Doctor/CA/Lawyer)"].map((o) => <option key={o}>{o}</option>)}
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

                  {isLeadOnly ? (
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Mobile Number</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                        style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }}
                      />
                      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                        {form.loanType} eligibility depends on multiple factors — our executive will review your profile.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>CIBIL Credit Score (approximate)</label>
                        <select value={form.cibil} onChange={(e) => setForm((p) => ({ ...p, cibil: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                          <option value="">Select CIBIL range</option>
                          <option value="750+">750+ (Excellent)</option>
                          <option value="700–749">700–749 (Good)</option>
                          <option value="650–699">650–699 (Average)</option>
                          <option value="600–649">600–649 (Poor)</option>
                          <option value="Below 600">Below 600 (Very Poor)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Expected Tenure of the Loan</label>
                        <select value={form.tenure} onChange={(e) => setForm((p) => ({ ...p, tenure: e.target.value }))} style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
                          <option value="">Select tenure</option>
                          {["1", "2", "3", "5", "7", "10", "15", "20", "25", "30"].map((y) => (
                            <option key={y} value={y}>{y} {y === "1" ? "year" : "years"}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, background: "#f1f5f9", color: "#374151", padding: "13px", borderRadius: 10, fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Back</button>
                    {isLeadOnly ? (
                      <button onClick={submitLead} disabled={form.phone.length !== 10} style={{ flex: 2, background: form.phone.length === 10 ? `linear-gradient(135deg, ${NAVY}, ${BLUE})` : "#e2e8f0", color: form.phone.length === 10 ? "#fff" : "#94a3b8", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: form.phone.length === 10 ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif" }}>
                        Submit →
                      </button>
                    ) : (
                      <button onClick={calculate} disabled={!form.income || !form.cibil || !form.tenure} style={{ flex: 2, background: form.income && form.cibil && form.tenure ? `linear-gradient(135deg, ${NAVY}, ${BLUE})` : "#e2e8f0", color: form.income && form.cibil && form.tenure ? "#fff" : "#94a3b8", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: form.income && form.cibil && form.tenure ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif" }}>
                        Check Eligibility →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && result && result.leadOnly && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#15803d", marginBottom: 12 }}>Request Received</h2>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 24 }}>
                  Thank you! Our executive will get in touch with you within 2 working hours regarding your {form.loanType} requirement.
                </p>
                <button onClick={() => { setStep(1); setResult(null); setForm({ loanType: "", employment: "", income: "", cibil: "", age: "", existingEmi: "", tenure: "", phone: "", amount: "" }); }} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }}>Start Over</button>
              </div>
            )}

            {step === 3 && result && !result.leadOnly && (
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
                    <Link href={applyHref} style={{ display: "block", background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 12 }}>Apply Now →</Link>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>{result.reason}</p>
                    <Link href="/credit-report" style={{ display: "block", background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 12 }}>Improve Credit Score</Link>
                  </>
                )}
                {result.disclaimer && (
                  <p style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                    {result.disclaimer}
                  </p>
                )}
                <button onClick={() => { setStep(1); setResult(null); setForm({ loanType: "", employment: "", income: "", cibil: "", age: "", existingEmi: "", tenure: "", phone: "", amount: "" }); }} style={{ background: "none", border: "1px solid #e2e8f0", color: "#64748b", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }}>Start Over</button>
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
