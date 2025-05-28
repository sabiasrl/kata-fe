import React from 'react';

const BookList = ({ books, onAddToCart }) => (
  <div>
    <h2>Books</h2>
    <ul>
      {books.map((book) => (
        <li key={book.id} style={{ marginBottom: '1rem' }}>
          <div><strong>{book.title}</strong> by {book.author}</div>
          <div>Price: ${book.price.toFixed(2)}</div>
          <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  </div>
);

export default BookList;
