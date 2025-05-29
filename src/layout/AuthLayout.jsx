import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const AuthLayout = () => (
  <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, minHeight: '60vh' }}>
    <Outlet />
  </Box>
);

export default AuthLayout;
