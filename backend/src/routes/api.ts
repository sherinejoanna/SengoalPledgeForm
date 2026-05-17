import { Router } from 'express';
import { PledgeController } from '../controllers/pledge.controller';
import { AuthController } from '../controllers/auth.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { submissionLimiter } from '../middlewares/rateLimiter';

const router = Router();

// ── PUBLIC ROUTES ─────────────────────────────────────────────────────────────
// POST /api/pledges  — submit a pledge (rate limited)
router.post('/pledges', submissionLimiter, PledgeController.create);

// POST /api/auth/login — admin login
router.post('/auth/login', AuthController.login);

// ── PROTECTED (ADMIN ONLY) ROUTES ─────────────────────────────────────────────
router.use(authenticate);
router.use(authorize(['ADMIN', 'STAFF']));

// NOTE: specific routes MUST come before :id to avoid route shadowing
router.get('/pledges/stats',  PledgeController.getStats);   // GET /api/pledges/stats
router.get('/pledges/export', PledgeController.exportCsv);  // GET /api/pledges/export  → CSV

router.get('/pledges',        PledgeController.getAll);     // GET /api/pledges?page=1&limit=10&search=...
router.get('/pledges/:id',    PledgeController.getById);    // GET /api/pledges/:id
router.patch('/pledges/:id',  PledgeController.updateStatus); // PATCH /api/pledges/:id  { isVerified: true }
router.delete('/pledges/:id', PledgeController.delete);     // DELETE /api/pledges/:id

export default router;
