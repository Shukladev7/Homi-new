"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const footerData = {
    columnLinks: [
      {
        title: "Product",
        links: [
          { title: "For Work", url: "/forwork" },
          { title: "Release Notes", url: "/release-notes/latest" },
          { title: "Windows", url: "/windows" },
          { title: "Students", url: "/students" },
          { title: "Skills", url: "/skills" },
          { title: "Introducing Reports", url: "/start" }
        ]
      },
      {
        title: "Resources",
        links: [
          { title: "Help", url: "/help" },
          { title: "Status", url: "https://status.diabrowser.com" },
          { title: "Privacy", url: "/privacy" },
          { title: "Terms of Use", url: "/termsofuse" },
          { title: "Security", url: "/security" },
          { title: "Trust Center", url: "https://trust.diabrowser.com/" }
        ]
      },
      {
        title: "Company",
        links: [
          { title: "About Us", url: "https://thebrowser.company/" },
          { title: "Careers", url: "https://thebrowser.company/careers" },
          { title: "Newsletter", url: "https://browsercompany.substack.com/" },
          { title: "Early Birds Program", url: "/earlybirds" }
        ]
      },
      {
        title: "Connect",
        links: [
          { title: "X", url: "https://x.com/diabrowser" },
          { title: "LinkedIn", url: "https://www.linkedin.com/company/the-browser-company/posts/?feedView=all" },
          { title: "Instagram", url: "https://www.instagram.com/diabrowser/" }
        ]
      }
    ],
    tagline: "Designed and Built by The Browser Company of New York"
  };

  return (
    <footer className="w-full bg-[#F8F8F8] border-t border-black/8 py-80 px-24 800:px-40 mt-100 pb-60">
      <div className="max-w-1440 mx-auto grid grid-cols-2 800:grid-cols-4 gap-40 800:gap-20">
        {footerData.columnLinks.map((column, idx) => (
          <div key={column.title} className="flex flex-col gap-16">
            <h4 className="text-12 font-mono uppercase tracking-wider text-tertiary">
              {column.title}
            </h4>
            <ul className="flex flex-col gap-10">
              {column.links.map((link) => {
                const isExternal = link.url.startsWith("http");
                return (
                  <li key={link.title}>
                    {isExternal ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-14 font-400 text-secondary hover:text-primary transition-colors duration-200"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        href={link.url}
                        className="text-14 font-400 text-secondary hover:text-primary transition-colors duration-200"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-1440 mx-auto border-t border-black/8 mt-60 pt-30 flex flex-col 600:flex-row items-center justify-between gap-20">
        <p className="text-12 text-tertiary text-center 600:text-left">
          {footerData.tagline}{" "}
          <a
            href="https://thebrowser.company/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-secondary"
          >
            The Browser Company of New York
          </a>
        </p>
        <p className="text-12 text-quaternary text-center 600:text-right">
          © {new Date().getFullYear()} Dia Browser. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
