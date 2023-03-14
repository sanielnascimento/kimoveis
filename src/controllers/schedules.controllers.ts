import { Request, Response } from "express";
import { iScheduleRequest } from "../interfaces";
import { schedulesService } from "../services";

const create = async ( req: Request, res: Response): Promise<Response> => {
  const schedBody: iScheduleRequest = req.body;
  const userId: number = req.user.id;
  
  return res.status(201).json(await schedulesService.create(schedBody, userId ));
};


const readByRealEstate = async ( req: Request, res: Response): Promise<Response> => {
  const realId: number = Number(req.params.id);
  return res.json(await schedulesService.readByRealEstate(realId));
};

export default { create, readByRealEstate }