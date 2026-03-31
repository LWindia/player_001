// ============================================================
// Player 001 - Register Form Handler with Auto Email
// Google Apps Script Backend
// ============================================================
// Sheet: "Registrations" (or whatever your existing sheet is named)
// This script handles form submission AND sends auto-email to the user

const SECRET_TOKEN = "player001_secret_2026";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Validate token
    if (!data.token || data.token !== SECRET_TOKEN) {
      return buildResponse({ status: "error", message: "Unauthorized" });
    }

    // Save to sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date().toISOString(),
      data.name || "",
      data.whatsapp || "",
      data.email || "",
      data.age || "",
      data.city || "",
      data.query || "",
    ]);

    // Send auto-email if email provided
    if (data.email) {
      sendWelcomeEmail(data.email, data.name || "Player");
    }

    return buildResponse({ status: "success" });
  } catch (err) {
    return buildResponse({ status: "error", message: err.toString() });
  }
}

function sendWelcomeEmail(email, name) {
  const subject = "Your Player 001 Game Guide is Being Prepared…";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { background: #000; color: #fff; font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #0a0a0a; }
    .header { text-align: center; padding: 24px 0; border-bottom: 2px solid #ff2a2a; margin-bottom: 28px; }
    .header h1 { color: #ff2a2a; font-size: 22px; margin: 0; letter-spacing: 2px; }
    h2 { color: #ff2a2a; font-size: 20px; margin-bottom: 8px; }
    p { color: #ccc; font-size: 15px; line-height: 1.7; margin: 12px 0; }
    .highlight { color: #fff; font-weight: bold; }
    ul { color: #ccc; font-size: 15px; line-height: 1.9; padding-left: 20px; }
    .cta-btn { display: inline-block; background: #ff2a2a; color: #fff !important; text-decoration: none; padding: 14px 32px; font-weight: bold; font-size: 14px; letter-spacing: 2px; margin: 16px 0; border-radius: 2px; }
    .divider { border: none; border-top: 1px solid #222; margin: 28px 0; }
    .footer { text-align: center; color: #555; font-size: 12px; margin-top: 32px; }
    .final { color: #ff2a2a; font-size: 18px; font-weight: bold; text-align: center; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PLAYER 001</h1>
    </div>

    <h2>🔥 The Game Has Noticed You.</h2>
    <p>Hi ${name},</p>
    <p>You've successfully unlocked access to the <span class="highlight">Player 001 Game Guide.</span></p>
    <p>And now… things start getting real.</p>
    <p>Your Game Guide is currently being prepared and will reach you within the next <span class="highlight">24 hours</span> on your WhatsApp / Email.</p>

    <hr class="divider">

    <p><strong>⚡ Inside the Game Guide, you'll discover:</strong></p>
    <ul>
      <li>How the Game Arena actually works</li>
      <li>How the Prize grows beyond ₹1 Million</li>
      <li>What lies inside the Final Vault — the vault that gives you everything</li>
    </ul>

    <p>This is not surface-level information.<br>
    This is where you begin to understand what you're stepping into.</p>

    <p>👉 <span class="highlight">Keep your phone close.</span><br>
    Because when it arrives, you'll see why this is unlike anything India has seen before.</p>

    <hr class="divider">

    <p><strong>💥 One more thing</strong></p>
    <p>Some things are better experienced together.<br>
    Something big is about to begin in India.<br>
    And if there are people you'd want inside the Game Arena with you… this is the moment to bring them in.</p>

    <p><strong>🚀 INVITE YOUR PEOPLE</strong></p>

    <a href="https://wa.me/?text=Something%20big%20is%20coming.%20India%27s%20first%20survival%20game%20arena%20is%20here.%20The%20prize%20starts%20at%20%E2%82%B91%20Million%E2%80%A6%20and%20it%20keeps%20growing.%20I%27ve%20just%20unlocked%20access.%20You%20should%20check%20this%20before%20it%20goes%20big%3A%20https%3A%2F%2Fwww.player-001.com" class="cta-btn">👉 Invite on WhatsApp</a>

    <p style="color:#888; font-size:13px; margin-top:8px;">Or copy this link to share:<br>
    <a href="https://www.player-001.com" style="color:#ff2a2a;">https://www.player-001.com</a></p>

    <hr class="divider">

    <div class="final">
      🔥 How far you go… is up to you.<br>
      PLAYER 001 could be you.
    </div>

    <div class="footer">
      <p>Player 001 · India's First Survival Game Arena<br>
      <a href="https://www.player-001.com" style="color:#ff2a2a;">www.player-001.com</a></p>
    </div>
  </div>
</body>
</html>
  `;

  const plainBody = `
🔥 The Game Has Noticed You.

Hi ${name},

You've successfully unlocked access to the Player 001 Game Guide.
And now… things start getting real.

Your Game Guide is currently being prepared and will reach you within the next 24 hours on your WhatsApp / Email.

⚡ Inside the Game Guide, you'll discover:
• How the Game Arena actually works
• How the Prize grows beyond ₹1 Million
• What lies inside the Final Vault — the vault that gives you everything

This is not surface-level information.
This is where you begin to understand what you're stepping into.

👉 Keep your phone close.
Because when it arrives, you'll see why this is unlike anything India has seen before.

💥 One more thing
Some things are better experienced together.
Something big is about to begin in India.
And if there are people you'd want inside the Game Arena with you… this is the moment to bring them in.

🚀 INVITE YOUR PEOPLE
👉 Invite on WhatsApp: https://wa.me/?text=Something+big+is+coming.+Check+this%3A+https%3A%2F%2Fwww.player-001.com
👉 Copy Invite Link: https://www.player-001.com

🔥 FINAL LINE
How far you go… is up to you.
PLAYER 001 could be you.

— Player 001 Team
www.player-001.com
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
  });
}

function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
