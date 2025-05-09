import { useLoaderData, useNavigate } from "react-router"
import { Post } from "../types";
import { useAppSelector } from "../store";
import { useEffect } from "react";

export default function PostEdit() {
  const navigate = useNavigate();
  const { post } = useLoaderData<{ post: Post }>();
  const { user } = useAppSelector(store => store.auth);

  useEffect(() => {
    if (post.author.id !== user?.id) navigate("/");
  }, [navigate, post, user]);

  return (
    <h1>Edit post: {post.title}</h1>
  )
}
