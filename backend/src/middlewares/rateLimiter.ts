import rateLimit from 'express-rate-limit';

export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Allow 1000 submissions per IP per window (handles shared office/event WiFi)
  message: {
    success: false,
    message: 'Too many submissions from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per minute
  message: {
    success: false,
    message: 'Too many requests, please slow down',
  },
});
