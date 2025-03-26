'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
      '/products/Headphones/zebronics-havoc/pic7.jpg'
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
      'Maximum Flow Rate': '4 Liters Per Minute'
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
      'Built by ZEBRONICS — trusted in Indian gaming tech for over a decade.'
    ]
  }
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => <span key={i} className="text-yellow-500">★</span>)}
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
      {[...Array(5 - Math.ceil(rating))].map((_, i) => <span key={i} className="text-gray-300">★</span>)}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = productDataMap[slug];
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [location, setLocation] = useState('Fetching your location...');
  const [wishlist, setWishlist] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    setTimeout(() => setLocation('Coimbatore 641004'), 1000);
  }, []);

  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  return (
    <>
      {/* Top Sticky Section */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 px-4 pt-10">
        {/* Sticky Image Area */}
        <div className="relative">
          <div className="sticky top-10 h-[600px] flex gap-4">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-full">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 relative rounded-md overflow-hidden border-2 cursor-pointer ${
                    selectedImage === img ? 'border-[#83b735]' : 'border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`thumb-${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="relative flex-1 h-full border rounded-xl shadow-sm">
              <Image src={selectedImage} alt="Main" fill className="object-contain p-4" />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col space-y-5 pr-2">
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-black">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <StarRating rating={product.rating} />
            <span className="text-gray-500 ml-2">{product.reviews} ratings</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#83b735]">₹{product.price}</span>
            <span className="line-through text-gray-400">₹{product.mrp}</span>
            <span className="text-red-600 text-sm font-semibold">
              ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off)
            </span>
          </div>
          <p className="text-sm text-gray-700">
            <strong>{product.delivery}</strong> to{' '}
            <span className="underline text-blue-600">{location}</span>
          </p>
          <p className="text-green-600 font-medium text-sm">{product.availability}</p>
          <p className="text-xs text-gray-500">Sold by {product.seller}</p>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button className="bg-[#83b735] hover:scale-105 hover:shadow-md text-white font-semibold px-6 py-3 rounded-md transition w-full">
              Add to Cart
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md transition w-full">
              Buy Now
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className="text-sm font-medium text-[#83b735] hover:text-red-500 text-left"
            >
              {wishlist ? '💖 Added to Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* About */}
          <div>
            <h2 className="text-lg font-bold mb-2 mt-4">About the Product</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {Object.entries(product.about).map(([key, val]) => (
                <li key={key}><strong>{key}:</strong> {val}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="relative">
            <h2 className="text-lg font-bold mb-2 mt-4">Product Description</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-2">
              {(showFullDesc ? product.description : product.description.slice(0, 4)).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            {product.description.length > 4 && (
              <div className="text-center mt-2">
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-sm text-[#83b735] hover:underline"
                >
                  {showFullDesc ? 'Show less ▲' : 'Read more ▼'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Width */}
      <div className="w-full px-4 lg:px-8 mt-20">
        {/* Technical + Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-10">
          {/* Left Table */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-800">Technical Details</h2>
            <table className="w-full text-sm text-left">
              <tbody>
                {[['Brand', 'Zancia'], ['Power Source', 'Battery Powered'], ['Colour', 'Black'], ['Maximum Pressure', '4E+1 Bars'], ['Item Weight', '0.25 Kilograms'], ['Hose Length', '5 Centimetres'], ['Product Dimensions', '35L x 26W x 11H Centimeters'], ['Maximum Flow Rate', '4 Liters Per Minute']].map(([k, v]) => (
                  <tr key={k} className="border-b"><td className="py-2 pr-4 font-semibold w-48">{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Table */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-800">Additional Information</h2>
            <table className="w-full text-sm text-left">
              <tbody>
                {[['Manufacturer', 'Zancia-INDIA'], ['Packer', 'Zancia-INDIA'], ['Importer', 'Zancia-INDIA'], ['Item Weight', '250 g'], ['Net Quantity', '1.00 Set'], ['Generic Name', 'Outdoor Kitchens'], ['Best Sellers Rank', '#4,109 in Home & Kitchen']].map(([k, v]) => (
                  <tr key={k} className="border-b"><td className="py-2 pr-4 font-semibold w-48">{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 15 }).map((_, i) => (
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
        </div>
      </div>
    </>
  );
}