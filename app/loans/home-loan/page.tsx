import LoanPage, { type LoanConfig } from "@/components/LoanPage";

const config: LoanConfig = {
  key: "home-loan",
  title: "Home Loan",
  icon: "🏠",
  tagline: "Finance your dream home at the best rates",
  desc: "Compare home loan offers from 50+ banks and NBFCs. Whether you're buying, constructing, renovating, or transferring your existing loan to lower ROI, BizzBuddy helps you find the right lender faster.",
  color: "#eff6ff",
  accent: "#1565C0",
  border: "#bfdbfe",
  highlights: [
    { value: "Best-in-class*", label: "Interest Rates" },
    { value: "30 Yrs", label: "Max Tenure" },
    { value: "Any Amount", label: "Loan Value" },
    { value: "24–48 Hrs", label: "Fast Approval" },
  ],
  features: [
    { icon: "💰", title: "Competitive Interest Rates", desc: "Access home loan at lowest interest rates with best deals from 50+ lenders including leading PSU banks, private banks, and HFCs." },
    { icon: "📅", title: "Flexible Tenure", desc: "Choose flexible repayment tenure from 5 to 30 years based on your income, age and financial goals." },
    { icon: "🏗️", title: "All Property Types", desc: "Financing is available for ready-to-move homes, under-construction properties, plot purchases, self-construction, and home renovation. If you have a property in mind, we have a lender for you." },
    { icon: "📝", title: "Minimal Documentation", desc: "Simplified documentation support with assistance in document collection, verification, and submission." },
    { icon: "⚡", title: "Fast Processing", desc: "Get faster in-principle approvals, often within 24–48 hours for eligible applicants." },
    { icon: "🔄", title: "Balance Transfer", desc: "Transfer your existing home loan to a lower-interest lender and reduce your EMI burden with better repayment terms." },
  ],
  eligibility: [
    "Indian resident — salaried, self-employed professional or any business owner",
    "Age between 21–65 years (at loan maturity)",
    "No minimum income requirement; regular cash income can also be considered",
    "Preferred CIBIL score of 650 or above",
    "Stable employment or business continuity",
    "Property should have clear legal and marketable title",
  ],
  documents: [],
  documentsHeading: "Documents Required – Salaried & Self-Employed Applicants",
  documentGroups: [
    {
      heading: "Self-Employed / Business Applicants",
      items: [
        "KYC documents of business entity and all applicants/co-applicants – PAN, Aadhaar, GST Registration, UDYAM, Incorporation Certificate, Partnership Deed/LLP Agreement/MOA-AOA, and shareholding or partner details, as applicable",
        "Last 2–3 years ITRs, Computation of Income, audited financial statements, Independent Audit Report, and Tax Audit Report of business entity and key applicants, wherever applicable",
        "Last 12 months bank statements of business accounts and individual applicants",
        "Latest GST returns / GSTR-3B for last 12 months, wherever applicable",
        "Existing loan sanction letters and repayment track, wherever applicable",
        "Complete property papers including title deed, ownership chain, approved sanction/building plan, and latest tax receipts",
      ],
    },
    {
      heading: "Salaried Applicants",
      items: [
        "KYC documents of all applicants/co-applicants – PAN Card and Aadhaar Card",
        "Last 2 years ITR and Computation of Income of all applicants",
        "Latest salary slips and Form 16 of main applicant",
        "Last 6–12 months salary account bank statements",
        "Complete property papers including ownership chain and approved property documents",
      ],
    },
  ],
  faqs: [
    { q: "What is the maximum home loan amount I can get?", a: "The maximum home loan amount depends on your income, repayment capacity, existing liabilities, property value, and credit score. Many lenders offer loans ranging from ₹5 lakh to ₹50 crore or more for eligible applicants." },
    { q: "What is the minimum credit score required for a home loan?", a: "Most lenders prefer a CIBIL score of 700 or above for better approval chances and competitive interest rates." },
    { q: "What documents are required for a home loan application?", a: "Commonly required documents include PAN Card, Aadhaar Card, income proof, bank statements, property documents, photographs, and employment/business proof." },
    { q: "How is the home loan EMI calculated?", a: "Home loan EMI is calculated based on the loan amount, interest rate, and repayment tenure selected by the borrower." },
    { q: "What is the maximum tenure for a home loan?", a: "Most lenders offer repayment tenure up to 30 years depending on the applicant's age and eligibility." },
    { q: "Can I prepay my home loan? Are there charges?", a: "Yes, most lenders allow home loan prepayment. Floating-rate home loans usually have no prepayment charges for individual borrowers." },
    { q: "What is the difference between fixed and floating interest rates?", a: "Fixed interest rates remain constant during the loan tenure, while floating rates change based on market conditions and lender benchmark rates." },
    { q: "Can I apply for a joint home loan with my spouse?", a: "Yes, most lenders allow joint home loans with spouse, parents, or close family members, subject to eligibility criteria." },
    { q: "What is Pre-EMI and how does it work?", a: "Pre-EMI is the interest paid on the disbursed loan amount before the full home loan amount is released, commonly applicable for under-construction properties." },
    { q: "What types of properties are eligible for home loans?", a: "Home loans are available for ready-to-move properties, under-construction homes, plots, self-construction projects, and home renovation cases." },
    { q: "How much down payment is required?", a: "Most lenders finance up to 75%–90% of the property value. The remaining amount must be paid by the borrower as down payment." },
    { q: "Can I get tax benefits on home loans?", a: "Yes, eligible borrowers can claim tax benefits on principal and interest payments under applicable sections of the Income Tax Act." },
    { q: "What is the home loan processing time?", a: "Home loan approval timelines generally range between 24 hours to 7 working days depending on the lender and documentation." },
    { q: "Can I transfer my home loan to another bank?", a: "Yes, you can transfer your existing home loan to another lender for lower interest rates or better repayment terms through a balance transfer facility." },
    { q: "What happens if I default on home loan payments?", a: "Missing EMIs may impact your credit score and can lead to penalties or legal recovery actions by the lender." },
  ],
  seo: [
    {
      heading: "What is a Home Loan?",
      body: "A home loan is a secured loan offered by banks and financial institutions to help individuals purchase, construct, renovate, or transfer residential property. The borrower repays the loan amount through monthly EMIs over a fixed tenure.",
    },
    {
      heading: "Home Loan Features",
      bullets: [
        "Interest rates starting from 1.9% spread over RBI repo rate",
        "Loan tenure up to 30 years",
        "Balance transfer facility available",
        "Loans from 50+ banks and NBFCs",
        "Quick approval process",
        "Flexible EMI repayment options",
      ],
    },
    {
      heading: "Benefits of Home Loan",
      bullets: [
        "Helps purchase your dream home without full upfront payment",
        "Tax benefits on principal and interest payments",
        "Flexible repayment tenure",
        "Option for balance transfer at lower rates",
        "Higher loan eligibility for joint applicants",
      ],
    },
    {
      heading: "Home Loan Interest Rates in India",
      body: "Home loan interest rates in India generally start from 1.9% spread over RBI Repo rate and vary based on credit score, income profile, employment type, loan amount, and lender policies. These rates are linked to the RBI repo rate and change in line with RBI-announced changes in the repo rate.",
    },
  ],
  disclaimer: "Interest rates, loan eligibility, approval timelines, and loan amount are subject to lender policies, applicant profile, credit score, and applicable terms & conditions.",
};

export default function HomeLoanPage() {
  return <LoanPage config={config} />;
}
