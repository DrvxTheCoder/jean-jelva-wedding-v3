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
    const payload = typeof e.postData.contents === "string"
      ? JSON.parse(e.postData.contents)
      : {};

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const row = [
      new Date(),
      payload.name || "",
      payload.email || "",
      payload.presence || "",
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
