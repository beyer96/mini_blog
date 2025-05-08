import { Link } from "react-router";
import { Post as IPost } from "../types";
import { useAppSelector } from "../store";

export default function Post({ post }: { post: IPost}) {
  const { user } = useAppSelector(store => store.user);
  const excerpt = (postContent: string, length = 80) => {
    return postContent.slice(0, length) + "...";
  };

  return (
    <div className="text-start">
      <h2 className="mt-3 text-xl text-center font-bold">{post.title}</h2>
      <br />
      <p>
        {excerpt(post.content)}
      </p>
      <span className="block my-5">Author: {post.author.username}</span>
      <div className="flex justify-between items-center">
        <Link to={`/posts/${post.slug}`} className="p-3 border-1 border-sky-400 rounded-md hover:text-white hover:bg-sky-400">Read more</Link>
        {user?.id == post.author.id && <Link to={`/posts/${post.slug}/edit`} className="p-3 border-1 border-teal-300 rounded-md hover:text-white hover:bg-teal-300">Edit</Link>}
      </div>
    </div>
  )
}
