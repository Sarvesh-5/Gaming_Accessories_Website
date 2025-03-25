'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart,} from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';

const products = [
  {
    id: 1,
    title: 'Ear Buds',
    category: 'Wireless Audio',
    price: 4000,
    description:
      'Premium ear buds with immersive sound, deep bass, and noise cancellation for a wireless music experience.',
    image: '/products/Homepage/buds.png',
  },
  {
    id: 2,
    title: 'Phone Cooler',
    category: 'Cooler',
    price: 1200,
    description: 'This reduces the temperature of the mobile and make sure there is a smooth flow with any disturbance.',
    image: '/products/Homepage/cooler.png',
  },
  {
    id: 3,
    title: 'Speaker Amplifier',
    category: 'Speaker',
    price: 15000,
    description: 'A speaker amplifier boosts sound output, providing clearer, louder audio for better performance.',
    image: '/products/Homepage/speaker.png',
  },
  {
    id: 4,
    title: 'Steering Wheel Set',
    category: 'Gaming Accessory',
    price: 12000,
    description: 'Experience real driving with a responsive force feedback steering wheel and pedal set — perfect for racing games.',
    image: '/products/Homepage/steering.png',
  },
  {
    id: 5,
    title: 'Game Joystick',
    category: 'Joystick',
    price: 956,
    description: 'Ergonomic joystick with wireless connectivity and customizable controls for pro gamers.',
    image: '/products/Homepage/joystick.png',
  },
  {
    id: 6,
    title: 'Gaming Mouse',
    category: 'Mouse',
    price: 1199,
    description: 'High DPI gaming mouse with programmable buttons and RGB lighting for competitive play.',
    image: '/products/Homepage/mouse.png',
  },
  {
    id: 7,
    title: 'Gaming Chair',
    category: 'Chair',
    price: 9000,
    description: 'Comfort-focused gaming chair with ergonomic lumbar support and fully adjustable armrests.',
    image: '/products/Homepage/gaming-chair.png',
  },
  {
    id: 8,
    title: 'Gaming Headphones',
    category: 'Headphones',
    price: 4500,
    description: 'Surround sound headphones with noise cancellation and built-in mic for in-game communication.',
    image: '/products/Homepage/headphones.png',
  },
];

export default function ProductSection() {
  const [wishlist, setWishlist] = useState([]);
  const [liked, setLiked] = useState({});

  const toggleWishlist = (productId) => {
    setLiked((prev) => ({ ...prev, [productId]: !prev[productId] }));

    setWishlist((prev) =>
      liked[productId]
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="bg-white py-24 px-4 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-sm text-green-600 font-semibold text-center mb-2">PRODUCTS</h4>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trendy Products
        </motion.h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white border border-gray-100 shadow-md overflow-hidden group transition-all duration-300 relative"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
            >
              {/* Wishlist Icon */}
              <div className="absolute top-3 right-3 z-20 -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <button
                  className={`bg-white p-2 rounded-full shadow transition-colors duration-300 ${
                    liked[product.id] ? 'text-red-500' : 'text-black'
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  {liked[product.id] ? <FcLike size={20} /> : <FiHeart size={18} />}

                </button>
              </div>

              {/* Image Section */}
              <div className="relative bg-[#FAF7F7] h-72 flex items-center justify-center group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-44 w-auto object-contain"
                />

                {/* Add to Cart Button */}
                <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-[#83b735] text-white text-sm font-semibold px-8 py-[10px] rounded-md transition-all duration-500 ease-in-out hover:bg-black whitespace-nowrap">
                  ADD TO CART
                </button>
              </div>

              {/* Info Section */}
              <div className="px-6 py-6 text-center">
                <h1 className="text-lg font-semibold text-black">{product.title}</h1>
                <p className="text-sm text-black-500">{product.category}</p>
                <p className="text-green-600 font-bold text-sm mt-2 mb-2">
                  ₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR
                </p>
                <p className="text-sm text-black-500 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional: Debug Wishlist Output */}
        {/* <pre className="text-xs mt-10 bg-gray-100 p-4">
          Wishlist: {JSON.stringify(wishlist, null, 2)}
        </pre> */}
      </div>
    </section>
  );
}
