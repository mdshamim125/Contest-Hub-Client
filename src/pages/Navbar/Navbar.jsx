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
  const handleDropDownNav = () => {
    setIsOpenNav(!isOpenNav);
    // Close when clicking outside
    if (!isOpenNav) {
      document.addEventListener("click", closeNavOnClickOutside);
    } else {
      document.removeEventListener("click", closeNavOnClickOutside);
    }
  };

  const closeNavOnClickOutside = (e) => {
    if (!e.target.closest(".mobile-nav-container")) {
      setIsOpenNav(false);
      document.removeEventListener("click", closeNavOnClickOutside);
    }
  };

  const handleToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".profile-dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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

      // Add some threshold to avoid flickering
      if (currentScrollY > lastScrollY + 5) {
        setIsScrollingUp(false); // Hides navbar when scrolling down
      } else if (currentScrollY < lastScrollY - 5) {
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

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `mr-8 relative text-lg py-1 transition duration-300 ${
              isActive
                ? "text-blue-400 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
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
                ? "text-blue-400 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
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
            `mr-5 relative py-1 text-lg transition duration-300 ${
              isActive
                ? "text-blue-400 font-bold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                : "text-white font-semibold hover:text-blue-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
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
      className={`fixed mx-auto top-0 left-0 w-full py-1 z-50 transition-all duration-300 ease-in-out backdrop-blur-sm ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      } ${
        atTop
          ? "bg-black/30 shadow-none"
          : "bg-gradient-to-r from-blue-900/95 to-blue-800/95 dark:bg-black/90 shadow-lg shadow-black/10"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="mobile-nav-container relative">
          <button
            onClick={handleDropDownNav}
              className="btn btn-ghost rounded-full p-1 lg:hidden hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                  d={
                    isOpenNav
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h8m-8 6h16"
                  }
              />
            </svg>
          </button>

            {isOpenNav && (
              <div className="lg:hidden absolute left-0 top-12 mobile-nav-container">
                <ul className="mt-1 z-[1] p-4 shadow-lg rounded-lg w-64 text-white font-semibold bg-gradient-to-b from-blue-900 to-blue-800 dark:bg-black/95 backdrop-blur-md border border-white/10 animate-fadeIn">
                  {links}
                  <div className="border-t border-white/20 my-2 pt-2">
                    {user ? (
                      <li className="flex flex-col gap-2">
                        <span className="flex items-center gap-2 px-3 py-1">
                          <img
                            src={photoURL}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm opacity-90">
                            {displayName}
                          </span>
                        </span>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                            <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                            <path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                          Dashboard
                        </Link>
                        <button
                          onClick={logOut}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md transition-colors text-left"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm9 3a1 1 0 10-2 0v4a1 1 0 102 0V6zm2 5a1 1 0 01-1 1h-4a1 1 0 110-2h4a1 1 0 011 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    ) : (
                      <li>
                        <Link
                          to="/login"
                          className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm9 1a1 1 0 00-2 0v5a1 1 0 002 0V4zm-2 7a1 1 0 112 0v5a1 1 0 11-2 0v-5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Login
                        </Link>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            )}
          </div>
          <Link to="/" className="flex items-center pl-1">
            <div className="flex items-center">
              <div className="overflow-hidden flex items-center justify-center">
            <img
              src={logo}
                  className="w-12 h-12 object-contain transition-transform hover:scale-105 duration-300"
                  alt="Contest Hub Logo"
            />
              </div>
              <span className="ml-2 text-lg font-bold text-white hidden sm:block">
                Contest<span className="text-blue-400">Hub</span>
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex">
          <ul className="flex px-1 text-white font-semibold">{links}</ul>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className="cursor-pointer flex items-center p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                className="w-6 h-6 text-white"
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
                className="w-6 h-6 text-white"
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
          </button>
          <div className="relative z-10 profile-dropdown-container">
            <button
              onClick={handleDropDownProfile}
              className="btn btn-ghost p-0 btn-circle avatar overflow-hidden border-2 border-transparent hover:border-blue-400 transition-all"
              aria-label="Profile menu"
            >
              <img
                src={photoURL}
                className="w-8 h-8 rounded-full object-cover"
                alt={displayName || "User avatar"}
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-3 origin-top-right animate-slideDown">
                <ul className="p-3 shadow-lg menu dropdown-content bg-gradient-to-b from-blue-900 to-blue-800 dark:bg-black/95 rounded-lg w-60 border border-white/10 backdrop-blur-md text-white">
                  <li className="mb-2 border-b border-white/10 pb-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img
                        src={photoURL}
                        className="w-10 h-10 rounded-full"
                        alt={displayName}
                      />
                      <div>
                        <p className="font-medium">{displayName || "Guest"}</p>
                        {user?.email && (
                          <p className="text-xs opacity-75">{user.email}</p>
                        )}
                      </div>
                    </div>
                </li>
                {user && (
                  <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                          <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                          <path d="M14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        Dashboard
                      </Link>
                  </li>
                )}
                  <li className="mt-2">
                  {user ? (
                      <button
                        onClick={logOut}
                        className="flex items-center gap-2 px-3 py-2 text-red-300 hover:bg-red-500/20 rounded-md transition-colors w-full text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm9 3a1 1 0 10-2 0v4a1 1 0 102 0V6zm2 5a1 1 0 01-1 1h-4a1 1 0 110-2h4a1 1 0 011 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-3 py-2 text-blue-300 hover:bg-blue-500/20 rounded-md transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm9 1a1 1 0 00-2 0v5a1 1 0 002 0V4zm-2 7a1 1 0 112 0v5a1 1 0 11-2 0v-5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Login
                      </Link>
                  )}
                </li>
              </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/* Add these animations to your CSS file or in Tailwind CSS config */
/* 
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out forwards;
}
*/
