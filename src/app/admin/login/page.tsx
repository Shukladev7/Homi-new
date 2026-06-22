"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Script from "next/script";
import { ShieldCheck, Mail, Lock, AlertCircle, Loader } from "lucide-react";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/admin/dashboard");
    }
  }, [session, status, router]);

  useEffect(() => {
    // Set up Turnstile callback handler on global window
    (window as any).onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
      setError(null);
    };

    (window as any).onTurnstileExpired = () => {
      setTurnstileToken("");
      setError("Turnstile verification expired. Please verify again.");
    };

    return () => {
      delete (window as any).onTurnstileSuccess;
      delete (window as any).onTurnstileExpired;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Enforce Turnstile validation in production if site key is configured
    if (turnstileSiteKey && !turnstileToken) {
      setError("Please complete the Turnstile security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        turnstileToken,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        // Force reset Turnstile widget on failure
        if (typeof (window as any).turnstile !== "undefined") {
          (window as any).turnstile.reset();
        }
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      setError("An unexpected authentication error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full border-4 border-black/5" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-24 relative overflow-hidden">
      {/* Turnstile JavaScript API Loader */}
      {turnstileSiteKey && (
        <Script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" 
          async 
          defer 
        />
      )}

      {/* Background ambient glow shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-[420px] flex flex-col gap-24 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-12 text-center">
          <Link href="/">
            <img 
              src="/logo1.png" 
              alt="HomiLearn Logo" 
              className="h-44 object-contain hover:scale-102 transition-transform duration-200"
            />
          </Link>
          <div className="flex flex-col gap-6">
            <h1 className="font-serif font-700 text-24 text-black tracking-tight leading-tight flex items-center justify-center gap-8">
              <ShieldCheck className="w-20 h-20 text-purple-600" />
              Admin Portal
            </h1>
            <p className="text-13 font-sans font-350 text-secondary">
              Cloudflare target stack secured. Log in to manage posts.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-black/5 rounded-24 p-32 shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-20">
            
            {error && (
              <div className="bg-rose-50 border border-rose-100 rounded-12 p-14 flex gap-10 text-rose-900 text-13 leading-relaxed">
                <AlertCircle className="w-16 h-16 text-rose-600 flex-shrink-0 mt-2" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-8">
              <label htmlFor="email" className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@homilearn.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-48 pl-40 pr-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-14 text-black placeholder-black/30 focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
                />
                <Mail className="absolute left-14 top-1/2 -translate-y-1/2 w-16 h-16 text-black/35" />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <label htmlFor="password" className="text-11 font-mono uppercase tracking-wider text-black/50 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-48 pl-40 pr-16 bg-black/[0.02] border border-black/8 rounded-12 font-sans text-14 text-black placeholder-black/30 focus:bg-white focus:border-purple-600 focus:outline-none transition-all"
                />
                <Lock className="absolute left-14 top-1/2 -translate-y-1/2 w-16 h-16 text-black/35" />
              </div>
            </div>

            {/* Cloudflare Turnstile Challenge Widget */}
            {turnstileSiteKey && (
              <div className="flex justify-center py-6">
                <div 
                  className="cf-turnstile" 
                  data-sitekey={turnstileSiteKey}
                  data-callback="onTurnstileSuccess"
                  data-expired-callback="onTurnstileExpired"
                  data-theme="light"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-48 bg-black hover:bg-black/90 text-white rounded-12 font-sans font-500 text-14 flex items-center justify-center gap-8 shadow-sm transition-all active:scale-98 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <Loader className="w-16 h-16 animate-spin" />
                  Verifying credentials...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-13 font-sans font-350 text-secondary hover:text-black hover:underline transition-colors"
          >
            &larr; Back to HomiLearn Homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
