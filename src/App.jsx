import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartContext, cartReducer } from './context/CartContext';
import { fetchBooks } from './services/api';
import './App.css';
import Breadcrumbs from './components/Breadcrumbs';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AuthButtons from './components/AuthButtons';

function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #0078d4 0%, #005a9e 100%)',
      color: '#fff',
      padding: '2rem 0 1rem 0',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      marginBottom: '2rem',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        margin: 0,
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}>
        Kata Online Bookstore
      </h1>
      <p style={{ fontSize: '1.2rem', fontWeight: 400, margin: '0.5rem 0 0 0', color: '#e6e6e6' }}>
        Discover, shop, and enjoy your next read
      </p>
    </header>
  );
}

function AppContent() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks().then(setBooks).catch(() => setBooks([])).finally(() => setLoading(false));
  }, []);

  const addToCart = (book) => dispatch({ type: 'ADD_TO_CART', book });
  const updateQuantity = (bookId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', bookId, quantity });
  const removeFromCart = (bookId) => dispatch({ type: 'REMOVE_FROM_CART', bookId });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const handleLogout = () => setUser(null);

  return (
    <CartContext.Provider value={{ cartItems: cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      <Header />
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2rem 2.5rem 2.5rem 2.5rem' }}>
        <AuthButtons user={user} onLogout={handleLogout} />
        <Breadcrumbs />
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex-layout">
                <div style={{ flex: 2 }}>
                  {loading ? <p>Loading books...</p> : <BookList books={books} onAddToCart={addToCart} />}
                </div>
                <div className="cart-summary" style={{ flex: 1, minWidth: 320, marginLeft: 24 }}>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
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
