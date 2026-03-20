import { useContext } from "react";
import { AuthContext } from "../../Authprovider";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.Role !== "Admin") {
    toast.error("Access Denied: Admins Only 🚫");
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute