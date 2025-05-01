import { Router } from "express";
import Post from "../database/entities/Post";

const postsRouter = Router();

postsRouter.route("/posts")
  .get(async (req, res) => {
    const posts = await Post.find();

    res.status(200).send({ posts });
  })

export default postsRouter;
