import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQueueStatus } from '../api/queueApi';

function QueueStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchStatus = async () => {
    try {
      const response = await getQueueStatus(id);
      setStatus(response.data);
    } catch (err) {
      setError('Could not fetch your queue status.');
    }
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!status) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Your Queue Status</h1>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-semibold">{status.status}</p>
        </div>

        {status.status === 'WAITING' && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">Position in Queue</p>
            <p className="text-4xl font-bold text-blue-600">{status.position}</p>
          </div>
        )}


{status.status === 'WAITING' && (
  <div className="mb-6 bg-blue-50 rounded-lg p-4">
    <p className="text-sm text-gray-600">Estimated Wait</p>
    <p className="text-2xl font-bold text-blue-700">~{status.estimatedWaitMinutes} min</p>
    <p className="text-xs text-gray-400 mt-1">Smart estimate based on queue ahead of you</p>
  </div>
)}

        {status.status === 'SEATED' && (
          <p className="text-green-600 font-medium mb-6">You've been seated. Enjoy your meal!</p>
        )}

        {status.status === 'CANCELLED' && (
          <p className="text-red-500 font-medium mb-6">Your queue entry was cancelled.</p>
        )}

        <Link to="/menu" className="text-blue-600 text-sm">Back to Menu</Link>
      </div>
    </div>
  );
}

export default QueueStatus;