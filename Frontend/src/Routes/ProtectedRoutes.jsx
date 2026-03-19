import { useContext } from "react";
import { AuthContext } from "../../Authprovider.jsx";
import { Navigate } from "react-router";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/" replace />; 
  }

return children;
};

export default ProtectedRoute;