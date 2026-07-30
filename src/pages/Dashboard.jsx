import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const actions = [
    {
      title: "Manage Menu",
      icon: "🍽️",
      color: "bg-blue-500",
      path: "/manage-menu",
      staff: true,
      description: "Add, edit and manage menu items",
    },
    {
      title: "Take Order",
      icon: "📝",
      color: "bg-green-500",
      path: "/take-order",
      staff: true,
      description: "Create customer orders quickly",
    },
    {
      title: "Table Bills",
      icon: "💳",
      color: "bg-purple-500",
      path: "/table-bill",
      staff: true,
      description: "Generate bills for tables",
    },
    {
      title: "Digital Menu",
      icon: "📖",
      color: "bg-orange-500",
      path: "/menu",
      staff: false,
      description: "Browse restaurant menu",
    },
    {
      title: "My Table",
      icon: "🪑",
      color: "bg-pink-500",
      path: "/my-table",
      staff: false,
      description: "View queue and table status",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome back, {user?.email?.split("@")[0]} 👋
            </h1>

            <p className="mt-3 text-blue-100">
              QueueEase Restaurant Management Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 md:mt-0 bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* User Info */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Logged in Email
              </p>

              <p className="font-semibold text-xl mt-2">
                {user?.email}
              </p>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Role
              </p>

              <span className="inline-block mt-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                {user?.role}
              </span>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Restaurant
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              OPEN
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Accepting Customers
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Platform
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              QueueEase
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Smart Restaurant System
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Features
            </p>

            <h2 className="text-3xl font-bold text-purple-600 mt-2">
              10+
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Queue • Billing • Orders • Menu
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500 text-sm">
              AI Ready
            </p>

            <h2 className="text-3xl font-bold text-pink-600 mt-2">
              YES
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Recommendation Engine
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Quick Actions
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">

          {actions.map((action) => {

            if (
              action.staff &&
              user?.role !== "STAFF" &&
              user?.role !== "ADMIN"
            ) {
              return null;
            }

            return (

              <div
                key={action.title}
                onClick={() => navigate(action.path)}
                className="cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7"
              >

                <div
                  className={`${action.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white`}
                >
                  {action.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-800">
                  {action.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {action.description}
                </p>

                <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                  Open →
                </button>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;