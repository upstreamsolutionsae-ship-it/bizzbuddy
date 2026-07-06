import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/SessionProvider";

// Resolve the live site URL so shared links (WhatsApp, LinkedIn, etc.) load the logo
// preview from an absolute URL. Override anytime by setting NEXT_PUBLIC_SITE_URL.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://bizzbuddy.vercel.app");

const title = "BizzBuddy | Your Growth Partner for MSMEs – Built by Bankers";
const description =
  "BizzBuddy by SDM Fintech – Debt, Equity, Advisory & Analytics for MSMEs. Apply for business loans, get financial health check, connect with investors.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords:
    "MSME loan, business loan, SME finance, equity funding, financial advisory, DSA partner, working capital",
  openGraph: {
    type: "website",
    siteName: "BizzBuddy",
    url: siteUrl,
    title,
    description,
    images: [
      {
        url: "/bizzbuddy-logo.png",
        width: 282,
        height: 235,
        alt: "BizzBuddy — Growth Partner for MSMEs",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/bizzbuddy-logo.png"],
  },
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
