import { z } from 'zod';

export const createPledgeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  pinCode: z.string().length(6, 'PIN code must be 6 digits'),
  oilType: z.string().optional(),
  monthlyQty: z.string().min(1, 'Please select a quantity'),
  signature: z.string().min(1, 'Signature is required'),
  signatureName: z.string().optional(),
  pledgeDate: z.string().transform((val) => new Date(val)),
});

export const updatePledgeStatusSchema = z.object({
  isVerified: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
