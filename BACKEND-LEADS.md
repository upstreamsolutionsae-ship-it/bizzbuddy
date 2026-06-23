# BizzBuddy — Lead Management & Backend Plan

This document explains where leads are stored, how the team accesses them, how each
lead's source/category is identified, and how external/existing client data will plug in later.

## 1. Where leads are stored

- Every form on the website POSTs to **`/api/leads`** (`app/api/leads/route.ts`).
- Leads are persisted to **`data/leads.json`** at the project root (created automatically on first submit).
- Each lead is a JSON record:

```json
{
  "id": "LEAD-1717400000000",
  "name": "Rahul Kumar",
  "phone": "9810000000",
  "email": "rahul@example.com",
  "business": "Kumar Traders",
  "city": "New Delhi",
  "category": "Raise Equity",
  "service": "Raise Equity",
  "loan": "₹1Cr–₹5Cr",
  "loanType": "Raise Equity",
  "details": "Free-text from the form (purpose, amount, specify-other, etc.)",
  "source": "raise-equity-page",
  "status": "New",
  "origin": "website",
  "createdAt": "2026-06-23T10:00:00.000Z"
}
```

> For a production deployment, swap the JSON file for the existing Postgres/Prisma
> database (see `prisma/schema.prisma`) by adding a `Lead` model and writing through Prisma
> in the same route. The API contract (the fields above) stays identical, so no form needs changing.

## 2. How the team accesses leads

- Admin dashboard: **`/admin/leads`** — searchable, filterable table of all leads.
- Filter by **status** (New / In Process / Approved / Disbursed / Rejected) and by **category**.
- Search by name, phone, city, or category.
- `GET /api/leads` returns the raw list (for export / CRM sync).
- `PATCH /api/leads` updates a lead's status.

## 3. How the lead source / category is identified

- Every submission saves a **`category`** field from the master list in `lib/site.ts` → `LEAD_CATEGORIES`:
  - Home Loan, Personal Loan, Business Loan, Working Capital, Loan Against Property,
    Raise Equity, GST Registration, LEI Certificate, UDYAM Registration,
    Loan Documentation Service, Other Documentation Service, Credit Advisory,
    Financial Health Check, Partner Registration, Investment Enquiry, General Enquiry.
- It also saves a **`source`** (which page/form the lead came from, e.g. `homepage`,
  `raise-equity-page`, `documentation-support`, `partner-page`) for analytics.
- The admin table shows both **Category** and **Source** columns.

## 4. Plugging in external / existing client data (future)

A working model will read complete books / customer documents and generate an output.
That output should feed the website as a previous-record repository, existing-client data
source, and a top-up business lead generator.

The structure is already prepared:

- The leads API reads an **optional** `data/external-leads.json` file (same record shape as above
  with `"origin": "external"`) and merges it into the admin view, **read-only**.
- To plug external data in later, drop the generated records into `data/external-leads.json`
  (or point the loader at the model's API). Nothing else needs to change — they appear in
  `/admin/leads` tagged as `external`, ready to be actioned as top-up leads.
- Because reads are merged and writes only ever touch `data/leads.json`, the external/existing
  client repository is never overwritten by new website leads.
