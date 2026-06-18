"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const heroSlides = {
  ar: [
    {
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
      badge: "🚀 التسويق الرقمي",
      title: "نبني علامتك",
      titleHighlight: "التجارية",
      subtitle: "بإبداع لا حدود له",
      desc: "استراتيجيات تسويقية مبتكرة تحوّل أحلامك إلى نتائج قابلة للقياس",
      cta: "ابدأ رحلتك",
      ctaHref: "/contact",
      ctaSecondary: "اكتشف أعمالنا",
      ctaSecondaryHref: "/portfolio",
      gradient: "linear-gradient(160deg, #dc252876 0%, #00000068 50%, #00000067 100%)",
      accentColor: "#6366f1",
    },
    {
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
      badge: "🎨 الهوية البصرية",
      title: "هوية بصرية",
      titleHighlight: "استثنائية",
      subtitle: "تعكس جوهر علامتك",
      desc: "نصمم هويات بصرية متكاملة تترك انطباعاً لا يُنسى في ذهن جمهورك",
      cta: "احصل على هويتك",
      ctaHref: "/services",
      ctaSecondary: "شاهد الأعمال",
      ctaSecondaryHref: "/portfolio",
      gradient: "linear-gradient(135deg, rgba(245,158,11,0.85) 0%, rgba(239,68,68,0.7) 50%, rgba(0,0,0,0.3) 100%)",
      accentColor: "#f59e0b",
    },
    {
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1400&auto=format&fit=crop",
      badge: "📱 السوشيال ميديا",
      title: "محتوى يشعل",
      titleHighlight: "التفاعل",
      subtitle: "ويبني المجتمعات",
      desc: "نُدير حساباتك على السوشيال ميديا بأسلوب احترافي يضاعف متابعيك ومبيعاتك",
      cta: "ادِر حساباتك",
      ctaHref: "/services",
      ctaSecondary: "تعرف علينا",
      ctaSecondaryHref: "/about",
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.85) 0%, rgba(6,182,212,0.7) 50%, rgba(0,0,0,0.3) 100%)",
      accentColor: "#10b981",
    },
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      badge: "📊 تحليل البيانات",
      title: "قرارات مبنية",
      titleHighlight: "على البيانات",
      subtitle: "لنتائج مضمونة",
      desc: "نحلل بياناتك ونحوّلها إلى استراتيجيات نمو قابلة للتطبيق وذات عائد استثمار مرتفع",
      cta: "ابدأ التحليل",
      ctaHref: "/contact",
      ctaSecondary: "اعرف أكثر",
      ctaSecondaryHref: "/about",
      gradient: "linear-gradient(160deg, #dc252876 0%, #00000068 50%, #00000067 100%)",
      accentColor: "#8b5cf6",
    },
  ],
  en: [
    {
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
      badge: "🚀 Digital Marketing",
      title: "We Build Your",
      titleHighlight: "Brand",
      subtitle: "With Unlimited Creativity",
      desc: "Innovative marketing strategies that turn your vision into measurable growth",
      cta: "Start Your Journey",
      ctaHref: "/contact",
      ctaSecondary: "Explore Our Work",
      ctaSecondaryHref: "/portfolio",
      gradient: "linear-gradient(160deg, #dc252876 0%, #00000068 50%, #00000067 100%)",
      accentColor: "#6366f1",
    },
    {
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
      badge: "🎨 Brand Identity",
      title: "Exceptional",
      titleHighlight: "Visual Identity",
      subtitle: "That reflects your brand essence",
      desc: "We design comprehensive visual identities that leave a lasting impression",
      cta: "Get Your Identity",
      ctaHref: "/services",
      ctaSecondary: "See Our Work",
      ctaSecondaryHref: "/portfolio",
      gradient: "linear-gradient(135deg, rgba(245,158,11,0.85) 0%, rgba(239,68,68,0.7) 50%, rgba(0,0,0,0.3) 100%)",
      accentColor: "#f59e0b",
    },
    {
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1400&auto=format&fit=crop",
      badge: "📱 Social Media",
      title: "Content that",
      titleHighlight: "Drives Engagement",
      subtitle: "And builds loyal communities",
      desc: "We manage your social channels professionally to boost followers and sales",
      cta: "Grow Your Reach",
      ctaHref: "/services",
      ctaSecondary: "Learn About Us",
      ctaSecondaryHref: "/about",
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.85) 0%, rgba(6,182,212,0.7) 50%, rgba(0,0,0,0.3) 100%)",
      accentColor: "#10b981",
    },
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      badge: "📊 Data Analysis",
      title: "Decisions Built",
      titleHighlight: "On Data",
      subtitle: "For guaranteed results",
      desc: "We analyze your data and convert it into actionable growth strategies with high ROI",
      cta: "Start Analysis",
      ctaHref: "/contact",
      ctaSecondary: "Learn More",
      ctaSecondaryHref: "/about",
      gradient: "linear-gradient(160deg, #dc252876 0%, #00000068 50%, #00000067 100%)",
      accentColor: "#8b5cf6",
    },
  ],
};

