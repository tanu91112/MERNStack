import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { CartContext } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

export default function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(CartContext);
  const { addNotification } = useNotification();
  const nav = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load product'
        });
        nav('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, nav, addNotification]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) return null;

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: product._id,
        name: product.name,
        image: product.images?.[0] || 'https://placehold.co/300x300?text=Product',
        price: product.price,
        qty
      }
    });
    
    addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} added to your cart!`
    });
    
    nav('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <img 
                src={product.images?.[0] || 'https://placehold.co/600x600?text=Product'} 
                alt={product.name}
                className="w-full h-full object-contain bg-gray-100 dark:bg-gray-700"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x600?text=Product';
                }}
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-4">{product.description}</p>
            </div>
            
            <div className="flex items-center mt-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
              {product.countInStock > 0 ? (
                <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  In Stock ({product.countInStock} available)
                </span>
              ) : (
                <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              )}
            </div>
            
            {product.countInStock > 0 && (
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mr-4">Quantity:</label>
                  <select 
                    value={qty} 
                    onChange={e => setQty(Number(e.target.value))}
                    className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {Array.from({length: Math.min(product.countInStock, 10)}).map((_, i) => (
                      <option key={i} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  onClick={addToCart}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Product Details</h3>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-gray-500 dark:text-gray-400 w-32">Category:</span>
                  <span className="text-gray-900 dark:text-white">{product.category}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-500 dark:text-gray-400 w-32">Availability:</span>
                  <span className={product.countInStock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
