import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import WhatIsHomi from "@/components/sections/WhatIsHomi";
import PersonalizedLearning from "@/components/sections/PersonalizedLearning";
import ParentsLoop from "@/components/sections/ParentsLoop";
import Teachers from "@/components/sections/Teachers";
import Roles from "@/components/sections/Roles";
import Testimonials from "@/components/sections/Testimonials";
import PracticePrep from "@/components/sections/PracticePrep";
import Curriculum from "@/components/sections/Curriculum";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import WaveSeparator from "@/components/sections/WaveSeparator";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#F8F8F8] text-primary flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: Hero - Soft White */}
        <div className="bg-white">
          <Hero />
        </div>

        {/* Separator 1: Hero -> Problems (White to Sky Blue) */}
        <WaveSeparator type={1} />

        {/* Section 2: Problems - Sky Blue Gradient */}
        <div className="bg-gradient-to-b from-[#F4FAFF] to-[#EAF5FF]">
          <Problems />
        </div>

        {/* Separator 2: Problems -> WhatIsHomi (Sky Blue to White) */}
        <WaveSeparator type={2} />

        {/* Section 3: WhatIsHomi - Soft White */}
        <div className="bg-white">
          <WhatIsHomi />
        </div>

        {/* Separator 3: WhatIsHomi -> Curriculum (White to Sky Blue) */}
        <WaveSeparator type={3} />

        {/* Section 4: Curriculum - Sky Blue Gradient */}
        <div className="bg-gradient-to-b from-[#F4FAFF] to-[#EAF5FF]">
          <Curriculum />
        </div>

        {/* Separator 4: Curriculum -> Features (Sky Blue to White) */}
        <WaveSeparator type={4} />

        {/* Section 5: Features - Soft White */}
        <div className="bg-white">
          <Features />
        </div>

        {/* Separator 5: Features -> PersonalizedLearning (White to Mint) */}
        <WaveSeparator type={5} />

        {/* Section 6: PersonalizedLearning - Soft Mint Gradient */}
        <div className="bg-gradient-to-b from-[#F5FFF8] to-[#E7FAEF]">
          <PersonalizedLearning />
        </div>

        {/* Separator 6: PersonalizedLearning -> PracticePrep (Mint to White) */}
        <WaveSeparator type={6} />

        {/* Section 7: PracticePrep - Soft White */}
        <div className="bg-white">
          <PracticePrep />
        </div>

        {/* Separator 7: PracticePrep -> ParentsLoop (White to Lavender) */}
        <WaveSeparator type={7} />

        {/* Section 8: ParentsLoop - Soft Lavender Gradient */}
        <div className="bg-gradient-to-b from-[#FBF7FF] to-[#F2E8FF]">
          <ParentsLoop />
        </div>
        {/* Separator 8: ParentsLoop -> Teachers (Lavender to Soft Teal) */}
        <WaveSeparator type={8} />

        {/* Section 8.5: Built For Modern Teachers - Soft Blue to Lavender Gradient */}
        <div className="bg-gradient-to-b from-[#F2F6FF] to-[#F5F2FF]">
          <Teachers />
        </div>

        {/* Separator 12: Teachers -> Roles (Soft Teal to White) */}
        <WaveSeparator type={12} />

        {/* Section 9: Roles - Soft White */}
        <div className="bg-white">
          <Roles />
        </div>

        {/* Separator 9: Roles -> Testimonials (White to Peach) */}
        <WaveSeparator type={9} />

        {/* Section 10: Testimonials - Soft Peach/Cream Gradient */}
        <div className="bg-gradient-to-b from-[#FFF9F2] to-[#FFEFD9]">
          <Testimonials />
        </div>

        {/* Separator 10: Testimonials -> Pricing (Peach to Cream) */}
        <WaveSeparator type={10} />

        {/* Section 11: Pricing - Premium Cream & Lavender Gradient */}
        <Pricing />

        {/* Separator 11: Pricing -> CTA (Lavender to White) */}
        <WaveSeparator type={11} />

        {/* Section 12: CTA - Soft White with ambient glow */}
        <div className="bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-400 h-400 bg-orange-500/3 rounded-full blur-3xl pointer-events-none" />
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}
