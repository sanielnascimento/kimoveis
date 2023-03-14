import { Router } from "express";
import { realEstateControllers } from "../controllers";
import { tokenMiddlewares, validateDataMiddleware } from "../middlewares";
import { realEstateReqSchema } from "../schemas";

const realEstateRouters: Router = Router();

realEstateRouters.post(
  "",
  tokenMiddlewares.verifyTokenMiddleware,
  tokenMiddlewares.adminPermissionsMiddleware,
  validateDataMiddleware(realEstateReqSchema),
  realEstateControllers.create
);

realEstateRouters.get("", realEstateControllers.read);

export default realEstateRouters;
