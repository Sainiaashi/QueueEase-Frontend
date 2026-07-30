import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyTable() {
  const [queueId, setQueueId] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const navigate = useNavigate();

  const handleCheckStatus = (e) => {
    e.preventDefault();

    if (!queueId) return;

    navigate(`/queue-status/${queueId}`);
  };

  const handleViewBill = (e) => {
    e.preventDefault();

    if (!tableNumber) return;

    navigate(`/my-bill/${tableNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Hero */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="max-w-6xl mx-auto px-6 py-14">

          <h1 className="text-4xl font-bold">
            🍽 My Table
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Track your queue, table and restaurant bill in one place.
          </p>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Feature Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

            <div className="text-5xl mb-4">
              ⏳
            </div>

            <h2 className="font-bold text-xl">
              Live Queue
            </h2>

            <p className="text-gray-500 mt-2">
              Track your waiting status in real time.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

            <div className="text-5xl mb-4">
              🪑
            </div>

            <h2 className="font-bold text-xl">
              Table Status
            </h2>

            <p className="text-gray-500 mt-2">
              Check your assigned table instantly.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

            <div className="text-5xl mb-4">
              💳
            </div>

            <h2 className="font-bold text-xl">
              Smart Billing
            </h2>

            <p className="text-gray-500 mt-2">
              View your bill anytime during your visit.
            </p>

          </div>

        </div>

        {/* Forms */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Queue */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl mb-5">
              📍
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Check Queue Status
            </h2>

            <p className="text-gray-500 mb-6">
              Enter your Queue ID to see your live waiting status.
            </p>

            <form onSubmit={handleCheckStatus} className="space-y-5">

              <input
                type="number"
                value={queueId}
                onChange={(e) => setQueueId(e.target.value)}
                placeholder="Queue ID"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Check Queue
              </button>

            </form>

          </div>

          {/* Bill */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl mb-5">
              🧾
            </div>

            <h2 className="text-2xl font-bold mb-2">
              View Bill
            </h2>

            <p className="text-gray-500 mb-6">
              Enter your Table Number to view your current bill.
            </p>

            <form onSubmit={handleViewBill} className="space-y-5">

              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Table Number"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                View Bill
              </button>

            </form>

          </div>

        </div>

        {/* Bottom Info */}

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-4">
            Why QueueEase?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold">Fast Queue</h3>
              <p className="text-sm text-gray-500 mt-2">
                No more standing in long waiting lines.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold">Digital Menu</h3>
              <p className="text-sm text-gray-500 mt-2">
                Browse dishes anytime from your phone.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold">AI Ready</h3>
              <p className="text-sm text-gray-500 mt-2">
                Personalized recommendations and smart insights.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold">Auto Billing</h3>
              <p className="text-sm text-gray-500 mt-2">
                Bills are generated automatically from placed orders.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyTable;