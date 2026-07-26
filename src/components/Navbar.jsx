import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/menu" className="text-xl font-bold text-blue-600">
          QueueEase
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/menu" className="text-gray-700 hover:text-blue-600 text-sm">
            Menu
          </Link>

          {(user?.role === 'STAFF' || user?.role === 'ADMIN') && (
            <Link to="/manage-menu" className="text-gray-700 hover:text-blue-600 text-sm">
              Manage Menu
            </Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 text-sm">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;