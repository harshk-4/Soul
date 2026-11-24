/**
 * SoulfulI — Quiet Bloom Retreat Registration Automation
 * 
 * Automatically sends confirmation emails to participants who register for
 * the Quiet Bloom Retreat (12–17 February 2027 · Dharamshala, India).
 * 
 * Works in two modes:
 * 1. Form Submit Trigger (`onFormSubmit`): Runs automatically whenever a response
 *    is submitted to the Google Form or linked Google Sheet.
 * 2. Web App Endpoint (`doPost`): Allows the SoulfulI website server to send
 *    registrations directly over HTTPS into the Google Sheet.
 */

// Configuration Constants
var EMAIL_SUBJECT = 'Registration Received – Quiet Bloom Retreat | Soulfuli 🌿';

var EMAIL_TEXT_TEMPLATE = [
  'Dear Participant,',
  '',
  'Thank you for registering for the Quiet Bloom Retreat! 🌿',
  '',
  'We are delighted to receive your registration.',
  '',
  'Your registration details have been successfully received. Our team will contact you on WhatsApp with further information regarding confirmation, accommodation, transportation and the retreat schedule.',
  '',
  'Retreat Details:',
  'Quiet Bloom Retreat',
  '12–17 February 2027',
  'Dharamshala, India',
  '',
  'We look forward to connecting with you and sharing this meaningful experience.',
  '',
  'Warm regards,',
  'Soulfuli Team',
  'connect@soulfuli.org'
].join('\n');

var EMAIL_HTML_TEMPLATE = [
  '<!DOCTYPE html>',
  '<html><body style="margin: 0; padding: 24px 16px; background-color: #fdf9f1; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; color: #1c1c17; line-height: 1.6;">',
  '  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd6c8; border-radius: 12px; padding: 32px 28px;">',
  '    <div style="padding-bottom: 20px; border-bottom: 1px solid #ede4e8; margin-bottom: 24px;">',
  '      <h2 style="font-family: Georgia, serif; font-size: 24px; color: #1f2a24; margin: 0 0 6px 0; font-weight: normal;">SoulfulI</h2>',
  '      <p style="font-size: 13px; color: #556251; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">Quiet Bloom Retreat · Dharamshala</p>',
  '    </div>',
  '    <p style="font-size: 16px; margin: 0 0 16px 0;">Dear Participant,</p>',
  '    <p style="font-size: 16px; margin: 0 0 16px 0;">Thank you for registering for the <strong>Quiet Bloom Retreat! 🌿</strong></p>',
  '    <p style="font-size: 15px; margin: 0 0 16px 0; color: #434844;">We are delighted to receive your registration.</p>',
  '    <p style="font-size: 15px; margin: 0 0 20px 0; color: #434844;">Your registration details have been successfully received. Our team will contact you on WhatsApp with further information regarding confirmation, accommodation, transportation and the retreat schedule.</p>',
  '    <div style="background-color: #fbf5f6; border: 1px solid #ede4e8; border-radius: 8px; padding: 18px 20px; margin: 24px 0;">',
  '      <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #c86d51; margin: 0 0 8px 0;">Retreat Details</h3>',
  '      <p style="font-family: Georgia, serif; font-size: 18px; color: #1f2a24; margin: 0 0 4px 0;">Quiet Bloom Retreat</p>',
  '      <p style="font-size: 14px; color: #556251; margin: 0 0 2px 0;">12–17 February 2027</p>',
  '      <p style="font-size: 14px; color: #556251; margin: 0;">Dharamshala, India</p>',
  '    </div>',
  '    <p style="font-size: 15px; margin: 0 0 24px 0; color: #434844;">We look forward to connecting with you and sharing this meaningful experience.</p>',
  '    <div style="padding-top: 16px; border-top: 1px solid #ede4e8; font-size: 14px; color: #1f2a24;">',
  '      <p style="margin: 0 0 4px 0;">Warm regards,</p>',
  '      <p style="margin: 0 0 6px 0; font-weight: 600;">Soulfuli Team</p>',
  '      <a href="mailto:connect@soulfuli.org" style="color: #c86d51; text-decoration: underline;">connect@soulfuli.org</a>',
  '    </div>',
  '  </div>',
  '</body></html>'
].join('\n');

