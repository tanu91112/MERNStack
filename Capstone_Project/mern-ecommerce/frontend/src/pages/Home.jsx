import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useNotification } from '../contexts/NotificationContext';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const { addNotification } = useNotification();

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log(`Fetching products with page=${page} and keyword=${q}`);
        console.log('API Base URL:', API.defaults.baseURL);
        
        const url = `/products?page=${page}${q ? `&keyword=${q}` : ''}`;
        console.log('Request URL:', url);
        
        const res = await API.get(url);
        console.log('Products API response:', res.data);
        
        if (isMounted) {
          setProducts(res.data.products);
          setPages(res.data.pages);
          setErrorCount(0); // Reset error count on success
          console.log(`Successfully loaded ${res.data.products.length} products`);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response,
          request: err.request
        });
        if (isMounted) {
          // Limit error notifications to prevent spam
          if (errorCount < 3) {
            addNotification({ type: 'error', title: 'Error', message: 'Failed to load products' });
            setErrorCount(prev => prev + 1);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, [page, q, addNotification, errorCount]);

  // Reset to first page when search query changes
  useEffect(() => {
    setPage(1);
  }, [q]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Products</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Discover our wide range of high-quality products</p>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input 
              placeholder="Search products..." 
              value={q} 
              onChange={e => setQ(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            />
            <svg 
              className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
          
          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
            </div>
          )}
          
          {pages > 1 && (
            <div className="mt-8">
              <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
}