require("@dotenvx/dotenvx").config({ path: [".env", ".env.development"] });

// https://github.com/TypeStrong/ts-node/issues/391#issuecomment-1015693982
import "./src/types/express";

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppDataSource } from "./src/database";
import authRouter from "./src/routes/auth";
import usersRouter from "./src/routes/users";
import postsRouter from "./src/routes/posts";
import authenticate from "./src/middlewares/authenticate";

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

app.use(authenticate);

app.use(usersRouter);
app.use(postsRouter);

app.listen(PORT, () => console.log("Server is running..."));
