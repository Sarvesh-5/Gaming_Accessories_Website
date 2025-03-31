'use client';

import { useMemo, useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FcLike } from 'react-icons/fc';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useStore from '@/app/store/useStore';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

export default function AllProductsPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 16;

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    const paramCategory = searchParams.get("category");
    if (paramCategory) {
      setCategory(paramCategory);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let products = category === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === category);

    if (search) {
      const term = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (sort === "asc") products = [...products].sort((a, b) => a.price - b.price);
    if (sort === "desc") products = [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [allProducts, category, sort, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const uniqueCategories = ["All", ...new Set(allProducts.map((p) => p.category))];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat py-28 px-4 md:px-16 font-sans" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h4 className="text-sm text-green-400 font-semibold mb-2 tracking-wider uppercase" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            PRODUCTS
          </motion.h4>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            All Products
          </motion.h2>
        </div>
      </section>

      {/* Product Section */}
      <section className="bg-white py-16 px-4 md:px-16 font-sans">
        <div className="max-w-7xl mx-auto">

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition ${category === cat ? "bg-[#83b735] text-white border-[#83b735]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
              >
                {cat}
              </button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-4 py-2 rounded-md text-sm">
              <option value="">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Search */}
          <div className="mb-10 text-center">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#83b735] focus:ring-2"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginated.map((product, index) => {
              const isWished = wishlist.some(item => item.id === product.id);
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
                      className={`bg-white p-2 rounded-full shadow transition-colors duration-300 ${isWished ? "text-red-500" : "text-black"}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      {isWished ? <FcLike size={20} /> : <FiHeart size={18} />}
                    </button>
                  </div>

                  {/* Image + Add to Cart */}
                  <div className="bg-white p-[6px]">
                    <div className="relative bg-[#FAF7F7] h-72 flex items-center justify-center group">
                      <img src={product.image} alt={product.title} className="h-44 w-auto object-contain" />
                      <button
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.title} added to cart`);
                        }}
                        className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-[#83b735] text-white text-sm font-semibold px-8 py-[10px] rounded-md transition-all duration-500 ease-in-out hover:bg-black whitespace-nowrap"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-6 py-6 text-center">
                    <Link href={`/product/${product.slug}`}>
                      <h1 className="text-lg font-semibold text-black hover:text-[#83b735] transition cursor-pointer">{product.title}</h1>
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-14">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-full text-sm font-medium border ${currentPage === i + 1 ? "bg-[#83b735] text-white border-[#83b735]" : "bg-white text-black border-gray-300"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
