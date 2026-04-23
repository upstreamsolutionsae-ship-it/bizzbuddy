import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "personal-loan",
  title: "Personal Loan",
  icon: "👤",
  tagline: "Instant funds for every personal need",
  desc: "Whether it is a medical emergency, travel, wedding, or higher education — get a personal loan quickly with minimal documentation and zero collateral required.",
  color: "#f0fdf4",
  accent: "#15803d",
  border: "#bbf7d0",
  highlights: [
    { value: "10.5%+", label: "Rate p.a." },
    { value: "7 Yrs", label: "Max Tenure" },
    { value: "₹50 L", label: "Max Loan" },
    { value: "24 Hrs", label: "Approval" },
  ],
  features: [
    { icon: "🚀", title: "Quick Disbursal", desc: "Funds disbursed within 24–48 hours after approval. Perfect for urgent financial needs." },
    { icon: "🏷️", title: "No Collateral Required", desc: "Completely unsecured loan — no need to pledge any asset or security." },
    { icon: "🎯", title: "Any Purpose", desc: "Use for medical bills, wedding expenses, travel, education, home renovation, or anything else." },
    { icon: "💳", title: "Flexible EMIs", desc: "Choose tenure from 12 to 84 months based on your repayment capacity." },
    { icon: "📱", title: "Simple Application", desc: "Apply online in minutes. Our team guides you through every step." },
    { icon: "🌐", title: "50+ Lenders", desc: "Compare offers from multiple banks and NBFCs to get the best rate for your profile." },
  ],
  eligibility: [
    "Indian resident aged 21–60 years",
    "Minimum monthly income of ₹20,000 (salaried) or ₹2.5 Lakh p.a. (self-employed)",
    "Employed for at least 6 months with current employer",
    "CIBIL score of 700+ for best rates",
    "Valid bank account with salary credit history",
  ],
  documents: [
    "PAN Card & Aadhaar Card (KYC)",
    "Latest 3 months' salary slips",
    "Bank statements for last 3 months",
    "Form 16 or latest ITR",
    "Passport size photographs",
    "Employment letter / office ID proof",
  ],
};

export default function PersonalLoanPage() {
  return <LoanPage config={config} />;
}
