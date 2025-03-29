'use client';
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMenu, FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import localFont from "next/font/local";
import useStore from "@/app/store/useStore";

const Blacknorth = localFont({ src: "../public/fonts/Blacknorthdemo-mLE25.otf" });

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useStore();
  const cartItemCount = cart.length;

  // Sticky navbar logic
  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1 }
    );
    if (navRef.current) observer.observe(navRef.current);
    return () => {
      if (navRef.current) observer.unobserve(navRef.current);
    };
  }, []);

  return (
    <>
      {/* Scrolling banner on home */}
      {isHomePage && (
        <div className="bg-[#83b735] text-white text-center py-2 text-sm font-bold uppercase">
          <marquee behavior="scroll" direction="left" scrollamount="6">
            <span className="mx-4">👋 <strong>Welcome to GG Lootbox</strong> – The Ultimate Gaming Store!</span>
            <span className="mx-4">🚀 <strong>LIMITED TIME OFFER</strong>: Enjoy <strong>FREE DELIVERY</strong> on all orders over ₹4000!</span>
            <span className="mx-4">🎮 <strong>NEW ARRIVALS</strong>: Check out the latest gaming accessories now!</span>
            <span className="mx-4">💥 <strong>EXCLUSIVE DEALS</strong>: Save up to <strong>30%</strong> on select products – Shop Now!</span>
          </marquee>
        </div>
      )}

      {/* Sticky trigger */}
      <div ref={navRef} className="h-[0px]" />

      {/* Sticky navbar */}
      <nav className={`w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 bg-white shadow-md' : 'relative'}`}>
        <div className="flex items-center px-8 py-3 justify-between">
          <Link href="/">
            <div className={`${Blacknorth.className} text-2xl sm:text-3xl md:text-4xl font-bold uppercase whitespace-nowrap ml-0 md:ml-6`}>
              GG LOOTBOX
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex space-x-8 text-lg font-semibold uppercase">
            {["Home", "Products", "About", "Contact"].map((tab) => {
              const route = tab === "Home" ? "/" : `/${tab.toLowerCase()}`;
              return (
                <Link
                  key={tab}
                  href={route}
                  className={`px-3 py-2 rounded-md transition ${
                    pathname === route
                      ? "bg-[#83b735] text-white"
                      : "hover:bg-[#83b735] hover:text-white text-black"
                  }`}
                >
                  {tab}
                </Link>
              );
            })}
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-6 mr-[5%] relative">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <FiHeart size={24} className="hover:text-[#FF4655] text-black cursor-pointer" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <HiOutlineShoppingBag size={26} className="hover:text-[#FF4655] text-black cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF4655] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* 🔐 Login icon (redirects to /login) */}
            <Link href="/login">
              <FiUser size={26} className="cursor-pointer hover:text-[#FF4655] text-black" />
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-10 left-0 h-full w-72 bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center h-[64px] px-6 border-b">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <div className={`${Blacknorth.className} text-2xl font-bold uppercase`}>GG LOOTBOX</div>
              </Link>
              <button onClick={() => setMenuOpen(false)} className="text-3xl">
                &times;
              </button>
            </div>
            <ul className="p-6 space-y-6 text-lg font-semibold">
              {["Home", "Products", "About", "Contact"].map((tab) => {
                const route = tab === "Home" ? "/" : `/${tab.toLowerCase()}`;
                return (
                  <li key={tab}>
                    <Link
                      href={route}
                      className={`block py-2 ${pathname === route ? "text-[#83b735]" : "text-black"}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {tab}
                    </Link>
                  </li>
                );
              })}
              {/* Add Login in mobile menu */}
              <li>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-black">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
