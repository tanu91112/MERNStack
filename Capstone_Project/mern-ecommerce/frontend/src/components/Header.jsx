import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header(){
  const { state: authState, dispatch } = useContext(AuthContext);
  const { state: cartState } = useContext(CartContext);
  const { theme, toggleTheme } = useTheme();
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MERN</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white ml-1">Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              Home
            </Link>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Cart */}
            <Link to="/cart" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-1">Cart ({cartState.cartItems.length})</span>
            </Link>

            {/* User Actions */}
            {authState.user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                  {authState.user.name}
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Logout
                </button>
                {authState.user.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}