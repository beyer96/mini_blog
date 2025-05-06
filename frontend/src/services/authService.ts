import axiosInstance from "./axiosInstance";
import type { User } from "../types";

type loginResponse = { user: User, accessToken: string };
type refreshResponse = { accessToken: string };
type logoutResponse = void;
type getUserSessionResponse = { user: User };

export default class AuthService {
  static login = async (
    data: { username: User["username"], password: string }
  ): Promise<loginResponse> => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  };

  static refresh = async (): Promise<refreshResponse> => {
    const response = await axiosInstance.post("/auth/refresh");

    return response.data;
  }

  static logout = async (): Promise<logoutResponse> => {
    return await axiosInstance.post("/auth/logout");
  }

  static getUserSession = async (): Promise<getUserSessionResponse> => {
    const response = await axiosInstance.get("/auth/session");

    return response.data;
  }
}
