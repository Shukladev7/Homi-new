const siteUrl = "https://www.homilearn.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HomiLearn",
  url: siteUrl,
  logo: `${siteUrl}/logo1.png`,
  description:
    "AI-powered personalized learning platform for Indian students in Classes VI–XII across CBSE, ICSE, NCERT, and state boards.",
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/homilearn",
    "https://linkedin.com/company/homilearn",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@homilearn.com",
    contactType: "customer support",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HomiLearn",
  url: siteUrl,
  description:
    "AI tutor and personalized learning companion for CBSE, ICSE, and NCERT students in Classes VI–XII.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HomiLearn",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      name: "Free Starter",
      description: "Get started with AI-powered learning support.",
    },
    {
      "@type": "Offer",
      price: "299",
      priceCurrency: "INR",
      name: "HomiLearn Plus",
      description:
        "Everything students and parents need for personalized learning.",
      priceValidUntil: "2026-12-31",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1200",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "AI-powered learning companion that provides personalized explanations, adaptive learning, doubt solving, viva preparation, and parent insights for students across CBSE, ICSE, and NCERT boards.",
  featureList: [
    "Personalized AI tutoring",
    "Adaptive learning engine",
    "AI doubt solving",
    "AI viva preparation",
    "Learning gap detection",
    "Parent insights dashboard",
    "AI lesson plan generator for teachers",
    "AI worksheet and quiz generator",
    "Multi-board support (CBSE, ICSE, NCERT, State Boards)",
    "Classes VI–XII coverage",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI tutor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI tutor is an intelligent learning companion that uses artificial intelligence to provide personalized explanations, adapt to your learning pace, identify knowledge gaps, and help you master concepts through interactive conversations. HomiLearn's AI tutor is specifically designed for Indian students in Classes VI–XII.",
      },
    },
    {
      "@type": "Question",
      name: "How does adaptive learning work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adaptive learning uses AI to analyze your strengths, weaknesses, and learning patterns. HomiLearn's adaptive engine continuously adjusts difficulty levels, explanation styles, and practice recommendations based on your performance, ensuring you focus on areas that need the most attention.",
      },
    },
    {
      "@type": "Question",
      name: "Can HomiLearn identify learning gaps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HomiLearn's AI analyzes your responses and study patterns to detect weak foundations and missing concepts. It traces knowledge gaps back to their root cause and creates targeted practice paths to rebuild understanding before gaps become bigger academic struggles.",
      },
    },
    {
      "@type": "Question",
      name: "Is HomiLearn suitable for CBSE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. HomiLearn is fully aligned with the CBSE curriculum for Classes VI–XII. It covers all subjects chapter-wise, follows NCERT guidelines, and provides exam-oriented practice tailored to CBSE board examination patterns.",
      },
    },
    {
      "@type": "Question",
      name: "Does HomiLearn support ICSE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HomiLearn supports the ICSE curriculum with subject-specific content, chapter-wise coverage, and adaptive learning aligned to ICSE board standards for students in Classes VI–XII.",
      },
    },
    {
      "@type": "Question",
      name: "Can HomiLearn help with NCERT concepts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HomiLearn is built with deep NCERT alignment. It covers every chapter from NCERT textbooks, provides detailed explanations of concepts, and offers practice questions that follow NCERT patterns for all supported classes.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI viva preparation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HomiLearn's AI viva prep simulates real oral exam scenarios. Students practice answering questions verbally, and the AI provides real-time feedback on confidence, clarity, pace, filler word usage, and content accuracy — helping students speak with authority, not just write well.",
      },
    },
    {
      "@type": "Question",
      name: "Can teachers create lesson plans with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HomiLearn provides a powerful AI lesson plan generator that creates standards-aligned, classroom-ready lesson plans for any grade, subject, or curriculum in minutes. Teachers can customize objectives, activities, assessments, and homework assignments.",
      },
    },
    {
      "@type": "Question",
      name: "Can teachers generate quizzes and worksheets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HomiLearn includes AI-powered worksheet and quiz generators that create differentiated, print-ready materials instantly. Teachers can set difficulty levels, question types, and topics — saving hours of manual preparation every week.",
      },
    },
    {
      "@type": "Question",
      name: "What boards does HomiLearn support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HomiLearn supports 10+ Indian education boards including CBSE, ICSE, NCERT, GSEB (Gujarat Board), RBSE (Rajasthan Board), Maharashtra Board, UP Board, Karnataka Board, Tamil Nadu Board, Kerala Board, MP Board, Andhra Pradesh Board, Telangana Board, and Punjab Board.",
      },
    },
  ],
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
