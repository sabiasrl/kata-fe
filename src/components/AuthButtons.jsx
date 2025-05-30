import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserContext } from '../context/UserContext.jsx';

const AuthButtons = () => {
  const { user, logout, reloadUser } = useContext(UserContext);

  useEffect(() => {
    reloadUser && reloadUser();
  }, [user, reloadUser]);

  const handleLogout = async () => {
    await logout();
  };

  if (user && user.username) {
    return (
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Typography fontWeight={500} color="primary.main">Hello, {user.username}</Typography>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
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
