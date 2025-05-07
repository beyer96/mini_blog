import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authService"
import { useAppDispatch } from "../store";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../utils";
import { login } from "../store/userSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usernameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    const { user, accessToken } = await AuthService.register({
      username: usernameInput.current?.value,
      email: emailInput.current?.value,
      password: passwordInput.current?.value
    });

    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME, accessToken);
    dispatch(login(user));
    navigate("/");
  };

  return (
    <>
      <div className="max-w-xs mx-auto mt-5">
        <h1 className="text-2xl text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col mt-3">
            <label htmlFor="username">Username:</label>
            <input ref={usernameInput} type="text" name="username" id="username" className="border-1 focus:outline-1" />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="email">Email:</label>
            <input ref={emailInput} type="email" name="email" id="email" className="border-1 focus:outline-1" />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="password">Password:</label>
            <input ref={passwordInput} type="password" name="password" id="password" className="border-1 focus:outline-1" />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" className="border-1 focus:outline-1" />
          </div>
          <button
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-300 active:bg-indigo-500 active:text-white py-2 mt-3 w-full cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </>
  )
}
