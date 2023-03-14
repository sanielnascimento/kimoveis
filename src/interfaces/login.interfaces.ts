import { z } from "zod";
import { LoginSchema } from "../schemas";

export type iLoginRequest = z.infer<typeof LoginSchema>