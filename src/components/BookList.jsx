import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

const BookList = ({ books, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5">Books</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Box>
        {filteredBooks.map((book) => (
          <Card key={book.id}>
            <CardContent>
              <Typography fontWeight={600}>{book.title}</Typography>
              <Typography color="text.secondary">by {book.author}</Typography>
              <Typography color="error.main">Price: ${book.price.toFixed(2)}</Typography>
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained" color="primary" onClick={() => onAddToCart(book)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
        {filteredBooks.length === 0 && <Typography color="text.secondary">No books found.</Typography>}
      </Box>
    </Box>
  );
};

export default BookList;
