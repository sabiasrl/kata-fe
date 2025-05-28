import React from 'react';

const AuthButtons = ({ user, onLogout }) => {
  if (user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontWeight: 500, color: '#0078d4' }}>Hello, {user.username}</span>
        <button style={{ background: '#fff', color: '#0078d4', border: '1px solid #0078d4', fontWeight: 600 }} onClick={onLogout}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '1.5rem' }}>
      <a href="/login">
        <button style={{ background: '#fff', color: '#0078d4', border: '1px solid #0078d4', fontWeight: 600 }}>
          Login
        </button>
      </a>
      <a href="/register">
        <button style={{ background: '#0078d4', color: '#fff', border: '1px solid #0078d4', fontWeight: 600 }}>
          Register
        </button>
      </a>
    </div>
  );
};

export default AuthButtons;
