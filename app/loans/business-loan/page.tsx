import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "business-loan",
  title: "Business Loan",
  icon: "🏢",
  tagline: "Fuel your MSME growth with the right financing",
  desc: "Working capital, term loans, machinery finance, bank guarantees — BizzBuddy connects MSMEs with 50+ banks and NBFCs for the best business loan solutions across India.",
  color: "#fff7ed",
  accent: "#c2410c",
  border: "#fed7aa",
  highlights: [
    { value: "11%+", label: "Rate p.a." },
    { value: "10 Yrs", label: "Max Tenure" },
    { value: "₹10 Cr", label: "Max Loan" },
    { value: "48 Hrs", label: "In-principle" },
  ],
  features: [
    { icon: "🏭", title: "MSME Expertise", desc: "Built by ex-bankers with 15+ years of MSME lending experience across PSU and private sector banks." },
    { icon: "🔓", title: "Secured & Unsecured", desc: "Options for both secured loans (against property or assets) and unsecured working capital loans." },
    { icon: "📊", title: "Multiple Products", desc: "Working capital, term loans, MUDRA loans, bank guarantees, LCs, overdraft, and machinery finance." },
    { icon: "🤖", title: "AI Matching", desc: "Our AI scores your business profile and matches it to lenders most likely to approve your loan." },
    { icon: "📋", title: "Documentation Support", desc: "We handle CMA data, projection reports, and all bank documentation — end-to-end." },
    { icon: "🌍", title: "Pan-India Network", desc: "Access to 50+ banks and NBFCs across India for best approval chances and competitive rates." },
  ],
  eligibility: [
    "Indian MSME / business entity (proprietorship, partnership, LLP, Pvt Ltd)",
    "Business vintage of at least 2–3 years",
    "Annual turnover as per bank requirements (varies by lender)",
    "CIBIL / CRIF score of 650+ for promoters",
    "GST registration and ITR filing up to date",
    "Positive cash flow and profitability track record",
  ],
  documents: [
    "PAN Card of firm and all promoters",
    "GST registration certificate",
    "Last 2–3 years ITR and audited financials",
    "Bank statements for last 12 months",
    "KYC documents of all directors / partners",
    "Business proof: Shop Act, MOA/AOA, Partnership deed, etc.",
    "Property documents (for secured loans)",
  ],
};

export default function BusinessLoanPage() {
  return <LoanPage config={config} />;
}
