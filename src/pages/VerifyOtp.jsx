import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyOtp } from "../api/authApi";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await verifyOtp({
        email,
        otp,
      });

      setSuccess("✅ Email verified successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            📧
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Verify Email
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the 6-digit code sent to
          </p>

          <p className="font-semibold text-blue-600 break-all mt-1">
            {email || "your email"}
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl bg-green-50 border border-green-200 p-3 text-green-600 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Verification Code
            </label>

            <input
              type="text"
              value={otp}
              maxLength={6}
              required
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-2xl tracking-[10px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default VerifyOtp;