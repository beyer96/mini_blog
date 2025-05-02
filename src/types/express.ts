import AppUser from "../database/entities/AppUser";
import { PropertiesOnly } from "./utility";

export type UserData = Omit<PropertiesOnly<AppUser>, "password_hash">;

declare global {
  namespace Express {
    interface Request {
      user?: UserData
    }
  }
}
