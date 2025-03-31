'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import { useMemo } from 'react'; 
import useStore from '@/app/store/useStore';

const productDataMap = {
  'zebronics-havoc': {
    name: 'ZEBRONICS Havoc Premium Gaming Headset with Dolby Atmos, 50mm Drivers, and RGB (White)',
    price: 1499,
    mrp: 2999,
    rating: 3.75,
    reviews: 156,
    images: [
      '/products/Headphones/zebronics-havoc/pic1.jpg',
      '/products/Headphones/zebronics-havoc/pic2.jpg',
      '/products/Headphones/zebronics-havoc/pic3.jpg',
      '/products/Headphones/zebronics-havoc/pic4.jpg',
      '/products/Headphones/zebronics-havoc/pic5.jpg',
      '/products/Headphones/zebronics-havoc/pic6.jpg',
      '/products/Headphones/zebronics-havoc/pic7.jpg',
    ],
    availability: 'In stock',
    seller: 'Clicktech Retail Private Ltd',
    delivery: 'FREE delivery Friday, 28 March',
    about: {
      Colour: 'Black',
      Brand: 'Zancia',
      'Power Source': 'Battery Powered',
      'Maximum Pressure': '4E+1 Bars',
      'Item Weight': '0.25 Kilograms',
      'Hose Length': '5 Centimetres',
      'Product Dimensions': '35L x 26W x 11H Centimeters',
      'Maximum Flow Rate': '4 Liters Per Minute',
    },
    description: [
      '50mm neodymium drivers ensure rich bass and crisp highs, perfect for pinpointing footsteps and gunfire.',
      'RGB lighting on earcups brings a dynamic gaming aesthetic to your setup.',
      'Flexible noise-isolating microphone for crystal-clear team communication.',
      'Dolby Atmos support offers positional 3D surround sound, enhancing realism.',
      'Ultra-soft over-ear cushions provide long-session comfort without overheating.',
      'Adjustable suspension headband fits all sizes comfortably.',
      'Braided high-durability cable for tangle-free, long-lasting use.',
      'Compatible with PC, PlayStation, Xbox, and mobile.',
      'Foldable design makes it easy to carry to tournaments.',
      'Built by ZEBRONICS — trusted in Indian gaming tech for over a decade.',
    ],
  },
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <span key={i} className="text-yellow-500">★</span>
      ))}
      {partial > 0 && (
        <span className="relative inline-block text-gray-300">
          <span className="absolute left-0 top-0 overflow-hidden text-yellow-500" style={{ width: `${partial * 100}%` }}>
            ★
          </span>
          ★
        </span>
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <span key={i} className="text-gray-300">★</span>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = productDataMap[slug];
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [location, setLocation] = useState('Fetching your location...');
  const { wishlist, addToWishlist, removeFromWishlist, cart, addToCart } = useStore();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const allProducts = [
    {
      id: 1,
      title: 'Ear Buds',
      category: 'Wireless Audio',
      price: 4000,
      description: 'Immersive sound, deep bass, and noise cancellation.',
      image: '/products/Homepage/buds.png',
    },
    {
      id: 2,
      title: 'Phone Cooler',
      category: 'Cooler',
      price: 1200,
      description: 'Reduces temperature and ensures smooth performance.',
      image: '/products/Homepage/cooler.png',
    },
    {
      id: 3,
      title: 'Speaker Amplifier',
      category: 'Speaker',
      price: 15000,
      description: 'Boosts sound output with clearer, louder audio.',
      image: '/products/Homepage/speaker.png',
    },
    {
      id: 4,
      title: 'Steering Wheel Set',
      category: 'Gaming Accessory',
      price: 12000,
      description: 'Responsive wheel with pedal set for racing games.',
      image: '/products/Homepage/steering.png',
    },
    {
      id: 5,
      title: 'Game Joystick',
      category: 'Joystick',
      price: 956,
      description: 'Ergonomic joystick with wireless connectivity.',
      image: '/products/Homepage/joystick.png',
    },
    {
      id: 6,
      title: 'Gaming Mouse',
      category: 'Mouse',
      price: 1199,
      description: 'High DPI mouse with programmable buttons and RGB.',
      image: '/products/Homepage/mouse.png',
    },
    {
      id: 7,
      title: 'Gaming Chair',
      category: 'Chair',
      price: 9000,
      description: 'Comfortable ergonomic chair for long sessions.',
      image: '/products/Homepage/gaming-chair.png',
    },
    {
      id: 8,
      title: 'Gaming Headphones',
      category: 'Headphones',
      price: 4500,
      description: 'Surround sound headphones with noise cancellation.',
      image: '/products/Homepage/headphones.png',
    },
  ];

const recommendedProducts = useMemo(() => {
  if (!product) return [];
  const filtered = allProducts.filter((p) => !product.name.includes(p.title));
  const selected = [];

  while (selected.length < 4) {
    const remaining = filtered.filter(p => !selected.includes(p));
    if (remaining.length === 0) break;
    const randomPick = remaining[Math.floor(Math.random() * remaining.length)];
    selected.push(randomPick);
  }

  return selected;
}, [product]);


const toggleWishlist = (item) => {
  const isInWishlist = wishlist.some((w) => w.title === item.title);
  isInWishlist ? removeFromWishlist(item) : addToWishlist(item);
};



  useEffect(() => {
    setTimeout(() => setLocation('Coimbatore 641004'), 1000);
  }, []);

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Buy ${product.name} online at best price in India.`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content="Top-rated gaming accessories available now." />
        <meta property="og:image" content={product.images[0]} />
        <link rel="canonical" href={`https://yourdomain.com/product/${slug}`} />
      </Head>

      {/* Sticky Add-to-Cart (Mobile) */}
      <div className="fixed bottom-0 w-full bg-white px-4 py-3 shadow-md flex justify-between items-center lg:hidden z-50">
        <span className="font-bold text-lg text-[#83b735]">₹{product.price}</span>
        <button
  onClick={() => addToCart({
    title: product.name,
    price: product.price,
    image: product.images[0], // use first image
  })}
  className="bg-[#83b735] hover:scale-105 hover:shadow-md text-white font-semibold px-6 py-3 rounded-md transition w-full"
>
  Add to Cart
</button>

      </div>

      {/* Product Section */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 px-4 pt-10 pb-40">
        <div className="relative">
          <div className="sticky top-10 h-[600px] flex gap-4 items-center">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-full scrollbar-none">

          {product.images.map((img, i) => (
  <div
    key={i}
    onClick={() => setSelectedImage(img)}
    className={`w-16 h-16 relative rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
      selectedImage === img
        ? 'border-[#83b735] scale-110 shadow-md'
        : 'border-gray-300 hover:border-[#83b735]'
    }`}
  >
    <Image
      src={img}
      alt={`thumb-${i}`}
      fill
      className="object-cover"
      placeholder="blur"
      blurDataURL={img}
    />
  </div>
))}

            </div>
            <div className="relative flex-1 h-full border rounded-xl shadow-sm overflow-hidden">
              <Image src={selectedImage} alt="Main" fill className="object-contain p-4 hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-5 pr-2">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-black">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <StarRating rating={product.rating} />
            <span className="text-gray-500 ml-2">{product.reviews} ratings</span>
          </div>

          {/* Star Rating Breakdown */}
          <div className="w-full max-w-sm mt-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center text-sm text-gray-600">
                <span className="w-12">{star}★</span>
                <div className="bg-gray-200 w-full h-2 mx-2 rounded">
                  <div className="bg-yellow-400 h-2 rounded" style={{ width: `${product.rating >= star ? 80 : 20}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#83b735]">₹{product.price}</span>
            <span className="line-through text-gray-400">₹{product.mrp}</span>
            <span className="text-red-600 text-sm font-semibold">
              ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)
            </span>
          </div>

          <p className="text-sm text-gray-700">
            <strong>{product.delivery}</strong> to <span className="underline text-blue-600">{location}</span>
          </p>
          <p className="text-green-600 font-medium text-sm">{product.availability}</p>
          <p className="text-xs text-gray-500">Sold by {product.seller}</p>

          <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
  onClick={() => addToCart({
    title: product.name,
    price: product.price,
    image: product.images[0], // use first image
  })}
  className="bg-[#83b735] hover:scale-105 hover:shadow-md text-white font-semibold px-6 py-3 rounded-md transition w-full"
>
  Add to Cart
</button>
<button
  onClick={() =>
    wishlist.some((item) => item.title === product.name)
      ? removeFromWishlist({ title: product.name })
      : addToWishlist({
          title: product.name,
          price: product.price,
          image: product.images[0], // use first image
        })
  }
  className="text-sm font-medium text-[#83b735] hover:text-red-500 text-left"
>
  {wishlist.some((item) => item.title === product.name) ? '💖 Added to Wishlist' : '🤍 Add to Wishlist'}
</button>

          </div>

          <div>
            <h2 className="text-lg font-bold mb-2 mt-4">About the Product</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {Object.entries(product.about).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <h2 className="text-lg font-bold mb-2 mt-4">Product Description</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
              {(showFullDesc ? product.description : product.description.slice(0, 4)).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            {product.description.length > 4 && (
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
    {[
      ['Is it compatible with PS5?', 'Yes, it works seamlessly with PS5 and other consoles.'],
      ['Does it have a warranty?', 'Yes, it comes with a 1-year manufacturer warranty.'],
      ['Can I use it for mobile gaming?', 'Absolutely, it supports mobile devices with a 3.5mm jack.'],
    ].map(([q, a], idx) => (
      <details key={idx} className="bg-gray-50 border rounded-md p-4 cursor-pointer">
        <summary className="font-medium text-[#83b735]">{q}</summary>
        <p className="mt-2 text-sm text-gray-700">{a}</p>
      </details>
    ))}
  </div>
</div>



{/* You Might Also Like */}
<div className="mt-20 border-t pt-10 px-4 lg:px-8">
  <h2 className="text-xl font-bold mb-6 text-center md:text-left">You Might Also Like</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {recommendedProducts.length > 0 ? (
      recommendedProducts.map((item, index) => (
        <motion.div
          key={item.id}
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
                wishlist.some((w) => w.title === item.title) ? 'text-red-500' : 'text-black'
              }`}
              onClick={() => {
                const isInWishlist = wishlist.some((w) => w.title === item.title);
                isInWishlist ? removeFromWishlist(item) : addToWishlist(item);
              }}
            >
              {wishlist.some((w) => w.title === item.title) ? <FcLike size={20} /> : <FiHeart size={18} />}
            </button>
          </div>

          {/* Image & Add to Cart */}
          <div className="bg-white p-[6px]">
            <div className="relative bg-[#FAF7F7] h-72 flex items-center justify-center group">
              <img
                src={item.image}
                alt={item.title}
                className="h-44 w-auto object-contain"
              />
              <button
                onClick={() => addToCart(item)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-[#83b735] text-white text-sm font-semibold px-8 py-[10px] rounded-md transition-all duration-500 ease-in-out hover:bg-black whitespace-nowrap"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="px-6 py-6 text-center">
            <h1 className="text-lg font-semibold text-black">{item.title}</h1>
            <p className="text-sm text-black-500">{item.category}</p>
            <p className="text-green-600 font-bold text-sm mt-2 mb-2">
              ₹ {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR
            </p>
            <p className="text-sm text-black-500 leading-relaxed">{item.description}</p>
          </div>
        </motion.div>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No recommendations available.</p>
    )}
  </div>
</div>



      {/* Lazy Reviews */}
      <div className="mt-20 border-t pt-10 px-4 lg:px-8">
        <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: visibleReviews }).map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-white shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#83b735] animate-fade-in"
            >
              <div className="h-1 w-full bg-gradient-to-r from-[#83b735] to-yellow-400 rounded-t-md mb-3" />
              <StarRating rating={Math.random() * 2 + 3} />
              <p className="text-sm text-gray-800 mt-2">Absolutely love this product! Quality is top-notch.</p>
              <p className="text-sm text-gray-800">Very comfortable for long gaming sessions.</p>
              <p className="text-xs text-gray-500 mt-1">— User{i + 1}</p>
            </div>
          ))}
        </div>
        {visibleReviews < 15 && (
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
