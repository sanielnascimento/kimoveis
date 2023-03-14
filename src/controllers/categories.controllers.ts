import { Request, Response } from "express";
import { Category } from "../entities";
import { categoryService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  return res.status(201).json(await categoryService.create(req.body));
};


const read = async (_: Request, res: Response): Promise<Response> => {
  return res.json(await categoryService.read());
};


const readById = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);
  const catRealEstates: Category = await categoryService.readById(id);

  return res.json(catRealEstates);
};

export default { create, read, readById };
