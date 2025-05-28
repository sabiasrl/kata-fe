import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import BookList from './BookList';
import Cart from './Cart';
import Checkout from './Checkout';
import { CartContext, cartReducer } from './CartContext';
import { fetchBooks } from './services/api';
import './App.css';

function Breadcrumbs() {
  const location = useLocation();
  const crumbs = location.pathname.split('/').filter(Boolean);
  let path = '';
  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/">Home</Link>
      {crumbs.map((crumb) => {
        path += `/${crumb}`;
        return (
          <span key={path}>
            {' / '}
            <Link to={path}>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</Link>
          </span>
        );
      })}
    </nav>
  );
}

function AppContent() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks().then(setBooks).catch(() => setBooks([])).finally(() => setLoading(false));
  }, []);

  const addToCart = (book) => dispatch({ type: 'ADD_TO_CART', book });
  const updateQuantity = (bookId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', bookId, quantity });
  const removeFromCart = (bookId) => dispatch({ type: 'REMOVE_FROM_CART', bookId });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cartItems: cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      <Breadcrumbs />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 2 }}>
                {loading ? <p>Loading books...</p> : <BookList books={books} onAddToCart={addToCart} />}
              </div>
              <div style={{ flex: 1, border: '1px solid #eee', padding: '1rem', borderRadius: '8px', background: '#fafafa' }}>
                <Cart cartItems={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
                {cart.length > 0 && (
                  <button style={{ marginTop: '1rem', width: '100%' }} onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cart}
              onCheckout={() => {
                clearCart();
                navigate('/');
                alert('Order placed!');
              }}
            />
          }
        />
      </Routes>
    </CartContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
