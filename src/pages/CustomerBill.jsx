import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTableBill } from "../api/orderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

function CustomerBill() {
  const { tableNumber } = useParams();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBill();
    const interval = setInterval(fetchBill, 5000);

    return () => clearInterval(interval);
  }, [tableNumber]);

  const fetchBill = async () => {
    try {
      const response = await getTableBill(tableNumber);
      setBill(response.data);
      setError("");
    } catch {
      setError("Unable to load bill.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your bill..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Unable to Load Bill</h2>
          <p className="text-gray-500">{error}</p>

          <button
            onClick={fetchBill}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalOrders = bill?.orders?.length || 0;
  const totalItems =
    bill?.orders?.reduce(
      (sum, order) =>
        sum +
        order.items.reduce((qty, item) => qty + item.quantity, 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-5">
      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <h1 className="text-4xl font-bold text-blue-700">
                Table #{bill.tableNumber}
              </h1>

              <p className="text-gray-500 mt-2">
                Live bill updates every 5 seconds
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold">
              ₹{bill.totalBill}
            </div>

          </div>

        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <div className="text-3xl mb-2">🧾</div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <div className="text-3xl mb-2">🍽️</div>
            <p className="text-sm text-gray-500">Items</p>
            <p className="text-3xl font-bold">{totalItems}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-3xl font-bold text-blue-600">
              ₹{bill.totalBill}
            </p>
          </div>

        </div>

        {/* Orders */}

        {bill.orders.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="No Orders Yet"
            description="Place your first order to see your bill."
          />
        ) : (
          <div className="space-y-6">

            {bill.orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-5">

                  <h2 className="font-bold text-xl">
                    Order #{order.id}
                  </h2>

                  <span className="text-sm text-gray-500">
                    {order.items.length} Items
                  </span>

                </div>

                <div className="space-y-3">

                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div>

                        <p className="font-semibold">
                          {item.menuItem.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          ₹{item.menuItem.price} × {item.quantity}
                        </p>

                      </div>

                      <span className="font-bold">
                        ₹{item.subtotal}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            ))}

            <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

              <span className="text-2xl font-bold">
                Grand Total
              </span>

              <span className="text-3xl font-bold">
                ₹{bill.totalBill}
              </span>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerBill;