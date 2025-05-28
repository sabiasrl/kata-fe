import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Outlet />
  </div>
);

export default AuthLayout;
