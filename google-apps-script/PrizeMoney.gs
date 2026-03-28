// ============================================================
// Player 001 - Secure Prize Money Counter API
// Google Apps Script Backend
// ============================================================

const PRIZE_SHEET_NAME = "PrizeMoney";
const PRIZE_API_KEY = "p001_prize_m8y3nz5w"; // Change this to your own secret key
const PRIZE_CELL = "A1";   // Cell where the prize amount is stored

// ── INCREMENT CONFIG — change these to adjust auto-increment range ──
const INCREMENT_MIN = 100; // minimum Rs added per hour
const INCREMENT_MAX = 150; // maximum Rs added per hour

// ── GET Handler ──────────────────────────────────────────────
function doGet(e) {
  Utilities.sleep(Math.floor(Math.random() * 500) + 300);

  const key = e.parameter.key;
  if (!key || key !== PRIZE_API_KEY) {
    return buildPrizeResponse({ status: "error", message: "Unauthorized" });
  }

  try {
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(PRIZE_SHEET_NAME);
    const amount = sheet.getRange(PRIZE_CELL).getValue();

    return buildPrizeResponse({
      status: "success",
      data: { amount: Number(amount) },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return buildPrizeResponse({ status: "error", message: "Internal error" });
  }
}

// ── Auto Increment (runs every hour via trigger) ─────────────
// Adds random amount between INCREMENT_MIN and INCREMENT_MAX every hour
function autoPrizeIncrement() {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID_HERE").getSheetByName(PRIZE_SHEET_NAME);
  const current = Number(sheet.getRange(PRIZE_CELL).getValue()) || 0;
  const increment = Math.floor(Math.random() * (INCREMENT_MAX - INCREMENT_MIN + 1)) + INCREMENT_MIN;
  sheet.getRange(PRIZE_CELL).setValue(current + increment);
  Logger.log("Prize incremented by ₹" + increment + " → new total: ₹" + (current + increment));
}

// ── Response Builder ─────────────────────────────────────────
function buildPrizeResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
