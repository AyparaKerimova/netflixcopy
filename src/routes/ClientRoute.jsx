import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClientRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/client/login" />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default ClientRoute;
