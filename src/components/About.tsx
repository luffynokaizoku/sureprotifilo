import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Heading animation
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

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Numbers animation
    numberRefs.current.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect on section
    gsap.fromTo(
      sectionRef.current,
      { backgroundPositionY: "0%" },
      {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

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
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIgTCAyMCAyIE0gMiAwIEwgMiAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      
      {/* Section header */}
      <div className="flex justify-between items-center mb-16">
        <div className="text-sm md:text-base font-mono">01</div>
        <div className="text-sm md:text-base font-mono uppercase">//APPROACH</div>
        <div className="text-sm md:text-base font-mono">THREE PHASES</div>
      </div>
      
      {/* Main heading */}
      <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-16 uppercase">
        I'M SURE SRI VENKAT RAMA SURYA.
      </h2>
      
      {/* Description */}
      <p ref={contentRef} className="text-xl text-center mx-auto max-w-2xl mb-24 text-gray-400">
        I employed responsive design skills to maintain consistency across all devices.
      </p>
      
      {/* New feature image with parallax */}
      <div className="mb-24">
        <div 
          ref={el => numberRefs.current[0] = el}
          className="w-full h-[50vh] md:h-[70vh] rounded-lg overflow-hidden"
        >
          <img 
            src="/lovable-uploads/ea2e88ba-796e-4055-b4e9-f2d6a570e34c.png" 
            alt="Surya in nature" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Three step process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div 
          ref={el => numberRefs.current[0] = el} 
          className="text-center space-y-6"
        >
          <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="font-mono">01</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold uppercase">Discover and Analysis</h3>
          <p className="text-gray-400">
            Discover opportunities and refine strategies for decisions.
          </p>
        </div>
        
        <div 
          ref={el => numberRefs.current[1] = el} 
          className="text-center space-y-6"
        >
          <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="font-mono">02</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold uppercase">Design and Implement</h3>
          <p className="text-gray-400">
            Design and implement solutions to transform ideas.
          </p>
        </div>
        
        <div 
          ref={el => numberRefs.current[2] = el} 
          className="text-center space-y-6"
        >
          <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto flex items-center justify-center mb-4">
            <span className="font-mono">03</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold uppercase">Deliver and Monitor</h3>
          <p className="text-gray-400">
            Ensure efficient execution and performance tracking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
