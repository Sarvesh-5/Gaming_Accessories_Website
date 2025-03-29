'use client';
import useStore from '@/app/store/useStore';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function WishcartPage() {
  const { wishlist, removeFromWishlist } = useStore();

  return (
    <div
      className="min-h-screen py-14 px-4 bg-gradient-to-tr from-[#111827] via-[#1f2937] to-[#111827] text-white font-sans"
      style={{ backgroundImage: "url('/noise-texture.png')", backgroundSize: 'cover' }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#83b735] to-green-300">
          ❤️ Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-300 text-lg">
            Your wishlist is empty. Start adding your favorite gear!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                {/* Remove */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 bg-white/20 backdrop-blur-sm rounded-full p-1 hover:bg-red-600/60 text-red-300 hover:text-white transition"
                  title="Remove"
                >
                  <X size={18} />
                </button>

                {/* Image */}
                <Link href={`/product/${product.slug}`}>
                  <div className="relative w-full h-60 overflow-hidden bg-black/10">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="p-5 text-center text-white">
                  <Link href={`/product/${product.slug}`}>
                    <h2 className="text-xl font-semibold hover:text-[#83b735] transition">
                      {product.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-400">{product.category}</p>
                  <p className="text-green-400 font-bold mt-2 text-sm">
                    ₹ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
