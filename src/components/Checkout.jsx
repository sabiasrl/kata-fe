import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartContext } from '../context/CartContext.jsx';

const Checkout = () => {
  const { cartItems, checkout, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h5" align="center" color="secondary.main" fontWeight={700} gutterBottom>Checkout</Typography>
      {cartItems.length === 0 ? (
        <Typography align="center" color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <>
          <List sx={{ mb: 2 }}>
            {cartItems.map((item) => (
              <ListItem key={item.book.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>{item.book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">x {item.quantity}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography color="primary.main" fontWeight={600}>
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeFromCart(item.book.id)} aria-label="Remove">
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, px: 1 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="error.main">${total.toFixed(2)}</Typography>
          </Stack>
          <Button fullWidth variant="contained" color="primary" size="large" onClick={checkout} sx={{ fontWeight: 700 }}>
            Place Order
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Checkout;
