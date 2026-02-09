// src/app/utils/rateLimiter.js
import { RateLimiterMemory } from 'rate-limiter-flexible';

const defaultRateLimit = parseInt(process.env.RATE_LIMIT_DEFAULT_PER_MIN, 10) || 60;
const aiLabRateLimit = parseInt(process.env.RATE_LIMIT_AI_LAB_PER_MIN, 10) || 20;

const rateLimiter = new RateLimiterMemory({
  points: defaultRateLimit,
  duration: 60,
});

const aiLabRateLimiter = new RateLimiterMemory({
  points: aiLabRateLimit,
  duration: 60,
});

export function rateLimiter(request) {
  const pathname = request.nextUrl.pathname;
  const ip = request.headers.get('x-forwarded-for') || request.ip;
  const limiter = pathname.startsWith('/api/ai-lab') ? aiLabRateLimiter : rateLimiter;

  try {
    limiter.consume(ip);
    return null;
  } catch (rejRes) {
    return { retryAfter: Math.ceil(rejRes.msBeforeNext / 1000), requestId: request.headers.get('x-request-id') };
  }
}