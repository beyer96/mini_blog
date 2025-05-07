import { useLoaderData } from "react-router"
import { GetPostsResponse } from "../services/postService";

export default function Home() {
  const { posts, total, page, limit }: GetPostsResponse = useLoaderData();

  const showExcerpt = (postContent: string) => {
    return postContent.slice(0, 80) + "...";
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-3">Homepage</h1>
      <div className="text-center">
        {posts.map(post => (
          <div key={post.id}>
            <h2 className="mt-3 text-xl">{post.title}</h2>
            <br />
            <p>
              {showExcerpt(post.content)}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
