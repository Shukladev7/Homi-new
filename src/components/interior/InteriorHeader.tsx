"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function InteriorHeader() {
  const menuItems = [
    { title: "How It Works", href: "/how-it-works" },
    { title: "Features", href: "/features" },
    { title: "For Parents", href: "/parents" },
    { title: "For Teachers", href: "/teachers" },
    { title: "Pricing", href: "/pricing" },
    { title: "Blog", href: "/blog" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full flex justify-center py-14 800:py-20 px-16"
    >
      <nav
        aria-label="Main navigation"
        className="bg-white/80 backdrop-blur-md border border-solid border-black/8 rounded-20 shadow-marquee-slide-title flex items-center h-52 px-16 gap-28 text-black max-w-[900px] w-full"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center select-none"
          aria-label="HomiLearn homepage"
        >
          <img
            src="/logo.png"
            alt="HomiLearn logo"
            className="h-32 800:h-36 w-auto object-contain"
            width={120}
            height={36}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden 800:flex gap-24 items-center justify-center flex-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="text-13 font-400 font-sans tracking-tight leading-none text-black/60 transition-opacity duration-200 hover:text-black whitespace-nowrap"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden 800:flex items-center pl-10 border-l border-black/5">
          <Link
            href="/#cta"
            className="h-32 rounded-full bg-black hover:bg-black/85 active:scale-[0.96] text-true-white text-12 font-sans font-500 px-16 flex items-center justify-center shadow-sm select-none transition-all duration-200"
          >
            Start Free
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
