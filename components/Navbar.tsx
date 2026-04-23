"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NAVY = "#0f2d5e";
const BLUE = "#1565C0";
const LIGHT_BG = "#ffffff";

const NAV_ITEMS = [
  {
    label: "Loans",
    href: "#",
    dropdown: [
      { label: "Home Loan", href: "/loans/home-loan" },
      { label: "Personal Loan", href: "/loans/personal-loan" },
      { label: "Business Loan", href: "/loans/business-loan" },
      { label: "Car Loan", href: "/loans/car-loan" },
      { label: "Loan Against Property", href: "/loans/loan-against-property" },
    ],
  },
  {
    label: "Investments/Insurance",
    href: "/investments",
    dropdown: [
      { label: "Mutual Funds", href: "/investments#mutual-funds" },
      { label: "Fixed Deposits", href: "/investments#fixed-deposits" },
      { label: "Insurance Plans", href: "/investments#insurance" },
      { label: "Portfolio Management", href: "/investments#portfolio" },
    ],
  },
  { label: "Become Our Partner", href: "/become-our-partner" },
  {
    label: "Our Services",
    href: "/our-services",
    dropdown: [
      { label: "Financial Advisory", href: "/financial-health-check" },
      { label: "Loan Assistance", href: "/our-services#loan-assistance" },
      { label: "Credit Improvement", href: "/our-services#credit" },
      { label: "Documentation Support", href: "/our-services#documentation" },
    ],
  },
  {
    label: "Tools",
    href: "#",
    dropdown: [
      { label: "Eligibility Check", href: "/tools/eligibility" },
      { label: "EMI Calculator", href: "/tools/emi-calculator" },
      { label: "Currency Converter", href: "/tools/currency-converter" },
      { label: "IFSC Locator", href: "/tools/ifsc-locator" },
      { label: "Today's Gold Price", href: "/tools/gold-price" },
    ],
  },
  { label: "Credit Report", href: "/credit-report" },
  { label: "Free Financial Health Check", href: "/financial-health-check" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        background: LIGHT_BG,
        borderBottom: "1px solid #e2e8f0",
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      {/* LOGO */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f4ff",
            border: "2px solid #bfdbfe",
            flexShrink: 0,
          }}
        >
          {/* Placeholder until real logo provided */}
          <span style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>B</span>
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: NAVY }}>BizzBuddy</div>
          <div style={{ fontSize: 10, color: "#94a3b8", marginTop: -2 }}>by SDM Fintech</div>
        </div>
      </Link>

      {/* DESKTOP NAV */}
      <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "nowrap" }}>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{ position: "relative" }}
            onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {item.dropdown ? (
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#374151",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "8px 10px",
                  borderRadius: 6,
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
                <span style={{ fontSize: 9, marginTop: 1 }}>▼</span>
              </button>
            ) : (
              <Link
                href={item.href}
                style={{
                  color: item.label === "Free Financial Health Check" ? BLUE : "#374151",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: item.label === "Free Financial Health Check" ? 600 : 500,
                  padding: "8px 10px",
                  borderRadius: 6,
                  display: "block",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            )}

            {/* Dropdown */}
            {item.dropdown && openDropdown === item.label && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  minWidth: 200,
                  zIndex: 200,
                  overflow: "hidden",
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                {item.dropdown.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 18px",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      borderLeft: "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#f0f7ff";
                      (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = BLUE;
                      (e.currentTarget as HTMLAnchorElement).style.color = BLUE;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                    }}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>→</span>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* LOGIN BUTTON */}
        <Link
          href="/auth/login"
          style={{
            background: NAVY,
            color: "#fff",
            padding: "9px 20px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            marginLeft: 8,
            whiteSpace: "nowrap",
          }}
        >
          Login
        </Link>
      </div>

      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 24,
          color: NAVY,
          padding: 4,
        }}
        aria-label="Toggle menu"
        className="mobile-hamburger"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 999,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid #f1f5f9" }}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setOpenMobileItem(openMobileItem === item.label ? null : item.label)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "14px 5%",
                      textAlign: "left",
                      fontSize: 14,
                      fontWeight: 600,
                      color: NAVY,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.label}
                    <span>{openMobileItem === item.label ? "▲" : "▼"}</span>
                  </button>
                  {openMobileItem === item.label && (
                    <div style={{ background: "#f8fafc", paddingLeft: "8%" }}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: "block", padding: "11px 5%", color: "#374151", textDecoration: "none", fontSize: 13, borderBottom: "1px solid #e2e8f0" }}
                        >
                          → {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: "block", padding: "14px 5%", color: NAVY, textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div style={{ padding: "14px 5%" }}>
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", background: NAVY, color: "#fff", padding: "12px 20px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}
            >
              Login
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .mobile-hamburger { display: block !important; }
          nav > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
