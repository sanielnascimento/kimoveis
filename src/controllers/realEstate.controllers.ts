import { Request, Response } from "express";
import { realEstateService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  return res.status(201).json(await realEstateService.create(req.body));
};


const read = async (_: Request, res: Response): Promise<Response> => {
  return res.json(await realEstateService.read());
};

export default { create, read };