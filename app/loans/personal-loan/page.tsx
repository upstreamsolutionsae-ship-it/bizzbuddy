import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "personal-loan",
  title: "Personal Loan",
  icon: "👤",
  tagline: "Quick personal loans for every financial need",
  desc: "Whether it's a medical emergency, travel, wedding, education, or home renovation — get a personal loan with minimal documentation and no collateral required.",
  color: "#f0fdf4",
  accent: "#15803d",
  border: "#bbf7d0",
  highlights: [
    { value: "Lowest ROI*", label: "Guaranteed" },
    { value: "7 Yrs", label: "Max Tenure" },
    { value: "₹50 Lakh", label: "Loan Amount" },
    { value: "24 Hrs*", label: "Quick Approval" },
  ],
  features: [
    { icon: "🚀", title: "Quick Disbursal*", desc: "Loan disbursal may happen within 24–48 hours after approval, subject to lender policies." },
    { icon: "🏷️", title: "No Collateral or Security Required", desc: "Completely unsecured loan — no need to pledge any asset or security." },
    { icon: "🎯", title: "Any Purpose", desc: "Use for medical bills, wedding expenses, travel, education, home renovation, or anything else." },
    { icon: "💳", title: "Flexible EMI Options", desc: "Choose a repayment tenure from 12 to 84 months based on your eligibility and repayment capacity." },
    { icon: "📱", title: "Simple Application", desc: "Apply online in minutes. Our team guides you through every step." },
    { icon: "🌐", title: "50+ Banks & NBFC Partners", desc: "Compare offers from multiple banks and NBFCs to get the best rate for your profile." },
  ],
  eligibility: [
    "Indian resident aged 21–60 years",
    "Minimum monthly income criteria may vary by lender, city, employer profile, and applicant category",
    "Minimum work experience requirements may vary by lender",
    "A credit score of 700+ may improve approval chances and help secure better interest rates",
    "Valid bank account with regular income credit history",
  ],
  documents: [
    "PAN Card and Aadhaar Card (KYC Documents)",
    "Latest 3 months' salary slips (for salaried applicants)",
    "Latest Form 16, ITR, or audited financial documents, as applicable",
    "Bank statements for last 3 months",
    "Passport size photographs",
    "Employment proof or official ID card",
  ],
  faqs: [
    { q: "What is a personal loan?", a: "A personal loan is an unsecured loan offered by banks and NBFCs that can be used for medical emergencies, weddings, travel, education, home renovation, debt consolidation, or other personal expenses." },
    { q: "What is the interest rate for personal loans?", a: "Personal loan interest rates generally start from around 9.99% p.a. and vary depending on your credit score, income, employer profile, loan amount, and lender policies." },
    { q: "What is the maximum loan amount I can get?", a: "Eligible applicants may get personal loans ranging from ₹50,000 up to ₹50 lakh, depending on income, repayment capacity, and lender eligibility." },
    { q: "Do I need collateral or security for a personal loan?", a: "No. Personal loans are unsecured loans and generally do not require collateral, property mortgage, or guarantors." },
    { q: "How long does loan approval take?", a: "Many lenders provide approvals within 24 to 48 hours, subject to document verification and eligibility checks." },
    { q: "What is the repayment tenure for personal loans?", a: "Personal loan repayment tenure usually ranges from 12 months to 84 months depending on the lender and borrower eligibility." },
    { q: "Can self-employed individuals apply for a personal loan?", a: "Yes. Self-employed professionals, business owners, consultants, and freelancers can apply subject to income and eligibility criteria." },
    { q: "What documents are required for a personal loan?", a: "Generally required documents include PAN card, Aadhaar card, income proof, salary slips or ITR, bank statements, and address proof." },
    { q: "Will applying for a personal loan affect my credit score?", a: "A loan application may result in a credit inquiry. Timely EMI repayment can help improve your credit score over time." },
    { q: "Can I prepay or foreclose my personal loan?", a: "Yes. Most lenders allow part-prepayment or foreclosure after a certain period, subject to applicable lender charges." },
    { q: "Are there any hidden charges in personal loans?", a: "Lenders may charge processing fees, late payment penalties, foreclosure charges, or GST as applicable. Applicants should review lender terms carefully." },
    { q: "How is personal loan eligibility calculated?", a: "Eligibility is usually based on income, employment type, credit score, repayment history, existing EMIs, and employer category." },
  ],
  seo: [
    {
      heading: "What is a Personal Loan?",
      body: "A personal loan is an unsecured financial product offered by banks and NBFCs to help individuals meet planned or urgent expenses without pledging collateral. Personal loans can be used for weddings, medical emergencies, education, travel, home renovation, debt consolidation, or other personal needs. These loans generally come with fixed EMIs, flexible repayment tenure, and quick disbursal.",
    },
    {
      heading: "Features of Personal Loans",
      bullets: [
        "No collateral or property mortgage required",
        "Quick approval and fast disbursal",
        "Flexible repayment tenure up to 84 months",
        "Loan amounts up to ₹50 lakh",
        "Minimal documentation process",
        "Fixed EMI repayment structure",
        "Available for salaried and self-employed applicants",
      ],
    },
    {
      heading: "Benefits of Taking a Personal Loan",
      body: "Personal loans help individuals manage urgent expenses without liquidating investments or borrowing informally. They offer predictable EMI repayment, flexible loan amounts, and easy online application processes. Borrowers with strong credit profiles may also get competitive interest rates and higher eligibility.",
    },
    {
      heading: "Eligibility for Personal Loan",
      body: "Eligibility for a personal loan depends on factors such as monthly income, employment stability, credit score, age, city category, and existing liabilities. Salaried employees, self-employed professionals, consultants, and business owners can apply based on lender-specific criteria.",
    },
    {
      heading: "Documents Required for Personal Loan",
      body: "Applicants generally need PAN card, Aadhaar card, bank statements, salary slips or ITR documents, address proof, and passport-size photographs while applying for a personal loan.",
    },
    {
      heading: "How to Apply for a Personal Loan Online?",
      body: "Applicants can apply online by filling out a loan application form, uploading KYC and income documents, completing verification, comparing lender offers, and selecting the best available loan option based on eligibility and interest rates.",
    },
    {
      heading: "Factors Affecting Personal Loan Interest Rates",
      body: "Personal loan interest rates depend on multiple factors such as credit score, monthly income, employer category, existing EMIs, repayment history, loan amount, and overall financial profile.",
    },
  ],
  disclaimer: "*Interest rates, approval timelines, eligibility, and disbursal timelines are subject to lender policies, applicant profile, and verification.",
};

export default function PersonalLoanPage() {
  return <LoanPage config={config} />;
}
