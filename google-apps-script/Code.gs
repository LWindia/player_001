// ============================================================
// Player 001 - Secure Live Counter API
// Google Apps Script Backend
// ============================================================

const SHEET_NAME = "Counter";
const API_KEY = "p001_live_k9x2mz7q"; // Change this to your own secret key
const CELL = "A1"; // Cell where the count is stored

// ── GET Handler ──────────────────────────────────────────────
function doGet(e) {
  // Simulate slight backend delay (300–800ms feel)
  Utilities.sleep(Math.floor(Math.random() * 500) + 300);

  // API Key validation
  const key = e.parameter.key;
  if (!key || key !== API_KEY) {
    return buildResponse({ status: "error", message: "Unauthorized" }, 401);
  }

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const count = sheet.getRange(CELL).getValue();

    return buildResponse({
      status: "success",
      data: { count: Number(count) },
      timestamp: new Date().toISOString()
    }, 200);
  } catch (err) {
    return buildResponse({ status: "error", message: "Internal error" }, 500);
  }
}

// ── Auto Increment (runs every hour via trigger) ─────────────
function autoIncrement() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const current = Number(sheet.getRange(CELL).getValue()) || 0;
  const increment = Math.floor(Math.random() * 21) + 10; // 10–30
  sheet.getRange(CELL).setValue(current + increment);
  Logger.log("Incremented by " + increment + " → new total: " + (current + increment));
}

// ── Response Builder ─────────────────────────────────────────
function buildResponse(data, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
