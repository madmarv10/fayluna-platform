import rateLimit from 'express-rate-limit';

// General rate limiter for API routes
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests. Please try again later.',
  },
  headers: true,
});

// Stricter limiter for auth routes (e.g., login, register)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Limit to 10 requests per 15 minutes
  message: {
    status: 429,
    error: 'Too many attempts. Please wait and try again.',
  },
});
