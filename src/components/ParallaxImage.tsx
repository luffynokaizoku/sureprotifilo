
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  onClick?: () => void;
}

const ParallaxImage = ({
  src,
  alt,
  speed = 0.3,
  className = "",
  onClick,
}: ParallaxImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    // Create parallax effect
    gsap.fromTo(
      imageRef.current,
      {
        y: -speed * 100,
      },
      {
        y: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      }
    );

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === imageRef.current) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div
      ref={imageRef}
      className={`overflow-hidden ${className}`}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover interactive transition-transform duration-700"
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
