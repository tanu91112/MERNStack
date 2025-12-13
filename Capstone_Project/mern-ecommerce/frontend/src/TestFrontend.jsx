import React, { useEffect, useState } from 'react';
import API from './api/axios';

export default function TestFrontend() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await API.post('/auth/register', {
        name: 'Frontend Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });
      setResult(response.data);
    } catch (err) {
      console.error('Frontend registration error:', err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const testProducts = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await API.get('/products');
      setResult(response.data);
    } catch (err) {
      console.error('Frontend products error:', err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Frontend API Test</h1>
      
      <div className="space-x-4 mb-6">
        <button 
          onClick={testRegister}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Register
        </button>
        <button 
          onClick={testProducts}
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Test Products
        </button>
      </div>

      {loading && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Loading...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success!</strong>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}