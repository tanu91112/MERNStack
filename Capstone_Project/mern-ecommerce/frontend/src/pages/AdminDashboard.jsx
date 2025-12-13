import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard(){
  const [orders, setOrders] = useState([]);
  useEffect(() => { API.get('/orders').then(res => setOrders(res.data)).catch(()=>{}); }, []);
  return (
    <div>
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4">
          <h3 className="font-semibold">Orders</h3>
          <ul>
            {orders.map(o => <li key={o._id} className="py-2 border-b">{o._id} - {o.user?.name} - ₹{o.totalPrice}</li>)}
          </ul>
        </div>
        <div className="border p-4">
          <h3 className="font-semibold">Quick Stats</h3>
          <div>Orders: {orders.length}</div>
          <div>Revenue: ₹{orders.reduce((a,c)=>a+(c.totalPrice||0),0).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
