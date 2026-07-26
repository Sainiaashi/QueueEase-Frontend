import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyOtp } from '../api/authApi';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyOtp({ email, otp });
      setSuccess('Email verified! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2 text-blue-600">Verify Your Email</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          We sent a code to {email || 'your email'}
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-center tracking-widest"
            maxLength={6}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Verify
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/login" className="text-blue-600">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;