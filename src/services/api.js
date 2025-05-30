// src/services/api.js
// API service layer for Online Bookstore frontend

import { API_BASE_URL } from '../config/config.js';

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

// Cart: get by ID
export async function fetchCart(cartId, authHeader) {
  const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
    headers: { ...authHeader },
  });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}

// Cart: add book (POST /cart?bookId=...&quantity=...)
export async function addToCart(bookId, quantity, authHeader) {
  const url = `${API_BASE_URL}/cart?bookId=${bookId}&quantity=${quantity}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { ...authHeader },
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response.json();
}

// Cart: update item (PUT /cart/{cartId}?bookId=...&quantity=...)
export async function updateCartItem(cartId, bookId, quantity, authHeader) {
  const url = `${API_BASE_URL}/cart/${cartId}?bookId=${bookId}&quantity=${quantity}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { ...authHeader },
  });
  if (!response.ok) throw new Error('Failed to update cart item');
  return response.json();
}

// Cart: remove item (DELETE /cart/{cartId}?bookId=...)
export async function removeCartItem(cartId, bookId, authHeader) {
  const url = `${API_BASE_URL}/cart/${cartId}?bookId=${bookId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { ...authHeader },
  });
  if (!response.ok) throw new Error('Failed to remove cart item');
  return response.json();
}

// Checkout: POST /order/checkout?cartId=...
export async function checkout(cartId, authHeader) {
  const url = `${API_BASE_URL}/order/checkout?cartId=${cartId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { ...authHeader },
  });
  if (!response.ok) throw new Error('Checkout failed');
  return response.json();
}
