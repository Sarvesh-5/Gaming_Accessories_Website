'use client';
import { useEffect, useState } from 'react';
import useStore from '@/app/store/useStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/firebaseConfig';
import axios from 'axios';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 4000 ? 0 : 150;
  const total = subtotal - discount + deliveryCharge;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        toast.error('Please log in to continue.');
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FLASH10') {
      setDiscount(subtotal * 0.1);
      toast.success('FLASH10 applied: 10% off');
      setCouponApplied('FLASH10');
    } else if (code === 'WORKCOHOL') {
      setDiscount(subtotal * 0.3);
      toast.success('WORKCOHOL applied: 30% off');
      setCouponApplied('WORKCOHOL');
    } else {
      setDiscount(0);
      setCouponApplied('');
      toast.error('Invalid coupon code');
    }
  };

  const generateOrderId = () => {
    return 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handlePlaceOrder = async () => {
    const { name, phone, street, city, state, pincode } = address;

    if (!name || !phone || !street || !city || !state || !pincode) {
      toast.error('Please fill in all address fields');
      return;
    }

    const orderId = generateOrderId();

const user = auth.currentUser;

const orderData = {
  order_id: orderId,
  name,
  email: user?.email,         // ✅ include this!
  phone,
  street,
  city,
  state,
  pincode,
  payment_method: paymentMethod,
  subtotal,
  discount,
  delivery_charge: deliveryCharge,
  total,
  coupon: couponApplied,
};


    try {
      await axios.post('http://localhost:8000/api/orders/', orderData);
      toast.success('Order saved to backend!');
    } catch (error) {
      console.error('Error saving to backend:', error);
      toast.error('Failed to save order. Please try again.');
      return;
    }

    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    router.push('/payment-success');
  };

  if (!userLoggedIn) return null;

  return (
    <div className="min-h-screen bg-white py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address & Payment */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-gray-800">Shipping Address</h2>
          <div className="space-y-3">
            {['name', 'phone', 'street', 'city', 'state', 'pincode'].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#83b735] text-sm"
                value={address[field]}
                onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
              />
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3 text-gray-800">Payment Method</h2>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              UPI (Demo)
            </label>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Apply Coupon</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 border px-3 py-2 rounded-md text-sm"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-[#83b735] text-white px-4 py-2 rounded-md hover:bg-black transition text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
          <ul className="space-y-2 text-gray-700 max-h-60 overflow-auto pr-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.title} × {item.quantity}</span>
                <span>
                  ₹ {(item.price * item.quantity).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-3" />

          <div className="flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>₹ {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between font-medium text-green-600">
            <span>Discount ({couponApplied || 'None'}):</span>
            <span>- ₹ {discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="flex justify-between font-medium text-blue-600">
            <span>Delivery:</span>
            <span>{deliveryCharge === 0 ? 'Free' : `₹ ${deliveryCharge}`}</span>
          </div>

          <div className="flex justify-between font-bold text-black text-base mt-2">
            <span>Total:</span>
            <span>₹ {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-5 bg-[#83b735] hover:bg-black text-white font-semibold py-2 rounded-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
