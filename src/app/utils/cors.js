// src/app/utils/cors.js
export function validateCors(request) {
  const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];
  const origin = request.headers.get('origin');

  if (!allowedOrigins.includes(origin) && origin !== request.nextUrl.origin) {
    return true;
  }

  return false;
}