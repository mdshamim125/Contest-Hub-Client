import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../components/hooks/useAuth";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const handleDropDownProfile = () => setIsOpen(!isOpen);
  const handleDropDownNav = () => setIsOpenNav(!isOpenNav);
  const handleToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setAtTop(true); // At the top, make the navbar transparent
      } else {
        setAtTop(false); // Not at the top, apply background color when scrolling up
      }

      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false); // Hides navbar when scrolling down
      } else {
        setIsScrollingUp(true); // Shows navbar when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const displayName = user?.displayName || "";
  const photoURL =
    user?.photoURL ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  // const links = (
  //   <>
  //     <li>
  //       <NavLink className="mr-3" to="/">
  //         Home
  //       </NavLink>
  //     </li>
  //     <li>
  //       <NavLink className="mr-3" to="/all-contests">
  //         All Contests
  //       </NavLink>
  //     </li>
  //     <li>
  //       <NavLink className="mr-3" to="/contact-us">
  //         Contact Us
  //       </NavLink>
  //     </li>
  //   </>
  // );

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mr-8 relative text-lg  py-1  transition duration-300 ${
              isActive
                ? "text-blue-500 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-400 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mr-8 relative py-1 text-lg transition duration-300 ${
              isActive
                ? "text-blue-500 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-400 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            }`
          }
          to="/all-contests"
        >
          All Contests
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mr-5 relative  py-1 text-lg transition duration-300 ${
              isActive
                ? "text-blue-500 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-400 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-500 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            }`
          }
          to="/contact-us"
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav
      className={`fixed mx-auto top-0 left-0 w-full py-3 z-50 transition-transform duration-300 ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      } ${
        atTop
          ? "bg-transparent"
          : "bg-gradient-to-r from-blue-900 to-blue-800 dark:bg-black"
      }`}
    >
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
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="w-24  rounded-full"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex px-1 text-white  font-semibold">{links}</ul>
        </div>
        <div className="flex items-center">
          <div
            onClick={handleToggle}
            className="cursor-pointer flex items-center mr-2"
          >
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
          </div>
          <div className="relative z-10">
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
          <ul className="mt-3 z-[1] p-2 shadow rounded-box w-40 text-white font-bold bg-cyan-500">
            {links}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
