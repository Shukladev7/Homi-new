import Link from "next/link";

export default function InteriorFooter() {
  const columns = [
    {
      title: "Platform",
      links: [
        { title: "How It Works", href: "/how-it-works" },
        { title: "Features", href: "/features" },
        { title: "Pricing", href: "/pricing" },
        { title: "Blog", href: "/blog" },
      ],
    },
    {
      title: "For Families",
      links: [
        { title: "For Students", href: "/features" },
        { title: "For Parents", href: "/parents" },
        { title: "Parent Dashboard", href: "/parents" },
      ],
    },
    {
      title: "For Educators",
      links: [
        { title: "For Teachers", href: "/teachers" },
        { title: "AI Lesson Plans", href: "/teachers" },
        { title: "AI Worksheets", href: "/teachers" },
      ],
    },
    {
      title: "Connect",
      links: [
        { title: "Instagram", href: "https://www.instagram.com/homilearn", external: true },
        { title: "LinkedIn", href: "https://linkedin.com/company/homilearn", external: true },
        { title: "Email Support", href: "mailto:support@homilearn.com", external: true },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#FAF9F6]/60 border-t border-black/5 py-60 px-24 800:px-40 mt-60">
      <div className="max-w-1440 mx-auto flex flex-col gap-40">
        {/* Top Section */}
        <div className="grid grid-cols-12 gap-y-40 800:gap-x-40">
          {/* Logo + Tagline */}
          <div className="col-span-12 800:col-span-4 flex flex-col gap-12 text-center 800:text-left">
            <Link href="/" className="flex items-center gap-8 justify-center 800:justify-start">
              <img src="/logo.png" alt="HomiLearn logo" className="h-22 w-auto object-contain" width={80} height={22} />
              <span className="font-serif font-650 text-18 text-black tracking-tight">HomiLearn</span>
            </Link>
            <p className="font-serif italic font-600 text-11 800:text-13 text-black/85">
              Learning that knows you.
            </p>
            <p className="text-13 leading-relaxed text-secondary font-sans font-350 max-w-[35ch] mx-auto 800:mx-0">
              AI-powered personalized learning for students, insights for parents, and tools for teachers.
            </p>
          </div>

          {/* Link Columns */}
          <div className="col-span-12 800:col-span-8 grid grid-cols-2 800:grid-cols-4 gap-30 800:gap-10">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-14 text-left">
                <h4 className="text-11 font-mono uppercase tracking-wider text-tertiary font-semibold">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-10">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-13 font-400 font-sans text-secondary hover:text-primary transition-colors duration-200"
                        >
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-13 font-400 font-sans text-secondary hover:text-primary transition-colors duration-200"
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/5 pt-24 flex flex-col 600:flex-row items-center justify-between gap-16 text-11 text-quaternary text-center">
          <p>&copy; 2026 HomiLearn. All rights reserved.</p>
          <p>Made with care for students, parents, and teachers.</p>
        </div>
      </div>
    </footer>
  );
}
