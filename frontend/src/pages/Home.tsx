import { useLoaderData } from "react-router"
import { GetPostsResponse } from "../services/postService";
import PostsList from "../components/PostsList";

export default function Home() {
  const { posts, total, page, limit }: GetPostsResponse = useLoaderData();

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-3">Homepage</h1>
      <div className="text-center">
        <PostsList posts={posts} paginationProps={{ total, page, limit }} />
      </div>
    </>
  )
}
