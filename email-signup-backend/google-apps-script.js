const SHEET_NAME = "Signups";

// Keep this private. Put your real owner token only in your own Apps Script editor.
// Do not commit your real token to GitHub.
const OWNER_TOKEN = "PASTE_A_PRIVATE_OWNER_TOKEN_HERE";

const HEADERS = [
  "createdAt",
  "name",
  "email",
  "wantsUpdates",
  "refreshCadence",
  "source",
  "page",
  "userAgent",
  "updatedAt",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = parsePostBody_(e);
    const email = normaliseEmail_(data.email);
    if (!email) return output_({ ok: false, error: "Invalid email" });

    const sheet = getSignupSheet_();
    const row = {
      createdAt: data.createdAt || new Date().toISOString(),
      name: clean_(data.name || data.displayName, 80),
      email,
      wantsUpdates: normaliseBoolean_(data.wantsUpdates),
      refreshCadence: clean_(data.refreshCadence || "weekly", 20),
      source: clean_(data.source || "chinese-tutor", 80),
      page: clean_(data.page, 500),
      userAgent: clean_(e && e.parameter ? e.parameter.userAgent : "", 300),
      updatedAt: new Date().toISOString(),
    };

    upsertSignup_(sheet, row);
    return output_({ ok: true, email });
  } catch (error) {
    return output_({ ok: false, error: errorMessage_(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const callback = cleanCallback_(e && e.parameter && e.parameter.callback);

  try {
    const params = (e && e.parameter) || {};
    if (params.action === "list") {
      assertOwnerToken_(params.token);
      return output_({ ok: true, leads: listSignups_() }, callback);
    }

    return output_({ ok: true, service: "Chinese Tutor email collector" }, callback);
  } catch (error) {
    return output_({ ok: false, error: errorMessage_(error) }, callback);
  }
}

function parsePostBody_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

function getSignupSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function upsertSignup_(sheet, row) {
  const values = sheet.getDataRange().getValues();
  const emailColumn = HEADERS.indexOf("email");
  const rowValues = HEADERS.map((header) => row[header] || "");

  for (let index = 1; index < values.length; index += 1) {
    if (normaliseEmail_(values[index][emailColumn]) === row.email) {
      sheet.getRange(index + 1, 1, 1, HEADERS.length).setValues([rowValues]);
      return;
    }
  }

  sheet.appendRow(rowValues);
}

function listSignups_() {
  const sheet = getSignupSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  return values.slice(1).map((row) => ({
    createdAt: row[0] || "",
    displayName: row[1] || "",
    email: row[2] || "",
    wantsUpdates: row[3] === true || row[3] === "TRUE" || row[3] === "true",
    refreshCadence: row[4] || "weekly",
    source: row[5] || "central-collector",
    page: row[6] || "",
  }));
}

function assertOwnerToken_(token) {
  if (!OWNER_TOKEN || OWNER_TOKEN === "PASTE_A_PRIVATE_OWNER_TOKEN_HERE") {
    throw new Error("OWNER_TOKEN is not set in Apps Script");
  }

  if (!token || token !== OWNER_TOKEN) {
    throw new Error("Invalid owner token");
  }
}

function output_(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    );
  }

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function normaliseEmail_(value) {
  const email = String(value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : "";
}

function normaliseBoolean_(value) {
  return value === true || value === "true" || value === "TRUE" || value === 1 || value === "1";
}

function clean_(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanCallback_(value) {
  const callback = String(value || "").trim();
  return /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/.test(callback) ? callback : "";
}

function errorMessage_(error) {
  return String(error && error.message ? error.message : error);
}
