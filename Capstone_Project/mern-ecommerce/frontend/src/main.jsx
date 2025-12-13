import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Notification from './components/Notification';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <Notification />
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
