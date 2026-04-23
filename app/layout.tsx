import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "BizzBuddy | Your Growth Partner for MSMEs – Built by Bankers",
  description: "BizzBuddy by SDM Fintech – Debt, Equity, Advisory & Analytics for MSMEs. Apply for business loans, get financial health check, connect with investors.",
  keywords: "MSME loan, business loan, SME finance, equity funding, financial advisory, DSA partner, working capital",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
