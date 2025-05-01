require("@dotenvx/dotenvx").config({ path: [".env", ".env.development"] });
import path from "path";
import { glob } from "glob";
import { DataSource } from "typeorm";
import AppUser from "./entities/AppUser";
import Post from "./entities/Post";

const migrations = glob.sync(path.resolve(__dirname, "./migrations/*.ts"));

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.APP_DB_HOST,
  database: process.env.APP_DB_NAME,
  username: process.env.APP_DB_USERNAME,
  password: process.env.APP_DB_PASSWORD,
  entities: [AppUser, Post],
  migrations,
  logging: true
});
