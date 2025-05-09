// Based very much on https://www.youtube.com/watch?v=AcYF18oGn6Y

import { ReactNode, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { login, logout } from "../store/authSlice";
import { axiosWithAuthInstance } from "../services/axiosInstance";
import Loader from "./Loader";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const authSlice = useAppSelector(state => state.auth);
  const [token, setToken] = useState<string | undefined  | null>();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const refreshSession = async () => {
      setLoading(true);

      try {
        const response = await axiosWithAuthInstance.post("/auth/refresh");
        const { accessToken, user } = response.data;

        dispatch(login({ user, token: accessToken }));
        setToken(accessToken);
      } catch {
        dispatch(logout());
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    refreshSession();
  }, [dispatch]);

  useLayoutEffect(() => {
    const authInterceptor = axiosWithAuthInstance.interceptors.request.use((config) => {
      config.headers.Authorization =
        // @ts-expect-error custom _retry property
        !config._retry && token
          ? `Bearer ${authSlice.token}`
          : config.headers.Authorization

      return config;
    });

    return () => {
      axiosWithAuthInstance.interceptors.request.eject(authInterceptor);
    };
  }, [authSlice, token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosWithAuthInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);

        if (error.response.status === 403 && error.response.data.error.message === "Unauthorized") {
          try {
            const response = await axiosWithAuthInstance.post("/auth/refresh");
            const { accessToken, user } = response.data;

            dispatch(login({ user, token: accessToken }));
            setToken(accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest._retry = true;

            return axiosWithAuthInstance(originalRequest);
          } catch {
            dispatch(logout());
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosWithAuthInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [dispatch, token]);

  return (
    <>
      {loading ? <Loader /> : children}
    </>
  )
}
