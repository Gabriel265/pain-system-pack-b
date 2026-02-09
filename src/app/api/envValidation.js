// src/app/api/envValidation.js
export function validateEnv() {
  const requiredVars = ['ADMIN_EMAIL', 'ADMIN_PASSWORD', 'GITHUB_TOKEN', 'CORS_ORIGINS'];
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}
