import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "./../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import AllContests from './../../pages/All-Contests/AllContests';
import PopularDetails from './../home/popularContest/PopularDetails';

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
      {
        path: "/popular/:id",
        element: <PopularDetails></PopularDetails>,
      },
      {
        path: "all-contests",
        element: <AllContests></AllContests>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp></SignUp> },
]);
