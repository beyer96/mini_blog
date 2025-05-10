import { Link, useLoaderData } from "react-router"
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
    <div className="relative">
      <h1 className="text-center text-2xl font-bold mt-3">Homepage</h1>
      <Link to="/posts/new" className="absolute top-0 right-0 mt-3 mr-3 p-3 border-1 border-teal-300 rounded-md hover:text-white hover:bg-teal-300">New post</Link>
      <div className="text-center">
        <PostsList />
      </div>
    </div>
  )
}
