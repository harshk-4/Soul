# Google Apps Script Setup & Authorization Guide for SoulfulI

This guide explains how the Google account owner (e.g. `connect@soulfuli.org`) can enable automatic confirmation emails for the **Quiet Bloom Retreat** Google Form.

---

## 1. Option A: Google Form Automatic Trigger (Recommended)

1. Open the Quiet Bloom Google Form in your Google account:
   [https://docs.google.com/forms/d/e/1FAIpQLSf9T4EK78MCKn26Wzabu-PfdLgJUrrhJc_bLaC3cbMl5wQU3Q/edit](https://docs.google.com/forms/d/e/1FAIpQLSf9T4EK78MCKn26Wzabu-PfdLgJUrrhJc_bLaC3cbMl5wQU3Q/edit)
2. In the top-right corner, click the **Three Dots (⋮) Menu** and select **Script editor**.
3. Delete any default code in the editor, and paste the entire contents of [Code.gs](file:///c:/Users/harsh/Desktop/port/soulfull/google-apps-script/Code.gs).
4. Click the **Save** (💾) icon. Name the project `Soulfuli Retreat Registration Automation`.

### Authorization Step:
5. In the toolbar function dropdown, select `testSendConfirmationEmail` and click **Run**.
6. Google will display a popup: **Authorization Required**.
   - Click **Review permissions**.
   - Select your SoulfulI Google account (`connect@soulfuli.org`).
   - If you see *Google hasn't verified this app*, click **Advanced** at the bottom, then click **Go to Soulfuli Retreat Registration Automation (unsafe)**.
   - Click **Allow** to permit the script to send emails from your Gmail account.
7. Verify that you received the test email in your inbox.

### Adding the Form Trigger:
8. In the left navigation bar of the Script Editor, click the **Triggers (⏰ Clock icon)**.
9. Click **+ Add Trigger** (bottom right):
   - Choose which function to run: `onFormSubmit`
   - Choose which deployment should run: `Head`
   - Select event source: `From form`
   - Select event type: `On form submit`
   - Failure notification settings: `Notify me immediately`
10. Click **Save**.

---

## 2. Option B: Web App URL for Website Direct Delivery

If you also wish to use Google Sheets as a direct HTTP webhook:

1. Inside the Script Editor, click **Deploy** -> **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configuration:
   - Description: `Quiet Bloom Registration Endpoint`
   - Execute as: `Me (connect@soulfuli.org)`
   - Who has access: `Anyone`
4. Click **Deploy**, copy the generated **Web App URL**.
5. Add the Web App URL to your website's environment variables as:
   ```bash
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
   ```

---

## 3. Email Specifications Implemented

- **Subject:** `Registration Received – Quiet Bloom Retreat | Soulfuli 🌿`
- **Sender:** `Soulfuli <connect@soulfuli.org>`
- **Reply-To:** `connect@soulfuli.org`
- **Deduplication:** Automatic 1-hour cache prevents duplicate emails on accidental double submissions.
