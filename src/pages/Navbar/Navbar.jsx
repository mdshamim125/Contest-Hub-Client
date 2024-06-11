import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../components/hooks/useAuth";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const handleDropDownProfile = () => setIsOpen(!isOpen);
  const handleDropDownNav = () => setIsOpenNav(!isOpen);
  const handleToggle = (e) => setTheme(e.target.checked ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const displayName = user?.displayName || "";
  const photoURL =
    user?.photoURL ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  const links = (
    <>
      <li>
        <NavLink className="mr-3" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="mr-3" to="/all-contests">
          All Contests
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-500  via-blue-600 to-blue-700 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleDropDownNav}
            className="btn btn-neutral lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center ml-3">
            <img
              src={logo}
              className="w-20 bg-slate-300 rounded-full"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white  font-semibold">
            {links}
          </ul>
        </div>
        <div className="flex items-center">
          <label className="cursor-pointer flex items-center mr-2">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark"}
              className="toggle"
            />
            {theme === "dark" ? (
              <svg
                className="w-6 h-6 mx-1 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 mx-1 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            )}
          </label>
          <div className="relative">
            <button
              onClick={handleDropDownProfile}
              className="btn btn-ghost btn-circle avatar"
            >
              <img
                src={photoURL}
                className="w-10 rounded-full"
                alt="User avatar"
              />
            </button>
            {isOpen && (
              <ul className="absolute right-0 mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <span className="justify-between">{displayName}</span>
                </li>
                {user && (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                )}
                <li>
                  {user ? (
                    <button onClick={logOut}>Logout</button>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {isOpenNav && (
        <div className="lg:hidden">
          <ul className="menu menu-sm mt-3 z-[1] p-2 shadow rounded-box w-52 text-white font-bold bg-cyan-500">
            {links}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
