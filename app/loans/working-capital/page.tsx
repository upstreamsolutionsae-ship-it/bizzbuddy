"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";
const ACCENT = "#0e7490";
const SOFT = "#ecfeff";
const BORDER = "#a5f3fc";

const FOOTER_CONTACT = {
  address: "305, 3rd Floor, Suneja Tower 1, Janakpuri District Center, Janakpuri West, New Delhi 110078",
  phones: ["+91 9910850208", "+91 9899630125"],
  email: "sdmfintechconsultants@gmail.com",
};

const HIGHLIGHTS = [
  { value: "Lowest ROI*", label: "Market Rates" },
  { value: "Up to ₹50 Cr", label: "Limits" },
  { value: "Up to 15 Yrs*", label: "Tenure" },
  { value: "Quick", label: "Sanction & Disbursal" },
];

const BENEFITS = [
  { icon: "💧", title: "Improve Cash Flow", desc: "Manage day-to-day operational expenses, supplier payments, salaries, and working capital gaps efficiently." },
  { icon: "💼", title: "Higher Business Liquidity", desc: "Access flexible limits against property, stock, receivables, invoices, or business cash flows." },
  { icon: "🔁", title: "Fund & Non-Fund Based Solutions", desc: "Avail both fund-based and non-fund-based facilities including CC, OD, LC, BG, and trade finance products." },
  { icon: "🎚️", title: "Flexible Utilisation", desc: "Withdraw funds as per business requirements and pay interest only on utilised amounts in eligible products." },
  { icon: "🧩", title: "Tailored Business Structuring", desc: "Customized loan structuring for manufacturers, traders, contractors, exporters, distributors, and service businesses." },
  { icon: "🏦", title: "Multiple Banking Partners", desc: "Compare offers from leading banks and NBFCs for better pricing, limits, and collateral structures." },
];

const PRODUCTS = [
  { title: "Cash Credit (CC)", desc: "Revolving working capital limits secured against stock and receivables for daily business operations." },
  { title: "Overdraft Facility (OD)", desc: "Flexible overdraft limits against property, fixed deposits, or financial strength of the business." },
  { title: "OD Against Property (ODAP)", desc: "Working capital overdraft facility secured against residential, commercial, or industrial property." },
  { title: "Working Capital Term Loan (WCTL)", desc: "Structured term funding for managing temporary cash flow mismatches and operational expansion." },
  { title: "Letter of Credit (LC)", desc: "Non-fund-based facility helping businesses manage domestic and international supplier payments." },
  { title: "Bank Guarantee (BG)", desc: "Performance and financial guarantees for contractors, infrastructure companies, and government tenders." },
  { title: "Bill Discounting", desc: "Unlock working capital by discounting invoices and receivables before payment due dates." },
  { title: "Inventory Funding", desc: "Business funding solutions against stock and inventory to support operational cycles." },
  { title: "Receivable Financing", desc: "Improve cash flow through financing against outstanding customer receivables." },
  { title: "Export & Trade Finance", desc: "Specialized working capital solutions for exporters, importers, and cross-border trade businesses." },
];

const ELIGIBILITY = [
  "Business vintage generally 2 years or more",
  "Proprietorship, Partnership, LLP, Pvt Ltd, and Corporate entities eligible",
  "Regular banking transactions and operational cash flow",
  "GST registration and financial documents required in most cases",
  "Acceptable credit profile and repayment history",
  "Existing working capital limits may be eligible for enhancement or balance transfer",
];

const DOCUMENTS = [
  "PAN Card of business and promoters",
  "Aadhaar Card / KYC documents",
  "GST registration certificate",
  "Latest ITR and financial statements",
  "Bank statements of last 6–12 months",
  "Debtors and creditors statement",
  "Stock statement (where applicable)",
  "Existing sanction letters and loan track",
  "Property documents (for secured facilities)",
  "Company incorporation and constitutional documents",
];

