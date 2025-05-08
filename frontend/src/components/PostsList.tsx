import type { PaginationProps, Post } from "../types";
import Pagination from "./Pagination";

export default function PostsList({ posts, paginationProps }: { posts: Post[], paginationProps: PaginationProps }) {
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
      <Pagination {...paginationProps} />
    </>
  )
}