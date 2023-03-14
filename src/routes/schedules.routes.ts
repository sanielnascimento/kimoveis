import { Router } from "express";
import { schedulesControllers } from "../controllers";
import { tokenMiddlewares, validateDataMiddleware } from "../middlewares";
import { scheduleRequestSchema } from "../schemas";

const schedulesRouters: Router = Router();

schedulesRouters.post(
  "",
  tokenMiddlewares.verifyTokenMiddleware,
  validateDataMiddleware(scheduleRequestSchema),
  schedulesControllers.create
);

schedulesRouters.get(
  "/realEstate/:id",
  tokenMiddlewares.verifyTokenMiddleware,
  tokenMiddlewares.adminPermissionsMiddleware,
  schedulesControllers.readByRealEstate
);

export default schedulesRouters;
