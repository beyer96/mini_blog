import { Router } from "express";
import Post from "../database/entities/Post";
import authenticate from "../middlewares/authenticate";

const postsRouter = Router();

postsRouter.route("/posts")
  .get(async (req, res) => {
    const posts = await Post.find();

    res.status(200).send({ posts });
  })
  .post(authenticate, async (req, res) => {
    const { title, content, published_at } = req.body;

    const newPost = Post.create({ title, content, published_at, author: req.user  });

    await newPost.save();

    res.status(200).send({ newPost });
  });

export default postsRouter;
