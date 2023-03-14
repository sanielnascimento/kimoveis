import "express-async-errors";
import express, { Application, json } from "express";
import { errorHandlerMiddleware } from "./middlewares";
import {
  usersRouters,
  loginRouters,
  categoriesRouters,
  realEstateRouters,
  schedulesRouters,
} from "./routes";

const app: Application = express();

app.use(json());

app.use("/users", usersRouters);
app.use("/login", loginRouters);
app.use("/categories", categoriesRouters);
app.use("/realEstate", realEstateRouters);
app.use("/schedules", schedulesRouters);

app.use(errorHandlerMiddleware);

export default app;
