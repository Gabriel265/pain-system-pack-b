# Pain System Pack-B – Website Application

## Overview

This application consists of a public-facing website and a private backend administration system.

## Environment Variables

### Required
- `ADMIN_USER`: Username for admin access.
- `ADMIN_PASS`: Password for admin access.
- `CORS_ORIGINS`: Comma-separated list of allowed origins for CORS.
- `NEXT_PUBLIC_APP_URL`: Public URL of the application.
- `VERCEL_ENV`: Vercel environment name.
- `NODE_ENV`: Node environment (development, production).

### Optional
- `RATE_LIMIT_DEFAULT_PER_MIN`: Default rate limit per minute.
- `RATE_LIMIT_AI_LAB_PER_MIN`: Rate limit for AI Lab endpoints per minute.

## Rate Limiting
- Default: 60 requests per minute per IP.
- Exceeding the limit returns a 429 error.

## Admin Access
- Admin access requires `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Use `/api/auth/login` to authenticate.
- Use `/api/auth/logout` to log out.

## Health Endpoint
- `/api/health` returns application health status.
- Includes version, timestamp, and environment information.
