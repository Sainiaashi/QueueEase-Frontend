import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StaffRoute from './components/StaffRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import OAuthSuccess from './pages/OAuthSuccess';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import JoinQueue from './pages/JoinQueue';
import QueueStatus from './pages/QueueStatus';
import ManageMenu from './pages/ManageMenu';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/join-queue" element={<JoinQueue />} />
          <Route path="/queue-status/:id" element={<QueueStatus />} />
          <Route
            path="/manage-menu"
            element={
              <StaffRoute>
                <ManageMenu />
              </StaffRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;