/**
 * 1. Automatic Form Submit Handler
 * Install as an 'On form submit' trigger in Google Forms or linked Google Sheet.
 */
function onFormSubmit(e) {
  try {
    var recipientEmail = '';
    var participantName = '';

    if (e && e.values) {
      // In linked Google Sheets, e.values contains array of submitted column values
      // [Timestamp, Full Name, Email Address, WhatsApp Number, ...]
      participantName = e.values[1] || 'Participant';
      recipientEmail = e.values[2] || '';
    } else if (e && e.response) {
      // In Google Forms editor, e.response is a FormResponse object
      var itemResponses = e.response.getItemResponses();
      for (var i = 0; i < itemResponses.length; i++) {
        var itemTitle = itemResponses[i].getItem().getTitle();
        var itemResponse = itemResponses[i].getResponse();
        if (itemTitle.toLowerCase().indexOf('email') !== -1) {
          recipientEmail = itemResponse;
        } else if (itemTitle.toLowerCase().indexOf('full name') !== -1 || itemTitle.toLowerCase().indexOf('name') !== -1) {
          participantName = itemResponse;
        }
      }
      if (!recipientEmail) {
        recipientEmail = e.response.getRespondentEmail();
      }
    }

    if (!recipientEmail || recipientEmail.indexOf('@') === -1) {
      Logger.log('No valid recipient email found in form submission.');
      return;
    }

    // Deduplication check using CacheService
    var cache = CacheService.getScriptCache();
    var cacheKey = 'sent_' + recipientEmail.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cache.get(cacheKey)) {
      Logger.log('Duplicate submission detected within short window for ' + recipientEmail + '. Skipping email.');
      return;
    }
    // Mark as sent for 1 hour to prevent accidental rapid re-sends
    cache.put(cacheKey, 'true', 3600);

    sendConfirmationEmail(recipientEmail);
    Logger.log('Confirmation email successfully sent to: ' + recipientEmail);

  } catch (error) {
    Logger.log('Error handling form submit: ' + error.toString());
  }
}

/**
 * 2. Web App POST Handler (doPost)
 * Allows Next.js server to post JSON directly.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var recipientEmail = data.email || '';
    var name = data.name || '';
    var phone = data.phone || '';
    var roomPreference = data.roomPreference || '';
    var preferredSeason = data.preferredSeason || '';
    var intention = data.intention || '';

    if (!recipientEmail || recipientEmail.indexOf('@') === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        error: 'Invalid or missing email address.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Append to active spreadsheet if script is attached to a Google Sheet
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.appendRow([
        new Date(),
        name,
        recipientEmail,
        phone,
        roomPreference,
        preferredSeason,
        intention,
        'Confirmation Sent'
      ]);
    } catch (sheetErr) {
      Logger.log('Note: Not attached to Google Sheet or appendRow failed: ' + sheetErr.toString());
    }

    sendConfirmationEmail(recipientEmail);

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      message: 'Registration saved and confirmation email sent.'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends the branded confirmation email using GmailApp
 */
function sendConfirmationEmail(recipientEmail) {
  GmailApp.sendEmail(recipientEmail, EMAIL_SUBJECT, EMAIL_TEXT_TEMPLATE, {
    htmlBody: EMAIL_HTML_TEMPLATE,
    replyTo: 'connect@soulfuli.org',
    name: 'Soulfuli'
  });
}

/**
 * Test function to verify Gmail permissions and inspect email output
 */
function testSendConfirmationEmail() {
  var testEmail = Session.getActiveUser().getEmail();
  Logger.log('Sending test confirmation email to: ' + testEmail);
  sendConfirmationEmail(testEmail);
  Logger.log('Test email sent. Please check your inbox.');
}
