"use client";

import { Link2 } from "lucide-react";

interface ShareButtonsProps {
  shareUrl: string;
  shareText: string;
}

export default function ShareButtons({ shareUrl, shareText }: ShareButtonsProps) {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      // Decode URL before copying to make it readable
      const decodedUrl = window.location.href;
      navigator.clipboard.writeText(decodedUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-row 1000:flex-col gap-10 bg-white/40 border border-black/5 rounded-20 p-16 1000:p-20 justify-center 1000:justify-start items-center 1000:items-start w-full">
      <span className="text-10 font-mono uppercase tracking-wider text-black/50 font-semibold hidden 1000:block mb-4">
        Share Article
      </span>
      <div className="flex 1000:flex-col gap-12">
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-36 h-36 rounded-10 bg-white border border-black/8 hover:bg-black/5 flex items-center justify-center transition-all"
          title="Share on X"
        >
          <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-36 h-36 rounded-10 bg-white border border-black/8 hover:bg-black/5 flex items-center justify-center transition-all text-[#0077b5]"
          title="Share on LinkedIn"
        >
          <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-36 h-36 rounded-10 bg-white border border-black/8 hover:bg-black/5 flex items-center justify-center transition-all text-[#1877f2]"
          title="Share on Facebook"
        >
          <svg className="w-14 h-14 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        </a>
        <button
          onClick={handleCopyLink}
          className="w-36 h-36 rounded-10 bg-white border border-black/8 hover:bg-black/5 flex items-center justify-center transition-all cursor-pointer"
          title="Copy Link"
        >
          <Link2 className="w-14 h-14" />
        </button>
      </div>
    </div>
  );
}
