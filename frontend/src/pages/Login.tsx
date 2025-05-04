import { FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../utils";
import { login } from "../store/userSlice";
import { useAppDispatch } from "../store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, {
      username: formData.get("username"),
      password: formData.get("password")
    });
    const { user, accessToken } = response.data;

    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, accessToken);
    dispatch(login(user));
    navigate("/");
  };

  return (
    <>
      <div className="max-w-xs mx-auto mt-5">
        <h1 className="text-2xl text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col mt-3">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" className="border-1 focus:outline-1" />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" className="border-1 focus:outline-1" />
          </div>
          <button
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-500 active:text-white py-2 mt-3 w-full cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </>
  )
}
