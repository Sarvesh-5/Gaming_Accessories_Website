"use client";
import Image from "next/image";
import Link from "next/link";


const categories = [
  {
    id: 1,
    type: "Enjoy",
    title: "Gaming",
    subtitle: "Chair",
    img: "/products/chair.png",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 2,
    type: "Cool",
    title: "Cooling",
    subtitle: "Pad",
    img: "/products/coolingpad.png",
    bgColor: "bg-yellow-400",
    textColor: "text-yellow-400",
  },
  {
    id: 3,
    type: "Pro",
    title: "Gaming",
    subtitle: "Monitor",
    img: "/products/monitor.png",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
  },
  {
    id: 4,
    type: "Watch",
    title: "Gaming",
    subtitle: "Projector",
    img: "/products/projector.png",
    bgColor: "bg-gray-200",
    textColor: "text-gray-200",
  },
  {
    id: 5,
    type: "New",
    title: "Playstation",
    subtitle: "PS5",
    img: "/products/ps5.png",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
  },
  {
    id: 8,
    type: "Trend",
    title: "Virtual",
    subtitle: "VR Glass",
    img: "/products/Vr_glass.png",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
  },
];

const CategorySection = () => {
  return (
    <div className="flex flex-col gap-[0.5cm] p-[0.5cm] bg-white">
      {/* Row 1 */}
      <div className="flex flex-wrap gap-[0.5cm] justify-center">
        {/* Box 1 */}
        <div className="w-full sm:w-[48%] lg:w-[8.8cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-black">
          <div className="absolute top-[110px] left-4 text-white">
            <p className="text-sm mb-3">Enjoy</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Gaming</p>
            <p className="text-6xl font-extrabold opacity-40 -mt-1 text-gray-500">Chair</p>
          </div>
          <Link href="/products?category=Chair">
            <button className="absolute bottom-9 left-6 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-black text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-black text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[0].img}
            alt=""
            fill
            className="object-contain scale-90 translate-x-20 transition-transform duration-500 ease-in-out group-hover:scale-100"
          />
        </div>

        {/* Box 2 */}
        <div className="w-full sm:w-[48%] lg:w-[8.8cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-yellow-400">
          <div className="absolute top-[110px] left-4 text-white">
            <p className="text-sm mb-3">Cool</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Cooling</p>
            <p className="text-6xl font-extrabold mb-3 -mt-1 text-yellow-200">Pad</p>
          </div>
          <Link href="/products?category=Controller">
            <button className="absolute bottom-9 left-6 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-yellow-400 text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-yellow-400 text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[1].img}
            alt=""
            fill
            className="object-contain scale-[0.65] translate-x-14 translate-y-10 transition-transform duration-500 ease-in-out group-hover:scale-[0.75]"
          />
        </div>

        {/* Box 3 */}
        <div className="w-full sm:w-full lg:w-[18.1cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-red-500">
          <div className="absolute top-[110px] left-4 text-white">
            <p className="text-sm mb-3">Pro</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Gaming</p>
            <p className="text-6xl font-extrabold mb-3 -mt-1 text-red-200">Monitor</p>
          </div>
          <Link href="/products?category=Monitors">
            <button className="absolute bottom-9 left-8 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-red-500 text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-red-500 text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[2].img}
            alt=""
            fill
            className="object-contain scale-105 translate-x-20 translate-y-4 transition-transform duration-500 ease-in-out group-hover:scale-[1.2]"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap gap-[0.5cm] justify-center">
        {/* Box 4 */}
        <div className="w-full sm:w-full lg:w-[18.1cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-gray-200">
          <div className="absolute top-[110px] left-4  text-black">
            <p className="text-sm mb-3">Watch</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Gaming</p>
            <p className="text-6xl font-extrabold mb-3 -mt-1 text-gray-400">Projector</p>
          </div>
          <Link href="/products">
            <button className="absolute bottom-9 left-8 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-black text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-black text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[3].img}
            alt=""
            fill
            className="object-contain scale-50 translate-x-[125px] translate-y-9 transition-transform duration-500 ease-in-out group-hover:scale-[0.6]"
          />
        </div>

        {/* Box 5 */}
        <div className="w-full sm:w-[48%] lg:w-[8.8cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-green-500">
          <div className="absolute top-[110px] left-4 text-white">
            <p className="text-sm mb-3">New</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Playstation</p>
            <p className="text-7xl font-extrabold mb-3 -mt-1 text-green-200">PS5</p>
          </div>
          <Link href="/products?category=Gaming Accessory">
            <button className="absolute bottom-9 left-6 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-green-500 text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-green-500 text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[4].img}
            alt=""
            fill
            className="object-contain scale-110 translate-x-[60px] translate-y-[50px] transition-transform duration-500 ease-in-out group-hover:scale-[1.3]"
          />
        </div>

        {/* Box 6 */}
        <div className="w-full sm:w-[48%] lg:w-[8.8cm] h-[8.8cm] rounded-2xl overflow-hidden relative group cursor-pointer bg-blue-500">
          <div className="absolute top-[110px] left-4 text-white">
            <p className="text-sm mb-3">Trend</p>
            <p className="text-3xl font-extrabold mb-3 -mt-1">Virtual</p>
            <p className="text-5xl font-extrabold mb-3 -mt-1 text-blue-200">VR Glass</p>
          </div>
          <Link href="/products">
            <button className="absolute bottom-9 left-6 bg-white px-5 py-2 rounded-md overflow-hidden min-h-[38px] w-[100px] group z-20">
              <span className="block w-full text-center transition-transform duration-300 ease-in-out group-hover:-translate-y-[120%] text-blue-500 text-base font-semibold">
                Browse
              </span>
              <span className="absolute top-0 left-0 w-full text-center translate-y-[190%] group-hover:translate-y-2 transition-transform duration-300 ease-in-out text-blue-500 text-base font-semibold">
                Browse
              </span>
            </button>
          </Link>
          <Image
            src={categories[5].img}
            alt=""
            fill
            className="object-contain scale-[1.5] translate-x-[95px] translate-y-[40px] transition-transform duration-500 ease-in-out group-hover:scale-[1.65]"
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
