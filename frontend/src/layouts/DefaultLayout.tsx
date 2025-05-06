import { Outlet, useLoaderData } from "react-router";
import Navigation from "../components/Navigation";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { login } from "../store/userSlice";

export default function DefaultLayout() {
  const dispatch = useAppDispatch();
  const { user } = useLoaderData();

  useEffect(() => {
    if (user) dispatch(login(user));
  }, [dispatch, user]);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
