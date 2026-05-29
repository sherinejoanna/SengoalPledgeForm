import { Router } from 'express'
import { createPledge } from '../controllers/pledge.controller'

const router = Router()

router.post('/', createPledge)

export default router
