import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import Cart from '../components/Cart';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { fetchBooks } from '../services/api';

const ProductsHome = ({ onAddToCart, onUpdateQuantity, onRemove, navigate }) => {
  const { cartItems } = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(() => setBooks([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-layout">
      <div style={{ flex: 2 }}>
        {loading ? <p>Loading books...</p> : <BookList books={books} onAddToCart={onAddToCart} />}
      </div>
      <div className="cart-summary" style={{ flex: 1, minWidth: 320, marginLeft: 24 }}>
        <Cart cartItems={cartItems} onUpdateQuantity={onUpdateQuantity} onRemove={onRemove} />
        {cartItems.length > 0 && (
          <button style={{ marginTop: '1rem', width: '100%' }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsHome;
