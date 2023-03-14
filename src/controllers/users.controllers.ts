import { Request, Response } from "express";
import { iUserUpdateRequest } from "../interfaces";
import {usersService} from "../services";

const create = async ( req: Request, res: Response): Promise<Response> => {
  return res.status(201).json(await usersService.create(req.body));
};


const read = async ( _: Request, res: Response): Promise<Response> => {
  return res.json(await usersService.read());
};


const update = async ( req: Request, res: Response ): Promise<Response> => {
  const id: number = Number(req.params.id);
  const body: iUserUpdateRequest = req.body;

  return res.json(await usersService.update( id, body ));
};


const remove = async ( req: Request, res: Response): Promise<Response> => {
  await usersService.remove(Number(req.params.id))

  return res.status(204).send();
};

export default { create, read, update, remove }