import { Request, Response, NextFunction } from 'express'
import { prisma } from '../prisma'
import { pledgeSchema } from '../validators/pledge.validator'
import { ZodError } from 'zod'

export const createPledge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Validate the incoming body against our Zod schema
    const validatedData = pledgeSchema.parse(req.body)

    // 2. Insert into the Supabase database via Prisma
    const pledge = await prisma.pledge.create({
      data: {
        fullName: validatedData.fullName,
        mobile: validatedData.mobile,
        email: validatedData.email || null,
        address: validatedData.address,
        pinCode: validatedData.pinCode,
        oilType: validatedData.oilType || null,
        monthlyQty: validatedData.monthlyQty,
        signature: validatedData.signature,
        signatureName: validatedData.signatureName || null,
        pledgeDate: new Date(validatedData.pledgeDate),
        isVerified: false,
      },
    })

    // 3. Return success response
    res.status(201).json({
      success: true,
      data: {
        id: pledge.id,
      },
      message: 'Pledge created successfully',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      })
      return
    }
    next(error)
  }
}
