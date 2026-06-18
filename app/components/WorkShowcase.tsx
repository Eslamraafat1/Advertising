"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Link from "next/link";

const workShowcase = {
  ar: {
    badge: "✨ أحدث أعمالنا",
    title: "إبداع يتجاوز التوقعات",
    subtitle: "نماذج من مشاريعنا الناجحة في مختلف المجالات",
    viewAll: "عرض جميع الأعمال",
    projects: [
      {
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        category: "الإعلان الرقمي",
        title: "حملة النخبة 2024",
        metric: "+240% مبيعات",
        color: "#6366f1",
        size: "large",
      },
      {
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
        category: "الهوية البصرية",
        title: "ركاز العقارية",
        metric: "هوية متكاملة",
        color: "#f59e0b",
        size: "small",
      },
      {
        img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
        category: "السوشيال ميديا",
        title: "مطاعم جورميه",
        metric: "+45k متابع",
        color: "#10b981",
        size: "small",
      },
      {
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        category: "إنتاج الفيديو",
        title: "تطبيق مسار",
        metric: "3.5M مشاهدة",
        color: "#8b5cf6",
        size: "large",
      },
    ],
  },
  en: {
    badge: "✨ Latest Work",
    title: "Creativity Beyond Expectations",
    subtitle: "Samples from our successful projects across various industries",
    viewAll: "View All Projects",
    projects: [
      {
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        category: "Digital Ads",
        title: "Al-Nokhba Campaign 2024",
        metric: "+240% Sales",
        color: "#6366f1",
        size: "large",
      },
      {
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
        category: "Brand Identity",
        title: "Rikaz Real Estate",
        metric: "Full Identity",
        color: "#f59e0b",
        size: "small",
      },
      {
        img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
        category: "Social Media",
        title: "Gourmet Restaurants",
        metric: "+45k Followers",
        color: "#10b981",
        size: "small",
      },
      {
        img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        category: "Video Production",
        title: "Masar App",
        metric: "3.5M Views",
        color: "#8b5cf6",
        size: "large",
      },
    ],
  },
};

export default function WorkShowcase({ locale = "ar" }: { locale?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const d = locale === "ar" ? workShowcase.ar : workShowcase.en;

  return (
    <section style={{
      padding: "110px 24px",
      background: "var(--bg)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
          <div>
            <Reveal direction="down">
              <span style={{
                display: "inline-block",
                background: "var(--primary-light)",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 20px",
                borderRadius: 100,
                marginBottom: 16,
              }}>
                {d.badge}
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text)",
                marginBottom: 12,
              }}>
                {d.title}
              </h2>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 420 }}>
                {d.subtitle}
              </p>
            </Reveal>
          </div>
          <Reveal direction="left" delay={200}>
            <Link href="/portfolio" style={{
              textDecoration: "none",
              background: "var(--primary)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
              boxShadow: "0 4px 16px rgba(99,102,241,0.25)",
            }}
            className="showcase-view-all"
            >
              {d.viewAll} →
            </Link>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto",
          gap: 20,
        }}
        className="work-bento"
        >
          {d.projects.map((proj, i) => {
            const isLarge = proj.size === "large";
            const gridStyles: React.CSSProperties = i === 0
              ? { gridColumn: "1 / 8", gridRow: "1" }
              : i === 1
              ? { gridColumn: "8 / 13", gridRow: "1" }
              : i === 2
              ? { gridColumn: "1 / 6", gridRow: "2" }
              : { gridColumn: "6 / 13", gridRow: "2" };

             return (
              <Reveal
                key={i}
                direction="up"
                delay={i * 100}
                style={{
                  ...gridStyles,
                  height: i < 2 ? 420 : 360,
                }}
                className={`bento-item bento-item-${i}`}
              >
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "relative",
                    borderRadius: 24,
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    boxShadow: hovered === i
                      ? `0 24px 60px ${proj.color}30`
                      : "0 4px 16px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.4s ease",
                  }}
                >
                  <Image
                    src={proj.img}
                    alt={proj.title}
                    fill
                    unoptimized
                    style={{
                      objectFit: "cover",
                      transform: hovered === i ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  {/* Overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, ${proj.color}dd 0%, transparent 60%)`,
                    opacity: hovered === i ? 1 : 0.7,
                    transition: "opacity 0.4s ease",
                  }} />

                  {/* Content */}
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "28px 28px",
                    transform: hovered === i ? "translateY(0)" : "translateY(8px)",
                    transition: "transform 0.4s ease",
                  }}>
                    <span style={{
                      background: "rgba(255,255,255,0.2)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      padding: "4px 14px",
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: 10,
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}>
                      {proj.category}
                    </span>
                    <h3 style={{
                      fontSize: isLarge ? 22 : 18,
                      fontWeight: 900,
                      color: "#fff",
                      marginBottom: 8,
                    }}>
                      {proj.title}
                    </h3>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      padding: "5px 14px",
                      borderRadius: 100,
                      fontSize: 13,
                      fontWeight: 700,
                      opacity: hovered === i ? 1 : 0,
                      transition: "opacity 0.3s ease 0.1s",
                    }}>
                      📈 {proj.metric}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        .showcase-view-all:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.4) !important;
        }
        @media (max-width: 900px) {
          .work-bento {
            display: grid !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-item-0, .bento-item-1, .bento-item-2, .bento-item-3 {
            grid-column: 1 !important;
            grid-row: auto !important;
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
