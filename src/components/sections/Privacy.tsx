"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Privacy() {
  // Toggle states
  const [features, setFeatures] = useState({
    trackers: true,
    personalize: false,
    memory: true,
    ads: true,
    shareData: false,
  });

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const featureList = [
    { key: "trackers", label: "Block trackers" },
    { key: "personalize", label: "Personalize new chats" },
    { key: "memory", label: "Memory" },
    { key: "ads", label: "Block ads" },
    { key: "shareData", label: "Share content data" },
  ] as const;

  // Render a single toggle badge
  const renderToggle = (item: typeof featureList[number]) => {
    const isOn = features[item.key];
    return (
      <span
        key={item.key}
        role="button"
        tabIndex={0}
        onClick={() => toggleFeature(item.key)}
        onKeyDown={(e) => e.key === "Enter" && toggleFeature(item.key)}
        className="h-35 rounded-20 leading-35 px-16 font-sans text-14 flex items-center gap-14 cursor-pointer transition-colors duration-200 bg-[#EBEBEB] bg-opacity-70 select-none hover:bg-black/10"
      >
        <span
          className={`h-12 w-12 rounded-full transition-colors duration-200 ${
            isOn ? "bg-[#F2FCB3]" : "bg-[#FFDC5C]"
          }`}
        />
        <span className="text-black/85 font-medium">{item.label}</span>
        <span className="bg-true-white h-20 px-6 leading-20 min-w-36 text-center text-11 rounded-full text-black/60 font-semibold shadow-sm">
          {isOn ? "On" : "Off"}
        </span>
      </span>
    );
  };

  return (
    <section className="my-80 800:my-120 max-w-1440 mx-auto site-grid">
      <div className="col-span-12 rounded-12 svg-dashed-border-pattern py-70 relative flex flex-col items-center overflow-hidden w-full min-w-0 border border-dashed border-black/10 bg-[#F8F8F8] px-24">
        
        {/* Top Lock SVG Badge */}
        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 bg-[#F8F8F8] px-10">
          <svg width="78" height="45" viewBox="0 0 78 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="78" height="44" transform="translate(0 0.903809)" fill="#F8F8F8"></rect>
            <path d="M29.5273 40.8491C28.4596 40.8491 27.5807 40.4845 26.8906 39.7554C26.2135 39.0392 25.875 38.1147 25.875 36.9819V22.0601C25.875 20.9272 26.2135 20.0028 26.8906 19.2866C27.5807 18.5705 28.4596 18.2124 29.5273 18.2124H48.4531C49.5078 18.2124 50.3802 18.5705 51.0703 19.2866C51.7604 20.0028 52.1055 20.9272 52.1055 22.0601V36.9819C52.1055 38.1147 51.7604 39.0392 51.0703 39.7554C50.3802 40.4845 49.5078 40.8491 48.4531 40.8491H29.5273ZM29.4297 39.853H48.5508C49.2799 39.853 49.8789 39.5861 50.3477 39.0522C50.8294 38.5314 51.0703 37.8608 51.0703 37.0405V22.021C51.0703 21.1877 50.8294 20.5041 50.3477 19.9702C49.8789 19.4364 49.2799 19.1694 48.5508 19.1694H29.4297C28.6875 19.1694 28.0755 19.4364 27.5938 19.9702C27.125 20.5041 26.8906 21.1877 26.8906 22.021V37.0405C26.8906 37.8608 27.125 38.5314 27.5938 39.0522C28.0755 39.5861 28.6875 39.853 29.4297 39.853ZM29.5078 18.6421V13.8765C29.5078 11.8973 29.9049 10.1525 30.6992 8.64209C31.4935 7.11865 32.6003 5.92725 34.0195 5.06787C35.4388 4.19548 37.0924 3.75928 38.9805 3.75928C40.8815 3.75928 42.5417 4.19548 43.9609 5.06787C45.3802 5.92725 46.4805 7.11865 47.2617 8.64209C48.056 10.1525 48.4531 11.8973 48.4531 13.8765V18.6421H47.4375V13.9546C47.4375 12.1447 47.0794 10.5496 46.3633 9.16943C45.6602 7.7762 44.6771 6.68896 43.4141 5.90771C42.151 5.12646 40.6732 4.73584 38.9805 4.73584C37.2878 4.73584 35.8099 5.12646 34.5469 5.90771C33.2839 6.68896 32.3008 7.7762 31.5977 9.16943C30.8945 10.5496 30.543 12.1447 30.543 13.9546V18.6421H29.5078Z" fill="black"></path>
          </svg>
        </div>

        <h2 className="sr-only">Privacy first with you in control</h2>
        <p className="h2--exposure text-center text-black mb-30">Privacy first</p>

        {/* Marquee Toggles */}
        <div className="w-full relative overflow-hidden my-20 py-10 mask-gradient pointer-events-auto">
          {/* We use an infinite scroll layout with Tailwind keyframes */}
          <div className="flex gap-20 w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Loop 1 */}
            <div className="flex gap-20">
              {featureList.map(renderToggle)}
            </div>
            {/* Loop 2 */}
            <div className="flex gap-20">
              {featureList.map(renderToggle)}
            </div>
            {/* Loop 3 */}
            <div className="flex gap-20">
              {featureList.map(renderToggle)}
            </div>
          </div>
        </div>

        <p className="h2--exposure text-center text-black mt-30">with you in control</p>
        
        {/* Paragraph Description */}
        <div className="p2--body text-secondary text-center max-w-[50ch] mt-40 px-20 leading-[1.6]">
          <p className="mb-14">
            You control whether Dia remembers your preferences and which tools connect to your workflow. Your data is never sold or used to build ad profiles — and with Sync, it's end-to-end encrypted.
          </p>
          <p>
            Dia for Work adds the guardrails that your team needs, like SSO and admin tools, so your team can stay secure.
          </p>
        </div>

        {/* Learn More CTA Link */}
        <div className="mt-40">
          <Link 
            href="/privacy" 
            className="group flex items-center justify-center gap-12 h-35 px-24 rounded-20 bg-light-grey text-primary font-sans text-14 font-medium transition-all duration-300 hover:bg-black/5"
          >
            Learn more about privacy in Dia
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-4">
              →
            </span>
          </Link>
        </div>

        {/* Bottom Lock SVG Keyhole */}
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 bg-[#F8F8F8] px-10">
          <svg width="76" height="29" viewBox="0 0 76 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="74.3867" height="28" transform="translate(0.806641 0.903809)" fill="#F8F8F8"></rect>
            <path d="M38 1.40381C38.3911 1.40376 38.7855 1.41655 39.1826 1.44385V1.44482C47.4655 2.01498 54.1553 8.76601 54.6631 17.0562C54.897 20.9106 53.7566 24.5118 51.6475 27.647C51.1487 28.3883 50.1161 28.6096 49.1895 28.2056C45.7816 26.7198 41.907 25.5191 38.0059 25.5679H37.9932C34.0924 25.5193 30.2181 26.7199 26.8105 28.2056C25.8839 28.6096 24.8513 28.3883 24.3525 27.647C22.2434 24.5118 21.103 20.9106 21.3369 17.0562C21.8447 8.76617 28.5338 2.0152 36.8164 1.44482C37.0149 1.43117 37.2131 1.42034 37.4102 1.41357L38 1.40381Z" stroke="black"></path>
          </svg>
        </div>

      </div>
      
      {/* Inline styles for custom marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
