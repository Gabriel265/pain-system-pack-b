// src/app/api/env-validation.js
const requiredEnvVars = [
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'CORS_ORIGINS',
  'NEXT_PUBLIC_APP_URL',
  'VERCEL_ENV',
  'NODE_ENV',
];

export function validateEnv() {
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }
}
