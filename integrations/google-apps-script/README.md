# Harvest email-to-calendar automation

This Google Apps Script turns specially formatted email messages sent to
`harvestnycav@gmail.com` into events on that account's Google Calendar. The
required `[HARVEST EVENT]` subject prefix is stripped before event creation, so
it never appears on the public calendar or website.

## Install

1. Sign in to [Google Apps Script](https://script.google.com/) as
   `harvestnycav@gmail.com` and create a standalone project named
   `Harvest Email to Calendar`.
2. Replace the contents of `Code.gs` with the repository's `Code.gs` file.
3. Save the project.
4. Select `setup` from the function menu and click **Run**.
5. Approve the Gmail and Google Calendar permissions. The trigger always runs
   as the account that creates it, so do this while signed in as the Harvest
   account.
6. Open **Execution log** to see the submission instructions.

`setup()` creates a trigger that checks Gmail every fifteen minutes and creates
these Gmail labels:

- `Harvest/Calendar-Processed`
- `Harvest/Calendar-Error`

## Email format

The sender must place `[HARVEST EVENT]` plus a space at the very beginning of a
new email subject:

```text
Subject: [HARVEST EVENT] Event title

START: 2026-08-14 19:00
END: 2026-08-14 21:00
LOCATION: 206 E 29th Street
DESCRIPTION: Public description shown on the calendar
LINK: https://example.com/event-details
```

Dates use `YYYY-MM-DD HH:mm`, 24-hour time, and the `America/New_York` time
zone. `START` and `END` are required. The other fields are optional and each
must remain on one line.

## Weekly recurring events

Add `REPEAT: WEEKLY` to create a weekly series. The weekday is taken from the
first `START` date, so a Sunday start repeats on Sundays and a Tuesday start
repeats on Tuesdays. `UNTIL` is optional; omitting it creates a series with no
scheduled end date.

```text
Subject: [HARVEST EVENT] Sunday Service

START: 2026-08-16 15:30
END: 2026-08-16 17:00
LOCATION: 206 E 29th Street
DESCRIPTION: Weekly bilingual worship service
REPEAT: WEEKLY
UNTIL: 2027-12-31
```

For Tuesday small group, use a Tuesday as the first `START` date. Send each
recurring ministry as its own email because its title and time become one
Google Calendar series.

Replies and forwards do not qualify because their subjects begin with `Re:` or
`Fwd:` instead of the exact `[HARVEST EVENT] ` prefix.

## Updating from the generated-prefix version

Replace the old `Code.gs` contents with this version and save it. You do not
need to run `setup()` again: the existing trigger will use the new code on its
next run, and the existing labels, processing history, and calendar events stay
intact. New submissions must use `[HARVEST EVENT]`; the old generated prefix
will no longer qualify.

## Operations

- Run `getSubmissionInstructions()` to display the fixed prefix and template.
- Messages with invalid fields receive the `Harvest/Calendar-Error` label.
  Correct them by sending a new email; the original failed message will not be
  retried.
- Successfully processed Gmail message IDs are stored in Script Properties, so
  trigger retries cannot create duplicate calendar events. Old processing
  records are automatically removed after 45 days.
- To add sender restrictions later, add lowercase addresses to
  `CONFIG.allowedSenders` in `Code.gs`.

The fixed prefix is a lightweight filter, not authentication. Anyone who knows
it can submit an event unless `CONFIG.allowedSenders` is populated.

The script publishes directly to `harvestnycav@gmail.com`'s primary calendar.
That calendar still needs to be public for anonymous website visitors to see
the events. If that account also contains private events, use a dedicated
secondary public calendar and replace `CONFIG.calendarId` in both the script
and the website embed.
