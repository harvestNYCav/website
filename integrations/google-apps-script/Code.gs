/**
 * Harvest email-to-calendar automation.
 *
 * Run setup() once from a standalone Google Apps Script project owned by
 * harvestnycav@gmail.com. The script generates a private subject token,
 * installs a fifteen-minute trigger, and creates Gmail status labels.
 */

const CONFIG = Object.freeze({
  calendarId: "harvestnycav@gmail.com",
  inboxAddress: "harvestnycav@gmail.com",
  timeZone: "America/New_York",
  processedLabel: "Harvest/Calendar-Processed",
  errorLabel: "Harvest/Calendar-Error",
  searchWindowDays: 7,
  stateRetentionDays: 45,
  searchPageSize: 100,
  maxThreadsPerRun: 500,
  maxEventDurationDays: 14,
  maxTitleLength: 120,
  maxLocationLength: 250,
  maxDescriptionLength: 1500,
  maxLinkLength: 500,

  // Leave empty to use the secret subject token as the only submission gate.
  // Add lowercase email addresses here later if an allowlist is desired.
  allowedSenders: [],
});

const PROPERTY_KEYS = Object.freeze({
  subjectToken: "SUBJECT_TOKEN",
  processedPrefix: "PROCESSED_MESSAGE_",
  failedPrefix: "FAILED_MESSAGE_",
});

/**
 * One-time setup. Creates labels, generates the private subject prefix, and
 * installs a fifteen-minute trigger. Safe to run again; duplicate triggers are
 * removed first.
 */
function setup() {
  getOrCreateLabel_(CONFIG.processedLabel);
  getOrCreateLabel_(CONFIG.errorLabel);

  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty(PROPERTY_KEYS.subjectToken)) {
    properties.setProperty(PROPERTY_KEYS.subjectToken, generateSubjectToken_());
  }

  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "processEventEmails")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("processEventEmails")
    .timeBased()
    .everyMinutes(15)
    .create();

  console.log("Setup complete.\n\n" + getSubmissionInstructions());
}

/**
 * Polls Gmail for messages containing the private token and publishes valid
 * submissions to the configured Google Calendar. The subject prefix is
 * removed before the public event is created.
 */
function processEventEmails() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) {
    console.log("Another email-processing run is already active.");
    return;
  }

  try {
    const token = getSubjectToken_();
    const exactPrefix = `[${token}] `;
    const query = [
      `deliveredto:${CONFIG.inboxAddress}`,
      "-from:me",
      `newer_than:${CONFIG.searchWindowDays}d`,
      `subject:${token}`,
    ].join(" ");
    const properties = PropertiesService.getScriptProperties();
    const state = properties.getProperties();
    pruneOldState_(properties, state);
    const processedLabel = getOrCreateLabel_(CONFIG.processedLabel);
    const errorLabel = getOrCreateLabel_(CONFIG.errorLabel);
    const calendar = CalendarApp.getCalendarById(CONFIG.calendarId);

    if (!calendar) {
      throw new Error(`Calendar not found or not writable: ${CONFIG.calendarId}`);
    }

    for (
      let offset = 0;
      offset < CONFIG.maxThreadsPerRun;
      offset += CONFIG.searchPageSize
    ) {
      const remaining = CONFIG.maxThreadsPerRun - offset;
      const pageSize = Math.min(CONFIG.searchPageSize, remaining);
      const threads = GmailApp.search(query, offset, pageSize);

      threads.forEach((thread) => {
        thread.getMessages().forEach((message) => {
          processMessage_(
            message,
            thread,
            calendar,
            properties,
            state,
            processedLabel,
            errorLabel,
            exactPrefix,
          );
        });
      });

      if (threads.length < pageSize) break;
    }
  } finally {
    lock.releaseLock();
  }
}

