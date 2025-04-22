
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setHidden(false);
      };

      const handleMouseDown = () => setClicked(true);
      const handleMouseUp = () => setClicked(false);

      const handleMouseLeave = () => setHidden(true);
      const handleMouseEnter = () => setHidden(false);

      // Listen for hovering over links and buttons
      const handleLinkHoverEvents = () => {
        const interactiveElements = document.querySelectorAll(
          'a, button, [role="button"], .interactive'
        );

        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true));
          el.addEventListener("mouseleave", () => setLinkHovered(false));
        });
      };

      window.addEventListener("mousemove", updatePosition);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mouseenter", handleMouseEnter);

      // Initial setup for link hover detection
      handleLinkHoverEvents();

      // Re-run the link hover detection when DOM might change
      const observer = new MutationObserver(handleLinkHoverEvents);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", updatePosition);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("mouseenter", handleMouseEnter);
        observer.disconnect();
      };
    }
  }, []);

  // Don't render cursor on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Main cursor dot */}
        <div
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 
            ${clicked ? "bg-accent" : "bg-white"} 
            ${linkHovered ? "w-12 h-12 bg-opacity-20 border border-white mix-blend-difference" : "w-2 h-2"}
          `}
        />
        
        {/* Larger outline cursor */}
        <div
          className={`absolute rounded-full border border-white -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
            ${linkHovered ? "w-16 h-16 opacity-0" : "w-6 h-6 opacity-60"}
            ${clicked ? "scale-50" : "scale-100"} animate-cursor-pulse
          `}
        />
      </div>
    </>
  );
};

export default CustomCursor;
