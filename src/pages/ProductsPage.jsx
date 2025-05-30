import React, { useEffect, useState, useContext } from 'react';
import BookList from '../components/BookList.jsx';
import Cart from '../components/Cart.jsx';
import { CartContext } from '../context/CartContext.jsx';
import { fetchBooks } from '../services/api.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ProductsPage = ({ navigate }) => {
  const { cartItems } = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(() => setBooks([])).finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, my: 4 }}>
      <Box sx={{ flex: 2 }}>
        {loading ? <span>Loading books...</span> : <BookList books={books} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 320 }}>
        <Cart />
        {cartItems.length > 0 && (
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/products/checkout')}>
            Proceed to Checkout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
