'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useStore from '@/app/store/useStore';
import { toast } from 'react-hot-toast';

const products = [
  {
    id: 1,
    name: 'Mouse pad',
    category: 'Track pad',
    price: 129,
    originalPrice: 599,
    rating: 3.5,
    image: '/products/Homepage/keypad/colour1.png',
    variants: [
      '/products/Homepage/keypad/colour1.png',
      '/products/Homepage/keypad/colour2.png',
      '/products/Homepage/keypad/colour3.png',
      '/products/Homepage/keypad/colour4.png',
    ],
  },
  {
    id: 2,
    name: 'Zebronics Mouse',
    category: 'mouse',
    price: 1299,
    originalPrice: 1899,
    rating: 4.5,
    image: '/products/Homepage/mouse/colour1.png',
    variants: [
      '/products/Homepage/mouse/colour1.png',
      '/products/Homepage/mouse/colour2.png',
      '/products/Homepage/mouse/colour3.png',
      '/products/Homepage/mouse/colour4.png',
    ],
  },
];

const getRemainingTime = (endTime) => {
  const now = new Date().getTime();
  const distance = endTime - now;
  return {
    days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((distance / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((distance / (1000 * 60)) % 60), 0),
    seconds: Math.max(Math.floor((distance / 1000) % 60), 0),
  };
};

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const Star = ({ type }) => {
    if (type === 'full') {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400 fill-current">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.801 1.456 8.297L12 18.896l-7.392 4.508 1.456-8.297L.001 9.306l8.332-1.151z" />
        </svg>
      );
    }
    if (type === 'half') {
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.801 1.456 8.297L12 18.896l-7.392 4.508 1.456-8.297L.001 9.306l8.332-1.151z" fill="url(#halfGrad)" />
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.801 1.456 8.297L12 18.896l-7.392 4.508 1.456-8.297L.001 9.306l8.332-1.151z" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-300 fill-current">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.801 1.456 8.297L12 18.896l-7.392 4.508 1.456-8.297L.001 9.306l8.332-1.151z" />
      </svg>
    );
  };

  return (
    <div className="flex">
      {[...Array(full)].map((_, i) => <Star type="full" key={`full-${i}`} />)}
      {half && <Star type="half" />}
      {[...Array(empty)].map((_, i) => <Star type="empty" key={`empty-${i}`} />)}
    </div>
  );
};

export default function SpecialOffers() {
  const endTimes = {
    1: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    2: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
  };

  const { addToCart } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart ✅`);
  };

  const [timers, setTimers] = useState({
    1: getRemainingTime(endTimes[1]),
    2: getRemainingTime(endTimes[2]),
  });

  const [selectedImage, setSelectedImage] = useState({
    1: products[0].variants[0],
    2: products[1].variants[0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers({
        1: getRemainingTime(endTimes[1]),
        2: getRemainingTime(endTimes[2]),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-16 px-4 md:px-20 overflow-x-auto">
      <motion.h4
        className="text-green-600 font-semibold text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        SPECIAL OFFERS
      </motion.h4>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Today's Best Deals
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="border border-gray-100 rounded-none p-6 shadow-md min-w-[640px]"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 * index, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col items-center">
                <Image
                  src={selectedImage[product.id]}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain"
                />
                <div className="flex gap-3 mt-4 flex-nowrap justify-center">
                  {product.variants.map((img, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 border cursor-pointer rounded overflow-hidden p-1 ${
                        selectedImage[product.id] === img ? 'ring-2 ring-[#83b735]' : ''
                      }`}
                      onClick={() =>
                        setSelectedImage((prev) => ({
                          ...prev,
                          [product.id]: img,
                        }))
                      }
                    >
                      <Image src={img} alt="" width={40} height={40} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm mb-1">{product.category}</p>
                <h3 className="text-2xl font-extrabold mb-2">{product.name}</h3>
                <p className="text-green-600 text-2xl font-bold mb-2">
                  ₹ {product.price.toLocaleString('en-IN')}
                  <span className="line-through text-gray-500 ml-3 text-base font-normal">
                    ₹ {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </p>
                <div className="mb-3">{renderStars(product.rating)}</div>

                <div className="mb-5">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#83b735] text-white px-6 py-2 rounded hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>

                <p className="text-sm text-black mb-3">Hurry Up sale ends in:</p>
                <div className="flex gap-2 md:gap-4">
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div key={unit} className="bg-gray-100 w-16 md:w-20 py-2 rounded text-center">
                      <p className="text-xl font-extrabold text-[#2e2e2e]">
                        {String(timers[product.id][unit]).padStart(2, '0')}
                      </p>
                      <p className="text-xs font-semibold text-[#2e2e2e] uppercase">{unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
