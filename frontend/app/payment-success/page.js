'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PaymentSuccess() {
  const [order, setOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch latest order from backend
    const fetchOrder = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/orders/all/');
        if (res.data.length > 0) {
          setOrder(res.data[0]); // latest order first
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/');
      }
    };

    fetchOrder();
  }, []);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-green-50 border border-green-200 rounded-lg p-8 shadow">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>

        <div className="space-y-4 text-sm text-gray-800">
          <div><strong>🆔 Order ID:</strong> {order.order_id || 'N/A'}</div>
          <div><strong>💳 Payment Method:</strong> {order.payment_method?.toUpperCase() || 'N/A'}</div>
          <div><strong>📦 Shipping Address:</strong>
            <div className="ml-2 mt-1 text-gray-600">
              {order.name}, {order.phone}<br />
              {order.street}, {order.city}<br />
              {order.state} - {order.pincode}
            </div>
          </div>
          <div>
            <strong>🧾 Total Paid:</strong> ₹ {order.total?.toLocaleString('en-IN', { minimumFractionDigits: 2 }) || '0.00'}
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-8 w-full bg-[#83b735] hover:bg-black text-white font-semibold py-2 rounded-md transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
