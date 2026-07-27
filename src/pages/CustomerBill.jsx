import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTableBill } from '../api/orderApi';

function CustomerBill() {
  const { tableNumber } = useParams();
  const [bill, setBill] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBill();
    const interval = setInterval(fetchBill, 5000);
    return () => clearInterval(interval);
  }, [tableNumber]);

  const fetchBill = async () => {
    try {
      const response = await getTableBill(tableNumber);
      setBill(response.data);
    } catch (err) {
      setError('Failed to load bill.');
    }
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!bill) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Bill — Table {bill.tableNumber}</h1>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          {bill.orders.length === 0 && (
            <p className="text-gray-500">No orders yet.</p>
          )}

          {bill.orders.map((order) => (
            <div key={order.id} className="mb-4 border-b pb-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.menuItem.name} × {item.quantity}</span>
                  <span>₹{item.subtotal}</span>
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg text-blue-600 pt-2">
            <span>Total</span>
            <span>₹{bill.totalBill}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerBill;