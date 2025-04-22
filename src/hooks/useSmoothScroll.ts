
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 80
          },
          ease: "power3.inOut"
        });
      });
    });
    
    // Enhance all buttons with smooth scroll triggers
    const enhanceButtons = () => {
      document.querySelectorAll('button[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetSelector = this.getAttribute('data-scroll-to');
          if (!targetSelector) return;
          
          const targetElement = document.querySelector(targetSelector);
          if (!targetElement) return;
          
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        });
      });
    };
    
    enhanceButtons();
    
    // Observer for dynamically added buttons
    const observer = new MutationObserver(() => {
      enhanceButtons();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useSmoothScroll;
