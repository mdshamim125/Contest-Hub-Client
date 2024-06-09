import { Navigate } from "react-router-dom";
import useRole from "./../hooks/useRole";
const CreatorRoute = ({ children }) => {
  const { loggedInUser, isLoading } = useRole();

  if (isLoading) return <p>loading...</p>;
  if (loggedInUser?.role === "creator") return children;
  return <Navigate to="/dashboard" />;
};

export default CreatorRoute;
