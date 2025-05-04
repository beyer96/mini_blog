import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
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
