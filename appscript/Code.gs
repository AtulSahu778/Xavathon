// ============================================================
//  Xavathon — Google Apps Script Webhook (hackathon_v1)
//  Deploy as: Web App  →  Execute as: Me  →  Who has access: Anyone
// ============================================================

// ── Configuration ────────────────────────────────────────────
var SCRIPT_PROPS = PropertiesService.getScriptProperties();
var SPREADSHEET_ID = SCRIPT_PROPS.getProperty("SPREADSHEET_ID") || "";
var SHEET_NAME     = SCRIPT_PROPS.getProperty("SHEET_NAME") || "Xavathon Website Response";
var WEBHOOK_SECRET = SCRIPT_PROPS.getProperty("WEBHOOK_SECRET") || "";

// ── Column order (must match the header row in the sheet) ────
var COLUMNS = [
  "Submitted At",
  "Form Kind",
  "Team Name",
  "Leader Name",
  "Leader Email",
  "Leader Phone",
  "College Name",
  "Department",
  "Semester",
  "Team Size",
  // Participant 1-5: Name | Email | Phone | Roll No. | Dept
  "P1 Name",  "P1 Email",  "P1 Phone",  "P1 Roll No.",  "P1 Dept",
  "P2 Name",  "P2 Email",  "P2 Phone",  "P2 Roll No.",  "P2 Dept",
  "P3 Name",  "P3 Email",  "P3 Phone",  "P3 Roll No.",  "P3 Dept",
  "P4 Name",  "P4 Email",  "P4 Phone",  "P4 Roll No.",  "P4 Dept",
  "P5 Name",  "P5 Email",  "P5 Phone",  "P5 Roll No.",  "P5 Dept",
  // Project
  "Project Title",
  "Problem Statement",
  "Project Description",
  "Why Participate",
  "Participated Before",
  "Terms Accepted",
  // Raw JSON backup
  "Participants JSON",
];

// ── Entry point ──────────────────────────────────────────────
function doPost(e) {
  try {
    if (!SPREADSHEET_ID) {
      return jsonResponse({ ok: false, message: "Missing SPREADSHEET_ID script property." }, 500);
    }

    // 0. Parse body early so secret can be read from payload too
    if (!e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, message: "Empty request body" }, 400);
    }
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      return jsonResponse({ ok: false, message: "Invalid JSON body" }, 400);
    }

    // 1. Secret validation (header or query param)
    if (WEBHOOK_SECRET) {
      // Apps Script Web Apps do not reliably expose custom headers in `e`.
      // Accept secret from query/body keys used by frontend.
      var secret =
        (e.parameter && (e.parameter.secret || e.parameter.webhookSecret || e.parameter.token)) ||
        data.secret ||
        data.webhookSecret ||
        data.token;
      if (secret !== WEBHOOK_SECRET) {
        return jsonResponse({ ok: false, message: "Unauthorized" }, 403);
      }
    }

    // 2. Validate formKind
    if (data.formKind !== "hackathon_v1") {
      return jsonResponse({ ok: false, message: "Unknown form kind: " + data.formKind }, 400);
    }

    // 3. Parse participants from either participantsJson (string)
    //    or participants (array/object) depending on frontend payload.
    var participants = parseParticipants(data);

    // 4. Build flat row
    var row = buildRow(data, participants);

    // 5. Write to sheet
    writeRow(row);

    return jsonResponse({ ok: true, message: "Registration saved." });
  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return jsonResponse({ ok: false, message: "Internal error: " + err.message }, 500);
  }
}

// ── Helpers ──────────────────────────────────────────────────

/**
 * Builds a flat array matching COLUMNS order.
 * @param {Object} d - parsed JSON body
 * @param {Array}  participants - parsed participant array (up to 5)
 */
function buildRow(d, participants) {
  var row = [
    d.submittedAt       || new Date().toISOString(),
    d.formKind          || "hackathon_v1",
    d.teamName          || "",
    d.leaderName        || "",
    d.leaderEmail       || "",
    d.leaderPhone       || "",
    d.collegeName       || "St. Xavier's College, Ranchi",
    d.department        || "",
    d.semester          || "",
    d.teamSize          != null ? d.teamSize : "",
  ];

  // Participants 1-5 (flat columns)
  for (var i = 0; i < 5; i++) {
    var p = participants[i] || {};
    row.push(
      p.fullName    || "",
      p.email       || "",
      p.phone       || "",
      p.rollNumber  || "",
      p.department  || ""
    );
  }

  // Project fields
  row.push(
    d.projectTitle        || "",
    d.problemStatement    || "",
    d.projectDescription  || "",
    d.whyParticipate      || "",
    toBool(d.participatedBefore) ? "Yes" : "No",
    toBool(d.terms) ? "Yes" : "No",
    d.participantsJson    || "[]"   // raw backup
  );

  return row;
}

/**
 * Appends a row to the sheet, creating the header row if needed.
 * @param {Array} row
 */
function writeRow(row) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Auto-create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write header row on first use
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length)
         .setFontWeight("bold")
         .setBackground("#f3f3f3");
    sheet.setFrozenRows(1);
  }

  if (row.length !== COLUMNS.length) {
    throw new Error("Column mismatch. Expected " + COLUMNS.length + " values, got " + row.length + ".");
  }

  sheet.appendRow(row);
}

function parseParticipants(d) {
  if (Array.isArray(d.participants)) return d.participants;

  if (d.participants && typeof d.participants === "object") {
    return [d.participants];
  }

  if (typeof d.participantsJson === "string" && d.participantsJson) {
    try {
      var parsed = JSON.parse(d.participantsJson);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === "object") return [parsed];
    } catch (_) {}
  }

  return [];
}

function toBool(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    var v = value.trim().toLowerCase();
    return v === "true" || v === "yes" || v === "1" || v === "on";
  }
  return false;
}

/**
 * Returns a JSON ContentService response.
 * @param {Object} obj
 * @param {number} [status] - ignored by Apps Script but documented for clarity
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Optional: GET health-check ────────────────────────────────
function doGet() {
  return jsonResponse({ ok: true, message: "Xavathon webhook is live." });
}
