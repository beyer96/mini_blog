import { useLoaderData } from "react-router"
import { GetPostsResponse } from "../services/postService";
import PostsList from "../components/PostsList";
import { useAppDispatch } from "../store";
import { setPosts } from "../store/postsSlice";
import { useEffect } from "react";

export default function Home() {
  const { posts, total, page, limit }: GetPostsResponse = useLoaderData();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setPosts({ posts, total, limit, page }));
  }, [dispatch, posts, total, limit, page]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-3">Homepage</h1>
      <div className="text-center">
        <PostsList />
      </div>
    </>
  )
}
