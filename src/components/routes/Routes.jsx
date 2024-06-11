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
          <div className="text-5xl min-h-screen font-bold flex justify-center items-center">
            Welcome To Your Dashboard!
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