const INDUSTRIES = [
  "Manufacturing Businesses", "Traders & Wholesalers", "Retail Businesses",
  "Exporters & Importers", "Infrastructure & Contractors", "Pharmaceutical Businesses",
  "Automobile & Ancillary Units", "Logistics & Transport Businesses", "Service Sector Companies",
  "Distributors & Dealers", "E-commerce Businesses",
];

const FAQS = [
  { q: "What is a working capital loan?", a: "A working capital loan is a business finance solution designed to manage day-to-day operational expenses such as inventory purchase, salary payments, supplier dues, receivables management, and cash flow gaps." },
  { q: "What are the different types of working capital facilities?", a: "Working capital solutions include Cash Credit (CC), Overdraft (OD), OD Against Property (ODAP), Working Capital Term Loan (WCTL), Letter of Credit (LC), Bank Guarantee (BG), bill discounting, inventory funding, and receivable financing." },
  { q: "What is the difference between CC and OD?", a: "Cash Credit limits are generally secured against stock and receivables, while overdraft facilities may be secured against property, fixed deposits, or overall business strength." },
  { q: "What is OD Against Property (ODAP)?", a: "ODAP is an overdraft facility secured against residential, commercial, or industrial property where businesses can withdraw funds as required within the sanctioned limit." },
  { q: "What are non-fund-based working capital facilities?", a: "Non-fund-based facilities include Letter of Credit (LC) and Bank Guarantee (BG), which help businesses manage trade transactions and contractual obligations without direct fund disbursal." },
  { q: "Can existing working capital limits be enhanced?", a: "Yes. Eligible businesses may apply for enhancement, takeover, restructuring, or additional working capital facilities based on banking performance and turnover growth." },
  { q: "What security is required for working capital loans?", a: "Security may include residential/commercial property, stock, receivables, machinery, fixed deposits, or collateral as per lender policy." },
  { q: "Who can apply for working capital finance?", a: "Proprietorship firms, partnerships, LLPs, private limited companies, manufacturers, traders, contractors, exporters, and service businesses can apply." },
  { q: "How is working capital eligibility calculated?", a: "Eligibility is generally based on turnover, banking transactions, GST turnover, profitability, receivables cycle, stock holding, and financial statements." },
  { q: "What interest rates are applicable on working capital loans?", a: "Interest rates vary depending on collateral, business profile, turnover, credit score, banking conduct, and facility type." },
  { q: "What documents are required for LC and BG facilities?", a: "Businesses generally need financial statements, GST returns, banking details, order copies, tender documents, and existing banking arrangements." },
  { q: "Can startups get working capital loans?", a: "Some lenders offer working capital solutions to startups and new businesses based on promoter profile, collateral strength, and cash flow visibility." },
];

const SEO = [
  { heading: "What is Working Capital Finance?", body: "Working capital finance helps businesses manage short-term operational expenses and maintain healthy cash flow cycles. Businesses use working capital facilities for inventory purchase, supplier payments, salary processing, receivable management, order execution, and day-to-day operations." },
  { heading: "Types of Working Capital Loans", body: "Working capital finance includes both fund-based and non-fund-based facilities such as Cash Credit (CC), Overdraft (OD), OD Against Property (ODAP), Working Capital Term Loan (WCTL), Letter of Credit (LC), Bank Guarantee (BG), invoice financing, bill discounting, inventory funding, and receivable financing." },
  { heading: "Benefits of Working Capital Loans", bullets: ["Improves business liquidity", "Supports operational cash flow", "Helps manage receivables and inventory cycles", "Flexible fund utilisation", "Interest charged only on utilised amount in eligible facilities", "Enhances purchasing and trade capacity", "Supports growth and expansion requirements"] },
  { heading: "Fund-Based Working Capital Facilities", body: "Fund-based facilities involve direct disbursal or withdrawal of funds and include Cash Credit, Overdraft, OD Against Property, WCTL, invoice financing, and bill discounting." },
  { heading: "Non-Fund-Based Working Capital Facilities", body: "Non-fund-based facilities such as LC and BG help businesses improve credibility and support trade operations without direct fund withdrawal." },
  { heading: "How to Apply for Working Capital Loans?", body: "Businesses can apply by submitting financial statements, GST returns, banking documents, KYC documents, stock statements, and collateral details. Loan eligibility is assessed based on turnover, cash flow, profitability, and banking conduct." },
  { heading: "Why Choose BizzBuddy for Working Capital Loans?", body: "BizzBuddy helps businesses compare working capital solutions across multiple banks and NBFCs with customized structuring support for secured and unsecured business finance requirements." },
];

