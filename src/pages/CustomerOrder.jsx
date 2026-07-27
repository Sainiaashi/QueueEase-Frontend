import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAvailableMenu } from '../api/menuApi';
import { placeOrder } from '../api/orderApi';

function CustomerOrder() {
  const { tableNumber } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAvailableMenu();
      setMenuItems(response.data);
    } catch (err) {
      setError('Failed to load menu.');
    }
  };

  const updateQuantity = (itemId, qty) => {
    setCart((prev) => ({ ...prev, [itemId]: qty }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const items = Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([menuItemId, quantity]) => ({ menuItemId: Number(menuItemId), quantity: Number(quantity) }));

    if (items.length === 0) {
      setError('Add at least one item.');
      return;
    }

    try {
      const response = await placeOrder({ tableNumber: Number(tableNumber), items });
      setSuccess(`Order placed! Total for this order: ₹${response.data.totalAmount}`);
      setCart({});
    } catch (err) {
      setError('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Order for Table {tableNumber}</h1>
        <p className="text-gray-500 mb-6">Add items and place your order</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handlePlaceOrder} className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  placeholder="Qty"
                  value={cart[item.id] || ''}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>

        <Link
          to={`/my-bill/${tableNumber}`}
          className="block text-center text-blue-600 mt-4"
        >
          View My Bill
        </Link>
      </div>
    </div>
  );
}

export default CustomerOrder;