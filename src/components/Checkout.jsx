import React from 'react';

const Checkout = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div className="main-card" style={{ width: '100%', maxWidth: '100%', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Checkout</h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ marginBottom: 24 }}>
            {cartItems.map((item) => (
              <li key={item.book.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
                <span>
                  <span style={{ fontWeight: 500 }}>{item.book.title}</span>
                  <span style={{ color: '#888', fontSize: '0.95em', marginLeft: 8 }}>x {item.quantity}</span>
                </span>
                <span style={{ color: '#b12704', fontWeight: 500 }}>
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600, marginBottom: 24 }}>
            <span>Total:</span>
            <span style={{ color: '#b12704' }}>${total.toFixed(2)}</span>
          </div>
          <button style={{ width: '100%', fontSize: '1.1rem', padding: '0.8em 0' }} onClick={onCheckout}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
