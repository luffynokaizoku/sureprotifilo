
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current time
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeRef.current.textContent = `LOCAL / ${hours}:${minutes}:${seconds}`;
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // GSAP Animations
    const tl = gsap.timeline();
    
    // Initial animations
    tl.fromTo(
      nameRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      0
    )
    .fromTo(
      [locationRef.current, statusRef.current, roleRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      0.5
    )
    .fromTo(
      timeRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0.3
    );
    
    // Scroll-based animations
    gsap.fromTo(
      nameRef.current,
      { scale: 1 },
      {
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      }
    );

    return () => {
      clearInterval(interval);
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full bg-black py-20 px-6 md:p-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIgTCAyMCAyIE0gMiAwIEwgMiAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-20">
        <div ref={timeRef} className="text-sm md:text-base font-mono tracking-wider opacity-80">
          LOCAL / 00:00:00
        </div>
        <button className="interactive px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300">
          CONTACT NOW
        </button>
      </div>
      
      {/* Main name */}
      <h1 ref={nameRef} className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-32 uppercase">
        SURE SRI VENKAT RAMA SURYA
      </h1>
      
      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Location */}
        <div ref={locationRef} className="space-y-2">
          <div className="w-6 h-6 mx-auto md:mx-0 rounded-full bg-green-500 mb-4"></div>
          <h3 className="font-mono text-lg">CHIRALA,</h3>
          <p className="text-gray-400">ANDHRA PRADESH</p>
        </div>
        
        {/* Availability */}
        <div ref={statusRef} className="space-y-2">
          <div className="w-6 h-6 mx-auto md:mx-0 flex items-center justify-center bg-transparent border border-white rounded-full mb-4">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <h3 className="font-mono text-lg">AVAILABLE ALL AROUND</h3>
          <p className="text-gray-400">WORLDWIDE</p>
        </div>
        
        {/* Role */}
        <div ref={roleRef} className="space-y-2">
          <div className="w-6 h-6 mx-auto md:mx-0 rounded-full bg-blue-500 mb-4"></div>
          <h3 className="font-mono text-lg">DIGITAL DESIGNER</h3>
          <p className="text-gray-400">FrontEnd DEVELOPER</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
