import InvestmentPage, { type InvestConfig } from "@/components/InvestmentPage";

const config: InvestConfig = {
  key: "mutual-funds",
  title: "Mutual Funds",
  icon: "📈",
  tagline: "Grow your wealth through professionally managed funds",
  desc: "Invest in equity, debt, hybrid, or liquid funds. Get expert guidance on fund selection based on your goals and risk appetite — through SIP (monthly) or lumpsum.",
  features: ["SIP starting ₹500/month", "3000+ fund options", "Expert-guided selection", "Tax-saving ELSS options"],
  color: "#eff6ff",
  border: "#bfdbfe",
  accent: "#1565C0",
  fields: [
    { kind: "select", name: "goal", placeholder: "Investment Goal", options: ["Wealth Creation", "Retirement Planning", "Children's Education", "Tax Saving", "Emergency Fund", "Other"] },
    { kind: "select", name: "amount", placeholder: "Investment Amount (approx.)", options: ["Under ₹1 Lakh", "₹1–5 Lakh", "₹5–25 Lakh", "₹25 Lakh–1 Cr", "₹1 Cr+"] },
    { kind: "select", name: "investmentType", placeholder: "Investment Type", options: ["Lumpsum", "Monthly"] },
  ],
};

export default function MutualFundsPage() {
  return <InvestmentPage config={config} />;
}
