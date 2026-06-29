# Environment

This document tracks local configuration, credentials, and environment variables for maintainers.

## Environment Variables
- `YOUTUBE_API_KEY` - document whether this is required, optional, or only used in local development.

## Secret-Like Local Paths
- No secret-like local paths were detected by the static scan.

## Maintainer Rules
- Use `.env.example` for shareable placeholders, never real secrets.
- Keep `credentials/`, `tokens/`, and machine-local assistant settings ignored unless a file is explicitly a sanitized fixture.
- Rotate any real credential that was accidentally committed.
