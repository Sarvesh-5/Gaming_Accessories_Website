"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";

const heroSlides = [
  {
    id: 1,
    title: "Wireless",
    subtitle: "Beasts Solo",
    description: "Headphone",
    image: "/headphone.png",
  },
  {
    id: 2,
    title: "Precision Control",
    subtitle: "Pro Series",
    description: "Mouse",
    image: "/mouse.png",
  },
  {
    id: 3,
    title: "Gaming Mastery",
    subtitle: "Elite Keyboard",
    description: "Keyboard",
    image: "/keyboard.png",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1.2, ease: "easeOut" },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 1.5, duration: 1.2, ease: "easeOut" },
  },
};

const Hero = () => {
  const sectionRef = useRef(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#DCDCDC] overflow-hidden">
      {/* Second Navbar */}
      <div className="bg-[#DCDCDC] py-4 mb-20">

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
          {/* Categories Button */}
          <div className="relative shrink-0">
            <button
              className="bg-[#83b735] text-white text-sm font-semibold px-6 py-3 flex items-center space-x-2 rounded whitespace-nowrap"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span>ALL CATEGORIES</span>
              <FiMenu size={20} />
            </button>

            {categoriesOpen && (
              <div className="absolute top-full left-0 w-[240px] bg-white text-black rounded-lg shadow-lg z-50">
                <ul className="py-3">
                  {["Keyboards", "Mice", "Headsets", "Monitors", "Controllers", "Gaming Chairs"].map((category) => (
                    <li key={category} className="px-5 py-4 hover:bg-gray-200 cursor-pointer">
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-full md:max-w-[600px] bg-white rounded-md overflow-hidden flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 text-black focus:outline-none text-sm"
            />
            <button className="bg-[#83b735] px-4 py-2">
              <FiSearch size={20} className="text-white" />
            </button>
          </div>

          {/* Offer Links */}
          <div className="flex items-center gap-x-6 text-sm font-semibold text-black whitespace-nowrap">
            <span className="cursor-pointer hover:text-[#83b735]">Special Offer</span>
            <span className="border-l border-black h-5"></span>
            <span className="cursor-pointer hover:text-[#83b735]">Website Reviews</span>
          </div>
        </div>
      </div>

      {/* Swiper Hero */}
      <Swiper modules={[Navigation]} navigation loop className="w-full h-[500px] -mt-6">
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={slide.id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="max-w-[1200px] mx-auto px-4 md:px-8 -mt-4 pb-10 relative h-[500px] flex flex-col md:flex-row items-center justify-between"
                  >
                    {/* Text */}
                    <div className="w-full md:w-1/2 z-10 flex flex-col justify-start items-start text-center md:text-left pt-0 pb-10">
                      <div className="w-full">
                        <motion.p
                          custom={0}
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          className="text-base md:text-lg text-black font-bold mb-2"
                        >
                          {slide.subtitle}
                        </motion.p>

                        <motion.h1
                          custom={0.3}
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          className="text-4xl md:text-7xl font-bold text-black leading-tight mb-2"
                        >
                          {slide.title}
                        </motion.h1>

                        <div className="flex flex-col gap-2">
                          <motion.h2
                            custom={0.6}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-[48px] md:text-[135px] font-extrabold text-white opacity-70 leading-none tracking-tight z-0 whitespace-nowrap pointer-events-none"
                          >
                            {slide.description}
                          </motion.h2>

                          <motion.div
                            custom={1}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <button
                              className="px-6 py-3 bg-white text-black text-base font-semibold rounded-md hover:bg-gray-100 transition w-fit"
                              onClick={() =>
                                document
                                  .getElementById("next-section")
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }
                            >
                              Shop by Category
                            </button>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Image – Responsive styling by slide */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className={`w-full md:w-1/2 relative hidden md:flex ${
                          slide.id === 1 ? "justify-end pr-10" : "justify-center"
                        } md:mt-0 mt-10 z-10 items-center`}
                      >

                      <div
                        className={`relative drop-shadow-2xl ${
                          slide.id === 3
                            ? "w-[320px] h-[320px] md:w-[620px] md:h-[620px] -mt-4 md:-mt-10"
                            : "w-[280px] h-[280px] md:w-[520px] md:h-[520px]"
                        }`}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          style={{ objectFit: "contain" }}
                          priority
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
