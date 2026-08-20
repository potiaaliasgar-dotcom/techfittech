# Google Sheets Lead Capture Webhook Setup Guide

To ensure zero lost leads, TechFit's lead forms post simultaneously to FormSubmit and your private Google Sheet via a Google Apps Script Webhook.

---

## Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your Google account.
2. Name the sheet **"TechFit Website Leads"**.
3. In row 1, add these column headers:
   - **A1:** Timestamp
   - **B1:** Name
   - **C1:** Phone
   - **D1:** Email
   - **E1:** City
   - **F1:** Requirement / Category
   - **G1:** Message
   - **H1:** Source

---

## Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Replace all existing code with the following snippet:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.requirement || data.gymName || '',
      data.message || '',
      data.source || 'techfittech.com'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) > **New deployment**.
2. Select type: **Web app** (click the gear icon ⚙️).
3. Configuration:
   - **Description:** TechFit Lead Form Webhook
   - **Execute as:** Me (`your-email@gmail.com`)
   - **Who has access:** **Anyone** (this allows the website form to post leads securely).
4. Click **Deploy** and authorize access.
5. Copy the **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 4: Configure in TechFit Codebase
Paste your Web App URL into `public/assets/app.js` at line 8:
```javascript
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```
Or define `window.GOOGLE_SHEETS_WEBHOOK_URL` in `index.html`.
