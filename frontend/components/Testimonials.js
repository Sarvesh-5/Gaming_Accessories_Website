'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Anjali Mehra',
    title: 'Pro Gamer',
    image: '/products/avatars/pic1.jpg',
    rating: 5,
    quote:
      'These accessories brought precision and comfort to my gameplay. It really took my performance to the next level!',
  },
  {
    id: 2,
    name: 'Nikhil Rao',
    title: 'Streamer',
    image: '/products/avatars/pic2.jpeg',
    rating: 4.5,
    quote:
      'My audience loves the aesthetic of my new gear. And the responsiveness is top-notch. Totally worth it!',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    title: 'Esports Enthusiast',
    image: '/products/avatars/pic3.jpeg',
    rating: 4,
    quote:
      'Everything feels solid and sharp. I’ve been recommending this to my entire squad.',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    title: 'Tech Reviewer',
    image: '/products/avatars/pic2.jpeg',
    rating: 5,
    quote:
      'From packaging to product quality, everything screams premium. Easily one of the best accessories I’ve reviewed.',
  },
  {
    id: 5,
    name: 'Amit Joshi',
    title: 'PC Builder',
    image: '/products/avatars/pic3.jpeg',
    rating: 4,
    quote:
      'Every product integrates seamlessly into my rig. Great build, fantastic delivery time!',
  },
];

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex justify-center mt-1">
      {[...Array(full)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>
      ))}
      {half && <span className="text-yellow-400 text-lg">☆</span>}
      {[...Array(empty)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-lg">★</span>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-[#f9f9f9] py-20 px-4 md:px-20 font-sans overflow-hidden">
      <style>{`
        @keyframes scrollLoop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Section Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className="text-green-600 font-semibold text-center mb-2">TESTIMONIALS</h4>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Our Gamers Say
        </h2>
      </motion.div>

      {/* Review Cards Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Mobile View */}
        <div className="block md:hidden relative max-w-md mx-auto">
          <div className="bg-white p-8 min-h-[420px] border shadow-md transition-all duration-300 ease-out">
            <div className="flex flex-col items-center text-center">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 border border-gray-200 shadow-sm">
                <Image
                  src={current.image}
                  alt={current.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{current.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{current.title}</p>
              {renderStars(current.rating)}
              <p className="text-[17px] text-gray-700 mt-4 leading-relaxed italic max-w-[90%]">
                “{current.quote}”
              </p>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
            <button onClick={prevSlide} className="text-2xl px-3 py-2 hover:text-green-600">←</button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
            <button onClick={nextSlide} className="text-2xl px-3 py-2 hover:text-green-600">→</button>
          </div>
        </div>

        {/* Desktop View (infinite scroll animation) */}
        <div className="hidden md:block overflow-hidden mt-10">
          <div
            className="flex w-max gap-6 animate-scrollLoop"
            style={{
              animation: 'scrollLoop 50s linear infinite',
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="bg-white min-w-[400px] max-w-[400px] p-8 border rounded shadow-md flex-shrink-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 border border-gray-200 shadow-sm">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{t.title}</p>
                  {renderStars(t.rating)}
                  <p className="text-[17px] text-gray-700 mt-4 leading-relaxed italic max-w-[90%]">
                    “{t.quote}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
