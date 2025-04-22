
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxImage from "./ParallaxImage";
import Gallery from "./Gallery";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/6e189f7a-2594-456a-b29c-8c1abde689f3.png",
    alt: "Surya smiling with friends",
  },
  {
    id: 2,
    src: "/lovable-uploads/5f3be688-bd4a-421e-b703-5504b0df73fc.png",
    alt: "Portrait of Surya in soft light",
  },
  {
    id: 3,
    src: "/lovable-uploads/1e282a0d-972f-4cc9-916b-9a5e155d48a6.png",
    alt: "Surya standing on a bridge",
  },
  {
    id: 4,
    src: "/lovable-uploads/29cf40b0-4532-4944-a022-74ac0a8683bc.png",
    alt: "Surya with Spider-Man mask artistic shot",
  },
  {
    id: 5,
    src: "/lovable-uploads/1364371.jpeg",
    alt: "Surya with Spider-Man mask artistic shot",
  }
];

const ShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect on section
    gsap.to(imageContainer.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black py-20 px-6 md:p-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHggZD0iTSAwIDIgTCAyMCAyIE0gMiAwIEwgMiAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

      {/* Section header */}
      <div className="flex justify-between items-center mb-16">
        <div className="text-sm md:text-base font-mono">04</div>
        <div className="text-sm md:text-base font-mono uppercase">//SHOWCASE</div>
        <div className="text-sm md:text-base font-mono">FEATURED WORKS</div>
      </div>

      {/* Main heading */}
      <h2
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-24 uppercase text-center"
      >
        VISUAL STORYTELLING
      </h2>

      {/* Large feature image with parallax */}
      <div className="mb-24">
        <ParallaxImage
          src="/lovable-uploads/bfW6dzCFy2A-SD.jpg"
          alt="Feature image"
          speed={0.1}
          className="w-full h-[50vh] md:h-[70vh] rounded-lg overflow-hidden"
        />
      </div>

      {/* Gallery section */}
      <div className="max-w-6xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-12 text-center"
        >
          Explore The Gallery
        </motion.h3>

        <Gallery images={galleryImages} columns={2} gap={16} />
      </div>

      {/* Animated images showcase */}
      <div ref={imageContainer} className="mt-32 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/lovable-uploads/My Anime For Life.jpeg"
              alt="Image 1"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/lovable-uploads/ONE PIECE Egghead Arc.jpeg"
              alt="Image 2"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/lovable-uploads/474114697_1124692809036385_5491179292462119392_n.jpg"
              alt="Image 3"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/lovable-uploads/chapter-1138-wallpaper-credit-s7s-h-v0-yqw74qpexkge1.webp"
              alt="Image 4"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
