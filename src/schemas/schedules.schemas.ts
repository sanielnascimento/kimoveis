import { z } from "zod";

export const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  userId: z.number().nullish(),
});

export const scheduleRequestSchema = scheduleSchema.omit({ id: true, userId: true });
