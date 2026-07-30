import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/menu"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow">
            🍽️
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              QueueEase
            </h1>
            <p className="text-xs text-gray-500">
              Smart Restaurant
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-7">

          <Link className={isActive("/menu")} to="/menu">
            🍽 Menu
          </Link>

          <Link className={isActive("/my-table")} to="/my-table">
            🪑 My Table
          </Link>

          {user &&
            (user.role === "STAFF" || user.role === "ADMIN") && (
              <>
                <Link
                  className={isActive("/manage-menu")}
                  to="/manage-menu"
                >
                  📋 Menu Manager
                </Link>

                <Link
                  className={isActive("/take-order")}
                  to="/take-order"
                >
                  📝 Orders
                </Link>

                <Link
                  className={isActive("/table-bill")}
                  to="/table-bill"
                >
                  💳 Bills
                </Link>
              </>
            )}

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {user ? (
            <>
              <div className="hidden lg:block text-right">

                <p className="text-sm font-semibold text-gray-800">
                  {user.email}
                </p>

                <p className="text-xs text-blue-600 font-medium">
                  {user.role}
                </p>

              </div>

              <Link
                to="/dashboard"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg"
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