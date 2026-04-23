import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "loan-against-property",
  title: "Loan Against Property",
  icon: "🏗️",
  tagline: "Unlock the hidden value in your property",
  desc: "Use your residential or commercial property as collateral to meet large financial requirements — business expansion, education, debt consolidation, or any other purpose — at competitive rates.",
  color: "#fefce8",
  accent: "#b45309",
  border: "#fde68a",
  highlights: [
    { value: "9.5%+", label: "Rate p.a." },
    { value: "20 Yrs", label: "Max Tenure" },
    { value: "₹25 Cr", label: "Max Loan" },
    { value: "72 Hrs", label: "Approval" },
  ],
  features: [
    { icon: "🏠", title: "Residential & Commercial", desc: "Mortgage against self-occupied, rented, or commercial properties including shops and offices." },
    { icon: "💵", title: "High Loan Amount", desc: "Access up to 70–75% of property market value from leading lenders, up to ₹25 Crore." },
    { icon: "📉", title: "Lower Rates", desc: "Significantly lower interest rates compared to unsecured loans — because the loan is secured." },
    { icon: "📅", title: "Long Tenure", desc: "Comfortable repayment period of up to 20 years to keep EMIs manageable." },
    { icon: "🎯", title: "Multipurpose Use", desc: "Business expansion, working capital, education, medical, wedding — use funds for any purpose." },
    { icon: "⚡", title: "Fast Valuation", desc: "Technical and legal valuation arranged quickly through our partner network of valuers." },
  ],
  eligibility: [
    "Indian resident aged 21–70 years (at loan maturity)",
    "Clear title of the property offered as collateral",
    "Salaried: Minimum ₹30,000/month income",
    "Self-employed / business: Minimum ₹3 Lakh p.a. net income",
    "CIBIL score 650+ preferred",
    "No pending litigation on the property",
  ],
  documents: [
    "PAN Card & Aadhaar Card of all owners",
    "Last 2–3 years ITR and financial statements",
    "Bank statements for last 12 months",
    "Property title deed and chain of ownership documents",
    "Approved building plan (for residential / commercial structure)",
    "Municipal tax receipts (latest)",
    "KYC documents of all co-applicants",
  ],
};

export default function LoanAgainstPropertyPage() {
  return <LoanPage config={config} />;
}
