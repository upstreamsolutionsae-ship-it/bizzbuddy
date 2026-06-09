import InvestmentPage, { type InvestConfig } from "@/components/InvestmentPage";

const config: InvestConfig = {
  key: "insurance",
  title: "Insurance Plans",
  icon: "🛡️",
  tagline: "Protect your family, health, and assets",
  desc: "Life, health, auto, and term insurance solutions from leading insurers — compare and buy with expert advice and claim assistance.",
  features: ["Term plans from ₹500/month", "Health cover for family", "Auto & asset protection", "Claim assistance support"],
  color: "#fdf4ff",
  border: "#e9d5ff",
  accent: "#7c3aed",
  fields: [
    { kind: "select", name: "insuranceType", placeholder: "Insurance Type", options: ["Health", "Auto", "Life", "Any other"], specifyOn: "Any other" },
  ],
};

export default function InsurancePage() {
  return <InvestmentPage config={config} />;
}
