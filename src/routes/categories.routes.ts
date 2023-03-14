import { Router } from "express";
import { categoryControllers } from "../controllers";
import { tokenMiddlewares, validateDataMiddleware } from "../middlewares";
import { categoryCreateSchema } from "../schemas";

const categoriesRouters: Router = Router();

categoriesRouters.post(
  "",
  tokenMiddlewares.verifyTokenMiddleware,
  tokenMiddlewares.adminPermissionsMiddleware,
  validateDataMiddleware(categoryCreateSchema),
  categoryControllers.create
);

categoriesRouters.get("", categoryControllers.read);

categoriesRouters.get("/:id/realEstate", categoryControllers.readById);

export default categoriesRouters;
