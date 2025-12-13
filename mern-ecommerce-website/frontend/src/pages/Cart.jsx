import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';

export default function Cart(){
  const { state, dispatch } = useContext(CartContext);
  const { addNotification } = useNotification();
  const nav = useNavigate();
  const subtotal = state.cartItems.reduce((a,c) => a + c.price * c.qty, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleRemoveItem = (productId, productName) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    addNotification({
      type: 'success',
      title: 'Removed',
      message: `${productName} removed from cart`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      
      {state.cartItems.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't added any items to your cart yet</p>
          <Link 
            to="/" 
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {state.cartItems.map(item => (
                  <div key={item.product} className="p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/300x300?text=Product';
                        }}
                      />
                    </div>
                    
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <Link 
                              to={`/product/${item.product}`} 
                              className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 text-gray-600 dark:text-gray-300">₹{item.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.product, item.name)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-4 flex items-center">
                          <label htmlFor={`quantity-${item.product}`} className="mr-2 text-gray-600 dark:text-gray-300">Qty:</label>
                          <select 
                            id={`quantity-${item.product}`}
                            value={item.qty} 
                            onChange={(e) => dispatch({
                              type: 'ADD_ITEM',
                              payload: { ...item, qty: Number(e.target.value) }
                            })}
                            className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {Array.from({length: 10}).map((_,i) => <option key={i} value={i+1}>{i+1}</option>)}
                          </select>
                          
                          <div className="ml-auto text-lg font-medium text-gray-900 dark:text-white">
                            ₹{(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-gray-900 dark:text-white">{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span className="text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-medium">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => nav('/checkout')}
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Proceed to Checkout
              </button>
              
              <Link 
                to="/" 
                className="mt-4 block text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
