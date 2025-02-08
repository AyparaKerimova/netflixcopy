import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const isAdmin = true; 
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
