import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const minimumDataMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  if (Object.values(req.body).length < 1) {
    throw new AppError(
      "At least one of these keys is required: name, email or password.",
      400,
    );
  }
  return next();
};

export default minimumDataMiddleware;
