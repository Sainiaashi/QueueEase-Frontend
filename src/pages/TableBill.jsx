import { useState } from 'react';
import { getTableBill } from '../api/orderApi';

function TableBill() {
  const [tableNumber, setTableNumber] = useState('');
  const [bill, setBill] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await getTableBill(tableNumber);
      setBill(response.data);
    } catch (err) {
      setError('Failed to fetch bill.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Table Bill</h1>

        <form onSubmit={handleFetch} className="flex gap-2 mb-6">
          <input
            type="number"
            placeholder="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Bill
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {bill && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-3">Table {bill.tableNumber}</h2>

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
        )}
      </div>
    </div>
  );
}

export default TableBill;