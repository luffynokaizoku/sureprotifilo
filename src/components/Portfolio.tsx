
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Zudio Garage®",
    category: "BUSINESS",
    image: "/lovable-uploads/1305149.jpeg"
  },
  {
    id: 2,
    title: "Manila Agency",
    category: "BRANDING",
    image: "/lovable-uploads/1321264.png"
  },
  {
    id: 3,
    title: "Basel Project",
    category: "DESIGN",
    image: "/lovable-uploads/1338628.png"
  },
  {
    id: 4,
    title: "Taxi Service",
    category: "DEVELOPMENT",
    image: "/lovable-uploads/1349525.jpeg"
  }
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

    // Description animation
    gsap.fromTo(
      descriptionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Projects animation
    const projectElements = document.querySelectorAll(".project-item");
    projectElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
        <div className="text-sm md:text-base font-mono">02</div>
        <div className="text-sm md:text-base font-mono uppercase">//PORTFOLIO</div>
        <div className="text-sm md:text-base font-mono">2013 - 2025</div>
      </div>

      {/* Main heading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase"
        >
          LATEST PORTFOLIO
        </h2>
        <p
          ref={descriptionRef}
          className="text-xl self-end text-gray-400"
        >
          My creative spirit comes alive in the digital realm. With nimble fingers flying across the device.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item overflow-hidden rounded-lg relative group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover interactive transition-transform duration-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Project overlay with info */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="bg-white text-black px-6 py-3 rounded-full mb-4 text-sm font-semibold">
                  VIEW
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{project.category}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 30 }}
              className="relative max-w-5xl w-full bg-black border border-gray-800 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-gray-400">{selectedProject.category}</p>
                <p className="mt-4 text-gray-300">
                  Detailed project description would go here. This is a sample portfolio piece that showcases my design and development skills.
                </p>
                <button
                  className="mt-6 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 interactive"
                  onClick={() => setSelectedProject(null)}
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
