import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyTable() {
  const [queueId, setQueueId] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  const handleCheckStatus = (e) => {
    e.preventDefault();
    if (queueId) {
      navigate(`/queue-status/${queueId}`);
    }
  };

  const handleViewBill = (e) => {
    e.preventDefault();
    if (tableNumber) {
      navigate(`/my-bill/${tableNumber}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">My Table</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Look up your queue status or table bill
          </p>
        </div>

        <form onSubmit={handleCheckStatus} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Check Queue Status
          </label>
          <input
            type="number"
            placeholder="Enter your Queue ID"
            value={queueId}
            onChange={(e) => setQueueId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Check Status
          </button>
        </form>

        <form onSubmit={handleViewBill} className="space-y-3 border-t pt-6">
          <label className="block text-sm font-medium text-gray-700">
            View Table Bill
          </label>
          <input
            type="number"
            placeholder="Enter your Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            View Bill
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyTable;