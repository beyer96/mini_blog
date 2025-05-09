import type { User } from "../types";
import { axiosInstance } from "./axiosInstance";

interface LoginBody { username?: User["username"], password?: string };
interface LoginResponse { user: User, accessToken: string };
interface LogoutResponse { status: number };
interface RefreshResponse { accessToken: string };
interface GetUserSessionResponse { user: User };
interface RegisterResponse { user: User, accessToken: string };
interface RegisterBody {
  username?: User["username"],
  password?: string,
  email?: string,
};


export default class AuthService {  
  static login = async (data: LoginBody): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  };

  static refresh = async (): Promise<RefreshResponse> => {
    const response = await axiosInstance.post("/auth/refresh");

    return response.data;
  }

  static logout = async (): Promise<LogoutResponse> => {
    return await axiosInstance.post("/auth/logout");
  }

  static getUserSession = async (): Promise<GetUserSessionResponse> => {
    const response = await axiosInstance.get("/auth/session");

    return response.data;
  }

  static register = async (data: RegisterBody): Promise<RegisterResponse> => {
    const response = await axiosInstance.post("/auth/register", data);

    return response.data;
  }
}
