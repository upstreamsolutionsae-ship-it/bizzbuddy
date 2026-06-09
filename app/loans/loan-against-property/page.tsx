import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "loan-against-property",
  title: "Loan Against Property",
  icon: "🏗️",
  tagline: "Unlock the value of your property with secured financing",
  desc: "Use your residential, commercial, industrial, or selected special-category properties to raise funds for business expansion, working capital, balance transfer to lower ROI and easier repayment terms, debt consolidation, education, medical needs, or other financial requirements.",
  color: "#fefce8",
  accent: "#b45309",
  border: "#fde68a",
  highlights: [
    { value: "Lowest ROI*", label: "Guaranteed" },
    { value: "Up to 20 Yrs", label: "Tenure" },
    { value: "₹100 Cr*", label: "Loan Amount" },
    { value: "Quick*", label: "Approval & Processing" },
  ],
  features: [
    { icon: "🏠", title: "Residential, Commercial & Industrial Properties", desc: "Funding available against self-occupied, rented, leased, commercial, industrial, and selected special-category properties." },
    { icon: "💵", title: "Higher Loan Eligibility", desc: "Avail funding up to 70–75% of eligible property value, subject to lender norms and property category." },
    { icon: "📉", title: "Competitive Interest Rates", desc: "Loan Against Property generally offers lower interest rates compared to unsecured business or personal loans." },
    { icon: "📅", title: "Flexible Repayment Tenure", desc: "Flexible repayment tenure with structured EMI options based on loan profile and lender policy." },
    { icon: "🎯", title: "Multi-Purpose Funding", desc: "Use LAP for business expansion, working capital, balance transfer, debt consolidation, education, medical emergencies, or other financial requirements." },
    { icon: "⚡", title: "Quick Legal & Technical Evaluation", desc: "Legal and technical verification support through empanelled agencies and lender partners." },
  ],
  eligibility: [
    "Resident Indian applicants aged generally between 21–70 years, subject to lender policy",
    "Clear and acceptable property title with complete ownership documents required",
    "Minimum income eligibility varies by lender, city, property type, and applicant profile",
    "Business vintage, turnover, banking conduct, and income profile are considered for self-employed applicants",
    "A stronger credit score and repayment history may improve approval chances and pricing",
    "Property should generally be free from major legal disputes or title issues",
  ],
  documents: [
    "PAN Card, Aadhaar Card, and KYC documents of all applicants and property owners",
    "Latest ITR, financial statements, and income documents as applicable",
    "Latest bank statements for the last 6–12 months",
    "Complete property title documents and ownership chain papers",
    "Approved building plan and applicable property approvals, wherever required",
    "Latest municipal tax receipts and utility bills, wherever applicable",
  ],
  faqs: [
    { q: "What is a Loan Against Property (LAP)?", a: "A Loan Against Property is a secured loan where residential, commercial, or industrial property is mortgaged to obtain funding for business or personal financial requirements." },
    { q: "What is the interest rate for Loan Against Property?", a: "Loan Against Property interest rates generally range from 2.5% spread over RBI Repo rate to a spread of 4.5% and vary based on applicant profile, property type, loan amount, and lender policies." },
    { q: "What types of properties are accepted under LAP?", a: "Many lenders accept residential, commercial, industrial, rented, leased, and selected special-category properties subject to legal and technical approval." },
    { q: "How much loan can I get against my property?", a: "Eligible borrowers may get funding up to 70–75% of the eligible market value of the property depending on lender norms and property profile." },
    { q: "Can self-employed individuals apply for LAP?", a: "Yes. Business owners, professionals, traders, manufacturers, consultants, and self-employed individuals can apply subject to eligibility criteria." },
    { q: "What can Loan Against Property funds be used for?", a: "LAP can be used for business expansion, working capital, debt consolidation, education, medical emergencies, balance transfer, and other financial requirements." },
    { q: "What is the maximum tenure available for LAP?", a: "Many lenders offer repayment tenure up to 15–20 years depending on applicant age, profile, and loan structure." },
    { q: "Is balance transfer available in LAP?", a: "Yes. Existing Loan Against Property accounts may be transferred to another lender for better interest rates, higher eligibility, or top-up funding." },
    { q: "What documents are required for Loan Against Property?", a: "Applicants generally need KYC documents, income proof, bank statements, ITRs, property papers, and ownership documents." },
    { q: "Is legal and technical verification mandatory?", a: "Yes. Most lenders conduct legal and technical verification of the mortgaged property before sanctioning the loan." },
    { q: "Can rented properties be used for LAP?", a: "Yes. Many lenders provide LAP against rented or leased commercial and residential properties, subject to rental and ownership assessment." },
    { q: "Are there foreclosure or prepayment charges in LAP?", a: "Charges depend on lender policy and loan type. Floating-rate LAP loans for individuals may have lower or nil foreclosure charges in many cases." },
  ],
  seo: [
    {
      heading: "What is Loan Against Property?",
      body: "Loan Against Property (LAP) is a secured financing solution where borrowers mortgage residential, commercial, or industrial property to obtain funds for business or personal requirements. Since LAP is secured against property, it generally offers lower interest rates and higher loan eligibility compared to unsecured loans.",
    },
    {
      heading: "Features of Loan Against Property",
      bullets: [
        "Competitive interest rates",
        "Higher loan eligibility",
        "Long repayment tenure",
        "Funding against residential, commercial, and industrial properties",
        "Balance transfer and top-up options",
        "Multipurpose end usage",
        "Available for salaried and self-employed applicants",
      ],
    },
    {
      heading: "Benefits of Loan Against Property",
      body: "Loan Against Property helps individuals and businesses unlock the value of owned property without selling the asset. Borrowers can use LAP for business growth, working capital, debt consolidation, education, or medical requirements while continuing ownership of the property.",
    },
    {
      heading: "Types of Properties Accepted Under LAP",
      bullets: [
        "Residential property",
        "Commercial property",
        "Industrial property",
        "Rented property",
        "Leased property",
        "Selected special-category properties",
      ],
    },
    {
      heading: "Who Can Apply for Loan Against Property?",
      body: "Salaried employees, self-employed professionals, business owners, traders, manufacturers, LLPs, and companies may apply for Loan Against Property subject to lender eligibility criteria.",
    },
  ],
  disclaimer: "*Interest rates, eligibility, property acceptance, sanction timelines, and loan terms are subject to lender policies, legal verification, technical evaluation, and applicant profile.",
};

export default function LoanAgainstPropertyPage() {
  return <LoanPage config={config} />;
}
