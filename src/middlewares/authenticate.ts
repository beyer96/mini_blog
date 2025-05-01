import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppUser from "../database/entities/AppUser";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw new Error("Unauthorized");

  const validToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
  if (!validToken) throw new Error("Unauthorized");

  const user = await AppUser.findOneBy({ username: (jwt.decode(accessToken) as JwtPayload).username });
  if (!user) throw new Error("Not found");

  const { password_hash, ...userInfo } = user;
  // @ts-ignore TODO - fix this issue - before I compile the code, it throws typescript error for some reason
  res.user = userInfo;

  next();
};

export default authenticate;
