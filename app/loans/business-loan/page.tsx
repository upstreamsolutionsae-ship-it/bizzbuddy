import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "business-loan",
  title: "Business Loan",
  icon: "🏢",
  tagline: "Fuel your business growth with tailored MSME financing solutions",
  desc: "Compare business loan offers from 50+ banks and NBFCs for working capital, machinery finance, term loans, overdraft facilities, and MSME growth funding across India.",
  color: "#ecfeff",
  accent: "#0e7490",
  border: "#a5f3fc",
  highlights: [
    { value: "Lowest ROI*", label: "Guaranteed" },
    { value: "Up to 5 Yrs", label: "Tenure" },
    { value: "₹50 Lakh", label: "Loan Amount" },
    { value: "48–72 Hrs*", label: "In-principle" },
  ],
  features: [
    { icon: "🏭", title: "MSME Expertise", desc: "MSME-focused advisory support with experience across PSU banks, private banks, and NBFC lending solutions." },
    { icon: "🔓", title: "Unsecured Funding", desc: "Access unsecured business loan options based on your business profile, turnover, and funding requirements." },
    { icon: "🤖", title: "AI-Enabled Matching", desc: "Our AI-enabled platform evaluates your business profile and helps match you with suitable lending partners." },
    { icon: "📋", title: "Documentation Support", desc: "End-to-end assistance for CMA reports, financial projections, and lender documentation requirements." },
    { icon: "🌍", title: "Pan-India Network", desc: "Access multiple banks and NBFCs across India for competitive business loan solutions." },
  ],
  eligibility: [
    "All business entities, including proprietorships, partnerships, LLPs, and private/public limited companies",
    "Business operational history of at least 2 years preferred",
    "Minimum turnover and profitability as per lender eligibility criteria",
    "Preferred CIBIL / CRIF score of 650 or above for promoters",
    "GST registration and ITR filing up to date",
    "Stable cash flow and business repayment capacity preferred",
  ],
  documents: [
    "PAN Card of business entity and all promoters/directors",
    "Last 2–3 years ITR documents and audited financial statements",
    "KYC documents of all promoters, directors, or partners",
    "Business registration proof such as GST certificate, Shop Act, MOA/AOA, or Partnership Deed",
    "Bank statements for last 12 months",
  ],
  faqs: [
    { q: "What types of business loans are available?", a: "Business loans include working capital loans, term loans, machinery finance, overdraft facilities, MUDRA loans, invoice financing, LAP, and trade finance solutions." },
    { q: "What is the eligibility criteria for a business loan?", a: "Eligibility depends on business vintage, turnover, profitability, credit score, banking history, and repayment capacity as per lender policies." },
    { q: "What documents are required for a business loan?", a: "Common documents include PAN, Aadhaar, GST certificate, bank statements, ITRs, audited financials, and business registration proof." },
    { q: "What is the maximum loan amount available for businesses?", a: "Loan eligibility depends on business turnover, profitability, collateral, and lender policies. Eligible businesses may access funding up to ₹50 lakh." },
    { q: "What is the repayment tenure for business loans?", a: "Business loan tenure generally ranges from 12 months to 15 years depending on loan type and collateral." },
    { q: "Is collateral required for business loans?", a: "Secured business loans require collateral, while many unsecured business loans are available without collateral for eligible businesses." },
    { q: "How is business loan interest calculated?", a: "Interest is calculated based on loan amount, tenure, business risk profile, credit score, and lender benchmark rates." },
    { q: "What can business loans be used for?", a: "Business loans can be used for working capital, expansion, machinery purchase, inventory management, operations, hiring, and infrastructure development." },
    { q: "How long does business loan approval take?", a: "Approval timelines generally range from 24 hours to 7 working days depending on documentation and lender evaluation." },
    { q: "Can startups get business loans?", a: "Yes, startups may qualify for selected business loans or government-backed MSME schemes subject to eligibility and financial profile." },
    { q: "What is a business loan EMI calculator?", a: "A business loan EMI calculator helps estimate monthly EMI payments based on loan amount, interest rate, and repayment tenure." },
    { q: "Can business loan limits be increased?", a: "Existing borrowers with strong repayment history and improved financial performance may apply for enhanced loan limits." },
    { q: "What is the Flexi facility in business loans?", a: "Flexi loan facilities allow borrowers to withdraw and repay funds within an approved limit, helping manage cash flow efficiently." },
    { q: "Are there prepayment charges on business loans?", a: "Prepayment charges depend on lender policies, loan type, and whether the loan is secured or unsecured." },
    { q: "What factors affect business loan approval?", a: "Key factors include credit score, turnover, profitability, GST filing, banking history, existing liabilities, and repayment capacity." },
  ],
  seo: [
    {
      heading: "What is a Business Loan?",
      body: "A business loan is a financing solution offered by banks and NBFCs to help businesses manage working capital, expansion, machinery purchase, operations, inventory, or growth requirements.",
    },
    {
      heading: "Business Loan Features",
      bullets: [
        "Interest rates on unsecured business loans usually range from 14% to 19% depending on the lending bank and borrower profile",
        "Loan amount up to ₹50 lakh or more",
        "Secured and unsecured loan options",
        "Flexible repayment tenure",
        "Quick approval process",
        "Multiple MSME financing products",
      ],
    },
    {
      heading: "Benefits of Business Loan",
      bullets: [
        "Supports business expansion and operations",
        "Improves working capital management",
        "Flexible EMI repayment options",
        "Quick access to business funding",
        "Available for multiple business structures",
      ],
    },
    {
      heading: "Business Loan Interest Rates in India",
      body: "Business loan interest rates in India generally start from 14.0%* and vary based on business profile, turnover, profitability, collateral, and credit score.",
    },
  ],
  disclaimer: "*Interest rates, eligibility, loan amount, and approval timelines are subject to lender policies, business profile, turnover, credit score, and applicable terms & conditions.",
};

export default function BusinessLoanPage() {
  return <LoanPage config={config} />;
}
