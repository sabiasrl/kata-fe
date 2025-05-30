import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LinkMUI from '@mui/material/Link';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, maxWidth: 700, mx: 'auto', my: 4 }}>
    <Typography variant="h4" color="secondary.main" fontWeight={700} gutterBottom>Welcome to Kata Online Bookstore</Typography>
    <Typography color="text.secondary" gutterBottom>Follow these steps to experience the bookstore:</Typography>
    <List>
      <ListItem>Step 1:&nbsp;<LinkMUI component={Link} to="/register" color="primary.main">Register the user</LinkMUI></ListItem>
      <ListItem>Step 2:&nbsp;<LinkMUI component={Link} to="/login" color="primary.main">Login</LinkMUI></ListItem>
      <ListItem>Step 3: After successful login, go to&nbsp;<LinkMUI component={Link} to="/products" color="primary.main">Products</LinkMUI></ListItem>
      <ListItem>Step 4: Add books to the cart</ListItem>
      <ListItem>Step 5: Checkout</ListItem>
    </List>
    <Paper elevation={1} sx={{ mt: 3, p: 2, background: 'linear-gradient(90deg, #fff7e6 0%, #ffe0b2 100%)' }}>
      <Typography variant="h6" color="primary.main" fontWeight={600} gutterBottom>How to test the application</Typography>
      <Typography color="text.secondary">
        For detailed test instructions, please visit the{' '}
        <LinkMUI component={Link} to="/info" color="secondary.main">Info Page</LinkMUI>.
      </Typography>
    </Paper>
  </Box>
);

export default HomePage;
