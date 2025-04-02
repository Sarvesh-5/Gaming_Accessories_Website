'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import useStore from '@/app/store/useStore';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProductSection() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then((res) => res.json())
      .then((data) => {
        const selected = [];
        const categorySet = new Set();

        // Step 1: One product per category
        for (let product of data) {
          if (!categorySet.has(product.category)) {
            selected.push(product);
            categorySet.add(product.category);
          }
        }

        // Step 2: Add extras to make it 8 total
        const alreadyPickedIds = new Set(selected.map((p) => p.id));
        const extras = data.filter((p) => !alreadyPickedIds.has(p.id)).slice(0, 8 - selected.length);

        setProducts([...selected, ...extras]);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart ✅`);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const isWished = wishlist.some((item) => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                className="bg-white border border-gray-100 shadow-md overflow-hidden group transition-all duration-300 relative"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6, ease: 'easeOut' }}
              >
                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-20 -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <button
                    className={`bg-white p-2 rounded-full shadow transition-colors duration-300 ${
                      isWished ? 'text-red-500' : 'text-black'
                    }`}
                    onClick={() => toggleWishlist(product)}
                  >
                    {isWished ? <FcLike size={20} /> : <FiHeart size={18} />}
                  </button>
                </div>

                {/* Image + Add to Cart */}
                <div className="bg-white p-[6px]">
                  <div className="relative bg-[#FAF7F7] h-72 flex items-center justify-center group">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={
                          product.image?.startsWith('http')
                            ? product.image
                            : `http://localhost:8000${product.image}`
                        }
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain h-44 w-auto cursor-pointer"
                      />
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-[#83b735] text-white text-sm font-semibold px-8 py-[10px] rounded-md transition-all duration-500 ease-in-out hover:bg-black whitespace-nowrap"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="px-6 py-6 text-center">
                  <Link href={`/product/${product.slug}`}>
                    <h1 className="text-lg font-semibold text-black hover:text-[#83b735] cursor-pointer transition">
                      {product.title}
                    </h1>
                  </Link>
                  <p className="text-sm text-black-500">{product.category}</p>
                  <p className="text-green-600 font-bold text-sm mt-2 mb-2">
                    ₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR
                  </p>
                  <p className="text-sm text-black-500 leading-relaxed">{product.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
