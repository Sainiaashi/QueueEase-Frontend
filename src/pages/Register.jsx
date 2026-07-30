import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { useToast } from "../context/ToastContext";

function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      showToast("OTP sent successfully!", "success");

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (password.length === 0) return { text: "", color: "" };
    if (password.length < 6)
      return { text: "Weak Password", color: "text-red-500" };
    if (password.length < 10)
      return { text: "Medium Password", color: "text-yellow-500" };

    return { text: "Strong Password", color: "text-green-600" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-5 py-10">

      <div className="max-w-6xl w-full grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left */}

        <div className="hidden lg:flex bg-gradient-to-br from-indigo-700 to-blue-900 text-white p-12 flex-col justify-center">

          <h1 className="text-5xl font-bold">
            Join QueueEase
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Create your account and enjoy a smarter dining experience.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex gap-4">
              <span className="text-3xl">🍽️</span>
              <div>
                <h3 className="font-semibold">Live Menu</h3>
                <p className="text-blue-100 text-sm">
                  Browse dishes with real-time availability.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">⏱️</span>
              <div>
                <h3 className="font-semibold">Smart Queue</h3>
                <p className="text-blue-100 text-sm">
                  Track your position and estimated waiting time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">📱</span>
              <div>
                <h3 className="font-semibold">Digital Ordering</h3>
                <p className="text-blue-100 text-sm">
                  Order directly from your phone after getting seated.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">💳</span>
              <div>
                <h3 className="font-semibold">Automatic Billing</h3>
                <p className="text-blue-100 text-sm">
                  Instantly view your live bill anytime.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="p-8 lg:p-14">

          <div className="text-center mb-8">

            <div className="text-6xl mb-3">
              👋
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Register to experience QueueEase
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
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              {strength.text && (
                <p className={`mt-2 text-sm font-medium ${strength.color}`}>
                  {strength.text}
                </p>
              )}

            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

          </form>

          <div className="mt-8 text-center text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;