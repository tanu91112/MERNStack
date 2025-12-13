import React, { createContext, useReducer } from 'react';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

function cartReducer(state, action) {
  switch(action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const exist = state.cartItems.find(x => x.product === item.product);
      let updated;
      if (exist) {
        updated = state.cartItems.map(x => x.product === exist.product ? item : x);
      } else {
        updated = [...state.cartItems, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return { ...state, cartItems: updated };
    }
    case 'REMOVE_ITEM': {
      const updated = state.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return { ...state, cartItems: updated };
    }
    case 'CLEAR': {
      localStorage.removeItem('cartItems');
      return { ...state, cartItems: [] };
    }
    default: return state;
  }
}

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};
