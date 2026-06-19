"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "How It Works", targetId: "how-it-works" },
    { title: "Features", targetId: "features" },
    { title: "For Parents", targetId: "for-parents" },
    { title: "Pricing", targetId: "cta" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Offset slightly to account for fixed header spacing on mobile/desktop
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-14 800:top-28 left-10 right-10 flex flex-col items-center gap-y-10 z-50 pointer-events-none"
    >
      {/* Mobile Navbar (visible < 800px) */}
      <div className="800:hidden w-full max-w-[500px] pointer-events-auto rounded-30 bg-true-white/90 border border-solid border-black/8 shadow-marquee-slide-title backdrop-blur-xl z-50 flex flex-col px-24 relative overflow-hidden transition-all duration-300 ease-in-out"
           style={{ height: isOpen ? "auto" : "52px" }}>
        
        <div className="flex items-center justify-between h-[52px] w-full">
          <button 
            onClick={(e) => handleScroll(e, "hero")}
            className="flex items-center gap-6 font-serif font-700 text-15 text-black tracking-tight select-none cursor-pointer focus:outline-none"
          >
            <span className="bg-gradient-to-r from-[#36AFFF] to-[#FF64C3] h-10 w-10 rounded-full" />
            <span className="font-650">homi</span>
          </button>
          
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 block flex-shrink-0 text-primary pointer-events-auto focus:outline-none"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path d="M2 2L16 16M2 16L16 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M1 9H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                  <path d="M9 17.0001L9 1.00012" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                </>
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col flex-grow justify-center pb-24"
            >
              <ul className="flex flex-col gap-30 mb-40 mt-10 justify-center">
                {menuItems.map((item, idx) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.7, x: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a 
                      href={`#${item.targetId}`} 
                      onClick={(e) => handleScroll(e, item.targetId)}
                      className="text-24 font-serif font-300 leading-none text-black hover:opacity-80 transition-opacity duration-200"
                    >
                      {item.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
              
              <div className="flex flex-col gap-10">
                <button
                  onClick={(e) => handleScroll(e, "cta")}
                  className="w-full text-center h-50 rounded-20 text-true-white bg-black px-24 text-16 font-500 flex items-center justify-center cursor-pointer shadow-sm hover:bg-black/90 active:scale-[0.98] transition-all"
                  title="Start Free"
                >
                  Start Free
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar (visible >= 800px) */}
      <nav aria-label="Main navigation" className="hidden 800:flex w-full justify-center pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-md border border-solid border-black/8 rounded-20 shadow-marquee-slide-title flex items-center h-52 px-16 gap-28 text-black">
          
          {/* Logo (Left) */}
          <button 
            onClick={(e) => handleScroll(e, "hero")}
            className="flex items-center gap-6 font-serif font-700 text-15 text-black tracking-tight select-none pr-10 border-r border-black/5 cursor-pointer focus:outline-none"
          >
            <span className="bg-gradient-to-r from-[#36AFFF] to-[#FF64C3] h-10 w-10 rounded-full" />
            <span className="font-650">homi</span>
          </button>

          {/* Center Navigation */}
          <ul className="flex gap-24 items-center justify-center">
            {menuItems.map((item) => (
              <li key={item.title}>
                <a
                  href={`#${item.targetId}`}
                  onClick={(e) => handleScroll(e, item.targetId)}
                  className="text-13 font-400 font-sans tracking-tight leading-none text-black/60 transition-opacity duration-200 site-ease hover:opacity-100 whitespace-nowrap"
                  title={item.title}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider and Right CTA (Start Free) */}
          <div className="flex items-center pl-10 border-l border-black/5">
            <button
              onClick={(e) => handleScroll(e, "cta")}
              className="h-32 rounded-10 bg-black hover:bg-black/85 active:scale-[0.96] text-true-white text-12 font-sans font-500 px-16 flex items-center justify-center shadow-sm select-none cursor-pointer transition-all duration-200"
            >
              Start Free
            </button>
          </div>

        </div>
      </nav>
    </motion.header>
  );
}
