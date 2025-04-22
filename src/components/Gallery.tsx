
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images: GalleryImage[];
  columns?: number;
  gap?: number;
}

const Gallery = ({ images, columns = 2, gap = 8 }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const images = document.querySelectorAll(".gallery-image");
    
    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [images]);
  
  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        // Navigate to next image
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        // Navigate to previous image
        const currentIndex = images.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images]);
  
  // Function to navigate to next/prev image
  const navigateGallery = (direction: "next" | "prev") => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex = currentIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };
  
  // Calculate grid columns based on responsive design
  const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
  
  return (
    <div ref={galleryRef} className="w-full">
      {/* Gallery Grid */}
      <div 
        className="grid gap-4" 
        style={{ 
          gridTemplateColumns,
          gap: `${gap}px`,
        }}
      >
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="gallery-image overflow-hidden"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="overflow-hidden cursor-pointer interactive relative group">
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium"
                >
                  View Image
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-10 relative">
              {/* Close button */}
              <button 
                className="absolute top-6 right-6 z-50 text-white interactive"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Image container */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
              
              {/* Navigation buttons */}
              <div className="absolute left-0 right-0 bottom-1/2 flex justify-between px-4 md:px-10">
                <button 
                  className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white interactive"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("prev");
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button 
                  className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white interactive"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("next");
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
