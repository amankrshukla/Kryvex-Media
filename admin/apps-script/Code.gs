/**
 * Kryvex — website enquiry inbox.
 *
 * Receives contact-form and chat enquiries from kryvexmedia.com, stores them
 * in a Google Sheet, and serves them back to the CRM at /admin.
 *
 * Deploy: Extensions → Apps Script from a new Google Sheet, paste this in,
 * then Deploy → New deployment → Web app → Execute as "Me",
 * Who has access "Anyone". Copy the /exec URL.
 * Full steps are in admin/README.md.
 */

// Change this to your own random string, then put the SAME value in
// admin/invoices.js as INBOX_TOKEN. It guards reading, not writing.
var TOKEN = 'CHANGE-ME-TO-A-RANDOM-STRING';

var SHEET = 'Leads';
var HEADERS = ['received', 'id', 'name', 'email', 'phone', 'requirement',
               'page', 'source', 'handled'];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

/** Website posts enquiries here. Must stay open — visitors aren't authenticated. */
function doPost(e) {
  try {
    var d = {};
    if (e && e.postData && e.postData.contents) {
      try { d = JSON.parse(e.postData.contents); } catch (err) { d = e.parameter || {}; }
    } else {
      d = (e && e.parameter) || {};
    }

    // Honeypot — bots fill hidden fields, humans don't.
    if (d._honey) return ok_({ skipped: 'honeypot' });

    var name = String(d.name || '').trim();
    var email = String(d.email || '').trim();
    var phone = String(d.mobile || d.phone || '').trim();
    if (!name && !email && !phone) return ok_({ skipped: 'empty' });

    sheet_().appendRow([
      new Date(),
      'w' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      name,
      email,
      phone,
      String(d.requirement || d.message || '').trim(),
      String(d.page || '').trim(),
      String(d.source || 'Website form').trim(),
      ''            // handled — set to "y" once imported into the CRM
    ]);

    return ok_({ saved: true });
  } catch (err) {
    return ok_({ error: String(err) });
  }
}

/**
 * CRM reads enquiries here.
 *   ?token=…                 → unhandled enquiries as JSON
 *   ?token=…&all=1           → every enquiry, handled or not
 *   ?token=…&handled=id1,id2 → mark those ids handled, so they stop re-importing
 */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.token !== TOKEN) return ok_({ error: 'unauthorized' });

  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return ok_({ leads: [] });

  var rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();

  if (p.handled) {
    var mark = {};
    String(p.handled).split(',').forEach(function (id) { mark[id.trim()] = 1; });
    var n = 0;
    for (var i = 0; i < rows.length; i++) {
      if (mark[rows[i][1]] && rows[i][8] !== 'y') {
        sh.getRange(i + 2, 9).setValue('y');
        n++;
      }
    }
    return ok_({ marked: n });
  }

  var out = [];
  for (var j = 0; j < rows.length; j++) {
    var r = rows[j];
    if (!p.all && r[8] === 'y') continue;
    out.push({
      received: r[0] ? new Date(r[0]).toISOString() : '',
      id: r[1],
      name: r[2],
      email: r[3],
      phone: r[4],
      requirement: r[5],
      page: r[6],
      source: r[7] || 'Website form',
      handled: r[8] === 'y'
    });
  }
  return ok_({ leads: out });
}

function ok_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
