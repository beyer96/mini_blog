import axiosInstance from "./axiosInstance";
import type { User } from "../types";

export default class AuthService {
  static login = async (data: { username: User["username"], password: string }) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  };

  static refresh = async () => {
    const response = await axiosInstance.post("/auth/refresh");

    return response.data;
  }

  static logout = async () => {
    return await axiosInstance.post("/auth/logout");
  }

  static getUser = async (): Promise<User> => {
    const response = await axiosInstance.get("/auth/session");

    return response.data as User;
  }
}
