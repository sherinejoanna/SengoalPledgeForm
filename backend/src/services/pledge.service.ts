import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class PledgeService {

  // ── CREATE ──────────────────────────────────────────────────────────────────
  static async createPledge(data: any) {
    // Anti-spam: reject duplicate mobile submission within the last 24 hours
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);

    const existing = await prisma.pledge.findFirst({
      where: {
        mobile: data.mobile,
        createdAt: { gt: yesterday },
      },
    });

    if (existing) {
      const err: any = new Error('A pledge has already been submitted from this mobile number in the last 24 hours.');
      err.status = 409;
      throw err;
    }

    return prisma.pledge.create({
      data: {
        ...data,
        email: data.email || null,
        // Ensure pledgeDate is a proper Date object (Zod may already handle this)
        pledgeDate: data.pledgeDate instanceof Date ? data.pledgeDate : new Date(data.pledgeDate),
      },
    });
  }

  // ── READ ALL (paginated, filtered, searched) ─────────────────────────────────
  static async getAllPledges(query: {
    page?: number;
    limit?: number;
    search?: string;
    isVerified?: boolean;
  }) {
    const { page = 1, limit = 10, search, isVerified } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.PledgeWhereInput = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email:    { contains: search, mode: 'insensitive' } },
        { mobile:   { contains: search, mode: 'insensitive' } },
        { pinCode:  { contains: search, mode: 'insensitive' } },
      ];
    }

    if (typeof isVerified === 'boolean') {
      where.isVerified = isVerified;
    }

    const [total, pledges] = await Promise.all([
      prisma.pledge.count({ where }),
      prisma.pledge.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        // Never expose signature data in list view
        select: {
          id: true,
          fullName: true,
          mobile: true,
          email: true,
          address: true,
          pinCode: true,
          oilType: true,
          monthlyQty: true,
          signatureName: true,
          pledgeDate: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      pledges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ── READ ONE ─────────────────────────────────────────────────────────────────
  static async getPledgeById(id: string) {
    return prisma.pledge.findUnique({ where: { id } });
  }

  // ── UPDATE STATUS ────────────────────────────────────────────────────────────
  static async updatePledgeStatus(id: string, isVerified: boolean) {
    return prisma.pledge.update({
      where: { id },
      data: { isVerified },
    });
  }

  // ── DELETE ───────────────────────────────────────────────────────────────────
  static async deletePledge(id: string) {
    return prisma.pledge.delete({ where: { id } });
  }

  // ── STATS ────────────────────────────────────────────────────────────────────
  static async getStats() {
    const [total, verified, unverified, byMonthlyQty, byOilType] = await Promise.all([
      prisma.pledge.count(),
      prisma.pledge.count({ where: { isVerified: true } }),
      prisma.pledge.count({ where: { isVerified: false } }),
      prisma.pledge.groupBy({ by: ['monthlyQty'], _count: { _all: true }, orderBy: { _count: { monthlyQty: 'desc' } } }),
      prisma.pledge.groupBy({ by: ['oilType'],    _count: { _all: true }, orderBy: { _count: { oilType: 'desc' } } }),
    ]);

    return {
      total,
      verified,
      unverified,
      byMonthlyQty,
      byOilType,
    };
  }

  // ── CSV EXPORT ───────────────────────────────────────────────────────────────
  static async getAllPledgesForExport() {
    return prisma.pledge.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        mobile: true,
        email: true,
        address: true,
        pinCode: true,
        oilType: true,
        monthlyQty: true,
        signatureName: true,
        pledgeDate: true,
        isVerified: true,
        createdAt: true,
      },
    });
  }
}
