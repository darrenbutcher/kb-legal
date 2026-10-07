/**
 * KB Legal — Corporate Briefings sign-ups → Google Sheet
 *
 * Setup (once):
 * 1. Create a Google Sheet. Rename the first tab to "Subscribers" (or change
 *    SHEET_NAME below). The script adds the header row itself.
 * 2. In the sheet: Extensions → Apps Script. Replace the code with this file.
 * 3. Project Settings (gear icon) → Script properties → Add property:
 *      SHARED_SECRET = <a long random string>
 *    Use the same value for NEWSLETTER_SCRIPT_SECRET in the website's env.
 * 4. Deploy → New deployment → type "Web app":
 *      Execute as: Me
 *      Who has access: Anyone
 *    Authorize when prompted, then copy the Web app URL (ends in /exec).
 *    That URL is NEWSLETTER_SCRIPT_URL in the website's env.
 * 5. After editing this script later: Deploy → Manage deployments → edit →
 *    Version: New version (the /exec URL stays the same).
 */

const SHEET_NAME = "Subscribers";
const HEADERS = ["Subscribed at", "Email", "Source page"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret =
      PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
    if (!secret || body.secret !== secret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
      return json({ ok: false, error: "invalid" });
    }

    const sheet = getSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet
        .getRange(2, 2, lastRow - 1, 1)
        .getValues()
        .map(function (row) {
          return String(row[0]).trim().toLowerCase();
        });
      if (existing.indexOf(email) !== -1) {
        return json({ ok: true, status: "already-subscribed" });
      }
    }

    // Prefix values that a spreadsheet could read as a formula.
    const safe = function (value) {
      const text = String(value || "").slice(0, 200);
      return /^[=+\-@]/.test(text) ? "'" + text : text;
    };
    sheet.appendRow([new Date(), safe(email), safe(body.source)]);
    return json({ ok: true, status: "subscribed" });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet =
    spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
