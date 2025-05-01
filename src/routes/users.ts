import { Router } from "express";
import AppUser from "../database/entities/AppUser";

const usersRouter = Router();

usersRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await AppUser.findOneBy({ id: +id });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  const { password_hash, ...userInfo } = user;

  res.status(200).send({ user: userInfo });
});

export default usersRouter;
