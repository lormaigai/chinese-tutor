const SHEET_NAME = "Signups";
const VISIT_EVENTS_SHEET_NAME = "VisitEvents";

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
const VISIT_EVENT_HEADERS = [
  "eventAt",
  "visitDate",
  "visitorId",
  "page",
  "referrer",
  "userAgent",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = parsePostBody_(e);
    const row = saveSignup_(data, e);
    return output_({ ok: true, email: row.email });
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
    if (params.action === "signup") {
      const row = saveSignup_(params, e);
      return output_({ ok: true, email: row.email }, callback);
    }

    if (params.action === "visit") {
      const event = saveVisitEvent_(params, e);
      return output_({ ok: true, visitDate: event.visitDate }, callback);
    }

    if (params.action === "traffic") {
      assertOwnerToken_(params.token);
      return output_({ ok: true, traffic: listTraffic_(params.days) }, callback);
    }

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

function saveSignup_(data, e) {
  const email = normaliseEmail_(data.email);
  if (!email) throw new Error("Invalid email");

  const sheet = getSignupSheet_();
  const row = {
    createdAt: data.createdAt || new Date().toISOString(),
    name: clean_(data.name || data.displayName, 80),
    email,
    wantsUpdates: normaliseBoolean_(data.wantsUpdates),
    refreshCadence: clean_(data.refreshCadence || "weekly", 20),
    source: clean_(data.source || "chinese-tutor", 80),
    page: clean_(data.page, 500),
    userAgent: clean_(data.userAgent || (e && e.parameter ? e.parameter.userAgent : ""), 300),
    updatedAt: new Date().toISOString(),
  };

  upsertSignup_(sheet, row);
  return row;
}

function saveVisitEvent_(data, e) {
  const now = new Date();
  const event = {
    eventAt: now.toISOString(),
    visitDate: cleanDate_(data.visitDate) || Utilities.formatDate(now, "Asia/Singapore", "yyyy-MM-dd"),
    visitorId: clean_(data.visitorId, 80) || "anonymous",
    page: clean_(data.page, 500),
    referrer: clean_(data.referrer, 500),
    userAgent: clean_(data.userAgent || (e && e.parameter ? e.parameter.userAgent : ""), 300),
  };

  const sheet = getVisitEventsSheet_();
  sheet.appendRow(VISIT_EVENT_HEADERS.map((header) => event[header] || ""));
  return event;
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

function getVisitEventsSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(VISIT_EVENTS_SHEET_NAME) || spreadsheet.insertSheet(VISIT_EVENTS_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(VISIT_EVENT_HEADERS);
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

function listTraffic_(days) {
  const maxDays = Math.max(1, Math.min(Number(days) || 30, 90));
  const sheet = getVisitEventsSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - maxDays + 1);
  cutoff.setHours(0, 0, 0, 0);

  const daily = {};

  values.slice(1).forEach((row) => {
    const visitDate = cleanDate_(row[1]);
    if (!visitDate) return;

    const date = new Date(visitDate + "T00:00:00");
    if (date < cutoff) return;

    if (!daily[visitDate]) {
      daily[visitDate] = {
        date: visitDate,
        visits: 0,
        visitors: {},
        pages: {},
      };
    }

    const bucket = daily[visitDate];
    const visitorId = clean_(row[2], 80) || "anonymous";
    const page = clean_(row[3] || "/", 200) || "/";
    bucket.visits += 1;
    bucket.visitors[visitorId] = true;
    bucket.pages[page] = (bucket.pages[page] || 0) + 1;
  });

  return Object.keys(daily)
    .sort()
    .map((date) => {
      const bucket = daily[date];
      return {
        date,
        visits: bucket.visits,
        uniqueVisitors: Object.keys(bucket.visitors).length,
        topPages: Object.keys(bucket.pages)
          .sort((a, b) => bucket.pages[b] - bucket.pages[a])
          .slice(0, 5)
          .map((page) => ({ page, visits: bucket.pages[page] })),
      };
    });
}

function assertOwnerToken_(token) {
  if (
    !OWNER_TOKEN ||
    OWNER_TOKEN === "PASTE_A_PRIVATE_OWNER_TOKEN_HERE" ||
    OWNER_TOKEN === "CHANGE_ME_TO_A_PRIVATE_TOKEN"
  ) {
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

function cleanDate_(value) {
  const date = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
}

function cleanCallback_(value) {
  const callback = String(value || "").trim();
  return /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/.test(callback) ? callback : "";
}

function errorMessage_(error) {
  return String(error && error.message ? error.message : error);
}
