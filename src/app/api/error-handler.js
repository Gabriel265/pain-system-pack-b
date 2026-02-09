// src/app/api/error-handler.js
import { auditLog } from './audit';

export function withErrorHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      const isProduction = process.env.NODE_ENV === 'production';
      const errorMessage = isProduction ? 'Internal Server Error' : error.message;

      auditLog(req, { action: 'error', error: errorMessage });

      res.status(500).json({ error: errorMessage });
    }
  };
}
