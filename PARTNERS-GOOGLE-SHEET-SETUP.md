# Channel Partner Registrations → Google Sheet (Backend Excel)

Channel-partner sign-ups from **/become-our-partner** are stored in their **own tab**
("Partners") in the same Google Sheet that already holds your marketing Leads — so you
get a clean, separate Excel of everyone who applies to become a channel partner.

## How it works
- The website form posts to `/api/partners`.
- That route forwards the registration to the same Apps Script Web App as leads, tagged
  with `sheet: "Partners"`, so it lands on a separate **Partners** tab.
- View & manage them in the site admin at **/admin/partners** (search, filter by partner
  type, change status: New → Contacted → Onboarded → Active → Rejected).

## One-time setup (already using the Leads sheet)
You only need to update the Apps Script — no new webhook or env var required.

1. Open your Leads Google Sheet → **Extensions → Apps Script**.
2. Select all the existing code and replace it with the latest
   `google-apps-script/leads-sheet.gs` from this project (it now handles both tabs).
3. **Save**, then **Deploy → Manage deployments → (pencil/Edit) → Version: New version → Deploy**.
   Re-deploying as a *new version* keeps the same Web App URL, so `LEADS_WEBHOOK_URL`
   already set in Vercel keeps working for both leads and partners.
4. The **Partners** tab is created automatically the first time someone registers.

## Columns in the Partners tab
`createdAt · id · name · phone · email · partnerType · city · experience · source · status · updatedAt`

## Optional: a completely separate sheet/file
If you'd rather keep partners in a *different* spreadsheet, deploy the same Apps Script
on that sheet and set `PARTNERS_WEBHOOK_URL` in Vercel → Settings → Environment Variables
to its Web App URL. `/api/partners` uses `PARTNERS_WEBHOOK_URL` when present, otherwise
falls back to `LEADS_WEBHOOK_URL`.
