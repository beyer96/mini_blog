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

postsRouter.get("/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOneBy({ slug });
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(200).send({ post });
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

export default postsRouter;
