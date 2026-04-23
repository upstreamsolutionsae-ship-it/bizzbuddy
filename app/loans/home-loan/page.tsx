import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "home-loan",
  title: "Home Loan",
  icon: "🏠",
  tagline: "Finance your dream home at the best rates",
  desc: "Get competitive home loan rates from 50+ banks and NBFCs. Whether you are buying your first home, constructing, or renovating — BizzBuddy connects you to the right lender fast.",
  color: "#eff6ff",
  accent: "#1565C0",
  border: "#bfdbfe",
  highlights: [
    { value: "8.5%+", label: "Rate p.a." },
    { value: "30 Yrs", label: "Max Tenure" },
    { value: "₹5 Cr", label: "Max Loan" },
    { value: "48 Hrs", label: "Approval" },
  ],
  features: [
    { icon: "💰", title: "Competitive Interest Rates", desc: "Access rates starting from 8.5% p.a. from 50+ lenders including leading PSU banks, private banks, and HFCs." },
    { icon: "📅", title: "Flexible Tenure", desc: "Choose repayment tenure from 5 to 30 years, tailored to your income and financial goals." },
    { icon: "🏗️", title: "All Property Types", desc: "Loans for ready-to-move apartments, under-construction projects, plots, and self-construction." },
    { icon: "📝", title: "Minimal Documentation", desc: "Our team simplifies paperwork. We help you gather and submit all documents correctly the first time." },
    { icon: "⚡", title: "Fast Processing", desc: "In-principle approval within 48 hours. Dedicated relationship manager assigned from day one." },
    { icon: "🔄", title: "Balance Transfer", desc: "Transfer your existing high-interest home loan to a lower-rate lender and save lakhs over tenure." },
  ],
  eligibility: [
    "Indian resident salaried or self-employed individual",
    "Age between 21–65 years (at loan maturity)",
    "Minimum income: ₹25,000/month (salaried) or ₹3 Lakh p.a. (self-employed)",
    "CIBIL score of 700 or above preferred",
    "Stable employment history of at least 2 years",
    "Clear title on the property being purchased/mortgaged",
  ],
  documents: [
    "PAN Card & Aadhaar Card",
    "Latest 3 months' salary slips (salaried) / ITR for 2 years (self-employed)",
    "Bank statements for last 6 months",
    "Form 16 or IT returns for 2 years",
    "Property documents / Agreement of Sale",
    "Passport size photographs",
  ],
};

export default function HomeLoanPage() {
  return <LoanPage config={config} />;
}
