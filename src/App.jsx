import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import ClientLayout from './components/client/ClientLayout';
import AdminRoute from './routes/AdminRoute';
import ClientRoute from './routes/ClientRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientLogin from './pages/client/ClientLogin';
import RegistrationPrevious from './pages/client/RegistrationPrevious';
import ClientRegister from './pages/client/ClientRegister';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import MembershipPlan from './pages/client/MembershipPlan.jsx';
import ClientPayment from './pages/client/ClientPayment.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import ClientDashboard from './pages/client/ClientDashboard.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ClientRoute />}>
          <Route element={<ClientLayout />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
          </Route>
        </Route>
        <Route path="/client/login" element={<ClientLogin />} />

        <Route path="/registration-previous" element={<RegistrationPrevious />} />
        <Route path="/client-registration" element={<ClientRegister />} />
        <Route path="/membership-plan" element={<MembershipPlan />} />
        <Route path="/payment" element={<ClientPayment />} />
      </Routes>
    </Provider>
  );
};

export default App;