import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import PostService from "./services/postService";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: async ({ request }) => {
          const search = new URL(request.url).searchParams;
          const pageParam = Number(search.get("page")) || 1;
          const limitParam = Number(search.get("limit")) || 5;
          const { posts, total, limit, page } = await PostService.getPosts({ page: pageParam, limit: limitParam });

          return { posts, total, limit, page };
        }
      },
      {
        path: "/login",
        lazy: {
          Component: async () => (await import("./pages/Login")).default
        }
      },
      {
        path: "/register",
        lazy: {
          Component: async () => (await import("./pages/Register")).default
        }
      },
      {
        path: "/posts/:slug",
        lazy: {
          Component: async () => (await import("./pages/Post")).default
        },
        loader: async ({ params }) => {
          const { slug } = params;
          if (!slug) return;

          const { post } = await PostService.getPost(slug);

          return { post };
        }
      },
      {
        path: "/posts/:slug/edit",
        lazy: {
          Component: async () => (await import("./pages/PostEdit")).default
        },
        loader: async ({ params }) => {
          const { slug } = params;
          if (!slug) return;

          const { post } = await PostService.getPost(slug);;

          return { post };
        }
      },
      {
        path: "/posts/new",
        lazy: {
          Component: async () => (await import("./pages/PostNew")).default
        }
      }
    ]
  }
]);

export default router;
