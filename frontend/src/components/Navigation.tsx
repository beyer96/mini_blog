import { NavLink } from "react-router";
import { useAppSelector } from "../store";

export default function Navigation() {
  const user = useAppSelector(state => state.user.user);

  const authContent = user?.username
    ? user.username
    : <>
        <NavLink
          className={({ isActive }) => isActive ? "font-bold text-black" : "text-gray-600 hover:text-gray-800"}
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className={({ isActive }) => isActive ? "font-bold text-black" : "text-gray-600 hover:text-gray-800"}
          to="/register"
        >
          Register
        </NavLink>
      </>

  return (
    <nav className="flex justify-center gap-6 mt-3 text-xl">
      <NavLink
        className={({ isActive }) => isActive ? "font-bold text-black" : "text-gray-600 hover:text-gray-800"}
        to="/"
      >
        Home
      </NavLink>
      {authContent}
    </nav>
  )
}
