import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <div className="main-card" style={{ maxWidth: 700, margin: '2rem auto' }}>
    <h1 style={{ fontWeight: 700, fontSize: '2.2rem', color: '#0078d4', marginBottom: 8 }}>Welcome to Kata Online Bookstore</h1>
    <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: 24 }}>
      Follow these steps to experience the bookstore:
    </p>
    <ol style={{ paddingLeft: 24, marginBottom: 32, fontSize: '1.1rem', color: '#222' }}>
      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 1: <a href="/register" style={{ color: '#0078d4', textDecoration: 'underline' }}>Register the user</a></li>
      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 2: <a href="/login" style={{ color: '#0078d4', textDecoration: 'underline' }}>Login</a></li>
      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 3: After successful login, go to <Link to="/products" style={{ color: '#0078d4', textDecoration: 'underline' }}>Products</Link></li>
      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 4: Add books to the cart</li>
      <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 5: Checkout</li>
    </ol>
    <div style={{ background: '#f4f8fb', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,120,212,0.06)', marginBottom: 16 }}>
      <h2 style={{ color: '#0078d4', fontWeight: 600, fontSize: '1.3rem', marginTop: 0 }}>How to test the application</h2>
      <p style={{ color: '#444', marginBottom: 8 }}>
        For detailed test instructions, please visit the <a href="/info" style={{ color: '#005a9e', textDecoration: 'underline' }}>Info Page</a>.
      </p>
    </div>
  </div>
);

export default HomePage;
