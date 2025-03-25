"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import localFont from "next/font/local";

const Blacknorth = localFont({ src: "../public/fonts/Blacknorthdemo-mLE25.otf" });

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Free Shipping Banner */}
      <div className="bg-[#83b735] text-white text-center py-2 text-sm font-bold uppercase">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          <span className="mx-4">👋 <strong>Welcome to GG Lootbox</strong> – The Ultimate Gaming Store!</span>
          <span className="mx-4">🚀 <strong>LIMITED TIME OFFER</strong>: Enjoy <strong>FREE DELIVERY</strong> on all orders over <strong>$50!</strong></span>
          <span className="mx-4">🎮 <strong>NEW ARRIVALS</strong>: Check out the latest gaming accessories now!</span>
          <span className="mx-4">💥 <strong>EXCLUSIVE DEALS</strong>: Save up to <strong>30%</strong> on select products – Shop Now!</span>
        </marquee>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white text-black shadow-md flex items-center px-8 py-0 justify-between">
        <Link href="/">
          <div className={`${Blacknorth.className} text-4xl font-bold uppercase whitespace-nowrap px-6 py-3 ml-[25%]`}>
            GG LOOTBOX
          </div>
        </Link>

        <div className="hidden md:flex space-x-8 text-lg font-semibold uppercase">
          {["Home", "Products", "About", "Contact"].map((tab) => {
            const route = tab === "Home" ? "/" : `/${tab.toLowerCase()}`;
            return (
              <Link
                key={tab}
                href={route}
                className={`px-3 py-2 rounded-md transition ${
                  pathname === route ? "bg-[#83b735] text-white" : "hover:bg-[#83b735] hover:text-white text-black"
                }`}
              >
                {tab}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-6 mr-[5%]">
          <FiShoppingCart size={26} className="cursor-pointer hover:text-[#FF4655]" />
          <Link href="/login">
            <FiUser size={26} className="cursor-pointer hover:text-[#FF4655] text-black" />
          </Link>
          <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[80%] max-w-[300px]">
            <button className="absolute top-3 right-4 text-3xl" onClick={() => setMenuOpen(false)}>
              &times;
            </button>
            <ul className="space-y-4 text-lg font-semibold">
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
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
