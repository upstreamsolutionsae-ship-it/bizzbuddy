// Central site-wide configuration.
// Update social media URLs and lead categories here — they are reused across the whole site.

/**
 * Social media links shown in footers.
 * URLs will be shared by the client later. Until a real URL is provided, leave it as ""
 * (the icon will render but stay non-clickable, so no wrong link is ever published).
 * Simply paste the real URL in the matching `href` to make the icon live everywhere.
 */
export type SocialLink = { key: string; label: string; title: string; href: string };

export const SOCIAL_LINKS: SocialLink[] = [
  { key: "facebook", label: "f", title: "Facebook", href: "" },
  { key: "linkedin", label: "in", title: "LinkedIn", href: "" },
  { key: "instagram", label: "📷", title: "Instagram", href: "" },
  { key: "twitter", label: "X", title: "Twitter / X", href: "" },
  { key: "youtube", label: "▶", title: "YouTube", href: "" },
];

/**
 * Master list of lead categories. Every form submission saves one of these in `category`
 * so the backend/admin can identify the lead source/service. Keep in sync with the admin filter.
 */
export const LEAD_CATEGORIES = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Working Capital",
  "Loan Against Property",
  "Raise Equity",
  "GST Registration",
  "LEI Certificate",
  "UDYAM Registration",
  "Loan Documentation Service",
  "Other Documentation Service",
  "Credit Advisory",
  "Financial Health Check",
  "Partner Registration",
  "Investment Enquiry",
  "General Enquiry",
] as const;

export type LeadCategory = (typeof LEAD_CATEGORIES)[number];

/** The 5 fundable loan/fund types, plus Raise Equity — used in "Type of Funds" dropdowns. */
export const FUND_TYPES = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Working Capital",
  "Loan Against Property",
  "Raise Equity",
] as const;

/** Strictly loan-only list (no Raise Equity) for loan-specific dropdowns. */
export const LOAN_TYPES_LIST = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Working Capital",
  "Loan Against Property",
] as const;
