// Based very much on https://www.youtube.com/watch?v=AcYF18oGn6Y
import axios, { AxiosError } from "axios";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../utils";
import AuthService from "./authService";

type ErrorResponse = { error: { message: string, statusCode: number }};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    if (error.status === 403 && (error.response!.data as ErrorResponse).error.message === "Unauthorized") {
      try {
        const { accessToken } = await AuthService.refresh();

        if (accessToken) {
          localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, accessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
