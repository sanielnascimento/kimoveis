import { Router } from "express";
import { loginController } from "../controllers";
import { validateDataMiddleware } from "../middlewares";
import { LoginSchema } from "../schemas";

const loginRouters: Router = Router();

loginRouters.post("", validateDataMiddleware(LoginSchema), loginController);

export default loginRouters;
