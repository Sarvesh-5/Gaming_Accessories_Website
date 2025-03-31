'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebaseConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await axios.get('http://localhost:8000/api/orders/all/');
          const userOrders = res.data.filter((order) => order.email === user.email);
          setOrders(userOrders);
        } catch (err) {
          console.error('Error fetching orders:', err);
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/login');
      }
    });
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-500">Loading your orders...</p>;

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-100 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🧾 My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500">
                    <strong>📅</strong> {new Date(order.created_at).toLocaleString()}
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {order.payment_method.toUpperCase()}
                  </div>
                </div>

                <div className="text-lg font-semibold text-gray-800 mb-1">
                  Order ID: <span className="text-blue-600">{order.order_id}</span>
                </div>

                <div className="text-sm text-gray-700">
                  <p><strong>👤 Name:</strong> {order.name}</p>
                  <p><strong>📍 Address:</strong> {order.street}, {order.city}, {order.state} - {order.pincode}</p>
                  <p><strong>📞 Phone:</strong> {order.phone}</p>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                  <p><strong>Subtotal:</strong> ₹ {order.subtotal.toLocaleString('en-IN')}</p>
                  <p><strong>Discount:</strong> ₹ {order.discount.toLocaleString('en-IN')}</p>
                  <p><strong>Delivery:</strong> ₹ {order.delivery_charge.toLocaleString('en-IN')}</p>
                  <p className="col-span-2 text-lg font-bold text-green-600">
                    Total Paid: ₹ {order.total.toLocaleString('en-IN')}
                  </p>
                  {order.coupon && (
                    <p className="col-span-2 text-xs text-gray-500 italic">Coupon Applied: {order.coupon}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
