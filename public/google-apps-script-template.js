// Google Apps Script template for the wedding RSVP form
// 1. Open https://script.google.com
// 2. Create a new project and paste this code
// 3. Deploy as a Web App and copy the web app URL
// 4. Put that URL in VITE_RSVP_WEBAPP_URL in your .env file

const SHEET_ID = "1jOegytW1odWbJuVjIyuh9V9G5tOP-4zu-OqGw91-32E";

function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is ready.");
}

function doPost(e) {
  try {
    // Support both JSON and form-encoded payloads.
    let payload = {};
    if (e.postData && e.postData.type && e.postData.type.indexOf("application/json") !== -1) {
      payload = JSON.parse(e.postData.contents || "{}");
    } else if (e.parameter) {
      // form-encoded submissions arrive in e.parameter
      payload = e.parameter;
    } else {
      payload = {};
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const row = [
      new Date(),
      payload.name || "",
      payload.email || "",
      payload.presence || "",
      payload.invitedBy || "",
      payload.notes || "",
      payload.submittedAt || "",
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
