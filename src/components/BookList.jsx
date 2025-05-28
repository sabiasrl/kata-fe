import React, { useState } from 'react';

const BookList = ({ books, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-layout">
      <div className="book-list" style={{ flex: 2 }}>
        <h2>Books</h2>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 24, width: '100%', padding: '0.7em', fontSize: '1rem', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                padding: '1.5rem',
                minWidth: 220,
                maxWidth: 260,
                flex: '1 1 220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#232f3e', marginBottom: 6 }}>{book.title}</div>
                <div style={{ color: '#555', fontSize: '0.97rem', marginBottom: 8 }}>by {book.author}</div>
                <div style={{ color: '#b12704', fontWeight: 500, fontSize: '1.05rem', marginBottom: 12 }}>Price: ${book.price.toFixed(2)}</div>
              </div>
              <button style={{ minWidth: 120, marginTop: 8 }} onClick={() => onAddToCart(book)}>
                Add to Cart
              </button>
            </div>
          ))}
          {filteredBooks.length === 0 && <div style={{ color: '#888', fontStyle: 'italic' }}>No books found.</div>}
        </div>
      </div>
      {/* Shopping cart context card on the side will be rendered in App.jsx */}
    </div>
  );
};

export default BookList;
