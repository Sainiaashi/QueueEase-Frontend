import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function StaffRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default StaffRoute;