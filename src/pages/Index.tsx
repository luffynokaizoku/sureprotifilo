
import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import ShowcaseSection from "@/components/ShowcaseSection";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Loader from "@/components/Loader";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Index = () => {
  // Initialize smooth scroll
  useSmoothScroll();

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-white w-full overflow-hidden">
      {/* Initial loader */}
      <Loader duration={2500} />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Main sections */}
      <Hero />
      <About />
      <Portfolio />
      <ShowcaseSection />
      <Contact />
    </div>
  );
};

export default Index;
