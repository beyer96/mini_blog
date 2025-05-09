import { Link, useLoaderData } from "react-router"
import { Post as IPost } from "../types";
import { useAppSelector } from "../store";

export default function Post() {
  const { post }: { post: IPost } = useLoaderData();
  const { user } = useAppSelector(store => store.auth);

  return (
    <section className="relative mx-10">
      {user?.id === post.author.id && <Link to={`/posts/${post.slug}/edit`} className="absolute right-0 p-3 border-1 border-teal-300 rounded-md hover:text-white hover:bg-teal-300">Edit</Link>}
      <h1 className="mx-auto text-3xl text-center font-bold mt-5">{post.title}</h1>
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