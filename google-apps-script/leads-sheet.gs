// BizzBuddy — Leads + Channel Partner capture Web App.
// Paste this into your Google Sheet: Extensions → Apps Script (replace all code), Save,
// then Deploy → Manage deployments → Edit → New version → Deploy (Execute as: Me, Who has access: Anyone).
// Full instructions: ../LEADS-GOOGLE-SHEET-SETUP.md and ../PARTNERS-GOOGLE-SHEET-SETUP.md
//
// One deployment now serves TWO tabs:
//   • "Leads"    — website marketing leads   (payload sheet: "Leads" or omitted)
//   • "Partners" — channel-partner sign-ups   (payload sheet: "Partners")

// Per-sheet column layout. Add a new entry here to support another tab.
var SHEETS = {
  Leads: ['createdAt','id','name','phone','email','business','city','category',
          'service','source','loan','loanType','details','status','origin','updatedAt'],
  Partners: ['createdAt','id','name','phone','email','partnerType','city',
             'experience','source','status','updatedAt'],
};

function sheetNameFrom_(body) {
  var name = (body && body.sheet) ? String(body.sheet) : 'Leads';
  return SHEETS[name] ? name : 'Leads';
}

function getSheet_(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); }
  if (sh.getLastRow() === 0) { sh.appendRow(SHEETS[name]); }
  return sh;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var name = sheetNameFrom_(body);
    var headers = SHEETS[name];
    var sh = getSheet_(name);

    if (body.action === 'update') {
      var lastRow = sh.getLastRow();
      if (lastRow > 1) {
        var idCol = headers.indexOf('id') + 1;
        var ids = sh.getRange(2, idCol, lastRow - 1, 1).getValues();
        for (var i = 0; i < ids.length; i++) {
          if (String(ids[i][0]) === String(body.id)) {
            sh.getRange(i + 2, headers.indexOf('status') + 1).setValue(body.status);
            sh.getRange(i + 2, headers.indexOf('updatedAt') + 1).setValue(new Date().toISOString());
            break;
          }
        }
      }
      return json_({ success: true });
    }

    var lead = body.lead || body;
    var row = headers.map(function (h) { return lead[h] !== undefined && lead[h] !== null ? lead[h] : ''; });
    sh.appendRow(row);
    return json_({ success: true, id: lead.id });
  } catch (err) {
    return json_({ success: false, error: String(err) });
  }
}

function doGet(e) {
  var name = (e && e.parameter && e.parameter.sheet && SHEETS[e.parameter.sheet]) ? e.parameter.sheet : 'Leads';
  var sh = getSheet_(name);
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
