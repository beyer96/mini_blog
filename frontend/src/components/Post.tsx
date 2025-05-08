import { Post as IPost } from "../types";

export default function Post({ post }: { post: IPost}) {
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
      <span className="inline-block">Author: {post.author.username}</span>
    </div>
  )
}
