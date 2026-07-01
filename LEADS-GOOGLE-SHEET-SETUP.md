# BizzBuddy — Leads → Google Sheet (5-minute setup)

Every form on the site (loan enquiries, financial health check, contact page, partner
registration, etc.) is captured into **one Google Sheet** you own. You can open, filter,
sort and share it like any spreadsheet. The website talks to the Sheet through a small
Google Apps Script "Web App" — no server, no database, no cost.

> **Why this is needed:** the site runs on Vercel, whose filesystem is read-only. The old
> code wrote leads to a file on disk, so every lead was thrown away. The Sheet lives outside
> the server, so leads are stored permanently.

---

## Step 1 — Create the Sheet

1. Go to <https://sheets.google.com> and create a **blank** spreadsheet.
2. Name it e.g. **"BizzBuddy Leads"**. (You don't need to add any columns — the script does it.)

## Step 2 — Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever is in the editor and paste **all** the code from
   [`google-apps-script/leads-sheet.gs`](google-apps-script/leads-sheet.gs) (also copied below).
3. Click the **Save** (💾) icon.

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** BizzBuddy leads
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← important, so the website can post to it
4. Click **Deploy**. Approve the Google permission prompt (choose your account →
   Advanced → "Go to … (unsafe)" → Allow — this is normal for your own script).
5. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

## Step 4 — Give the URL to the website

Add this environment variable in **two** places:

**A) Vercel (production — the live site):**
1. Vercel dashboard → your **bizzbuddy** project → **Settings → Environment Variables**.
2. Add:
   - **Key:** `LEADS_WEBHOOK_URL`
   - **Value:** the Web app URL you copied
   - **Environments:** Production, Preview, Development (tick all)
3. Save, then **Deployments → ⋯ → Redeploy** the latest deployment (env vars only apply
   after a redeploy).

**B) Local (only if you run `npm run dev` on your machine):**
Add to `.env.local`:
```
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
```

## Step 5 — Test

- Submit any form on the site (e.g. the Financial Health Check "Get in touch"). A new row
  should appear in the Sheet within a second or two.
- The internal dashboard at **`/admin/leads`** also reads from the same Sheet, so the team
  can view/search/update statuses there too.

---

## If you ever change the script

Editing the `.gs` code requires **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**
for changes to take effect. (The URL stays the same.)

## The Apps Script code

```javascript
// BizzBuddy — Leads capture Web App. Paste into Extensions → Apps Script.
var SHEET_NAME = 'Leads';
var HEADERS = ['createdAt','id','name','phone','email','business','city','category',
               'service','source','loan','loanType','details','status','origin','updatedAt'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); }
  if (sh.getLastRow() === 0) { sh.appendRow(HEADERS); }
  return sh;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var sh = getSheet_();

    if (body.action === 'update') {
      var lastRow = sh.getLastRow();
      if (lastRow > 1) {
        var ids = sh.getRange(2, 2, lastRow - 1, 1).getValues(); // column B = id
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === String(body.id)) {
            sh.getRange(i + 2, HEADERS.indexOf('status') + 1).setValue(body.status);
            sh.getRange(i + 2, HEADERS.indexOf('updatedAt') + 1).setValue(new Date().toISOString());
            break;
          }
        }
      }
      return json_({ success: true });
    }

    var lead = body.lead || body;
    var row = HEADERS.map(function (h) { return lead[h] !== undefined && lead[h] !== null ? lead[h] : ''; });
    sh.appendRow(row);
    return json_({ success: true, id: lead.id });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function doGet(e) {
  var sh = getSheet_();
  var values = sh.getDataRange().getValues();
  var headers = values.shift() || [];
  var leads = values.map(function (r) {
    var o = {};
    headers.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
  return json_({ leads: leads, total: leads.length });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```
