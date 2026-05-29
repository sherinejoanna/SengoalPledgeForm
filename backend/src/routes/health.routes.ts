import { Router, Request, Response } from 'express'
import { prisma } from '../prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    // Quick DB check
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() })
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected', timestamp: new Date().toISOString() })
  }
})

export default router
