import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { state, dispatch } = useContext(CartContext);
  const nav = useNavigate();
  const [address, setAddress] = useState({ address:'', city:'', postal:'', country:'' });

  const submitHandler = async (e) => {
    e.preventDefault();
    const itemsPrice = state.cartItems.reduce((a,c)=>a+c.price*c.qty,0);
    const shippingPrice = itemsPrice > 100 ? 0 : 20;
    const taxPrice = +(itemsPrice * 0.1).toFixed(2);
    const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const orderData = {
      orderItems: state.cartItems.map(i => ({ product: i.product, name: i.name, qty: i.qty, price: i.price, image: i.image })),
      shippingAddress: { address: address.address, city: address.city, postalCode: address.postal, country: address.country },
      paymentMethod: 'Dummy',
      itemsPrice, taxPrice, shippingPrice, totalPrice
    };

    try {
      const res = await API.post('/orders', orderData);
      dispatch({ type: 'CLEAR' });
      nav('/');
      alert('Order placed (dummy payment). Order id: ' + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Shipping</h2>
      <form onSubmit={submitHandler} className="space-y-3">
        <input required placeholder="Address" value={address.address} onChange={e=>setAddress({...address,address:e.target.value})} className="border p-2 w-full" />
        <input required placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} className="border p-2 w-full" />
        <input required placeholder="Postal Code" value={address.postal} onChange={e=>setAddress({...address,postal:e.target.value})} className="border p-2 w-full" />
        <input required placeholder="Country" value={address.country} onChange={e=>setAddress({...address,country:e.target.value})} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Place Order (Dummy)</button>
      </form>
    </div>
  );
}
