import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AppointmentsPage from './pages/AppointmentsPage.jsx';
import MedicationsPage from './pages/MedicationsPage.jsx';
import VitalsPage from './pages/VitalsPage.jsx';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments/*"
        element={
          <PrivateRoute>
            <AppointmentsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/medications/*"
        element={
          <PrivateRoute>
            <MedicationsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/vitals/*"
        element={
          <PrivateRoute>
            <VitalsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
