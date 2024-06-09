import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>loading...</p>;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};
