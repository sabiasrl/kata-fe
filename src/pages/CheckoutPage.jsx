import React from 'react';
import Checkout from '../components/Checkout.jsx';
import { Box } from '@mui/material';

const CheckoutPage = () => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, my: 4 }}>
      <Box sx={{ flex: 1, minWidth: 320 }}>
        <Checkout />
      </Box>
    </Box>
  );
};

export default CheckoutPage;
