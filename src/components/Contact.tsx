
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

    // Form animation
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // In a real app, you would send this data to your backend
    setFormSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormState({ name: "", email: "", message: "" });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black py-20 px-6 md:p-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDIgTCAyMCAyIE0gMiAwIEwgMiAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>

      {/* Section header */}
      <div className="flex justify-between items-center mb-16">
        <div className="text-sm md:text-base font-mono">03</div>
        <div className="text-sm md:text-base font-mono uppercase">//CONTACT</div>
        <div className="text-sm md:text-base font-mono">GET IN TOUCH</div>
      </div>

      {/* Main heading */}
      <h2
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-24 uppercase text-center"
      >
        LET'S WORK TOGETHER
      </h2>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-mono uppercase">
              Your Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-700 focus:border-white px-2 py-3 outline-none transition-colors"
              whileFocus={{ borderColor: "#ffffff" }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-mono uppercase">
              Your Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              required
              value={formState.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-700 focus:border-white px-2 py-3 outline-none transition-colors"
              whileFocus={{ borderColor: "#ffffff" }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-mono uppercase">
              Your Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formState.message}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-gray-700 focus:border-white px-2 py-3 outline-none transition-colors resize-none"
              whileFocus={{ borderColor: "#ffffff" }}
            />
          </div>

          <div className="text-center">
            <motion.button
              type="submit"
              className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300 interactive mt-6 font-mono tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              disabled={formSubmitted}
            >
              {formSubmitted ? "MESSAGE SENT" : "SEND MESSAGE"}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Social Links */}
      <div className="mt-32 text-center">
        <p className="text-sm text-gray-400 mb-6 uppercase font-mono">Connect with me on</p>
        <div className="flex justify-center space-x-8">
          <motion.a
            href="#"
            className="interactive"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="#"
            className="interactive"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Dribbble
          </motion.a>
          <motion.a
            href="#"
            className="interactive"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Instagram
          </motion.a>
          <motion.a
            href="#"
            className="interactive"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Twitter
          </motion.a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Surya. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Contact;
