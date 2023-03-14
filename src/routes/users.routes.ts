import { Router } from "express";
import { usersControllers } from "../controllers";
import {
  tokenMiddlewares,
  usersMiddlewares,
  minimumDataMiddleware,
  validateDataMiddleware,
} from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

const usersRouters: Router = Router();

usersRouters.post(
  "",
  validateDataMiddleware(userCreateSchema),
  usersMiddlewares.uniqEmailEnsure,
  usersControllers.create
);

usersRouters.get(
  "",
  tokenMiddlewares.verifyTokenMiddleware,
  tokenMiddlewares.adminPermissionsMiddleware,
  usersControllers.read
);

usersRouters.patch(
  "/:id",
  tokenMiddlewares.verifyTokenMiddleware,
  usersMiddlewares.existsEnsure,
  tokenMiddlewares.userPermissionsMiddleware,
  validateDataMiddleware(userUpdateSchema),
  usersMiddlewares.uniqEmailEnsure,
  minimumDataMiddleware,
  usersControllers.update
);

usersRouters.delete(
  "/:id",
  tokenMiddlewares.verifyTokenMiddleware,
  usersMiddlewares.existsEnsure,
  tokenMiddlewares.adminPermissionsMiddleware,
  usersControllers.remove
);

export default usersRouters;
