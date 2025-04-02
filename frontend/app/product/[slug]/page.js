'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { FiHeart } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import useStore from '@/app/store/useStore';
import toast from 'react-hot-toast';

function StarRating({ rating }) {
  const safeRating = Math.max(0, Math.min(5, rating || 0)); // clamp between 0 and 5
  const full = Math.floor(safeRating);
  const partial = safeRating - full;
  const empty = 5 - full - (partial > 0 ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">★</span>
      ))}
      {partial > 0 && (
        <span className="relative inline-block text-gray-300">
          <span
            className="absolute left-0 top-0 overflow-hidden text-yellow-500"
            style={{ width: `${partial * 100}%` }}
          >
            ★
          </span>
          ★
        </span>
      )}
      {[...Array(empty)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      ))}
    </div>
  );
}


export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState('Fetching your location...');
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useStore();

  useEffect(() => {
    fetch(`http://localhost:8000/api/product/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.product.image);
      })
      .catch((err) => console.error('Error fetching product details:', err));

    setTimeout(() => setLocation('Coimbatore 641004'), 1000);
  }, [slug]);

  const isInWishlist = wishlist.some((item) => item.id === product?.product.id);

  if (!product) return <div className="p-10 text-center text-lg">Loading...</div>;

  return (
    <>
      <Head>
        <title>{product.product.title}</title>
        <meta name="description" content={product.product.description} />
      </Head>

      {/* Sticky Mobile Add to Cart */}
      <div className="fixed bottom-0 w-full bg-white px-4 py-3 shadow-md flex justify-between items-center lg:hidden z-50">
        <span className="font-bold text-lg text-[#83b735]">₹{product.product.price}</span>
        <button
          onClick={() => {
            addToCart(product.product);
            toast.success('Added to Cart');
          }}
          className="bg-[#83b735] hover:scale-105 hover:shadow-md text-white font-semibold px-6 py-3 rounded-md transition w-full"
        >
          Add to Cart
        </button>
      </div>

      {/* Product Section */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 px-4 pt-10 pb-40">
        <div className="relative">
          <div className="sticky top-10 h-[600px] flex gap-4 items-center">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-full scrollbar-none">
            {[product.product.image, ...(product.details?.product_images?.map(img => img.image) || [])].map((img, i) => {
  const fullUrl = img.startsWith('http') ? img : `http://localhost:8000${img}`;
  return (
    <div
      key={i}
      onClick={() => setSelectedImage(fullUrl)}
      className={`w-16 h-16 relative rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 ${selectedImage === fullUrl ? 'border-[#83b735] scale-110 shadow-md' : 'border-gray-300 hover:border-[#83b735]'}`}
    >
      <Image src={fullUrl} alt={`thumb-${i}`} fill className="object-cover" />
    </div>
  );
})}
</div>


            {/* Main Image */}
            <div className="relative flex-1 h-full border rounded-xl shadow-sm overflow-hidden">
            <Image
  src={selectedImage?.startsWith('http') ? selectedImage : `http://localhost:8000${selectedImage}`}
  alt="Main"
  fill
  className="object-contain p-4 hover:scale-105 transition-transform duration-300"
/>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col space-y-5 pr-2">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-black">{product.product.title}</h1>
          <div className="flex items-center gap-2 text-sm">
          <StarRating rating={product.details.rating} />

            <span className="text-gray-500 ml-2">{product.reviews.length} reviews</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#83b735]">₹{product.product.price}</span>
            <span className="line-through text-gray-400">₹{product.product.mrp}</span>
            <span className="text-red-600 text-sm font-semibold">
  ({Math.round(((product.details.mrp - product.product.price) / product.details.mrp) * 100)}% off)
</span>
          </div>

          <p className="text-sm text-gray-700"><strong>Delivery:</strong> {product.details?.delivery || '3–5 days'} to <span className="underline text-blue-600">{location}</span></p>
          <p className="text-green-600 font-medium text-sm">In Stock</p>
          <p className="text-xs text-gray-500">Sold by {product.details?.seller || 'Flash Retail'}</p>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button onClick={() => addToCart(product.product)} className="bg-[#83b735] text-white px-6 py-3 rounded-md">Add to Cart</button>
            <button
              onClick={() => isInWishlist ? removeFromWishlist(product.product) : addToWishlist(product.product)}
              className="text-sm font-medium text-[#83b735] hover:text-red-500"
            >
              {isInWishlist ? '💖 Added to Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* About */}
          {product.details?.about && (
            <div>
              <h2 className="text-lg font-bold mb-2 mt-4">About the Product</h2>
              <ul className="text-sm text-gray-700 space-y-1">
                {Object.entries(product.details.about).map(([key, val]) => (
                  <li key={key}><strong>{key}:</strong> {val}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="relative">
            <h2 className="text-lg font-bold mb-2 mt-4">Product Description</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
              {(showFullDesc ? product.details.description : product.details.description.slice(0, 4)).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            {product.details.description.length > 4 && (
              <div className="text-center mt-2">
                <button onClick={() => setShowFullDesc(!showFullDesc)} className="text-sm text-[#83b735] hover:underline">
                  {showFullDesc ? 'Show less ▲' : 'Read more ▼'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-1 border-t pt-10 px-9 lg:px-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {product.faqs.map((faq, idx) => (
            <details key={idx} className="bg-gray-50 border rounded-md p-4 cursor-pointer">
              <summary className="font-medium text-[#83b735]">{faq.question}</summary>
              <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-20 border-t pt-10 px-4 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {product.reviews.slice(0, visibleReviews).map((review, i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#83b735]">
              <div className="h-1 w-full bg-gradient-to-r from-[#83b735] to-yellow-400 rounded-t-md mb-3" />
              <StarRating rating={review.rating} />
              <p className="text-sm text-gray-800 mt-2">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-1">— {review.user}</p>
            </div>
          ))}
        </div>
        {visibleReviews < product.reviews.length && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleReviews((prev) => prev + 3)}
              className="text-sm px-4 py-2 bg-[#83b735] text-white rounded hover:bg-[#6ba127] transition"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </>
  );
}
