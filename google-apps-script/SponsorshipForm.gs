// ============================================================
// Player 001 - Sponsorship / Partnership Form Handler
// Google Apps Script Backend
// ============================================================
// Sheet name: "Sponsorship"
// Columns: Timestamp | First Name | Last Name | Company | Industry |
//          Interest Area | Email | Role | Budget Range | Point of Contact |
//          WhatsApp | Questions

const SPONSOR_SHEET_NAME = "Sponsorship";
const SPONSOR_API_KEY = "p001_sponsor_x7k2nw4p"; // Change this to your own secret key

function doPost(e) {
  const key = e.parameter.key;
  if (!key || key !== SPONSOR_API_KEY) {
    return buildSponsorResponse({ status: "error", message: "Unauthorized" });
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(SPONSOR_SHEET_NAME);

    sheet.appendRow([
      new Date().toISOString(),
      data.firstName || "",
      data.lastName || "",
      data.company || "",
      data.industry || "",
      data.interestArea || "",
      data.email || "",
      data.role || "",
      data.budgetRange || "",
      data.pointOfContact || "",
      data.whatsapp || "",
      data.questions || "",
    ]);

    return buildSponsorResponse({ status: "success", message: "Form submitted successfully" });
  } catch (err) {
    return buildSponsorResponse({ status: "error", message: "Internal error: " + err.toString() });
  }
}

function buildSponsorResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
