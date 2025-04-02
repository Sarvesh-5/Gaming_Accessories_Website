'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LevelUpBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-transparent py-16 px-4"
    >
<div className="max-w-[1490px] mx-auto bg-[#83b735] rounded-[24px] overflow-visible min-h-[650px] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 gap-12 relative -mt-16">
        
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 text-white text-left z-10"
        >
          <p className="text-base md:text-2xl mb-3">20% Off</p>
          <h2 className="text-7xl sm:text-8xl md:text-9xl font-extrabold leading-none mb-4">
            HAPPY <br /> HOURS
          </h2>
          <p className="text-base font-medium">10 Aprl To 5 May </p>
        </motion.div>

        {/* Center Image (floating + scaling up/down) */}
        <div className="w-full md:w-1/3 flex justify-center z-0 -mt-40 md:-mt-48">
          <motion.div
            animate={{ y: [130, -10, 130] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px]"
          >
            <Image
              src="/products/Homepage/all.png"
              alt="Product"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 text-white text-left z-10"
        >
          <p className="text-base md:text-2xl mb-2">Gear Up, Gamer!</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Power Your Play
          </h2>
          <p className="text-base font-light leading-snug">
            Upgrade your setup and dominate the game — because legends aren't born, they're geared.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
