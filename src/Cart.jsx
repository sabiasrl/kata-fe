import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemove }) => (
  <div>
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cartItems.map((item) => (
          <li key={item.book.id} style={{ marginBottom: '1rem' }}>
            <div><strong>{item.book.title}</strong> by {item.book.author}</div>
            <div>Price: ${item.book.price.toFixed(2)}</div>
            <div>
              Quantity: 
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.book.id, Number(e.target.value))}
                style={{ width: '3rem', marginLeft: '0.5rem' }}
              />
              <button onClick={() => onRemove(item.book.id)} style={{ marginLeft: '1rem' }}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Cart;
