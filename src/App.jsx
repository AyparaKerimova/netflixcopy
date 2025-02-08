import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import ClientLayout from './components/client/ClientLayout';
import AdminRoute from './routes/AdminRoute';
import ClientRoute from './routes/ClientRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientLogin from './pages/client/ClientLogin';
import AdminLogin from './pages/admin/AdminLogin';
import RegistrationPrevious from './pages/client/RegistrationPrevious';
import ClientRegister from './pages/client/ClientRegister';
import MembershipPlan from './pages/client/MembershipPlan';
import ClientPayment from './pages/client/ClientPayment';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminLayout />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="/client/login" element={<ClientLogin />} />
      <Route path="/client/*" element={<ClientRoute />}>
        <Route path="dashboard" element={<ClientLayout />}>
          <Route path="" element={<ClientDashboard />} />
        </Route>
        <Route path="registration-previous" element={<RegistrationPrevious />} />
        <Route path="client-registration" element={<ClientRegister />} />
        <Route path="membership-plan" element={<MembershipPlan />} />
        <Route path="payment" element={<ClientPayment />} />
      </Route>

      <Route path="*" element={<Navigate to="/client/dashboard" />} />
    </Routes>
  );
};

export default App;
