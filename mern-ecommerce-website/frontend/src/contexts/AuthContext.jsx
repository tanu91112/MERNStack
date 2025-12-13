import React, { createContext, useReducer } from 'react';

const initial = { user: JSON.parse(localStorage.getItem('userInfo')) || null };

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN': {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      localStorage.removeItem('userInfo');
      return { ...state, user: null };
    }
    default: return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
