import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "./../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AllContests from "./../../pages/All-Contests/AllContests";
import DashboardLayouts from "../layouts/DashboardLayouts";
import MyParticipatedContest from "./../../pages/Dashboard/User/MyParticipatedContest";
import MyWinningContest from "./../../pages/Dashboard/User/MyWinningContest";
import MyProfile from "./../../pages/Dashboard/User/MyProfile";
import AddContest from "./../../pages/Dashboard/Creator/AddContest";
import MyCreatedContest from "./../../pages/Dashboard/Creator/MyCreatedContest";
import ContestSubmitted from "./../../pages/Dashboard/Creator/ContestSubmitted";
import ManageUser from "./../../pages/Dashboard/Admin/ManageUser";
import ManageContests from "./../../pages/Dashboard/Admin/ManageContests";
import ContestEdit from "./../../pages/Dashboard/Creator/ContestEdit";
import ContestDetails from "../../pages/All-Contests/ContestDetails";
import Payment from "../../pages/All-Contests/Payment/Payment";
import { PrivateRoute } from "./PrivateRoute";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";
import Contact from "../../pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/popular/:id",
      //   element: <PopularDetails></PopularDetails>,
      // },
      {
        path: "all-contests",
        element: <AllContests></AllContests>,
      },
      {
        path: "contact-us",
        element: <Contact></Contact>,
      },
      {
        path: "/all-contests/:id",
        element: (
          <PrivateRoute>
            <ContestDetails></ContestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp></SignUp> },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
            <div className="container px-4 py-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Decorative Elements */}
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
                </div>

                {/* Welcome Text */}
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                    Welcome to Your Dashboard
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-blue-100/80 mb-4">
                  Your central hub for managing contests and tracking your
                  progress
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-blue-400 text-3xl mb-1">🎯</div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Active Contests
                    </h3>
                    <p className="text-blue-200/80 text-sm">
                      Manage your ongoing contests
                    </p>
                  </div>
                  <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-blue-400 text-3xl mb-1">📊</div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Analytics
                    </h3>
                    <p className="text-blue-200/80 text-sm">
                      Track your performance
                    </p>
                  </div>
                  <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/20 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-blue-400 text-3xl mb-1">⚡</div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Quick Actions
                    </h3>
                    <p className="text-blue-200/80 text-sm">
                      Access common tasks
                    </p>
                  </div>
                </div>

                {/* Getting Started Section */}
                <div className="bg-blue-950/50 rounded-xl p-4 border border-blue-700/20">
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    Getting Started
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Create a Contest
                        </h3>
                        <p className="text-blue-200/80 text-sm">
                          Set up your first contest and invite participants
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Manage Submissions
                        </h3>
                        <p className="text-blue-200/80 text-sm">
                          Review and evaluate contest submissions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Track Progress
                        </h3>
                        <p className="text-blue-200/80 text-sm">
                          Monitor contest performance and engagement
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 text-sm">4</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          Engage Community
                        </h3>
                        <p className="text-blue-200/80 text-sm">
                          Interact with participants and build your community
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      // user's path
      {
        path: "my-participated-contest",
        element: (
          <PrivateRoute>
            <MyParticipatedContest></MyParticipatedContest>
          </PrivateRoute>
        ),
      },
      {
        path: "my-winning-contest",
        element: (
          <PrivateRoute>
            <MyWinningContest></MyWinningContest>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      // creator's path
      {
        path: "add-contest",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <AddContest></AddContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-created-contest",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <MyCreatedContest></MyCreatedContest>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contest-submitted",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <ContestSubmitted></ContestSubmitted>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "contest-edit/:id",
        element: (
          <PrivateRoute>
            <CreatorRoute>
              <ContestEdit></ContestEdit>
            </CreatorRoute>
          </PrivateRoute>
        ),
      },
      // admin path
      {
        path: "manage-user",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUser></ManageUser>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageContests></ManageContests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
