"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function HeroCarousel() {
  const { t } = useLanguage();
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
      badge: t.heroData.badge,
      title: t.heroData.headline1,
      titleHighlight: t.heroData.headline2,
      subtitle: t.heroData.quoteBadge,
      desc: t.heroData.subtext,
      cta: t.heroData.cta1.label.replace(" →", "").replace(" ←", ""),
      ctaHref: t.heroData.cta1.href,
      ctaSecondary: t.heroData.cta2.label,
      ctaSecondaryHref: t.heroData.cta2.href,
      gradient: "linear-gradient(160deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.35) 100%)",
    },
    {
      img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop",
      badge: t.homeData.quoteBadge,
      title: t.homeData.quoteTitle.split(".")[0],
      titleHighlight: t.homeData.quoteTitle.split(".")[1]?.trim() || "",
      subtitle: t.homeData.servicesTitle,
      desc: t.homeData.servicesSubtext,
      cta: t.common.contactUs,
      ctaHref: "/contact",
      ctaSecondary: t.heroData.cta2.label,
      ctaSecondaryHref: "/portfolio",
      gradient: "linear-gradient(160deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 100%)",
    },
  ];

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
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo, slides.length]);

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
        borderRadius: 0,
        overflow: "hidden",
        height: "clamp(520px, 75vh, 720px)",
        position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
      }}>
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

        <div style={{
          position: "absolute", inset: 0,
          background: slide.gradient,
          opacity: isAnimating ? 0.6 : 1,
          transition: "opacity 0.6s ease, background 0.8s ease",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(32px, 5vw, 80px)",
          color: "#fff",
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "8px 22px",
            borderRadius: 0,
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

          <h2 style={{
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 12,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(24px)" : "translateY(0)",
            transition: "all 0.55s ease 0.15s",
          }}>
            {slide.title}{" "}
            {slide.titleHighlight && (
              <span style={{
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {slide.titleHighlight}
              </span>
            )}
          </h2>

          <h3 style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
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
            maxWidth: 580,
            lineHeight: 1.8,
            marginBottom: 40,
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(16px)" : "translateY(0)",
            transition: "all 0.55s ease 0.3s",
          }}>
            {slide.desc}
          </p>

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
              borderRadius: 0,
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
              borderRadius: 0,
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
                borderRadius: 0,
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          ))}
        </div>

        <button onClick={prev} className="carousel-nav-btn" style={{
          position: "absolute", top: "50%", right: 24,
          transform: "translateY(-50%)",
          width: 52, height: 52,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "0%",
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
          borderRadius: "0%",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s ease",
        }}>
          ›
        </button>

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
