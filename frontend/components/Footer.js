'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSend } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import localFont from 'next/font/local';
import emailjs from 'emailjs-com';               // ← new

const Blacknorth = localFont({ src: '../public/fonts/Blacknorthdemo-mLE25.otf' });

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const emailInput = useRef(null);               // ← new

  const handleSubscribe = (e) => {
    e.preventDefault();                          // ← treat as form submit
    const addr = emailInput.current?.value?.trim();
    if (!addr) return;

    /* send with the same service / template used in Contact page */
    emailjs
      .send(
        'service_tw30ca8',                       // service ID
        'template_rohyr2o',                      // template ID
        { to_email: emailInput.current.value },                      // template variables
        'fCbwcbBTT7c2x8vZS'                      // public key
      )
      .then(() => {
        setSubscribed(true);
        setShowPopup(true);
        emailInput.current.value = '';
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch(() => {
        /* you can surface an error toast here if desired */
      });
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] bg-[#83b735] text-black px-6 py-3 rounded-md shadow-lg text-sm font-semibold transition duration-300">
          ✅ Updates will be delivered!
        </div>
      )}

      <footer className="text-white font-sans relative mt-8">
        <div className="bg-black px-4 md:px-12 py-6">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-4 w-full md:w-auto">
              <FiSend className="text-3xl text-[#83b735]" />
              <div>
                <h2 className="text-2xl font-extrabold">Signup for Newsletter</h2>
                <p className="text-gray-300 text-sm">We’ll never share your email address with a third party</p>
              </div>
            </div>

            <div className="w-full md:max-w-[600px]">
              {subscribed ? (
                <div className="flex w-full h-[48px] bg-[#83b735] rounded-md items-center justify-center px-6">
                  <span className="text-black font-semibold text-sm flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    Updates will be sent to your email.
                  </span>
                </div>
              ) : (
                <form className="flex" onSubmit={handleSubscribe}>     {/* ← wrap as form */}
                  <input
                    ref={emailInput}                                   // ← new
                    type="email"
                    placeholder="Enter Your E-mail"
                    className="flex-grow px-4 py-3 rounded-l-md focus:outline-none text-black text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#83b735] px-6 text-white font-bold text-sm rounded-r-md"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* (rest of footer unchanged) */}
        {/* ... */}
        {/* Footer Section */}
        <div className="bg-[#222] px-4 md:px-12 py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Logo + Address */}
            <div>
              <h2 className={`${Blacknorth.className} text-3xl mb-3`}>GG LOOTBOX</h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Karunye institute Of Technology And Sciences <br />
                Coimbatore-641687
              </p>
            </div>

            {/* Sections */}
            <div>
              <h3 className="text-lg font-bold mb-3">Sections</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h3 className="text-lg font-bold mb-3">Pages</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/returns">Return Policy</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
                <li><Link href="/support">Support</Link></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-3">Follow Us</h3>
              <div className="grid grid-cols-4 gap-3">
                <Link href="https://instagram.com" target="_blank">
                  <div className="w-[50px] h-[50px] bg-gray-700 flex items-center justify-center rounded-md hover:bg-[#83b735] transition">
                    <FaInstagram className="text-xl" />
                  </div>
                </Link>
                <Link href="https://facebook.com" target="_blank">
                  <div className="w-[50px] h-[50px] bg-gray-700 flex items-center justify-center rounded-md hover:bg-[#83b735] transition">
                    <FaFacebookF className="text-xl" />
                  </div>
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <div className="w-[50px] h-[50px] bg-gray-700 flex items-center justify-center rounded-md hover:bg-[#83b735] transition">
                    <FaTwitter className="text-xl" />
                  </div>
                </Link>
                <Link href="https://youtube.com" target="_blank">
                  <div className="w-[50px] h-[50px] bg-gray-700 flex items-center justify-center rounded-md hover:bg-[#83b735] transition">
                    <FaYoutube className="text-xl" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-[#83b735] text-black py-4 text-center text-sm font-semibold">
          © 2025 GG Lootbox. All rights reserved.
        </div>

      </footer>
    </>
  );
}
