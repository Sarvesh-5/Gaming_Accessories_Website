'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm(
        'service_tw30ca8',
        'template_eggfhv9',
        e.target,
        'fCbwcbBTT7c2x8vZS'
      )
      .then(() => {
        setStatus('sent');
        setTimeout(() => setStatus(''), 3000);
        e.target.reset(); // Clear the form
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="bg-white text-black font-sans relative">
      {/* Hero */}
      <div className="relative bg-[url('/background.jpg')] bg-cover bg-center py-24 text-white text-center">
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <p className="mt-4 text-lg">We’re here to help you level up.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[#83b735] mb-6">Send us a message</h2>
          <form onSubmit={sendEmail} className="space-y-4">
            <input
              name="from_name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-[#83b735] focus:ring-2"
              required
            />
            <input
              name="reply_to"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-[#83b735] focus:ring-2"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-[#83b735] focus:ring-2"
              required
            />
            <button
              type="submit"
              className="bg-[#83b735] hover:bg-[#6ca42a] text-white font-semibold px-6 py-2 rounded-md transition"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[#83b735] mb-6">Get in touch</h2>
          <p className="text-gray-700 text-sm mb-4">
            Whether you have a question about products, orders, returns, or anything else — our team is ready to answer.
          </p>
          <ul className="text-sm text-gray-700 space-y-3">
            <li><strong>Email:</strong> sarveshkumar522004@gmail.com</li>
            <li><strong>Phone:</strong> +91 99431 97263</li>
            <li><strong>Location:</strong> Coimbatore, Tamil Nadu</li>
            <li><strong>Hours:</strong> Mon–Sat, 10AM to 6PM</li>
          </ul>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
  {status === 'sent' && (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white rounded-xl shadow-xl p-8 max-w-sm text-center"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* ❌ Close Button */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={() => setStatus('')}
        >
          &times;
        </button>

        <div className="text-4xl text-green-500 mb-2">✅</div>
        <h3 className="text-lg font-semibold mb-1">Message Sent!</h3>
        <p className="text-sm text-gray-600">Thanks for reaching out. We'll get back to you shortly.</p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
