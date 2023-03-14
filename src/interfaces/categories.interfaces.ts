import { categorySchema, categoryCreateSchema, categoryListSchema } from "../schemas";
import { z } from "zod";
import { Category } from "../entities";
import { Repository } from "typeorm";

export type iCategory = z.infer<typeof categorySchema>
export type iCategoryRequest = z.infer<typeof categoryCreateSchema>
export type iCategoryList = z.infer<typeof categoryListSchema>
export type iCatRepo = Repository<Category>