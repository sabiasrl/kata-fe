import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinkMUI from '@mui/material/Link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register({ username, password });
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1200);
    } catch {
      setError('Registration failed. Try a different username.');
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" align="center" color="secondary.main" fontWeight={700} gutterBottom>Register</Typography>
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
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>
          Register
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }} align="center">
        Already have an account?{' '}
        <LinkMUI component={Link} to="/login" color="primary.main">Login</LinkMUI>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
