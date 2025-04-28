require("@dotenvx/dotenvx").config({ path: [".env", ".env.development"] });

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./src/database";

const PORT = 3000;
const app = express();

AppDataSource.initialize()
  .then(() => console.log("Data source ready!"))
  .catch((error) => console.log("Something went wrong with the data source...\n" + error.message))

app.get("/", (_, res) => {
  res.send("Index");
});

app.listen(PORT, () => console.log("Server is running..."));
