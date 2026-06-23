import InvestmentPage, { type InvestConfig } from "@/components/InvestmentPage";

const config: InvestConfig = {
  key: "fixed-deposits",
  title: "Fixed Deposits",
  icon: "🔒",
  tagline: "Safe, guaranteed returns for your idle cash",
  desc: "Compare FD rates from leading banks and NBFCs. Book the highest-yielding FDs with full safety and flexible tenure options.",
  features: ["Attractive interest rates", "7 days to 10 year tenure", "Senior citizen extra rate", "TDS management support"],
  color: "#f0fdf4",
  border: "#bbf7d0",
  accent: "#15803d",
  fields: [
    { kind: "text", name: "amount", placeholder: "Approx Amount (₹)" },
    { kind: "select", name: "tenor", placeholder: "Select Tenure", options: ["0–6 months", "6 months to 12 months", "12 to 18 months", "18 to 36 months", "36+ months"] },
  ],
};

export default function FixedDepositsPage() {
  return <InvestmentPage config={config} />;
}
