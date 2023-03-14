import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().min(4).max(20),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userUpdateSchema = userCreateSchema
  .omit({
    admin: true,
  })
  .partial();

export const userResponseSchema = userSchema.omit({ password: true });
export const usersResponseSchema = z.array(userResponseSchema);