export default function HeroCarousel() {
  const { locale } = useLanguage();
  const slides = locale === "ar" ? heroSlides.ar : heroSlides.en;
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback((index: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section style={{ padding: "24px", position: "relative" }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        borderRadius: 32,
        overflow: "hidden",
        height: "clamp(520px, 75vh, 720px)",
        position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute", inset: 0,
          transform: isAnimating
            ? direction === "next" ? "scale(1.08)" : "scale(0.95)"
            : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: slide.gradient,
          opacity: isAnimating ? 0.6 : 1,
          transition: "opacity 0.6s ease, background 0.8s ease",
        }} />

        {/* Animated Particles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[...Array(8)].map((_, i) => {
            const size = ((i * 13 + 5) % 6) + 3;
            return (
              <div key={i} style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                background: "rgba(255,255,255,0.4)",
                borderRadius: "50%",
                top: `${10 + i * 11}%`,
                left: `${5 + i * 12}%`,
                animation: `float-particle ${3 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }} />
            );
          })}
        </div>

        {/* Content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(32px, 5vw, 80px)",
          color: "#fff",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "8px 22px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 28,
            width: "fit-content",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(-16px)" : "translateY(0)",
            transition: "all 0.5s ease 0.1s",
          }}>
            {slide.badge}
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 12,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(24px)" : "translateY(0)",
            transition: "all 0.55s ease 0.15s",
          }}>
            {slide.title}{" "}
            <span style={{
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "underline",
              textDecorationColor: "rgba(255,255,255,0.4)",
              textUnderlineOffset: 8,
            }}>
              {slide.titleHighlight}
            </span>
          </h2>

          <h3 style={{
            fontSize: "clamp(1.3rem, 3vw, 2.4rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 20,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(20px)" : "translateY(0)",
            transition: "all 0.55s ease 0.22s",
          }}>
            {slide.subtitle}
          </h3>

          <p style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(255,255,255,0.8)",
            maxWidth: 540,
            lineHeight: 1.8,
            marginBottom: 40,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(16px)" : "translateY(0)",
            transition: "all 0.55s ease 0.3s",
          }}>
            {slide.desc}
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(12px)" : "translateY(0)",
            transition: "all 0.55s ease 0.38s",
          }}>
            <Link href={slide.ctaHref} className="carousel-btn-primary" style={{
              textDecoration: "none",
              background: "#fff",
              color: "#1e1b4b",
              padding: "14px 32px",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: 15.5,
              display: "inline-block",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              transition: "all 0.25s ease",
            }}>
              {slide.cta} →
            </Link>
            <Link href={slide.ctaSecondaryHref} className="carousel-btn-secondary" style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 15.5,
              border: "2px solid rgba(255,255,255,0.35)",
              display: "inline-block",
              transition: "all 0.25s ease",
            }}>
              {slide.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Slide Counter */}
        <div style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              style={{
                width: i === current ? 32 : 10,
                height: 10,
                borderRadius: 100,
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>

        {/* Nav Arrows */}
        <button onClick={prev} className="carousel-nav-btn" style={{
          position: "absolute", top: "50%", right: 24,
          transform: "translateY(-50%)",
          width: 52, height: 52,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          ‹
        </button>
        <button onClick={next} className="carousel-nav-btn" style={{
          position: "absolute", top: "50%", left: 24,
          transform: "translateY(-50%)",
          width: 52, height: 52,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          ›
        </button>

        {/* Progress Bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0,
          height: 3,
          background: "rgba(255,255,255,0.25)",
          width: "100%",
        }}>
          <div style={{
            height: "100%",
            background: "#fff",
            width: `${((current + 1) / slides.length) * 100}%`,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          from { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          to { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        .carousel-btn-primary:hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 14px 36px rgba(0,0,0,0.35) !important;
        }
        .carousel-btn-secondary:hover {
          background: rgba(255,255,255,0.28) !important;
          transform: translateY(-3px) !important;
        }
        .carousel-nav-btn:hover {
          background: rgba(255,255,255,0.35) !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media (max-width: 640px) {
          .carousel-nav-btn { display: none !important; }
        }
      `}</style>
    </section>
  );
}
