import React from 'react';

const Checkout = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.book.id}>
                {item.book.title} x {item.quantity} = $
                {(item.book.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <div>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button onClick={onCheckout} style={{ marginTop: '1rem' }}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
