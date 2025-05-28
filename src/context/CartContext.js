import React from 'react';

const initialCartState = [];

export const CartContext = React.createContext({
  cartItems: initialCartState,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.find((item) => item.book.id === action.book.id);
      if (existing) {
        return state.map((item) =>
          item.book.id === action.book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { book: action.book, quantity: 1 }];
    }
    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.book.id === action.bookId
          ? { ...item, quantity: action.quantity }
          : item
      ).filter((item) => item.quantity > 0);
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.book.id !== action.bookId);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}
