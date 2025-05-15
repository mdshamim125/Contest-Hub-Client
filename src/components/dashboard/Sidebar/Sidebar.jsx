import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useRole from "./../../hooks/useRole";
import logo from "../../../../public/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const { loggedInUser } = useRole();
  const endUser = loggedInUser?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2.5 transition-all duration-300 rounded-lg group ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
        : "text-blue-100/80 hover:bg-blue-800/50"
    }`;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-900/90 text-white hover:bg-blue-800 transition-colors"
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col w-[280px] min-h-screen px-4 py-8 overflow-y-auto bg-gradient-to-b from-blue-950 to-blue-900 border-r border-blue-800/30 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <NavLink to="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
            <img 
              className="w-16 h-16 rounded-full ring-2 ring-blue-500/30 p-1 bg-white/10 backdrop-blur-sm" 
              src={logo} 
              alt="Logo" 
            />
            <span className="ml-3 text-xl font-semibold text-white">Contest Hub</span>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col flex-1 space-y-1">
          <nav className="flex-1 space-y-1">
            {/* User Navigation */}
            {endUser === "user" && (
              <>
                <NavLink 
                  to="my-participated-contest" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">My Contests</span>
                </NavLink>

                <NavLink 
                  to="my-winning-contest" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">Winning Contests</span>
                </NavLink>
              </>
            )}

            {/* Creator Navigation */}
            {endUser === "creator" && (
              <>
                <NavLink 
                  to="add-contest" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">Add Contest</span>
                </NavLink>

                <NavLink 
                  to="my-created-contest" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">My Created Contests</span>
                </NavLink>

                <NavLink 
                  to="contest-submitted" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">Submissions</span>
                </NavLink>
              </>
            )}

            {/* Admin Navigation */}
            {endUser === "admin" && (
              <>
                <NavLink 
                  to="manage-user" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">Manage Users</span>
                </NavLink>

                <NavLink 
                  to="manage-contests" 
                  className={getNavLinkClass}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">Manage Contests</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* User Profile Section */}
          <div className="pt-4 mt-6 border-t border-blue-800/30">
            <div className="flex items-center justify-between px-2">
              <NavLink 
                to="my-profile" 
                className="flex items-center gap-3 group"
                onClick={() => setIsSidebarOpen(false)}
              >
                <img
                  className="w-8 h-8 rounded-full ring-2 ring-blue-500/30 p-0.5"
                  src={user?.photoURL}
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {user?.displayName}
                  </span>
                  <span className="text-xs text-blue-200/60">{endUser}</span>
                </div>
              </NavLink>
              
              <NavLink
                to="/login"
                onClick={() => {
                  logOut();
                  setIsSidebarOpen(false);
                }}
                className="p-2 text-blue-200/80 hover:text-white hover:bg-blue-800/50 rounded-lg transition-colors"
                title="Log Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


