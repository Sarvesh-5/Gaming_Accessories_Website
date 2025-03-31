'use client';
import useStore from '@/app/store/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { X, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useStore();
  const router = useRouter();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    toast.success("Redirecting to payment...");
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  return (
    <div className="min-h-screen py-14 px-4 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 rounded-xl shadow p-4 gap-4 relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                  >
                    <X size={16} />
                  </button>

                  {/* Image */}
                  <div className="relative w-28 h-28 shrink-0 bg-white rounded-lg overflow-hidden border">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                      sizes="112px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
                        <button onClick={() => decreaseQty(item.id)} className="text-gray-700 hover:text-black">
                          <Minus size={16} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="text-gray-700 hover:text-black">
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-green-600 font-semibold">
                        ₹ {(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-10 text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                Total: ₹ {totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </h3>
              <button
                onClick={handleCheckout}
                className="mt-6 bg-[#83b735] hover:bg-black text-white font-semibold px-8 py-3 rounded-md transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
