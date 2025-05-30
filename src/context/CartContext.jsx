import React, { useState, useCallback, useEffect, useContext } from 'react';
import {
  fetchCart,
  addToCart as apiAddToCart,
  checkout as apiCheckout,
  updateCartItem,
  removeCartItem
} from '../services/api';
import { UserContext } from './UserContext';

const initialCartState = [];

export const CartContext = React.createContext({
  cartItems: initialCartState,
  cartId: null,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  checkout: async () => {},
  reloadCart: async () => {},
});

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  function getAuthHeader() {
    if (!user || !user.username || !user.password) return {};
    const encoded = btoa(`${user.username}:${user.password}`);
    return { Authorization: `Basic ${encoded}` };
  }

  const reloadCart = useCallback(async (overrideCartId) => {
    const effectiveCartId = overrideCartId ?? cartId;
    if (user && user.username && user.password && effectiveCartId) {
      try {
        const cart = await fetchCart(effectiveCartId, getAuthHeader());
        setCartItems(cart.items || []);
        if(!cart.items || cart.items.length === 0) {
          setCartId(null); // Clear cartId if no items
        }
      } catch {
        setCartItems([]);
        setCartId(null);
      }
    } else {
      setCartItems([]);
      setCartId(null);
    }
  }, [user, cartId]);

  useEffect(() => {
    reloadCart();
  }, [user, reloadCart]);

  const addToCart = async (book, quantity) => {
    if (!user || !user.username || !user.password) return;
    if (!cartId) {
      // No cart: create cart and add first item (POST with dummy cartId 0)
      const response = await apiAddToCart(book.id, quantity || 1, getAuthHeader());
      if (response.id) {
        setCartId(response.id);
        await new Promise(resolve => setTimeout(resolve, 0)); // ensure state update
      }
      await reloadCart(response.id); // Pass new cartId here
      return;
    }
    // Cart exists: use updateCartItem (PUT)
    const effectiveQuantity = quantity || cartItems.find(item => item.book.id === book.id)?.quantity + 1 || 1;
    await updateCartItem(cartId, book.id, effectiveQuantity, getAuthHeader());
    await reloadCart();
  };

  const updateQuantity = async (bookId, quantity) => {
    if (!user || !user.username || !user.password || !cartId) return;
    await updateCartItem(cartId, bookId, quantity, getAuthHeader());
    await reloadCart();
  };

  const removeFromCart = async (bookId) => {
    if (!user || !user.username || !user.password || !cartId) return;
    await removeCartItem(cartId, bookId, getAuthHeader());
    await reloadCart();
  };

  const clearCart = async () => {
    if (!user || !user.username || !user.password || !cartId) return;
    for (const item of cartItems) {
      await removeCartItem(cartId, item.book.id, getAuthHeader());
    }
    await reloadCart();
  };

  const checkout = async () => {
    if (!user || !user.username || !user.password || !cartId) return;
    await apiCheckout(cartId, getAuthHeader());
    setCartItems([]);
    setCartId(null);
    await reloadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        reloadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
