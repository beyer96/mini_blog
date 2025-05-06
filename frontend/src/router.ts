import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthService from "./services/authService";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    loader: async () => {
      const { user } = await AuthService.getUserSession();

      return { user };
    },
    children: [
      {
        path: "/",
        Component: Home
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
