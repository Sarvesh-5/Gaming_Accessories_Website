import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import ProductSection from '@/components/ProductSection';
import LevelUpBanner from '@/components/LevelUpBanner';
import SpecialOffers from '@/components/SpecialOffers';
import Testimonials from '@/components/Testimonials';
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <ProductSection />
      <LevelUpBanner />
      <SpecialOffers />
      <Testimonials />
      <Footer />
    </main>
  );
}

