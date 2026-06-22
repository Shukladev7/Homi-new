"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, FileText, PlusCircle, LogOut, ExternalLink, Menu, X, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "All Posts", icon: FileText },
    { href: "/admin/posts/new", label: "Write Post", icon: PlusCircle },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-16 text-center">
          {/* HomiLearn-style glassmorphic loading spinner */}
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 rounded-full border-4 border-black/5" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin" />
          </div>
          <p className="text-14 font-sans font-350 text-secondary">
            Verifying administration credentials...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return null; // Don't render dashboard during redirect
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col font-sans">
      {/* Admin Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 px-24 800:px-40 h-64 flex items-center justify-between">
        <div className="flex items-center gap-24">
          <Link href="/" className="flex items-center gap-10">
            <img src="/logo1.png" alt="HomiLearn Logo" className="h-32 object-contain" />
            <span className="text-12 font-mono uppercase tracking-wider text-purple-600 bg-purple-50 px-8 py-2 rounded-full border border-purple-100/50 font-semibold">
              Admin
            </span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden 800:flex items-center gap-16 ml-16" aria-label="Admin navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`h-40 px-16 rounded-12 flex items-center gap-8 text-13 font-medium transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-16 h-16" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-16">
          {/* View Live Blog Link */}
          <Link
            href="/blog"
            target="_blank"
            className="hidden 600:flex h-40 px-16 rounded-12 items-center gap-6 text-12 text-black/60 hover:text-black hover:bg-black/5 transition-colors font-medium border border-black/8"
          >
            <span>View Site</span>
            <ExternalLink className="w-12 h-12" />
          </Link>

          {/* User Profile Badge + Logout */}
          <div className="hidden 800:flex items-center gap-12 pl-12 border-l border-black/8">
            <div className="flex flex-col items-end">
              <span className="text-12 font-medium text-black">{session.user?.email?.split("@")[0]}</span>
              <span className="text-10 text-secondary">{session.user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-36 h-36 rounded-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 border border-rose-100/50 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-16 h-16" />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex 800:hidden w-40 h-40 items-center justify-center rounded-12 hover:bg-black/5 border border-black/8"
          >
            {mobileMenuOpen ? <X className="w-20 h-20" /> : <Menu className="w-20 h-20" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="800:hidden fixed inset-0 top-64 z-40 bg-[#F8F8F8]/95 backdrop-blur-md flex flex-col p-24 gap-16 border-t border-black/5 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`h-48 px-20 rounded-12 flex items-center gap-10 text-14 font-medium transition-colors ${
                  isActive ? "bg-black text-white" : "bg-white border border-black/5 text-black/75 hover:bg-black/5"
                }`}
              >
                <Icon className="w-18 h-18" />
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/blog"
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="h-48 px-20 rounded-12 flex items-center gap-10 text-14 font-medium bg-white border border-black/5 text-black/75"
          >
            <ExternalLink className="w-18 h-18" />
            View Site
          </Link>
          <div className="mt-auto border-t border-black/8 pt-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-12 font-medium text-black">{session.user?.email?.split("@")[0]}</span>
              <span className="text-10 text-secondary">{session.user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="h-40 px-16 rounded-12 border border-rose-200 text-rose-600 bg-rose-50 flex items-center gap-8 text-13 font-medium cursor-pointer"
            >
              <LogOut className="w-16 h-16" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Workspace Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-24 800:px-40 py-32 800:py-40 flex flex-col gap-24">
        {children}
      </main>
    </div>
  );
}
