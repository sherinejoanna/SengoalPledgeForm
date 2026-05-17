import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status  = err.status  || 500;
  const message = err.message || 'Internal server error';

  // Log every error with timestamp and request info
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${status} ${message}`);
  if (status === 500) console.error(err.stack);

  // Prisma "record not found" → 404
  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }

  // Prisma unique constraint violation → 409
  if (err.code === 'P2002') {
    return res.status(409).json({ success: false, message: 'A record with this data already exists' });
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
