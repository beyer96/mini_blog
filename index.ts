require("@dotenvx/dotenvx").config({ path: [".env", ".env.development"] });

// https://github.com/TypeStrong/ts-node/issues/391#issuecomment-1015693982
import "./src/types/express";

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource } from "./src/database";
import authRouter from "./src/routes/auth";
import usersRouter from "./src/routes/users";
import postsRouter from "./src/routes/posts";
import errorHandler from "./src/middlewares/error-handler";

const PORT = 3000;
const app = express();

AppDataSource.initialize()
  .then(() => console.log("Data source ready!"))
  .catch((error) => console.log("Something went wrong with the data source...\n" + error.message))

app.use(cors({ origin: process.env.FRONTEND_BASE_URL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.send("Index");
});

app.use(authRouter);

app.use(usersRouter);
app.use(postsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running..."));
