import { Router } from "express";
import Post from "../database/entities/Post";
import authenticate from "../middlewares/authenticate";
import NotFoundError from "../errors/NotFoundError";

const postsRouter = Router();

postsRouter.route("/posts")
  .get(async (req, res) => {
    const posts = await Post.find();
    if (!posts.length) throw new NotFoundError({ message: "No posts found." });

    res.status(200).send({ posts });
  })
  .post(authenticate, async (req, res) => {
    const { title, content, published_at } = req.body;

    const newPost = Post.create({ title, content, published_at, author: req.user  });

    await newPost.save();

    res.status(200).send({ newPost });
  });

postsRouter.get("/posts/:slug", async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOneBy({ slug });
  if (!post) throw new NotFoundError({ message: "Post not found." });

  res.status(200).send({ post });
});

postsRouter.route("/posts/:id")
  .put(authenticate, async (req, res) => {
    const id = +req.params.id;
    const post = await Post.findOneBy({ id });
    if (!post) throw new NotFoundError({ message: "Post not found." });

    const { title, content, published_at } = req.body;

    title && (post.title = title);
    content && (post.content = content);
    published_at && (post.published_at = published_at);

    post.updated_at = new Date();

    await post.save();

    res.status(200).send({ post });
  })
  .delete(authenticate, async (req, res) => {
    const id = +req.params.id;
    const post = await Post.findOneBy({ id });
    if (!post) throw new NotFoundError({ message: "Post not found." });

    await post.remove();

    res.status(204).send("Post was successfully removed.");
  });

export default postsRouter;
