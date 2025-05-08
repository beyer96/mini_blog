import { useAppSelector } from "../store";
import Pagination from "./Pagination";
import Post from "./Post";

export default function PostsList() {
  const { posts, total, limit, page } = useAppSelector(store => store.posts);

  return (
    <>
      <div className="grid grid-cols-3 gap-10 my-5 mx-10">
        {
          posts.map(post => <Post key={post.id} post={post} />)
        }
      </div>
      <Pagination limit={limit} total={total} page={page} />
    </>
  )
}
