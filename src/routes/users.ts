import { Router } from "express";
import AppUser from "../database/entities/AppUser";
import NotFoundError from "../errors/NotFoundError";
import authenticate from "../middlewares/authenticate";

const usersRouter = Router();

usersRouter.get("/users/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const user = await AppUser.findOneBy({ id: +id });
  if (!user) throw new NotFoundError({ message: "User not found." });

  const { password_hash, ...userInfo } = user;

  res.status(200).send({ user: userInfo });
});

export default usersRouter;
