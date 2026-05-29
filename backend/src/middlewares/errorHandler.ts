import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Unhandled Error:', err)

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: [],
  })
}
