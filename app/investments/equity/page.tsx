import InvestmentPage, { type InvestConfig } from "@/components/InvestmentPage";

const config: InvestConfig = {
  key: "equity",
  title: "Invest in Equity",
  icon: "📊",
  tagline: "Build long-term wealth through equity investments",
  desc: "Get expert guidance on investing in listed and unlisted equity opportunities, structured to your goals and risk appetite.",
  features: ["Listed & unlisted equity", "Expert-led opportunities", "Goal-based structuring", "Transparent advisory"],
  color: "#fef9ee",
  border: "#fde68a",
  accent: "#b45309",
  fields: [
    { kind: "text", name: "amount", placeholder: "Approx Amount to Invest (₹)" },
    { kind: "select", name: "investmentType", placeholder: "Investment Type", options: ["Listed", "Unlisted"] },
  ],
};

export default function EquityPage() {
  return <InvestmentPage config={config} />;
}
