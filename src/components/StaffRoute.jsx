import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

function StaffRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for authentication state restoration
  if (loading) {
    return <LoadingSpinner text="Checking permissions..." />;
  }

  // User is not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Only STAFF and ADMIN can access
  if (user.role !== "STAFF" && user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default StaffRoute;