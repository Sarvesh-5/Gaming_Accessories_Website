'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/app/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  // ✅ Your admin email
  const adminEmail = 'admin@gmail.com';

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('Logged in as:', user?.email); // ✅ Log email to debug
  
      // TEMP: skip admin check to test
      if (user) {
        fetchOrders();
      } else {
        router.push('/login');
      }
    });
  }, []);
  

  const fetchOrders = async () => {
    try {
        const res = await axios.get('http://localhost:8000/api/orders/all/');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-8">Loading all orders...</p>;

  return (
    <div className="min-h-screen py-10 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📋 Admin Dashboard – Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.order_id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>User:</strong> {order.name} ({order.email})</p>
                <p><strong>Total:</strong> ₹ {order.total.toLocaleString('en-IN')}</p>
                <p><strong>Payment:</strong> {order.payment_method?.toUpperCase()}</p>
                <p><strong>Placed At:</strong> {new Date(order.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
