import { Request, Response, NextFunction } from 'express';
import { PledgeService } from '../services/pledge.service';
import { createPledgeSchema, updatePledgeStatusSchema } from '../validations/pledge.validation';

export class PledgeController {

  // POST /api/pledges — public
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createPledgeSchema.parse(req.body);
      const pledge = await PledgeService.createPledge(validatedData);

      res.status(201).json({
        success: true,
        message: 'Pledge submitted successfully. Thank you for your commitment!',
        data: { id: pledge.id, fullName: pledge.fullName, createdAt: pledge.createdAt },
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      next(error);
    }
  }

  // GET /api/pledges — admin
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, search, isVerified } = req.query;

      const result = await PledgeService.getAllPledges({
        page:       page   ? parseInt(page as string)   : undefined,
        limit:      limit  ? parseInt(limit as string)  : undefined,
        search:     search as string | undefined,
        isVerified: isVerified === 'true' ? true : isVerified === 'false' ? false : undefined,
      });

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pledges/stats — admin
  static async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await PledgeService.getStats();
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pledges/:id — admin
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const pledge = await PledgeService.getPledgeById(req.params.id);
      if (!pledge) {
        return res.status(404).json({ success: false, message: 'Pledge not found' });
      }
      res.status(200).json({ success: true, data: pledge });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/pledges/:id — admin
  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { isVerified } = updatePledgeStatusSchema.parse(req.body);
      const pledge = await PledgeService.updatePledgeStatus(req.params.id, isVerified);
      res.status(200).json({ success: true, message: `Pledge ${isVerified ? 'verified' : 'unverified'} successfully`, data: pledge });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
      }
      next(error);
    }
  }

  // DELETE /api/pledges/:id — admin
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await PledgeService.deletePledge(req.params.id);
      res.status(200).json({ success: true, message: 'Pledge deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/pledges/export — admin, returns CSV
  static async exportCsv(req: Request, res: Response, next: NextFunction) {
    try {
      const pledges = await PledgeService.getAllPledgesForExport();

      const header = [
        'ID', 'Full Name', 'Mobile', 'Email', 'Address', 'PIN Code',
        'Oil Type', 'Monthly Qty', 'Signature Name', 'Pledge Date',
        'Verified', 'Submitted At',
      ].join(',');

      const rows = pledges.map((p) => [
        p.id,
        `"${p.fullName.replace(/"/g, '""')}"`,
        p.mobile,
        p.email || '',
        `"${p.address.replace(/"/g, '""')}"`,
        p.pinCode,
        p.oilType || '',
        p.monthlyQty,
        p.signatureName || '',
        p.pledgeDate.toISOString().split('T')[0],
        p.isVerified ? 'Yes' : 'No',
        p.createdAt.toISOString(),
      ].join(','));

      const csv = [header, ...rows].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="pledges-${Date.now()}.csv"`);
      res.status(200).send(csv);
    } catch (error) {
      next(error);
    }
  }
}
