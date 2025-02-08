import React from 'react';
import {Outlet } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';

const ClientLayout = () => {
  return (
    <>
      <ClientNavbar/>
      <Outlet/>
    </>
  );
};

export default ClientLayout;
