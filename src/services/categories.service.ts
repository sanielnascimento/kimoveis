import { AppDataSource } from "../data-source";
import { Category, RealEstate } from "../entities";
import { AppError } from "../errors";
import {
  iCategory,
  iCategoryList,
  iCategoryRequest,
  iCatRepo,
} from "../interfaces";
import { categorySchema, categoryListSchema } from "../schemas";

const create = async (categBody: iCategoryRequest): Promise<iCategory> => {
  const categRepo: iCatRepo = AppDataSource.getRepository(Category);

  const validCategory: Category | null = await categRepo.findOne({
    where: { name: categBody.name },
  });

  if (validCategory) throw new AppError("Category already exists", 409);

  const category = await categRepo.save(categRepo.create(categBody));

  return categorySchema.parse(category);
};


const read = async (): Promise<iCategoryList> => {
  const categRepo: iCatRepo = AppDataSource.getRepository(Category);

  return categoryListSchema.parse(await categRepo.find());
};


const readById = async (categId: number): Promise<Category> => {
  const categRepo: iCatRepo = AppDataSource.getRepository(Category);

  const currentCat: Category | null = await categRepo.findOne({
    where: { id: categId },
    relations: { realEstate: true },
  });
  
  if (!currentCat) throw new AppError("Category not found", 404);
  
  return currentCat;
};

export default { create, read, readById };
