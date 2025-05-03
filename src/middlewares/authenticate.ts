import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppUser from "../database/entities/AppUser";
import { isRevoked } from "../routes/auth";
import AuthenticationError from "../errors/AuthenticationError";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken || await isRevoked(accessToken)) throw new AuthenticationError({ message: "Access denied: No token provided." });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (error, _) => {
      if (error) throw new AuthenticationError({ message: "Access denied: Invalid token." });
    });

    const user = await AppUser.findOneBy({ username: (jwt.decode(accessToken) as JwtPayload).username });
    if (!user) throw new AuthenticationError({ message: "Access denied: Unable to authenticate." });

    const { password_hash, ...userInfo } = user;
    req.user = userInfo;

    next();
};

export default authenticate;
