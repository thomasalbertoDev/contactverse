import { ZodType, z } from 'zod';

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.number().int().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
  });

  static readonly GET: ZodType = z.object({
    contact_id: z.number().int().positive(),
    address_id: z.number().int().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().int().positive(),
    contact_id: z.number().int().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(10),
  });

  static readonly DELETE: ZodType = z.object({
    contact_id: z.number().int().positive(),
    address_id: z.number().int().positive(),
  });
}
