import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "car-loan",
  title: "Car Loan",
  icon: "🚗",
  tagline: "Drive home your dream car with easy EMIs",
  desc: "New car, pre-owned vehicle, or commercial vehicle — get the best car loan rates with quick approvals and up to 100% on-road financing from India's top banks and NBFCs.",
  color: "#fdf4ff",
  accent: "#7c3aed",
  border: "#e9d5ff",
  highlights: [
    { value: "8.75%+", label: "Rate p.a." },
    { value: "7 Yrs", label: "Max Tenure" },
    { value: "100%", label: "On-road Funding" },
    { value: "24 Hrs", label: "Approval" },
  ],
  features: [
    { icon: "🚘", title: "New & Pre-owned Cars", desc: "Loans available for brand new cars, certified pre-owned vehicles, and commercial vehicles." },
    { icon: "💯", title: "Up to 100% Financing", desc: "Get up to 100% on-road price financing including insurance, accessories, and registration." },
    { icon: "📉", title: "Low Interest Rates", desc: "Compare rates from leading banks like HDFC, ICICI, SBI, Axis and pick the best deal." },
    { icon: "⏱️", title: "Quick Processing", desc: "Same-day in-principle approval. Delivery of car without delays." },
    { icon: "🔄", title: "Flexible Repayment", desc: "Tenure from 12 to 84 months. Prepayment options available after lock-in period." },
    { icon: "📝", title: "Minimal Paperwork", desc: "Simple documentation process. Our team guides you through every step." },
  ],
  eligibility: [
    "Indian resident aged 21–65 years",
    "Salaried: Minimum income ₹20,000/month",
    "Self-employed: Minimum income ₹2 Lakh p.a.",
    "CIBIL score of 700 or above preferred",
    "Valid driving licence",
    "Stable employment or business for at least 1 year",
  ],
  documents: [
    "PAN Card & Aadhaar Card",
    "Latest salary slips (3 months) or ITR (2 years for self-employed)",
    "Bank statements (3–6 months)",
    "Car proforma invoice or booking receipt",
    "Passport size photographs",
    "Address proof (utility bill or passport)",
  ],
};

export default function CarLoanPage() {
  return <LoanPage config={config} />;
}
