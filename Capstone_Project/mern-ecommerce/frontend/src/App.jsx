import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Header from './components/Header';

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto p-4 flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </main>
        <footer className="text-center p-4">© {new Date().getFullYear()} MERN E-Commerce</footer>
      </div>
    </BrowserRouter>
  );
}