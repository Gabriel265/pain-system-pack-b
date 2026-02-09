// src/app/api/audit.js
export function auditLog(request, changes) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action: changes.action,
    actor: request.headers.get('user_role') || 'unknown',
    ip: request.headers.get('x-forwarded-for') || request.ip,
    userAgent: request.headers.get('user-agent'),
    route: request.url,
    correlationId: changes.correlationId,
  };
  console.log(JSON.stringify(logEntry));
}
