# Security Overview

## Access Gating
- AI Lab and Admin routes are protected using Basic Auth with credentials from environment variables `ADMIN_USER` and `ADMIN_PASS`.

## Rate Limiting
- Default rate limit: 60 requests/minute per IP.
- AI Lab endpoints: 20 requests/minute per IP.
- Configurable via `RATE_LIMIT_DEFAULT_PER_MIN` and `RATE_LIMIT_AI_LAB_PER_MIN`.

## CORS Allowlist
- Controlled via `CORS_ORIGINS` environment variable.
- Defaults to same-origin if unset.

## Request ID Tracing
- Each request is assigned a unique `x-request-id` for tracing.

## Structured Logging
- Logs include method, path, status, duration, requestId, IP, and userAgent.
