import { Router } from "express";
import jwt from "jsonwebtoken";
import AppUser from "../database/entities/AppUser";

interface UserInfo {
  username: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRATION_IN_SECONDS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 24 * 60 * 60; // 24 hours
const REFRESH_TOKEN_COOKIE_NAME = "mini_blog_app_refresh_token";
const authRouter = Router();

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

  await AppUser.save({ username, email, password_hash: password });
  const userInfo: UserInfo = { username, email };

  const accessToken = generateAccessToken(userInfo);
  const refreshToken = generateRefreshToken(userInfo);

  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_EXPIRATION_IN_SECONDS * 1000
  });

  res.status(200).send({ user: userInfo, accessToken });
});

export default authRouter;
