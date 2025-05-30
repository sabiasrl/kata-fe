import {
  fetchBooks,
  fetchBook,
  login,
  register,
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  checkout
} from './api.js';

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('api.js', () => {
  it('fetchBooks returns books on success', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: 1, title: 'Book' }] });
    const books = await fetchBooks();
    expect(books).toEqual([{ id: 1, title: 'Book' }]);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/books'));
  });

  it('fetchBooks throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(fetchBooks()).rejects.toThrow('Failed to fetch books');
  });

  it('login posts credentials and returns user', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ token: 'abc' }) });
    const res = await login({ username: 'a', password: 'b' });
    expect(res).toEqual({ token: 'abc' });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/login'), expect.objectContaining({ method: 'POST' }));
  });

  it('register posts credentials and returns user', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    const res = await register({ username: 'a', password: 'b' });
    expect(res).toEqual({ id: 1 });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/register'), expect.objectContaining({ method: 'POST' }));
  });

  it('fetchCart returns cart on success', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1, items: [] }) });
    const cart = await fetchCart(1, {});
    expect(cart).toEqual({ id: 1, items: [] });
  });

  it('addToCart posts and returns cart', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    const cart = await addToCart(1, 2, {});
    expect(cart).toEqual({ id: 1 });
  });

  it('updateCartItem puts and returns cart', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    const cart = await updateCartItem(1, 2, 3, {});
    expect(cart).toEqual({ id: 1 });
  });

  it('removeCartItem deletes and returns cart', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) });
    const cart = await removeCartItem(1, 2, {});
    expect(cart).toEqual({ id: 1 });
  });

  it('checkout posts and returns order', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ orderId: 1 }) });
    const order = await checkout(1, {});
    expect(order).toEqual({ orderId: 1 });
  });
});
