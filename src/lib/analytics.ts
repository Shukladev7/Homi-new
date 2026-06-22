// Increment the view counter in database via API
export async function recordDbPostView(postId: string) {
  try {
    await fetch(`/api/blog-views/${postId}`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Error recording view in database:", error);
  }
}

// Safely send events to Google Analytics
export function trackGoogleAnalyticsEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
) {
  if (typeof window !== "undefined") {
    const globalWindow = window as any;
    if (typeof globalWindow.gtag === "function") {
      globalWindow.gtag("event", eventName, eventParams);
    } else {
      // Fallback log in development
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Analytics Event] ${eventName}:`, eventParams);
      }
    }
  }
}

// Track Article read event
export function trackArticleRead(slug: string, title: string) {
  trackGoogleAnalyticsEvent("article_read", {
    article_slug: slug,
    article_title: title,
    category: "Blog",
  });
}

// Track CTA clicks from within the blog
export function trackBlogCtaClick(ctaName: string, destination: string) {
  trackGoogleAnalyticsEvent("blog_cta_click", {
    cta_name: ctaName,
    destination: destination,
  });
}
