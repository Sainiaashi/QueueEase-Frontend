import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinQueue } from '../api/queueApi';

function JoinQueue() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await joinQueue({ customerName, customerEmail, partySize: Number(partySize) });
      navigate(`/queue-status/${response.data.id}`);
    } catch (err) {
      setError('Failed to join queue. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Join the Queue</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="number"
            min="1"
            placeholder="Party Size"
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join Queue
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinQueue;