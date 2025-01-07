import { Navigate } from "react-router-dom";
import useRole from "./../hooks/useRole";
import RingLoader from "react-spinners/RingLoader";
const AdminRoute = ({ children }) => {
  const { loggedInUser, isLoading } = useRole();

  if (isLoading)
    return (
      <RingLoader
        className="flex justify-center items-center h-screen"
        color="#2563eb"
        size={100}
      />
    );
  if (loggedInUser?.role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
