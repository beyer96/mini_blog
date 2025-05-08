import { useAppSelector } from "../store";
import Pagination from "./Pagination";

export default function PostsList() {
  const { posts, total, limit, page } = useAppSelector(store => store.posts);
  const showExcerpt = (postContent: string) => {
    return postContent.slice(0, 80) + "...";
  };

  return (
    <>
      {
        posts.map(post => (
          <div key={post.id}>
            <h2 className="mt-3 text-xl">{post.title}</h2>
            <br />
            <p>
              {showExcerpt(post.content)}
            </p>
          </div>
        ))
      }
      <Pagination limit={limit} total={total} page={page} />
    </>
  )
}