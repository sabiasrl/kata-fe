import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AuthButtons = ({ user, onLogout }) => {
  if (user) {
    return (
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Typography fontWeight={500} color="primary.main">Hello, {user.username}</Typography>
        <Button variant="outlined" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </Stack>
    );
  }
  return (
    <Stack direction="row" justifyContent="flex-end" spacing={2}>
      <Button component="a" href="/login" variant="outlined" color="primary">
        Login
      </Button>
      <Button component="a" href="/register" variant="contained" color="primary">
        Register
      </Button>
    </Stack>
  );
};

export default AuthButtons;
