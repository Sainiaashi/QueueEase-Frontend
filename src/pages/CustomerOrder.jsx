import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getAvailableMenu } from "../api/menuApi";
import { placeOrder } from "../api/orderApi";
import { useToast } from "../context/ToastContext";

function CustomerOrder() {
  const { tableNumber } = useParams();
  const { showToast } = useToast();

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAvailableMenu();
      setMenuItems(response.data);
    } catch {
      showToast("Unable to load menu", "error");
    } finally {
      setLoading(false);
    }
  };

  const changeQty = (id, change) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) + change;

      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return {
        ...prev,
        [id]: qty,
      };
    });
  };

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return menuItems.reduce((sum, item) => {
      return sum + (cart[item.id] || 0) * item.price;
    }, 0);
  }, [cart, menuItems]);

  const handlePlaceOrder = async () => {
    const items = Object.entries(cart).map(([menuItemId, quantity]) => ({
      menuItemId: Number(menuItemId),
      quantity,
    }));

    if (items.length === 0) {
      showToast("Please add items", "error");
      return;
    }

    try {
      await placeOrder({
        tableNumber: Number(tableNumber),
        items,
      });

      showToast("Order placed successfully!", "success");
      setCart({});
    } catch {
      showToast("Failed to place order", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Menu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-blue-600 text-white py-6 shadow">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-3xl font-bold">
            🍽 Table {tableNumber}
          </h1>

          <p className="text-blue-100 mt-1">
            Order your favourite dishes
          </p>

        </div>

      </div>

      <div className="max-w-5xl mx-auto p-6">

        <div className="grid md:grid-cols-2 gap-6">

          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>

                </div>

                <span className="font-bold text-blue-600">
                  ₹{item.price}
                </span>

              </div>

              {item.ingredients && (
                <p className="text-xs text-gray-400 mt-3">
                  {item.ingredients}
                </p>
              )}

              <div className="mt-5 flex items-center gap-3">

                <button
                  onClick={() => changeQty(item.id, -1)}
                  className="w-9 h-9 rounded-full bg-gray-200"
                >
                  −
                </button>

                <span className="font-semibold text-lg">
                  {cart[item.id] || 0}
                </span>

                <button
                  onClick={() => changeQty(item.id, 1)}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white"
                >
                  +
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t shadow-lg">

        <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>

            <p className="font-semibold">
              {totalItems} Items
            </p>

            <p className="text-2xl font-bold text-blue-600">
              ₹{totalPrice}
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              to={`/my-bill/${tableNumber}`}
              className="px-5 py-3 rounded-lg border"
            >
              View Bill
            </Link>

            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerOrder;