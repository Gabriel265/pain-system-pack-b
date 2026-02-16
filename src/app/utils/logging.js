// src/app/utils/logging.js
import { nanoid } from 'nanoid';

export function attachRequestId(request) {
  const requestId = request.headers.get('x-request-id') || nanoid();
  request.headers.set('x-request-id', requestId);
  return requestId;
}

export function logRequest(request, requestId) {
  const logData = {
    method: request.method,
    path: request.nextUrl.pathname,
    status: request.status,
    durationMs: Date.now() - request.startTime,
    requestId,
    ip: request.headers.get('x-forwarded-for') || request.ip,
    userAgent: request.headers.get('user-agent')?.slice(0, 100),
  };
  console.log(JSON.stringify(logData));
}