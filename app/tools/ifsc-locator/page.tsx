"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";

type BankInfo = {
  BANK: string;
  BRANCH: string;
  ADDRESS: string;
  CITY: string;
  STATE: string;
  CONTACT: string;
  MICR: string;
  IFSC: string;
};

export default function IFSCLocatorPage() {
  const [ifsc, setIfsc] = useState("");
  const [result, setResult] = useState<BankInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!ifsc || ifsc.length < 11) { setError("Please enter a valid 11-character IFSC code."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`https://ifsc.razorpay.com/${ifsc.toUpperCase()}`);
      if (!res.ok) { setError("IFSC code not found. Please check and try again."); return; }
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Unable to fetch bank details. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <span style={{ color: "#374151", fontWeight: 600 }}>IFSC Locator</span>
        </div>
      </div>

      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "56px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", marginBottom: 12 }}>IFSC Code Locator</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16 }}>Find bank branch details using IFSC code</p>
      </section>

      <section style={{ padding: "64px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 40, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Enter IFSC Code</h2>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>11-character code found on your cheque book or bank passbook</p>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <input
                placeholder="e.g. HDFC0001234"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                maxLength={11}
                onKeyDown={(e) => e.key === "Enter" && lookup()}
                style={{ flex: 1, padding: "13px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 16, fontFamily: "'Inter', sans-serif", outline: "none", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const }}
              />
              <button
                onClick={lookup}
                disabled={loading}
                style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}
              >
                {loading ? "Searching..." : "Find →"}
              </button>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", color: "#dc2626", fontSize: 13, marginBottom: 16 }}>
                ⚠️ {error}
              </div>
            )}

            {result && (
              <div style={{ background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: 16, padding: 24, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>{result.BANK}</div>
                    <div style={{ fontSize: 14, color: "#64748b" }}>{result.BRANCH} Branch</div>
                  </div>
                  <span style={{ background: "#dcfce7", color: "#15803d", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Found</span>
                </div>

                {[
                  { label: "IFSC Code", value: result.IFSC },
                  { label: "MICR Code", value: result.MICR || "—" },
                  { label: "Address", value: result.ADDRESS },
                  { label: "City", value: result.CITY },
                  { label: "State", value: result.STATE },
                  { label: "Contact", value: result.CONTACT || "—" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 16, marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #e0f2fe" }}>
                    <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, minWidth: 100, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", marginTop: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 12 }}>How to Find Your IFSC Code?</h3>
            {["Check the first page of your cheque book — IFSC is printed near the MICR code", "Look at your bank passbook front page", "Log in to your internet banking and check account details", "IFSC is always 11 characters: first 4 are bank code, 5th is 0, last 6 are branch code"].map((tip) => (
              <div key={tip} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, color: "#64748b" }}>
                <span style={{ color: BLUE, fontWeight: 700, flexShrink: 0 }}>→</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.6)", padding: "20px 5%", textAlign: "center", fontSize: 12 }}>
        © 2025 BizzBuddy by SDM Fintech | <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
      </footer>
    </div>
  );
}
