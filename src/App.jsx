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
    </Router>
  );
}

export default App;
