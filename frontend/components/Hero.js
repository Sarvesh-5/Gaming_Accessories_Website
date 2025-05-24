'use client';

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";

const heroSlides = [
  { id: 1, title: "Wireless", subtitle: "Beasts Solo", description: "Headphone", image: "/headphone.png" },
  { id: 2, title: "Precision Control", subtitle: "Pro Series", description: "Mouse", image: "/mouse.png" },
  { id: 3, title: "Gaming Mastery", subtitle: "Elite Keyboard", description: "Keyboard", image: "/keyboard.png" },
];

const categories = [
  "Controller",
  "Headphones",
  "Keyboards",
  "Gaming Accessory",
  "Monitors",
  "Mouse",
  "Chair",
];

const productNames = [
  "Ear Buds",
  "Gaming Chair",
  "Gaming Mouse",
  "Zebronics Headphones",
  "Steering Wheel Set",
  "Phone Cooler",
  "Speaker Amplifier",
  "Game Joystick"
];

const searchableItems = [...categories, ...productNames];

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

function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]);
    }
  }
  return matrix[b.length][a.length];
}

function closestMatch(query, options) {
  let bestMatch = null;
  let bestScore = Infinity;
  for (const option of options) {
    const score = levenshtein(query.toLowerCase(), option.toLowerCase());
    if (score < bestScore) {
      bestScore = score;
      bestMatch = option;
    }
  }
  return bestScore <= 3 ? bestMatch : null;
}

const Hero = () => {
  const sectionRef = useRef(null);
  const router = useRouter();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setCategoriesOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const input = searchQuery.toLowerCase();
    if (input.trim()) {
      const filtered = searchableItems.filter((item) =>
        item.toLowerCase().includes(input)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (!query.trim()) return;
    const lowerQuery = query.toLowerCase();

    for (const category of categories) {
      const words = category.toLowerCase().split(" ");
      if (words.some(word => lowerQuery.includes(word))) {
        router.push(`/products?category=${encodeURIComponent(category)}`);
        setSearchQuery("");
        setSuggestions([]);
        return;
      }
    }

    const fuzzy = closestMatch(query, categories);
    if (fuzzy) {
      router.push(`/products?category=${encodeURIComponent(fuzzy)}`);
      setSearchQuery("");
      setSuggestions([]);
      return;
    }

    router.push(`/products?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#DCDCDC] overflow-x-hidden min-h-[600px] relative z-10">

      <div className="bg-[#DCDCDC] py-4 mb-6 px-4 md:px-8 z-50 relative">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <div className="relative w-full md:w-auto">
            <button
              className="bg-[#83b735] text-white text-sm font-semibold px-6 py-3 flex justify-center items-center space-x-2 rounded w-full md:w-auto text-center"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span>Gaming Essentials</span>
              <FiMenu size={20} />
            </button>

            {categoriesOpen && (
              <div className="absolute top-full left-0 w-full md:w-full mt-2 max-h-60 overflow-y-auto backdrop-blur-md bg-white/80 shadow-xl ring-1 ring-[#83b735]/20 text-black rounded-lg z-50 transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <ul className="py-3">
                  {categories.map((category) => (
                    <li key={category} onClick={() => router.push(`/products?category=${encodeURIComponent(category)}`)} className="px-5 py-4 hover:bg-[#83b735]/10 hover:text-[#83b735] transition cursor-pointer">
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full md:max-w-[600px] relative">
            <div className="bg-white rounded-md overflow-hidden flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 text-black focus:outline-none text-sm"
              />
              <button onClick={() => handleSearch()} className="bg-[#83b735] px-4 py-2">
                <FiSearch size={20} className="text-white" />
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white rounded-b-md shadow-lg z-50 max-h-56 overflow-y-auto">
                {suggestions.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="px-4 py-2 text-sm text-black hover:bg-[#83b735]/10 hover:text-[#83b735] cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-x-6 text-sm font-semibold text-black md:translate-x-[-20px]">
            <span
              className="cursor-pointer hover:text-[#83b735]"
              onClick={() => {
                const el = document.getElementById("SpecialOffers");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Special Offer
            </span>
            <span className="border-l border-black h-5"></span>
            <span
              className="cursor-pointer hover:text-[#83b735]"
              onClick={() => {
                const el = document.getElementById("Testimonials");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Website Reviews
            </span>
          </div>
        </div>
      </div>

      <Swiper modules={[Navigation]} navigation loop className="w-full h-auto">
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
                    className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-4 relative flex flex-col-reverse md:flex-row items-center justify-between mt-[-10px]"
                  >
                    <div className="w-full md:w-1/2 z-10 text-center md:text-left mt-6 md:mt-0">
                      <motion.p custom={0} variants={textVariants} initial="hidden" animate="visible" className="text-base md:text-lg text-black font-bold mb-2">
                        {slide.subtitle}
                      </motion.p>
                      <motion.h1 custom={0.3} variants={textVariants} initial="hidden" animate="visible" className="text-3xl md:text-6xl font-bold text-black leading-tight mb-2">
                        {slide.title}
                      </motion.h1>
                      <motion.h2 custom={0.6} variants={textVariants} initial="hidden" animate="visible" className="text-[40px] md:text-[120px] font-extrabold text-white opacity-70 leading-none tracking-tight z-0 pointer-events-none">
                        {slide.description}
                      </motion.h2>
                      <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible" className="mt-4">
                        <button
                          className="px-6 py-3 bg-white text-black text-base font-semibold rounded-md hover:bg-gray-100 transition"
                          onClick={() => router.push('/products')}
                        >
                          Shop by Category
                        </button>
                      </motion.div>
                    </div>

                    <motion.div variants={imageVariants} initial="hidden" animate="visible" className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
                      <div className="relative drop-shadow-2xl w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[520px] md:h-[520px]">
                        <Image src={slide.image} alt={slide.title} fill style={{ objectFit: "contain" }} priority />
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