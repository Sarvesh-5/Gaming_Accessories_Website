'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="bg-white text-black font-sans">
      {/* Hero */}
      <div className="relative bg-[url('/background.jpg')] bg-cover bg-center py-28 text-white text-center">
        <div className="bg-black bg-opacity-60 absolute inset-0" />
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About GG Lootbox
          </motion.h1>
          <p className="mt-4 text-lg font-medium">
            India’s Ultimate Destination for Gaming Accessories
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-20 space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#83b735] mb-3">Our Story</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Founded by gamers, for gamers — GG Lootbox began with a mission to bring premium, high-performance gaming accessories to the Indian market. 
            We’re not just a store — we’re a community. With a decade of industry knowledge and a passion for immersive gaming, our team curates the latest gear, tested and loved by players across genres.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#83b735] mb-3">Our Mission</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            To level up every gamer’s experience by delivering high-quality, reliable accessories that enhance performance, comfort, and style.
            From casual mobile gamers to hardcore PC pros, we aim to equip everyone with the tools to dominate the game.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#83b735] mb-3">What We Stand For</h2>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>🎮 Gamer-first experience</li>
            <li>🚚 Fast & reliable delivery</li>
            <li>💬 Transparent customer support</li>
            <li>🧪 Rigorous product testing</li>
            <li>🌱 Community-driven growth</li>
          </ul>
        </motion.div>
      </section>

      {/* Team */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#83b735] mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                name: 'Sarvesh Kumar',
              },
              {
                name: 'Sreevan Kumar',
              },
              {
                name: 'Sanjay',
              },
              {
                name: 'Sathiyaseelan',
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white shadow-md rounded-xl p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-[#83b735] opacity-80 group-hover:opacity-100 mb-4" />
                <h3 className="font-semibold text-lg text-[#2d2d2d] group-hover:text-[#83b735] transition">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-600 mt-2">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
