import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";

const verifyTokenMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  let token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) throw new AppError("Missing bearer token", 401);

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) throw new AppError(error.message, 401);
    req.user = { id: Number(decoded.sub), admin: decoded.admin };
  });

  return next();
};


const adminPermissionsMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  if (req.user.admin !== true) throw new AppError("Insufficient permission", 403);

  return next();
};


const userPermissionsMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  if (req.user.admin !== true && Number(req.user.id) !== Number(req.params.id)) {
    throw new AppError("Insufficient permission", 403);
  }
    
  return next();
};

export default { verifyTokenMiddleware, adminPermissionsMiddleware, userPermissionsMiddleware }