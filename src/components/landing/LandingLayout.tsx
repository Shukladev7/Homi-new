import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen bg-[#F8F8F8] text-primary flex flex-col">
      {/* Skip to content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white focus:px-16 focus:py-8 focus:rounded-8 focus:text-14 focus:font-sans focus:font-500"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 w-full flex flex-col" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
