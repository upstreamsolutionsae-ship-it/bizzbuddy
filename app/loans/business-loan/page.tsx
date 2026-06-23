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
    { q: "What types of business loans are available?", a: "We facilitate unsecured business term loans designed for MSMEs, self-employed professionals, and established businesses requiring growth capital without pledging collateral. These loans are typically offered for expansion, business development, technology upgrades, marketing initiatives, or general business requirements." },
    { q: "What is the eligibility criteria for a business loan?", a: "Eligibility depends on factors such as business vintage, turnover, profitability, credit score, banking conduct, GST profile, and overall repayment capacity as per lender policies." },
    { q: "What documents are required for a business loan?", a: "Common documents include PAN, Aadhaar, GST registration, bank statements, Income Tax Returns, audited financial statements, and proof of business existence." },
    { q: "What is the maximum loan amount available?", a: "Eligible businesses and professionals may access unsecured funding of up to ₹50 lakhs, subject to lender assessment and financial profile." },
    { q: "What is the repayment tenure for these business loans?", a: "Repayment tenure generally ranges from 3 to 5 years, allowing businesses to spread repayments through manageable monthly EMIs." },
    { q: "Is collateral required for these business loans?", a: "No. These are unsecured business loans and do not require property, fixed assets, or other collateral. Approval is based primarily on the financial strength of the business and borrower profile." },
    { q: "How is the interest rate determined?", a: "Interest rates are based on factors such as credit score, business performance, banking history, existing obligations, and lender-specific risk assessment criteria." },
    { q: "What can these business loans be used for?", a: "Unsecured business loans can be utilised for expansion, branch setup, hiring, marketing, technology investments, inventory purchases, operational expenses, debt consolidation, and other legitimate business needs." },
    { q: "How long does approval take?", a: "Approval timelines generally range from 24 hours to 7 working days, depending on documentation completeness and lender evaluation." },
    { q: "Can newly established businesses or startups apply?", a: "Selected lenders may consider startups and newer businesses, subject to minimum vintage requirements and assessment of financial viability." },
    { q: "What is a business loan EMI calculator?", a: "A business loan EMI calculator helps estimate monthly repayments based on the loan amount, applicable interest rate, and chosen tenure." },
    { q: "Can I increase my existing business loan limit?", a: "Borrowers with a strong repayment track record and improved financial performance may be eligible for top-up funding or enhanced limits, subject to lender approval." },
    { q: "Are there prepayment charges?", a: "Prepayment policies vary across lenders. Charges, if applicable, will depend on the specific lender's terms and conditions." },
    { q: "What factors affect business loan approval?", a: "Key factors include credit score, turnover trends, profitability, GST compliance, banking behaviour, existing liabilities, business stability, and repayment capacity." },
  ],
  seo: [
    {
      heading: "What is an Unsecured Business Loan?",
      body: "An unsecured business loan is a collateral-free financing solution offered by banks and NBFCs to eligible businesses and self-employed professionals. Unlike secured loans, these facilities do not require property or asset security. Funding is sanctioned based on the borrower's financial strength, credit profile, and business performance.",
    },
    {
      heading: "Key Features of Unsecured Business Loans",
      bullets: [
        "Collateral-free financing",
        "Loan amounts up to ₹50 lakhs",
        "Repayment tenure ranging from 3 to 5 years",
        "Quick approval and disbursement process",
        "Fixed monthly EMI structure",
        "Available to proprietorships, partnerships, LLPs, private limited companies, and eligible professionals",
        "Minimal documentation for eligible applicants",
        "Competitive interest rates based on borrower profile",
      ],
    },
    {
      heading: "Benefits of Unsecured Business Loans",
      bullets: [
        "Access business funding without pledging assets",
        "Support expansion and growth initiatives",
        "Preserve ownership of business assets and property",
        "Meet operational and strategic business requirements",
        "Predictable repayment through fixed EMIs",
        "Faster processing compared to many secured lending products",
        "Suitable for established MSMEs and self-employed professionals",
      ],
    },
  ],
  disclaimer: "*Interest rates, eligibility, loan amount, and approval timelines are subject to lender policies, business profile, turnover, credit score, and applicable terms & conditions.",
};

export default function BusinessLoanPage() {
  return <LoanPage config={config} />;
}
