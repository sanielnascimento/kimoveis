import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepo } from "../interfaces";

const existsEnsure = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const userRepository: iUserRepo = AppDataSource.getRepository(User);

  const validUser: User | null = await userRepository.findOne({
    where: { id: Number(req.params.id) },
  });

  if (!validUser) {throw new AppError("User not found", 404)};

  return next();
};


const uniqEmailEnsure = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  
  if (req.body.email) {
    const validUser: User | null = await userRepo.findOne({
      where: { email: req.body.email },
    });

    if (validUser) throw new AppError("Email already exists", 409);
  }

  return next();
};

export default { existsEnsure, uniqEmailEnsure };