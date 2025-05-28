// src/services/api.js
// API service layer for Online Bookstore frontend

const API_BASE_URL = 'http://localhost:8080';

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

export async function fetchBook(id) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
}

export async function login({ username, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function register({ username, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export async function fetchCart(token) {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

export async function addToCart(bookId, quantity, token) {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId, quantity }),
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
}

export async function checkout(token) {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Checkout failed');
  return response.json();
}
