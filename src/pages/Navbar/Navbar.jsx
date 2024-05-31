import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../components/hooks/useAuth";
// import { BeatLoader } from "react-loader-spinner";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const handleDropDownProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleDropDownNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html").setAttribute("data-theme", localTheme);
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
      { (
        <li>
          <NavLink className="mr-3" to="/all-contests">
            All Contests
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar  p-4 bg-emerald-500">
        <div className="navbar-start">
          <div onClick={handleDropDownNav} className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-neutral lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isOpenNav && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 text-white font-bold bg-cyan-500"
              >
                {links}
              </ul>
            )}
          </div>
          <Link to="/" className="flex justify-center items-center">
            <a className="text-base md:text-xl lg:text-3xl font-bold ml-3 flex gap-0">
              Contest<span className="text-blue-600">Hub</span>
            </a>
            {/* <img
              src="https://i.ibb.co/BKjT4BM/TRAVELING-BLOG.png"
              className="w-16 ml-1 bg-slate-300 rounded-full"
            /> */}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white text-base font-semibold">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          <div>
            <label className="cursor-pointer grid place-items-center mr-2">
              <input
                type="checkbox"
                onChange={handleToggle}
                className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          <div
            onClick={handleDropDownProfile}
            className="dropdown dropdown-end"
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={photoURL} />
              </div>
            </div>
            {isOpen && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">{displayName}</a>
                </li>
                {user && (
                  <li>
                    <Link to="dashboard">Dashboard</Link>
                  </li>
                )}
                <li>
                  {user ? (
                    <Link onClick={logOut}>Logout</Link>
                  ) : (
                    <Link to="login">Login</Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
