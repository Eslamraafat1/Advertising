"use client";

import { useState } from "react";
import Link from "next/link";

const plans = {
  ar: [
    {
      name: "أساسي",
      badge: "",
      price: "2,999",
      period: "/ شهر",
      currency: "ر.س",
      desc: "مثالي للشركات الناشئة والمشاريع الصغيرة",
      color: "#e9292c",
      features: [
        "إدارة 2 منصة سوشيال ميديا",
        "تصميم 8 منشورات شهرياً",
        "تقرير أداء شهري",
        "دعم عبر البريد الإلكتروني",
        "استشارة شهرية واحدة",
      ],
      unavailable: [
        "إعلانات مدفوعة",
        "إنتاج فيديو",
        "تحليل المنافسين",
      ],
      cta: "ابدأ الآن",
      popular: false,
    },
    {
      name: "احترافي",
      badge: "⭐ الأكثر طلباً",
      price: "6,999",
      period: "/ شهر",
      currency: "ر.س",
      desc: "للشركات المتوسطة التي تسعى للنمو السريع",
      color: "#fff",
      features: [
        "إدارة 5 منصات سوشيال ميديا",
        "تصميم 25 منشور شهرياً",
        "إعلانات مدفوعة (حتى 10,000 ر.س)",
        "تقارير أداء أسبوعية",
        "إنتاج 2 فيديو قصير",
        "تحليل المنافسين",
        "استشارات غير محدودة",
      ],
      unavailable: [],
      cta: "ابدأ الآن",
      popular: true,
    },
    {
      name: "مؤسسي",
      badge: "",
      price: "14,999",
      period: "/ شهر",
      currency: "ر.س",
      desc: "حلول متكاملة للمؤسسات والشركات الكبرى",
      color: "#e9292c",
      features: [
        "إدارة جميع المنصات",
        "محتوى غير محدود",
        "إعلانات مدفوعة (حتى 50,000 ر.س)",
        "إنتاج فيديو احترافي (4 فيديوهات)",
        "هوية بصرية متكاملة",
        "مدير حساب مخصص",
        "دعم 24/7",
        "تقارير يومية",
      ],
      unavailable: [],
      cta: "تواصل معنا",
      popular: false,
    },
  ],
  en: [
    {
      name: "Starter",
      badge: "",
      price: "799",
      period: "/ month",
      currency: "$",
      desc: "Perfect for startups and small businesses",
      color: "#e9292c",
      features: [
        "2 Social Media Platforms",
        "8 Monthly Post Designs",
        "Monthly Performance Report",
        "Email Support",
        "1 Monthly Consultation",
      ],
      unavailable: ["Paid Ads", "Video Production", "Competitor Analysis"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      badge: "⭐ Most Popular",
      price: "1,999",
      period: "/ month",
      currency: "$",
      desc: "For growing businesses that want fast results",
      color: "#fff",
      features: [
        "5 Social Media Platforms",
        "25 Monthly Post Designs",
        "Paid Ads (up to $3,000 budget)",
        "Weekly Performance Reports",
        "2 Short Videos",
        "Competitor Analysis",
        "Unlimited Consultations",
      ],
      unavailable: [],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "",
      price: "4,999",
      period: "/ month",
      currency: "$",
      desc: "Full-scale solutions for large organizations",
      color: "#e9292c",
      features: [
        "All Platforms",
        "Unlimited Content",
        "Paid Ads (up to $15,000 budget)",
        "Professional Video Production (4 videos)",
        "Complete Brand Identity",
        "Dedicated Account Manager",
        "24/7 Support",
        "Daily Reports",
      ],
      unavailable: [],
      cta: "Contact Us",
      popular: false,
    },
  ],
};

export default function PricingSection({ locale = "ar" }: { locale?: string }) {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const activePlans = locale === "ar" ? plans.ar : plans.en;

  return (
    <section style={{
      padding: "110px 24px",
      background: "linear-gradient(180deg, var(--bg-muted) 0%, var(--bg) 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* BG decoration */}
      <div style={{
        position: "absolute", top: -100, right: -150,
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
        borderRadius: "0%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{
            display: "inline-block",
            background: "var(--accent-light)",
            color: "#92400e",
            fontWeight: 700,
            fontSize: 13,
            padding: "6px 20px",
            borderRadius: 0,
            marginBottom: 20,
          }}>
            {locale === "ar" ? "💰 باقاتنا الاحترافية" : "💰 Our Packages"}
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: 16,
          }}>
            {locale === "ar" ? "اختر الباقة المناسبة لنمو أعمالك" : "Choose the Right Plan for Your Growth"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16.5, maxWidth: 500, margin: "0 auto" }}>
            {locale === "ar"
              ? "باقات مرنة وشاملة تتناسب مع احتياجات كل مشروع وميزانيته"
              : "Flexible and comprehensive packages tailored to every project size"}
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28,
          alignItems: "start",
        }}>
          {activePlans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card ${plan.popular ? "pricing-card-popular" : ""}`}
              style={{
                background: plan.popular
                  ? "#0a0a0a"
                  : "var(--bg-card)",
                borderRadius: 0,
                padding: "44px 36px",
                border: plan.popular ? "none" : "1.5px solid var(--border)",
                borderLeft: plan.popular ? "3px solid var(--primary)" : undefined,
                boxShadow: plan.popular
                  ? "0 24px 60px rgba(0,0,0,0.4)"
                  : "var(--shadow-sm)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Popular glow */}
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "0%",
                }} />
              )}

              {plan.badge && (
                <div style={{
                  display: "inline-block",
                  background: plan.popular ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                  color: plan.popular ? "#fff" : "var(--primary)",
                  padding: "5px 16px",
                  borderRadius: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 20,
                  border: plan.popular ? "1px solid rgba(255,255,255,0.3)" : "none",
                }}>
                  {plan.badge}
                </div>
              )}

              <h3 style={{
                fontSize: 22,
                fontWeight: 900,
                color: plan.popular ? "#fff" : "var(--text)",
                marginBottom: 8,
              }}>
                {plan.name}
              </h3>
              <p style={{
                fontSize: 13.5,
                color: plan.popular ? "rgba(255,255,255,0.75)" : "var(--text-muted)",
                marginBottom: 28,
              }}>
                {plan.desc}
              </p>

              <div style={{ marginBottom: 36 }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: plan.popular ? "rgba(255,255,255,0.8)" : "var(--text-muted)",
                }}>
                  {plan.currency}
                </span>
                <span style={{
                  fontSize: "clamp(2.4rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: plan.popular ? "#fff" : "var(--primary)",
                  margin: "0 4px",
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontSize: 14,
                  color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                }}>
                  {plan.period}
                </span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, marginBottom: 36 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "9px 0",
                    fontSize: 14.5,
                    color: plan.popular ? "rgba(255,255,255,0.9)" : "var(--text)",
                    borderBottom: j < plan.features.length - 1
                      ? `1px solid ${plan.popular ? "rgba(255,255,255,0.1)" : "var(--border)"}`
                      : "none",
                  }}>
                    <span style={{
                      width: 22, height: 22,
                      background: plan.popular ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                      color: plan.popular ? "#fff" : "var(--primary)",
                      borderRadius: "0%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, flexShrink: 0, fontWeight: 700,
                    }}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.unavailable.map((f, j) => (
                  <li key={`u-${j}`} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "9px 0",
                    fontSize: 14.5,
                    color: "var(--text-light)",
                    opacity: 0.5,
                    borderBottom: j < plan.unavailable.length - 1 ? "1px solid var(--border)" : "none",
                  }}>
                    <span style={{
                      width: 22, height: 22,
                      background: "var(--bg-muted)",
                      borderRadius: "0%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, flexShrink: 0,
                    }}>✕</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/contact" style={{
                textDecoration: "none",
                display: "block",
                textAlign: "center",
                padding: "15px 24px",
                borderRadius: 0,
                fontWeight: 800,
                fontSize: 16,
                background: plan.popular
                  ? "var(--primary)"
                  : "#0a0a0a",
                color: "#fff",
                boxShadow: plan.popular
                  ? "0 8px 24px rgba(233,41,44,0.3)"
                  : "0 4px 14px rgba(0,0,0,0.2)",
                transition: "all 0.25s ease",
                border: plan.popular ? "2px solid var(--primary)" : "2px solid #0a0a0a",
              }}
              className="pricing-cta"
              >
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0,0,0,0.2) !important;
        }
        .pricing-card-popular {
          transform: scale(1.04);
          z-index: 2;
        }
        .pricing-card:not(.pricing-card-popular):hover {
          transform: translateY(-8px);
          border-color: var(--primary) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important;
        }
        .pricing-card-popular:hover {
          transform: scale(1.06) translateY(-4px);
          box-shadow: 0 30px 70px rgba(99,102,241,0.45) !important;
        }
        @media (max-width: 768px) {
          .pricing-card-popular {
            transform: scale(1) !important;
          }
          .pricing-card-popular:hover {
            transform: translateY(-4px) !important;
          }
        }
      `}</style>
    </section>
  );
}
