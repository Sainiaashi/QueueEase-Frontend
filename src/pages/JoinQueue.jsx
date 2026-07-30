import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinQueue } from "../api/queueApi";
import { useToast } from "../context/ToastContext";

function JoinQueue() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [partySize, setPartySize] = useState(2);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!customerName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!customerEmail.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (partySize < 1) {
      setError("Party size must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const response = await joinQueue({
        customerName,
        customerEmail,
        partySize: Number(partySize),
      });

      showToast("Successfully joined the queue!", "success");

      navigate(`/queue-status/${response.data.id}`);
    } catch (err) {
      setError("Unable to join queue. Please try again.");
      showToast("Failed to join queue", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-blue-600 text-white p-8 text-center">

            <div className="text-5xl mb-3">
              🍽️
            </div>

            <h1 className="text-3xl font-bold">
              Join Queue
            </h1>

            <p className="mt-2 text-blue-100">
              Skip the waiting line and get notified when your table is ready.
            </p>

          </div>

          {/* Form */}

          <div className="p-8">

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Party Size
                </label>

                <input
                  type="number"
                  min="1"
                  max="20"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
              >
                {loading ? "Joining Queue..." : "Join Queue"}
              </button>

            </form>

          </div>

        </div>

        {/* Info Cards */}

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <p className="text-xs text-gray-500">Live Wait Time</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <p className="text-xs text-gray-500">Track Status</p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-3xl mb-2">🍴</div>
            <p className="text-xs text-gray-500">Order Instantly</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default JoinQueue;