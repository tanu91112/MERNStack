import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative pb-[100%]">
          <img 
            src={product.images?.[0] || 'https://placehold.co/300x300?text=Product'} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://placehold.co/300x300?text=Product';
            }}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded">
            {product.category}
          </span>
          <h3 className="font-bold text-gray-900 dark:text-white mt-2 line-clamp-2 h-12">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 h-10">
            {product.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
            {product.countInStock > 0 ? (
              <span className="text-xs text-green-600 dark:text-green-400 ml-2">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 dark:text-red-400 ml-2">Out of Stock</span>
            )}
          </div>
          <Link 
            to={`/product/${product._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