export default function WorkingCapitalPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", business: "", city: "", loan: "", turnover: "", banking: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, loanType: "Working Capital", source: "loan-page-working-capital" }),
    });
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8,
    fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif", width: "100%",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1a202c", background: "#fff" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", fontSize: 13, color: "#64748b" }}>
          <Link href="/" style={{ color: BLUE, textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/loans/business-loan" style={{ color: BLUE, textDecoration: "none" }}>Loans</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#374151", fontWeight: 600 }}>Working Capital Loans</span>
        </div>
      </div>

      {/* Hero + Form */}
      <section style={{ background: "linear-gradient(135deg, #eef5ff 0%, #ffffff 60%, #f5f9ff 100%)", padding: "64px 5%", borderBottom: "1px solid #e8eef7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: SOFT, color: ACCENT, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 20, border: `1px solid ${BORDER}`, letterSpacing: 1 }}>
              WORKING CAPITAL FINANCE
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: NAVY, lineHeight: 1.2, marginBottom: 16 }}>
              Working Capital Loans for Businesses
            </h1>
            <p style={{ fontSize: 18, color: ACCENT, marginBottom: 12, fontWeight: 700 }}>
              Flexible business funding solutions for managing cash flow, inventory, receivables, operations, and growth requirements.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 32 }}>
              Get access to secured and unsecured working capital solutions including Cash Credit (CC), Overdraft (OD), Working Capital Term Loans (WCTL), OD Against Property (ODAP), Letter of Credit (LC), Bank Guarantee (BG), bill discounting, inventory funding, receivable financing, and more through leading banks and NBFCs.
            </p>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {HIGHLIGHTS.map((h) => (
                <div key={h.label}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: ACCENT }}>{h.value}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 18px 50px rgba(21,101,192,0.15)", border: "1px solid #e2e8f0" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>Thank You!</h3>
                <p style={{ color: "#64748b", fontSize: 14 }}>Our advisor will contact you within 2 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: 16, background: "none", border: `1px solid ${BLUE}`, color: BLUE, padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13 }}>Submit Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 4 }}>Apply for Working Capital</h3>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Free consultation within 2 hours</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input type="text" placeholder="Full Name *" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} style={inputStyle} />
                  <input type="tel" placeholder="Mobile Number *" required inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} style={inputStyle} />
                  <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} style={inputStyle} />
                  <input type="text" placeholder="Business Name" value={form.business} onChange={(e) => setForm((p) => ({ ...p, business: e.target.value }))} style={inputStyle} />
                  <input type="text" placeholder="City" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} style={inputStyle} />
                  <select value={form.loan} onChange={(e) => setForm((p) => ({ ...p, loan: e.target.value }))} style={{ ...inputStyle, color: form.loan ? "#1a202c" : "#9ca3af" }}>
                    <option value="">Loan Requirement</option>
                    {PRODUCTS.map((p) => <option key={p.title}>{p.title}</option>)}
                  </select>
                  <select value={form.turnover} onChange={(e) => setForm((p) => ({ ...p, turnover: e.target.value }))} style={{ ...inputStyle, color: form.turnover ? "#1a202c" : "#9ca3af" }}>
                    <option value="">Annual Turnover</option>
                    {["Under ₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25–100 Cr", "₹100 Cr+"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <input type="text" placeholder="Existing Banking Relationship" value={form.banking} onChange={(e) => setForm((p) => ({ ...p, banking: e.target.value }))} style={inputStyle} />
                  <button type="submit" style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", marginTop: 4 }}>Get Free Consultation →</button>
                </form>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 10 }}>🔒 100% Confidential • No spam</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Why Choose Us</div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Benefits of Working Capital Finance with BizzBuddy</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {BENEFITS.map((f) => (
              <div key={f.title} style={{ background: "#fff", borderRadius: 16, padding: 28, border: `1.5px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Covered */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Products</div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Working Capital Products We Offer</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {PRODUCTS.map((p, i) => (
              <div key={p.title} style={{ display: "flex", gap: 16, background: SOFT, borderRadius: 14, padding: 22, border: `1px solid ${BORDER}` }}>
                <div style={{ width: 38, height: 38, flexShrink: 0, background: ACCENT, color: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15 }}>{i + 1}</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ color: "#475569", fontSize: 13.5, lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: NAVY, marginBottom: 24 }}>Eligibility Criteria</h2>
            {ELIGIBILITY.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                <span style={{ width: 22, height: 22, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: NAVY, marginBottom: 24 }}>Documents Required</h2>
            {DOCUMENTS.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                <span style={{ width: 22, height: 22, background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1, color: BLUE, fontWeight: 700 }}>📄</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Industries We Serve</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {INDUSTRIES.map((ind) => (
              <span key={ind} style={{ background: SOFT, border: `1px solid ${BORDER}`, color: NAVY, padding: "10px 18px", borderRadius: 50, fontSize: 13.5, fontWeight: 600 }}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "72px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: ACCENT, fontWeight: 700, fontSize: 12, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>FAQs</div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: NAVY }}>Frequently Asked Questions</h2>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 22px", textAlign: "left", fontSize: 15, fontWeight: 700, color: NAVY, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "'Inter', sans-serif" }}>
                {faq.q}
                <span style={{ color: ACCENT, fontSize: 18, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 22px 20px", fontSize: 14, color: "#475569", lineHeight: 1.75 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section style={{ padding: "72px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          {SEO.map((sec, i) => (
            <div key={i} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: NAVY, marginBottom: 14 }}>{sec.heading}</h2>
              {sec.body && <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: sec.bullets ? 14 : 0 }}>{sec.body}</p>}
              {sec.bullets && (
                <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                  {sec.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 15, color: "#374151", lineHeight: 1.7 }}>
                      <span style={{ color: ACCENT, fontWeight: 900, flexShrink: 0 }}>›</span>{b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.7, borderTop: "1px solid #e2e8f0", paddingTop: 20, marginTop: 8 }}>
            *Interest rates, sanction timelines, collateral requirements, and eligibility criteria are subject to lender policies, applicant profile, banking conduct, and financial assessment.
          </p>
        </div>
      </section>

      {/* CTA Strip */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, padding: "52px 5%", textAlign: "center" }}>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 10 }}>Ready to apply for Working Capital?</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>Our experts will find you the best deal from 50+ lenders</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "#fff", color: NAVY, padding: "12px 32px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>Apply Now →</a>
          <Link href="/contact" style={{ background: "transparent", color: "#fff", padding: "12px 32px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)" }}>Talk to an Advisor</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: "rgba(255,255,255,0.7)", padding: "36px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>BizzBuddy</div>
            <div style={{ fontSize: 12, marginBottom: 4 }}>by SDM Fintech</div>
            <div style={{ fontSize: 12 }}>📍 {FOOTER_CONTACT.address}</div>
          </div>
          <div>
            {FOOTER_CONTACT.phones.map((p) => <div key={p} style={{ fontSize: 13, marginBottom: 6 }}>📞 {p}</div>)}
            <div style={{ fontSize: 13 }}>📧 {FOOTER_CONTACT.email}</div>
          </div>
          <div>
            <div style={{ marginBottom: 8 }}><Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Home</Link></div>
            <div style={{ marginBottom: 8 }}><Link href="/contact" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Contact Us</Link></div>
            <div><Link href="/auth/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13 }}>Login</Link></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 28, paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
          © 2025 BizzBuddy by SDM Fintech. All rights reserved. | RBI Registered | MSME Certified
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div[style*="gridTemplateColumns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
