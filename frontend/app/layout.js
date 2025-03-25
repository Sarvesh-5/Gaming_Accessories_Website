import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Define fonts
const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata = {
  title: "GG LOOTBOX",
  description: "Description here",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white"> {/* Ensure background is white */}
        <Navbar />
        <div className="bg-white text-black">{children}</div> {/* Ensure full-page white background */}
      </body>
    </html>
  );
}
