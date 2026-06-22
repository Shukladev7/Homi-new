import type { Metadata } from "next";
import InternalLayout from "@/components/interior/InternalLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing – Free AI Tutor & Affordable Personalized Learning Plans",
  description:
    "HomiLearn pricing: Start free with 20 AI conversations per month, or unlock unlimited personalized learning for ₹299/month. School and institution plans available.",
  alternates: {
    canonical: "https://www.homilearn.com/pricing",
  },
  openGraph: {
    title: "HomiLearn Pricing – Start Free, Learn Smarter",
    description:
      "Free starter plan available. Unlock full adaptive learning, unlimited conversations, and parent insights for ₹299/month.",
    url: "https://www.homilearn.com/pricing",
  },
};

const plans = [
  {
    name: "Free Starter",
    price: "₹0",
    period: "",
    description: "Get started with AI-powered learning support.",
    features: [
      "20 Homi conversations per month",
      "NCERT support",
      "Limited adaptive learning",
      "3 AI Viva sessions per month",
      "Basic parent dashboard",
      "Chatbot support",
    ],
    ctaText: "Start Free",
    featured: false,
  },
  {
    name: "HomiLearn Plus",
    price: "₹299",
    period: "/ month",
    description: "Everything students and parents need for personalized learning.",
    badge: "Most Popular",
    features: [
      "Unlimited Homi conversations",
      "Full adaptive learning engine",
      "NCERT + Gujarat Board + ICSE",
      "Unlimited AI Viva sessions",
      "Full parent dashboard & alerts",
      "Personalized study plans",
      "Offline learning mode",
      "Priority email support",
    ],
    ctaText: "Start Learning",
    featured: true,
  },
  {
    name: "School / Institution",
    price: "Custom",
    period: "",
    description: "Designed for classrooms, schools, and coaching institutes.",
    features: [
      "Unlimited student access",
      "Full adaptive learning",
      "All supported boards",
      "Unlimited AI Viva sessions",
      "Teacher portal & AI tools",
      "Institution analytics",
      "Full parent dashboards",
      "Dedicated account support",
    ],
    ctaText: "Contact Sales",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <InternalLayout>
      {/* Hero */}
      <section className="pt-60 800:pt-90 pb-40 800:pb-60 px-24 800:px-40 text-center">
        <div className="max-w-[700px] mx-auto flex flex-col gap-16 items-center section-header">
          <span className="text-12 font-mono uppercase tracking-wider text-secondary">
            Simple Pricing
          </span>
          <h1 className="font-serif font-700 text-32 800:text-48 tracking-tight text-black leading-tight">
            Choose The Right Learning Journey
          </h1>
          <p className="text-16 800:text-18 leading-relaxed text-secondary font-sans font-350 max-w-[55ch]">
            Start free, unlock personalized learning, or bring HomiLearn to your entire school. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 800:py-40 px-24 800:px-40" aria-labelledby="pricing-plans-heading">
        <h2 id="pricing-plans-heading" className="sr-only">Available Plans</h2>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 800:grid-cols-3 gap-24 items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-24 p-32 800:p-36 ${
                plan.featured
                  ? "bg-white border-2 border-solid border-purple-200/60 shadow-lg"
                  : "bg-white/60 border border-solid border-black/5"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-10 font-sans font-600 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full uppercase tracking-wider shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <h3 className="font-serif text-20 font-650 text-black mb-12">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-4 mb-16">
                  <span className="text-36 800:text-40 font-serif font-700 tracking-tight text-black">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-13 font-sans font-400 text-black/50">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-14 font-sans font-350 text-secondary leading-relaxed mb-24 border-b border-black/5 pb-20">
                  {plan.description}
                </p>
                <ul className="flex flex-col gap-10 mb-32">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-10 text-13 text-black/85 leading-relaxed"
                    >
                      <span className="text-purple-500 font-bold flex-shrink-0 mt-[2px]" aria-hidden="true">
                        ✓
                      </span>
                      <span className="font-sans font-350">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#cta"
                className={`w-full h-48 rounded-14 font-sans font-500 text-14 flex items-center justify-center transition-all duration-200 ${
                  plan.featured
                    ? "bg-black text-white hover:bg-black/85 shadow-sm"
                    : "bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5"
                }`}
              >
                {plan.ctaText}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Microcopy */}
      <div className="text-center py-20 px-24">
        <p className="text-12 font-sans text-black/60 flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          <span>No hidden fees.</span>
          <span>Cancel anytime.</span>
          <span>Built for students, trusted by parents.</span>
        </p>
      </div>

      {/* FAQ CTA */}
      <section className="py-40 800:py-60 px-24 800:px-40 bg-white text-center">
        <div className="max-w-[500px] mx-auto flex flex-col gap-16 items-center">
          <h2 className="font-serif font-650 text-22 800:text-28 tracking-tight text-black">
            Have Questions?
          </h2>
          <p className="text-14 text-secondary font-sans font-350">
            Visit our FAQ or reach out to our support team for help choosing the right plan.
          </p>
          <div className="flex flex-col 600:flex-row gap-12 items-center">
            <Link
              href="/#faq"
              className="h-44 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-14 px-24 flex items-center justify-center transition-all duration-200"
            >
              Read FAQs
            </Link>
            <a
              href="mailto:support@homilearn.com"
              className="h-44 rounded-14 bg-[#EBEBEB]/70 text-black border border-black/5 hover:bg-black/5 font-sans font-500 text-14 px-24 flex items-center justify-center transition-all duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </InternalLayout>
  );
}
