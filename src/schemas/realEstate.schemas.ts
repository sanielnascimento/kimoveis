import { z } from "zod";

export const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const addressRequestSchema = addressSchema.omit({ id: true });

export const realEstateSchema = z.object({
  id: z.number(),
  value: z.union([z.string(), z.number()]),
  size: z.number().positive(),
  address: addressSchema,
  categoryId: z.number(),
  sold: z.boolean().optional().default(false),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export const realEstateReqSchema = realEstateSchema
  .pick({
    value: true,
    size: true,
    categoryId: true,
  })
  .extend({ address: addressRequestSchema });

export const realEstateRespSchema = realEstateSchema
  .omit({ categoryId: true, value: true })
  .extend({ value: z.union([z.string(), z.number()]).transform((x) => Number(x).toFixed(2).toString()) });

export const realEstatesSchema = z.array(realEstateRespSchema);
