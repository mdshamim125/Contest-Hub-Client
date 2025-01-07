import { Navigate } from "react-router-dom";
import useRole from "./../hooks/useRole";
import RingLoader from "react-spinners/RingLoader";
const CreatorRoute = ({ children }) => {
  const { loggedInUser, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  if (loggedInUser?.role === "creator") return children;
  return <Navigate to="/dashboard" />;
};

export default CreatorRoute;
