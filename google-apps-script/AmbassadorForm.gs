// ============================================================
// Player 001 - Campus Champion / Ambassador Form Handler
// Google Apps Script Backend
// ============================================================
// Sheet: "Ambassadors"
// Columns: Timestamp | Full Name | College Name | City |
//          Phone Number | Email ID | Why Campus Champion

const AMBASSADOR_SHEET_NAME = "Ambassadors";
const AMBASSADOR_API_KEY = "p001_ambassador_x9n2wy7k";

function doPost(e) {
  const key = e.parameter.key;
  if (!key || key !== AMBASSADOR_API_KEY) {
    return buildAmbassadorResponse({ status: "error", message: "Unauthorized" });
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(AMBASSADOR_SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "College Name",
        "City",
        "Phone Number",
        "Email ID",
        "Why Campus Champion"
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.fullName   || "",
      data.college    || "",
      data.city       || "",
      data.phone      || "",
      data.email      || "",
      data.why        || "",
    ]);

    return buildAmbassadorResponse({ status: "success", message: "Application submitted successfully" });
  } catch (err) {
    return buildAmbassadorResponse({ status: "error", message: "Internal error: " + err.toString() });
  }
}

function buildAmbassadorResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
