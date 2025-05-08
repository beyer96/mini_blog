import { useLoaderData } from "react-router"
import { Post as IPost } from "../types";

export default function Post() {
  const { post }: { post: IPost } = useLoaderData();

  return (
    <section className="mx-10">
      <h1 className="text-3xl text-center font-bold mt-5">{post.title}</h1>
      <p className="text-center mt-3">Author: {post.author.username}</p>
      <p className="text-center mb-3">{ Intl.DateTimeFormat("en-EN", {
        dateStyle: "long"
      }).format(new Date(post.published_at)) }</p>
      <p>
        {post.content}
      </p>
    </section>
  )
}