// BizzBuddy — Leads capture Web App.
// Paste this into your Google Sheet: Extensions → Apps Script (replace all code), Save,
// then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
// Full instructions: ../LEADS-GOOGLE-SHEET-SETUP.md

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
