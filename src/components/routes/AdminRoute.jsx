import { Navigate } from "react-router-dom";
import useRole from "./../hooks/useRole";
const AdminRoute = ({ children }) => {
  const { loggedInUser, isLoading } = useRole();

  if (isLoading) return <p>loading...</p>;
  if (loggedInUser?.role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
