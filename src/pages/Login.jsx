import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      const { token, email: userEmail, role } = response.data;

      login(token, userEmail, role);

      showToast("Login Successful", "success");

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const googleLoginUrl = `${
    import.meta.env.VITE_API_BASE_URL?.replace("/api", "")
  }/oauth2/authorization/google`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-5 py-10">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left */}

        <div className="hidden lg:flex bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-12 flex-col justify-center">

          <h1 className="text-5xl font-bold leading-tight">
            QueueEase
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Smart Restaurant Management Platform
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">
              <span className="text-3xl">🍽️</span>
              <div>
                <h3 className="font-semibold">Digital Menu</h3>
                <p className="text-blue-100 text-sm">
                  Browse live restaurant menu anytime.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">⏳</span>
              <div>
                <h3 className="font-semibold">Virtual Queue</h3>
                <p className="text-blue-100 text-sm">
                  No more standing in long waiting lines.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-semibold">AI Recommendations</h3>
                <p className="text-blue-100 text-sm">
                  Personalized food suggestions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">💳</span>
              <div>
                <h3 className="font-semibold">Automatic Billing</h3>
                <p className="text-blue-100 text-sm">
                  Fast and accurate bill generation.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="p-8 lg:p-14">

          <div className="text-center mb-8">

            <div className="text-6xl mb-3">
              🍽️
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue using QueueEase
            </p>

          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <div className="relative my-8">

            <hr />

            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-gray-500 text-sm">
              OR
            </span>

          </div>

          <a
            href={googleLoginUrl}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition font-medium"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />

            Continue with Google
          </a>

          <div className="mt-8 text-center text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>

          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-5">

            <h3 className="font-bold text-gray-800 mb-3">
              Demo Staff Login
            </h3>

            <p className="text-sm text-gray-600">
              <strong>Email:</strong> evaluator1@gmail.com
            </p>

            <p className="text-sm text-gray-600">
              <strong>Password:</strong> evaluator@123
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;