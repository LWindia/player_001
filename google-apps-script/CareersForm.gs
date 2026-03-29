// ============================================================
// Player 001 - Careers Application Form Handler
// Google Apps Script Backend
// ============================================================
// Sheet: "Careers"
// Columns: Timestamp | Name | WhatsApp | Email | City | Role |
//          Has Experience | Previous Company | Resume Drive Link

const CAREERS_SHEET_NAME = "Careers";
const CAREERS_API_KEY = "p001_careers_z5m8kx3q";
const RESUME_FOLDER_ID = "1lUiLvUsfBac3XQWld9jxDbiUavZ4zC_z";

function doPost(e) {
  const key = e.parameter.key;
  if (!key || key !== CAREERS_API_KEY) {
    return buildCareersResponse({ status: "error", message: "Unauthorized" });
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(CAREERS_SHEET_NAME);

    // Save resume PDF to Google Drive
    let resumeLink = "";
    if (data.resumeBase64 && data.resumeName) {
      const decoded = Utilities.base64Decode(data.resumeBase64);
      const blob = Utilities.newBlob(decoded, "application/pdf", data.resumeName);
      const folder = DriveApp.getFolderById(RESUME_FOLDER_ID);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeLink = file.getUrl();
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.name || "",
      data.whatsapp || "",
      data.email || "",
      data.city || "",
      data.role || "",
      data.hasExperience || "",
      data.prevCompany || "",
      resumeLink,
    ]);

    return buildCareersResponse({ status: "success", message: "Application submitted successfully" });
  } catch (err) {
    return buildCareersResponse({ status: "error", message: "Internal error: " + err.toString() });
  }
}

function buildCareersResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
