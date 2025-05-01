require("@dotenvx/dotenvx").config({ path: [".env", ".env.development"] });

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppDataSource } from "./src/database";
import authRouter from "./src/routes/auth";
import usersRouter from "./src/routes/users";

const PORT = 3000;
const app = express();

AppDataSource.initialize()
  .then(() => console.log("Data source ready!"))
  .catch((error) => console.log("Something went wrong with the data source...\n" + error.message))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.send("Index");
});

app.use(authRouter);
app.use(usersRouter);

app.listen(PORT, () => console.log("Server is running..."));