function processMessage_(
  message,
  thread,
  calendar,
  properties,
  state,
  processedLabel,
  errorLabel,
  exactPrefix,
) {
  const messageId = message.getId();
  const processedKey = PROPERTY_KEYS.processedPrefix + messageId;
  const failedKey = PROPERTY_KEYS.failedPrefix + messageId;

  if (state[processedKey] || state[failedKey]) {
    return;
  }

  const subject = message.getSubject();

  // This intentionally rejects replies and forwards such as "Re:" and "Fwd:".
  if (!subject.startsWith(exactPrefix)) {
    return;
  }

  try {
    enforceAllowedSender_(message.getFrom());

    const title = subject.slice(exactPrefix.length).trim();
    validateLength_(title, "Event title", 1, CONFIG.maxTitleLength);

    const fields = parseFields_(message.getPlainBody());
    const start = parseDateTime_(fields.START, "START");
    const end = parseDateTime_(fields.END, "END");

    if (end.getTime() <= start.getTime()) {
      throw validationError_("END must be later than START.");
    }

    const maxDurationMs = CONFIG.maxEventDurationDays * 24 * 60 * 60 * 1000;
    if (end.getTime() - start.getTime() > maxDurationMs) {
      throw validationError_(
        `Events cannot be longer than ${CONFIG.maxEventDurationDays} days.`,
      );
    }

    const location = fields.LOCATION || "";
    const publicDescription = fields.DESCRIPTION || "";
    const publicLink = fields.LINK || "";

    validateLength_(location, "LOCATION", 0, CONFIG.maxLocationLength);
    validateLength_(
      publicDescription,
      "DESCRIPTION",
      0,
      CONFIG.maxDescriptionLength,
    );
    validateLength_(publicLink, "LINK", 0, CONFIG.maxLinkLength);

    if (publicLink && !/^https:\/\//i.test(publicLink)) {
      throw validationError_("LINK must begin with https://.");
    }

    const description = [publicDescription, publicLink]
      .filter(Boolean)
      .join("\n\n");
    const recurrence = buildRecurrence_(fields, start);

    let event = findExistingEvent_(
      calendar,
      start,
      end,
      title,
      location,
      description,
      messageId,
      Boolean(recurrence),
    );

    if (!event) {
      const options = {
        description,
        location,
        sendInvites: false,
      };

      event = recurrence
        ? calendar.createEventSeries(title, start, end, recurrence, options)
        : calendar.createEvent(title, start, end, options);
      event.setTag("harvestGmailMessageId", messageId);
    }

    const processedState = JSON.stringify({
      eventId: event.getId(),
      processedAt: new Date().toISOString(),
    });
    properties.setProperty(processedKey, processedState);
    state[processedKey] = processedState;

    processedLabel.addToThread(thread);
    errorLabel.removeFromThread(thread);
    console.log(`Created calendar event "${title}" from Gmail message ${messageId}.`);
  } catch (error) {
    errorLabel.addToThread(thread);

    if (error && error.isValidationError) {
      const failedState = JSON.stringify({
        error: error.message,
        failedAt: new Date().toISOString(),
      });
      properties.setProperty(failedKey, failedState);
      state[failedKey] = failedState;
    }

    console.error(`Could not process Gmail message ${messageId}: ${error.message}`);
  }
}

/**
 * Returns the current private prefix and the exact email template. Run this
 * function whenever submission instructions need to be shared with someone.
 */
function getSubmissionInstructions() {
  const prefix = `[${getSubjectToken_()}] `;

  return [
    `Subject: ${prefix}Event title`,
    "",
    "START: 2026-08-14 19:00",
    "END: 2026-08-14 21:00",
    "LOCATION: 206 E 29th Street",
    "DESCRIPTION: Public description shown on the calendar",
    "LINK: https://example.com/event-details",
    "",
    "For a weekly event, also add:",
    "REPEAT: WEEKLY",
    "UNTIL: 2027-12-31",
    "",
    "Omit UNTIL to repeat indefinitely. The weekday comes from START.",
    `Times use ${CONFIG.timeZone} and 24-hour formatting.`,
  ].join("\n");
}

/**
 * Rotates the private subject token if it is ever disclosed. Previously sent
 * messages using the old token will no longer qualify.
 */
function rotateSubjectToken() {
  PropertiesService.getScriptProperties().setProperty(
    PROPERTY_KEYS.subjectToken,
    generateSubjectToken_(),
  );
  console.log("Subject token rotated.\n\n" + getSubmissionInstructions());
}

function parseFields_(plainBody) {
  const fields = {};
  const supportedFields = new Set([
    "START",
    "END",
    "LOCATION",
    "DESCRIPTION",
    "LINK",
    "REPEAT",
    "UNTIL",
  ]);

  plainBody
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((line) => {
      const match = /^([A-Z]+):\s*(.*)$/i.exec(line.trim());
      if (!match) return;

      const key = match[1].toUpperCase();
      if (supportedFields.has(key)) {
        if (fields[key] !== undefined) {
          throw validationError_(`Duplicate ${key} field.`);
        }
        fields[key] = match[2].trim();
      }
    });

  if (!fields.START) {
    throw validationError_("Missing required START field.");
  }
  if (!fields.END) {
    throw validationError_("Missing required END field.");
  }

  return fields;
}

