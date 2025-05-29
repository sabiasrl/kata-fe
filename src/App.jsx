import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CartContext, cartReducer } from './context/CartContext';
import { fetchBooks } from './services/api';
import './App.css';
import Breadcrumbs from './components/Breadcrumbs';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AuthButtons from './components/AuthButtons';
import HomePage from './pages/HomePage.jsx';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import InfoPage from './pages/InfoPage.jsx';
import ProductsHome from './pages/ProductsHome.jsx';

function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #0078d4 0%, #00b4d8 100%)',
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
        color: '#00b4d8', // Brighter blue for the title
        textShadow: '0 2px 8px rgba(0,120,212,0.10)',
      }}>
        Kata Online Bookstore
      </h1>
      <p style={{ fontSize: '1.2rem', fontWeight: 400, margin: '0.5rem 0 0 0', color: '#e6e6e6' }}>
        Discover, shop, and enjoy your next read
      </p>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(90deg, #f4f8fb 0%, #e0f7fa 100%)',
      color: '#222',
      textAlign: 'center',
      padding: '2.5rem 0 1.5rem 0',
      marginTop: '2rem',
      borderTop: '1px solid #e0e0e0',
      fontSize: '1.08rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.7rem',
      boxShadow: '0 -2px 12px rgba(0,120,212,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600, fontSize: '1.15rem' }}>
        <img src="/vite.svg" alt="Logo" style={{ width: 32, height: 32, borderRadius: '50%', boxShadow: '0 1px 4px #0078d4' }} />
        <span>Daniele Sabia</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="20" height="20" fill="#0078d4" style={{ marginRight: 4 }} viewBox="0 0 24 24"><path d="M12 12.713l11.985-8.713h-23.97zm0 2.574l-12-8.713v13.426h24v-13.426zm12-11.287v-.001c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v.001l12 8.713 12-8.713z"/></svg>
        <a href="mailto:sabiasrl@outlook.com" style={{ color: '#0078d4', textDecoration: 'underline' }}>sabiasrl@outlook.com</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="20" height="20" fill="#0078d4" style={{ marginRight: 4 }} viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-7 19h-3v-8h3v8zm-1.5-9.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 9.268c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14c1.654 0 3 1.346 3 3v14zm-6-1h-3v-4c0-1.104-.896-2-2-2s-2 .896-2 2v4h-3v-8h3v1.268c.591-.348 1.27-.568 2-.568s1.409.22 2 .568v-1.268h3v8z"/></svg>
        <a href="https://www.linkedin.com/in/daniele-sabia" target="_blank" rel="noopener noreferrer" style={{ color: '#0078d4', textDecoration: 'underline' }}>
          LinkedIn: daniele-sabia
        </a>
      </div>
    </footer>
  );
}

function AppContent() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const addToCart = (book) => dispatch({ type: 'ADD_TO_CART', book });
  const updateQuantity = (bookId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', bookId, quantity });
  const removeFromCart = (bookId) => dispatch({ type: 'REMOVE_FROM_CART', bookId });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const handleLogout = () => setUser(null);

  return (
    <CartContext.Provider value={{ cartItems: cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      <Header />
      <div className="main-card">
        <AuthButtons user={user} onLogout={handleLogout} />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={
            <ProductsHome onAddToCart={addToCart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} navigate={navigate}/>
          } />
          <Route path="/checkout" element={
            <Checkout
              cartItems={cart}
              onCheckout={() => {
                clearCart();
                navigate('/');
                alert('Order placed!');
              }}
            />
          } />
          <Route path="/info" element={<InfoPage />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Footer />
    </Router>
  );
}

export default App;
