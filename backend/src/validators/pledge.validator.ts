import { z } from 'zod'

export const pledgeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(255),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number format'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(6, 'Address must be at least 6 characters'),
  pinCode: z.string().regex(/^\d{6}$/, 'Invalid PIN code format'),
  oilType: z.string().optional().or(z.literal('')),
  monthlyQty: z.string().min(1, 'Monthly quantity is required'),
  signature: z.string().min(1, 'Signature is required'),
  signatureName: z.string().optional().or(z.literal('')),
  pledgeDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid pledge date format',
  }),
})

export type PledgeInput = z.infer<typeof pledgeSchema>
