import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinkMUI from '@mui/material/Link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate('/products');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" align="center" color="secondary.main" fontWeight={700} gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>
          Login
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }} align="center">
        Don't have an account?{' '}
        <LinkMUI component={Link} to="/register" color="primary.main">Register</LinkMUI>
      </Typography>
    </Box>
  );
};

export default LoginPage;
