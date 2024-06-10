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
        element: <ContestDetails></ContestDetails>
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp></SignUp> },

  {
    path: "/dashboard",
    element: <DashboardLayouts />,
    children: [
      // user path
      {
        path: "my-participated-contest",
        element: <MyParticipatedContest></MyParticipatedContest>,
      },
      {
        path: "my-winning-contest",
        element: <MyWinningContest></MyWinningContest>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      // creator path
      {
        path: "add-contest",
        element: <AddContest></AddContest>,
      },
      {
        path: "my-created-contest",
        element: <MyCreatedContest></MyCreatedContest>,
      },
      {
        path: "contest-submitted",
        element: <ContestSubmitted></ContestSubmitted>,
      },
      {
        path: "contest-edit/:id",
        element: <ContestEdit></ContestEdit>,
      },
      // admin path
      {
        path: "manage-user",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "manage-contests",
        element: <ManageContests></ManageContests>,
      },
    ],
  },
]);
