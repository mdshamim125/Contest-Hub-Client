import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RingLoader from "react-spinners/RingLoader";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader color="#2563eb" size={100} />
      </div>
    );
  }
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};
