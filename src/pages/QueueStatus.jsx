import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getQueueStatus } from "../api/queueApi";

function QueueStatus() {
  const { id } = useParams();

  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchStatus = async () => {
    try {
      const response = await getQueueStatus(id);
      setStatus(response.data);
    } catch {
      setError("Unable to fetch queue status.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Something went wrong
          </h2>

          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Queue Status...
      </div>
    );
  }

  const badgeColor = () => {
    switch (status.status) {
      case "WAITING":
        return "bg-yellow-100 text-yellow-700";

      case "SEATED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="max-w-4xl mx-auto py-12 px-6">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">

            <h1 className="text-4xl font-bold">
              Queue Status
            </h1>

            <p className="mt-2 text-blue-100">
              Live updates every 5 seconds
            </p>

          </div>

          <div className="p-8">

            <div className="flex justify-center mb-8">

              <span
                className={`px-5 py-2 rounded-full text-lg font-bold ${badgeColor()}`}
              >
                {status.status}
              </span>

            </div>

            {status.status === "WAITING" && (
              <>

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                  <div className="bg-blue-50 rounded-2xl p-6 text-center">

                    <div className="text-5xl mb-3">
                      👥
                    </div>

                    <p className="text-gray-500">
                      Queue Position
                    </p>

                    <h2 className="text-5xl font-bold text-blue-700 mt-2">
                      {status.position}
                    </h2>

                  </div>

                  <div className="bg-green-50 rounded-2xl p-6 text-center">

                    <div className="text-5xl mb-3">
                      ⏱
                    </div>

                    <p className="text-gray-500">
                      Estimated Wait
                    </p>

                    <h2 className="text-5xl font-bold text-green-700 mt-2">
                      {status.estimatedWaitMinutes} min
                    </h2>

                  </div>

                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

                  <h3 className="font-semibold text-yellow-700">
                    Please Wait...
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Your queue status refreshes automatically every 5 seconds.
                    You'll be notified when your table is ready.
                  </p>

                </div>

              </>
            )}

            {status.status === "SEATED" && (
              <div className="text-center">

                <div className="text-7xl mb-5">
                  🎉
                </div>

                <h2 className="text-4xl font-bold text-green-600">
                  You're Seated!
                </h2>

                <p className="mt-3 text-xl text-gray-600">
                  Welcome to Table
                </p>

                <h1 className="text-6xl font-bold text-blue-600 mt-2">
                  {status.tableNumber}
                </h1>

                <Link
                  to={`/order/${status.tableNumber}`}
                  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition"
                >
                  🍽 Order Food
                </Link>

              </div>
            )}

            {status.status === "CANCELLED" && (
              <div className="text-center">

                <div className="text-7xl mb-5">
                  ❌
                </div>

                <h2 className="text-3xl font-bold text-red-600">
                  Queue Cancelled
                </h2>

                <p className="mt-3 text-gray-600">
                  Your queue request has been cancelled.
                </p>

                <Link
                  to="/join-queue"
                  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl"
                >
                  Join Again
                </Link>

              </div>
            )}

            <div className="mt-10 flex justify-center">

              <Link
                to="/menu"
                className="text-blue-600 hover:underline"
              >
                ← Back to Menu
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default QueueStatus;