function parseDateTime_(value, fieldName) {
  const expectedFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (!expectedFormat.test(value)) {
    throw validationError_(
      `${fieldName} must use YYYY-MM-DD HH:mm in 24-hour time.`,
    );
  }

  let parsed;
  try {
    parsed = Utilities.parseDate(value, CONFIG.timeZone, "yyyy-MM-dd HH:mm");
  } catch (error) {
    throw validationError_(`${fieldName} is not a valid date and time.`);
  }

  if (Utilities.formatDate(parsed, CONFIG.timeZone, "yyyy-MM-dd HH:mm") !== value) {
    throw validationError_(`${fieldName} is not a valid date and time.`);
  }

  return parsed;
}

function buildRecurrence_(fields, start) {
  const repeat = (fields.REPEAT || "").trim().toUpperCase();

  if (!repeat) {
    if (fields.UNTIL) {
      throw validationError_("UNTIL requires REPEAT: WEEKLY.");
    }
    return null;
  }

  if (repeat !== "WEEKLY") {
    throw validationError_("REPEAT currently supports only WEEKLY.");
  }

  const recurrence = CalendarApp.newRecurrence().setTimeZone(CONFIG.timeZone);
  const weeklyRule = recurrence.addWeeklyRule();

  if (fields.UNTIL) {
    const until = parseUntilDate_(fields.UNTIL);
    if (until.getTime() < start.getTime()) {
      throw validationError_("UNTIL cannot be earlier than START.");
    }
    weeklyRule.until(until);
  }

  return recurrence;
}

function parseUntilDate_(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw validationError_("UNTIL must use YYYY-MM-DD.");
  }

  let parsed;
  try {
    parsed = Utilities.parseDate(
      `${value} 23:59`,
      CONFIG.timeZone,
      "yyyy-MM-dd HH:mm",
    );
  } catch (error) {
    throw validationError_("UNTIL is not a valid date.");
  }

  if (Utilities.formatDate(parsed, CONFIG.timeZone, "yyyy-MM-dd") !== value) {
    throw validationError_("UNTIL is not a valid date.");
  }

  return parsed;
}

function enforceAllowedSender_(fromHeader) {
  if (!CONFIG.allowedSenders.length) return;

  const sender = extractEmailAddress_(fromHeader);
  const allowed = CONFIG.allowedSenders.map((email) => email.toLowerCase());
  if (!allowed.includes(sender)) {
    throw validationError_(`Sender is not allowed: ${sender}`);
  }
}

function extractEmailAddress_(fromHeader) {
  const angleBracketMatch = /<([^>]+)>/.exec(fromHeader);
  return (angleBracketMatch ? angleBracketMatch[1] : fromHeader)
    .trim()
    .toLowerCase();
}

function validateLength_(value, fieldName, minLength, maxLength) {
  if (value.length < minLength || value.length > maxLength) {
    throw validationError_(
      `${fieldName} must be between ${minLength} and ${maxLength} characters.`,
    );
  }
}

function validationError_(message) {
  const error = new Error(message);
  error.isValidationError = true;
  return error;
}

function findExistingEvent_(
  calendar,
  start,
  end,
  title,
  location,
  description,
  messageId,
  isRecurring,
) {
  const searchStart = new Date(start.getTime() - 60 * 1000);
  const searchEnd = new Date(end.getTime() + 60 * 1000);

  return (
    calendar
      .getEvents(searchStart, searchEnd)
      .find((event) => {
        if (event.getTag("harvestGmailMessageId") === messageId) return true;

        return (
          event.getTitle() === title &&
          event.getStartTime().getTime() === start.getTime() &&
          event.getEndTime().getTime() === end.getTime() &&
          event.getLocation() === location &&
          event.getDescription() === description &&
          event.isRecurringEvent() === isRecurring
        );
      }) || null
  );
}

function pruneOldState_(properties, state) {
  const cutoff = Date.now() - CONFIG.stateRetentionDays * 24 * 60 * 60 * 1000;

  Object.keys(state).forEach((key) => {
    const isMessageState =
      key.startsWith(PROPERTY_KEYS.processedPrefix) ||
      key.startsWith(PROPERTY_KEYS.failedPrefix);
    if (!isMessageState) return;

    try {
      const value = JSON.parse(state[key]);
      const timestamp = value.processedAt || value.failedAt;
      if (timestamp && new Date(timestamp).getTime() < cutoff) {
        properties.deleteProperty(key);
        delete state[key];
      }
    } catch (error) {
      properties.deleteProperty(key);
      delete state[key];
    }
  });
}

function getSubjectToken_() {
  const token = PropertiesService.getScriptProperties().getProperty(
    PROPERTY_KEYS.subjectToken,
  );

  if (!token) {
    throw new Error("Subject token is missing. Run setup() first.");
  }

  return token;
}

function generateSubjectToken_() {
  const randomPart = Utilities.getUuid()
    .replace(/-/g, "")
    .slice(0, 12)
    .toUpperCase();
  return `HNYCEVT${randomPart}`;
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}
