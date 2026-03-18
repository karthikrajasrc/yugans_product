import { useContext } from "react";
import { AuthContext } from "../Auth/authProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;