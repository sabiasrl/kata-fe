import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Breadcrumbs from './components/Breadcrumbs';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AuthButtons from './components/AuthButtons';
import HomePage from './pages/HomePage.jsx';
import Checkout from './components/Checkout';
import InfoPage from './pages/InfoPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6f00', 
    },
    secondary: {
      main: '#232f3e', 
    },
    background: {
      default: '#f3f3f3',
      paper: '#fff',
    },
    error: {
      main: '#b12704',
    },
  },
  typography: {
    fontFamily: 'Amazon Ember, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2.2rem',
      color: '#232f3e',
    },
    h5: {
      fontWeight: 600,
      color: '#232f3e',
    },
    subtitle1: {
      color: '#555',
    },
    body1: {
      color: '#232f3e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #ff9900 0%, #ff6f00 100%)',
          boxShadow: '0 2px 8px rgba(35,47,62,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#ff9900',
          color: '#232f3e',
          '&:hover': {
            backgroundColor: '#ff6f00',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#fff',
        },
      },
    },
  },
});

function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/vite.svg" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <Typography variant="h3" sx={{ color: 'secondary.main', fontWeight: 700 }}>
            Kata Online Bookstore
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ color: 'secondary.main', fontWeight: 500, mt: 1 }}>
          Discover, shop, and enjoy your next read
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Paper component="footer" square elevation={2} sx={{ mt: 6, py: 4, background: 'linear-gradient(90deg, #fff7e6 0%, #ffe0b2 100%)', color: 'secondary.main', borderTop: '1px solid #eee' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 6 }}>
        <Box sx={{ minWidth: 220, textAlign: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 600, fontSize: '1.15rem', mb: 1 }}>
            <img src="/vite.svg" alt="Logo" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span>Daniele Sabia</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <a href="mailto:sabiasrl@outlook.com" style={{ color: '#ff6f00', textDecoration: 'underline' }}>sabiasrl@outlook.com</a>
          </Box>
        </Box>
        <Box sx={{ minWidth: 220, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <a href="https://www.linkedin.com/in/daniele-sabia" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f00', textDecoration: 'underline' }}>
              LinkedIn: daniele-sabia
            </a>
          </Box>
          <Box>
            <a href="https://sabiasrl.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f00', textDecoration: 'underline' }}>
              Company: sabiasrl.com
            </a>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3, textAlign: 'center', fontWeight: 500, fontSize: '1rem' }}>
        © 2025 Sabia SRL. All rights reserved.
      </Box>
    </Paper>
  );
}

function AppContent() {
  const navigate = useNavigate();
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <Box sx={{ maxWidth: 1200, mx: 'auto', my: 4, p: { xs: 1, md: 3 }, minHeight: '70vh', bgcolor: 'background.default', borderRadius: 4 }}>
          <AuthButtons />
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage navigate={navigate}/>} />
            <Route path="/products/checkout" element={<Checkout />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </Box>
      </CartProvider>
    </UserProvider>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
