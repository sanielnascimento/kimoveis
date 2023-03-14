import { scheduleSchema, scheduleRequestSchema } from "../schemas";
import { z } from "zod";
import { Schedule } from "../entities";
import { Repository } from "typeorm";

export type iSchedule = z.infer<typeof scheduleSchema>;
export type iScheduleRequest = z.infer<typeof scheduleRequestSchema>;
export type iScheduleRepo = Repository<Schedule>;
