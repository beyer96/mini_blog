import axios, { AxiosError } from "axios";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../utils";
import AuthService from "./authService";

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

    // @ts-expect-error custom _retry property
    if (error.status === 401 && !originalRequest._retry) {
      try {
        const response = await AuthService.refresh();

        if (response.data.accessToken) {
          localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, response.data.accessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        // @ts-expect-error custom _retry property
        originalRequest._retry = true;

        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
      }
    }
  }
);

export default axiosInstance;
