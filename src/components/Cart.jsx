import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';

function NumberInput({ value, onChange, min = 1 }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Button size="small" variant="outlined" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} sx={{ minWidth: 32, px: 0 }}>
        -
      </Button>
      <TextField
        type="number"
        size="small"
        value={value}
        inputProps={{ min, style: { width: 40, textAlign: 'center', padding: 0 } }}
        onChange={e => {
          const v = Number(e.target.value);
          if (!isNaN(v) && v >= min) onChange(v);
        }}
        variant="standard"
        sx={{ mx: 0.5, width: 40, '& .MuiInputBase-input': { textAlign: 'center', p: 0 } }}
      />
      <Button size="small" variant="outlined" onClick={() => onChange(value + 1)} sx={{ minWidth: 32, px: 0 }}>
        +
      </Button>
    </Stack>
  );
}

const Cart = ({ cartItems, onUpdateQuantity, onRemove }) => (
  <Paper elevation={2} sx={{ p: 2, borderRadius: 3, bgcolor: 'background.paper' }}>
    <Typography variant="h5" color="secondary.main" fontWeight={700} gutterBottom>Shopping Cart</Typography>
    {cartItems.length === 0 ? (
      <Typography color="text.secondary">Your cart is empty.</Typography>
    ) : (
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.book.id} sx={{ mb: 2, p: 0, flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #eee', '&:last-child': { borderBottom: 'none' } }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Stack>
                <Typography fontWeight={600}>{item.book.title}</Typography>
                <Typography variant="body2" color="text.secondary">by {item.book.author}</Typography>
                <Typography variant="body2" color="primary.main">Price: ${item.book.price.toFixed(2)}</Typography>
              </Stack>
              <IconButton size="small" color="error" onClick={() => onRemove(item.book.id)} aria-label="Remove">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Typography variant="body2">Quantity:</Typography>
              <NumberInput
                value={item.quantity}
                onChange={q => onUpdateQuantity(item.book.id, q)}
                min={1}
              />
            </Stack>
          </ListItem>
        ))}
      </List>
    )}
  </Paper>
);

export default Cart;
