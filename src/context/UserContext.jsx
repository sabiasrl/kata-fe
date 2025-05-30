import React, { useState, useEffect, useCallback } from 'react';
import { login as apiLogin } from '../services/api';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
  reloadUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('bookstoreUser');
    return stored ? JSON.parse(stored) : null;
  });

  const reloadUser = useCallback(() => {
    const stored = localStorage.getItem('bookstoreUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!user || user.username !== parsed.username || user.password !== parsed.password) {
        setUser(parsed);
      }
    } else if (user) {
      setUser(null);
    }
  }, [user]);

  useEffect(() => {
    reloadUser();
  }, [reloadUser]);

  const login = async (username, password) => {
    try {
      await apiLogin({ username, password });
      setUser({ username, password });
      localStorage.setItem('bookstoreUser', JSON.stringify({ username, password }));
      return true;
    } catch {
      setUser(null);
      localStorage.removeItem('bookstoreUser');
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('bookstoreUser');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
}
