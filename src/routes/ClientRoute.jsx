import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ClientRoute = () => {
  const isAuthenticated =
    localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/client/login" />;
  }

  return <Outlet />;
};

export default ClientRoute;
