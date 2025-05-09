import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store";
import AuthService from "../services/authService";
import { logout } from "../store/authSlice";

export default function Navigation() {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    const response = await AuthService.logout();

    if (response.status === 204) dispatch(logout());
  };

  const authContent = user?.username
    ? (
      <>
        {user.username}
        <button onClick={handleLogout}>Logout</button>
      </>
      )
    : (
      <>
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
    );

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
