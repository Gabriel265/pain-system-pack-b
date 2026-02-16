// src/app/api/safeMode.js
export function isSafeMode() {
  return process.env.FEATURE_SAFE_MODE === 'true';
}
