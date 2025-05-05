import { CookieOptions, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppUser from "../database/entities/AppUser";
import Redis from "ioredis";
import AuthenticationError from "../errors/AuthenticationError";
import authenticate from "../middlewares/authenticate";
import AuthorizationError from "../errors/AuthorizationError";

interface UserInfo {
  username: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 24 * 60 * 60; // 24 hours
const REFRESH_TOKEN_COOKIE_NAME = "mini_blog_app_refresh_token";
const REFRESH_TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: REFRESH_TOKEN_EXPIRATION_IN_SECONDS * 1000,
} satisfies CookieOptions;

const authRouter = Router();
const redis = new Redis();

export const isRevoked = async (token: string) => {
  return await redis.get(token) == "revoked";
}

const generateAccessToken = (userInfo: UserInfo) => {
  const accessToken = jwt.sign(userInfo, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_IN_SECONDS });

  return accessToken;
};

const generateRefreshToken = (userInfo: UserInfo) => {
  const refreshToken = jwt.sign(userInfo, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_IN_SECONDS });

  return refreshToken;
};

authRouter.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = AppUser.create({ username, email, password_hash: password });

  await newUser.save();
  const userInfo: UserInfo = { username, email };

  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  res.status(200).send({ user: userInfo, accessToken });
});

authRouter.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await AppUser.findOneBy({ username });
  if (!user) throw new AuthenticationError({ message: "Invalid credentials" });

  const passwordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!passwordCorrect) throw new AuthenticationError({ message: "Invalid credentials" });

  const { password_hash, ...userInfo } = user;
  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

  res.status(200).send({ user: userInfo, accessToken });
});

authRouter.post("/auth/refresh", async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) throw new AuthorizationError({ message: "Unauthorized" });
  if (await isRevoked(refreshToken)) throw new AuthorizationError({ message: "Unauthorized" })

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) throw new AuthorizationError({ message: "Unauthorized" });

    const decodedUserInfo = { email: decoded.email, username: decoded.username };
    const accessToken = generateAccessToken(decodedUserInfo);
    const refreshToken = generateRefreshToken(decodedUserInfo);

    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

    res.status(200).send({ user: decodedUserInfo, accessToken });
  });
});

authRouter.post("/auth/logout", async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) {
    res.sendStatus(204);
    return;
  }

  const accessToken = req.headers.authorization?.split(" ")[1];

  const revokeToken = (token: string) => {
    const tokenExp = (jwt.decode(token) as JwtPayload).exp;

    tokenExp && (tokenExp > Date.now() / 1000) && redis.setex(token, Math.round(tokenExp - Date.now() / 1000), "revoked");
  }

  accessToken && revokeToken(accessToken);

  revokeToken(refreshToken);
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

  res.sendStatus(204);
});

authRouter.get("/auth/session", authenticate, async (req, res) => {
  res.status(200).send({ user: req.user });
});

export default authRouter;
