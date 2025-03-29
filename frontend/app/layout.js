import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

// Fonts
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-white text-black ${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <Toaster position="top-center" />
        <main>{children}</main>
      </body>
    </html>
  );
}
