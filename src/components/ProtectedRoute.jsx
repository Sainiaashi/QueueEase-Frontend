import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is restored
  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  // Redirect unauthenticated users
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

  return children;
}

export default ProtectedRoute;