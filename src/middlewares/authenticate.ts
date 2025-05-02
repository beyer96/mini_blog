import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppUser from "../database/entities/AppUser";
import { isRevoked } from "../routes/auth";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw new Error("Unauthorized");
  if (await isRevoked(accessToken)) throw new Error("Invalid token!");

  const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
  if (!validToken) throw new Error("Unauthorized");

  const user = await AppUser.findOneBy({ username: (jwt.decode(accessToken) as JwtPayload).username });
  if (!user) throw new Error("User not found");

  const { password_hash, ...userInfo } = user;
  req.user = userInfo;

  next();
};

export default authenticate;
