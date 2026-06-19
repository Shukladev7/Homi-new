"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const columns = [
    {
      title: "Platform",
      links: [
        { title: "How It Works", url: "#how-it-works" },
        { title: "Features", url: "#features" },
        { title: "Viva Practice", url: "#features" },
        { title: "Exam Preparation", url: "#features" },
        { title: "Personalized Learning", url: "#how-it-works" }
      ]
    },
    {
      title: "For Families",
      links: [
        { title: "For Students", url: "#how-it-works" },
        { title: "For Parents", url: "#for-parents" },
        { title: "Parent Dashboard", url: "#for-parents" },
        { title: "Progress Tracking", url: "#for-parents" },
        { title: "Learning Insights", url: "#for-parents" }
      ]
    },
    {
      title: "Resources",
      links: [
        { title: "Help Center", url: "#" },
        { title: "FAQs", url: "#" },
        { title: "Contact Us", url: "#cta" },
        { title: "Privacy Policy", url: "#" },
        { title: "Terms of Service", url: "#" }
      ]
    },
    {
      title: "Connect",
      links: [
        { title: "Instagram", url: "https://www.instagram.com/homilearn" },
        { title: "LinkedIn", url: "https://linkedin.com/company/homilearn" },
        { title: "Email Support", url: "mailto:support@homilearn.com" }
      ]
    }
  ];

  const trustItems = [
    "Built for students in Classes VI–XII",
    "NCERT",
    "Gujarat Board",
    "ICSE",
    "Personalized Learning",
    "AI Viva Practice",
    "Parent Insights"
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith("#") && targetId.length > 1) {
      e.preventDefault();
      const element = document.getElementById(targetId.substring(1));
      if (element) {
        const offset = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#FAF9F6]/60 border-t border-black/5 py-100 px-24 800:px-40 mt-120 pb-60 select-none"
    >
      <div className="max-w-1440 mx-auto flex flex-col gap-60">
        
        {/* Quote Visual Element */}
        <div className="border-b border-black/5 pb-30 text-center 800:text-left">
          <p className="font-serif italic font-500 text-18 800:text-20 text-black/75 tracking-tight">
            "Every great learner starts with a question."
          </p>
        </div>

        {/* Top + Middle Grid Layout */}
        <div className="grid grid-cols-12 gap-y-40 800:gap-x-40">
          
          {/* Logo + Tagline + Description */}
          <div className="col-span-12 800:col-span-4 flex flex-col gap-16 text-center 800:text-left">
            <div className="flex items-center gap-6 font-serif font-700 text-18 text-black tracking-tight justify-center 800:justify-start">
              <span className="bg-gradient-to-r from-[#36AFFF] to-[#FF64C3] h-10 w-10 rounded-full" />
              <span className="font-650">HomiLearn</span>
            </div>
            <p className="font-serif italic font-600 text-15 text-black/85">
              Learning that knows you.
            </p>
            <p className="text-13 leading-relaxed text-secondary font-sans font-350 max-w-[35ch] mx-auto 800:mx-0">
              Helping students learn with confidence, supporting parents with insights, and empowering teachers through personalized learning.
            </p>
          </div>

          {/* Links Columns */}
          <div className="col-span-12 800:col-span-8 grid grid-cols-2 800:grid-cols-4 gap-30 800:gap-10">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-16 text-left">
                <h4 className="text-11 font-mono uppercase tracking-wider text-tertiary font-semibold">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-10">
                  {column.links.map((link) => {
                    const isExternal = link.url.startsWith("http") || link.url.startsWith("mailto");
                    return (
                      <li key={link.title}>
                        {isExternal ? (
                          <a
                            href={link.url}
                            target={link.url.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            className="text-13 font-400 font-sans text-secondary hover:text-primary transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        ) : (
                          <a
                            href={link.url}
                            onClick={(e) => handleScroll(e, link.url)}
                            className="text-13 font-400 font-sans text-secondary hover:text-primary transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Trust Bar */}
        <div className="border-t border-black/5 pt-30 mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-8 text-11 font-mono uppercase text-tertiary tracking-wider text-center">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-14">
              <span>{item}</span>
              {idx < trustItems.length - 1 && <span className="text-quaternary">•</span>}
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-black/5 pt-30 flex flex-col 600:flex-row items-center justify-between gap-16 text-11 text-quaternary text-center">
          <p>© 2026 HomiLearn. All rights reserved.</p>
          <p>Made with care for students, parents, and teachers.</p>
        </div>

      </div>
    </motion.footer>
  );
}
