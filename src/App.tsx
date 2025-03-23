import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CustomersPage from './pages/customers/CustomersPage';
import LumpsumInvestmentsPage from './pages/investments/lumpsum/LumpsumInvestmentsPage';
import SIPInvestmentsPage from './pages/investments/sip/SIPInvestmentsPage';
import CustomerManagementPage from './pages/customer-management/CustomerManagementPage';
import CommunicationsPage from './pages/communications/CommunicationsPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import { useAuth } from './contexts/AuthContext';
import LoadingScreen from './components/common/LoadingScreen';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Layout Wrapper Component
const ProtectedLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedLayout>
          <DashboardPage />
        </ProtectedLayout>
      } />
      <Route path="/customers" element={
        <ProtectedLayout>
          <CustomersPage />
        </ProtectedLayout>
      } />
      <Route path="/investments/lumpsum" element={
        <ProtectedLayout>
          <LumpsumInvestmentsPage />
        </ProtectedLayout>
      } />
      <Route path="/investments/sip" element={
        <ProtectedLayout>
          <SIPInvestmentsPage />
        </ProtectedLayout>
      } />
      <Route path="/customer-management" element={
        <ProtectedLayout>
          <CustomerManagementPage />
        </ProtectedLayout>
      } />
      <Route path="/communications" element={
        <ProtectedLayout>
          <CommunicationsPage />
        </ProtectedLayout>
      } />
      <Route path="/reports" element={
        <ProtectedLayout>
          <ReportsPage />
        </ProtectedLayout>
      } />
      <Route path="/settings" element={
        <ProtectedLayout>
          <SettingsPage />
        </ProtectedLayout>
      } />
      <Route path="/notifications" element={
        <ProtectedLayout>
          <NotificationsPage />
        </ProtectedLayout>
      } />
      {/* Redirect to dashboard if logged in, otherwise to login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Add 404 route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
