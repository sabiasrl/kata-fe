import React from 'react';


const HomePage = () => (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '2.5rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2.2rem', color: '#0078d4', marginBottom: 8 }}>Welcome to Kata Online Bookstore</h1>
        <div style={{ background: '#f4f8fb', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,120,212,0.06)', marginBottom: 16 }}>

            <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: 24 }}>
                Follow these steps to experience the bookstore:
            </p>
            <ol style={{ paddingLeft: 24, marginBottom: 32, fontSize: '1.1rem', color: '#222' }}>
                <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 1: Register the user</li>
                <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 2: Login</li>
                <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 3: After successful login, go to <a href="/" style={{ color: '#0078d4', textDecoration: 'underline' }}>Products</a></li>
                <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 4: Add books to the cart</li>
                <li style={{ marginBottom: 10, lineHeight: 1.7 }}>Step 5: Checkout</li>
            </ol>
        </div>
        <div style={{ background: '#f4f8fb', borderRadius: 8, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,120,212,0.06)', marginBottom: 16 }}>
            <h2 style={{ color: '#0078d4', fontWeight: 600, fontSize: '1.3rem', marginTop: 0 }}>How to test the application</h2>
            <p style={{ color: '#444', marginBottom: 8 }}>
                For detailed test instructions, please visit the <a href="/info" style={{ color: '#005a9e', textDecoration: 'underline' }}>Info Page</a>.
            </p>
        </div>
    </div>
);

export default HomePage;
