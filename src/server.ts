import app from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const PORT: number = Number(process.env.APP_PORT!);
const runningMsg: string = `Server is running on port http://localhost:${PORT}`;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(runningMsg);
    });
  })
  .catch((error) => console.log(error));