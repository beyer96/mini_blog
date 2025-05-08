import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthService from "./services/authService";
import PostService from "./services/postService";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    loader: async () => {
      try {
        const { user } = await AuthService.getUserSession();

        return { user };
      } catch {
        return { user: undefined }
      }
    },
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
      }
    ]
  }
]);

export default router;
