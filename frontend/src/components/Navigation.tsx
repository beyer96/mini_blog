import { NavLink } from "react-router"

export default function Navigation() {
  return (
    <nav className="flex justify-center gap-6 mt-3 text-xl">
      <NavLink
        className={({ isActive }) => isActive ? "font-bold text-black" : "text-gray-600 hover:text-gray-800"}
        to="/"
      >
        Home
      </NavLink>
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
    </nav>
  )
}
