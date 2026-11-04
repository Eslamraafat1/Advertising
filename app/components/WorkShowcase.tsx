"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Link from "next/link";

// Production types the studio delivers (descriptions mirror the services copy).
// Real client case studies can replace these cards once they are cleared for publishing.
const IMG = {
  commercial: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
  documentary: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
  post: "https://images.unsplash.com/photo-1574717026530-2e874b7698a8?q=80&w=800&auto=format&fit=crop",
  onGround: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
};

const workShowcase = {
  ar: {
    badge: "✨ أعمالنا",
    title: "مشاريع من إنجاز The Untold Story",
    subtitle: "أفلام، فيديو، إعلانات، أفلام وثائقية، ومحتوى مؤسسي",
    viewAll: "أعمالنا",
    projects: [
      { img: IMG.commercial, category: "إعلانات تجارية", title: "إنتاج الإعلانات التجارية", metric: "من الفكرة إلى التسليم النهائي", color: "#d02225", size: "large" },
      { img: IMG.documentary, category: "أفلام وثائقية", title: "إنتاج الأفلام الوثائقية", metric: "مبنية على البحث", color: "#f59e0b", size: "small" },
      { img: IMG.post, category: "ما بعد الإنتاج", title: "ما بعد الإنتاج والتسليم النهائي", metric: "مونتاج، ألوان، صوت", color: "#10b981", size: "small" },
      { img: IMG.onGround, category: "إنتاج على أرض الواقع", title: "خدمات الإنتاج في مصر", metric: "تصاريح، طاقم، مواقع", color: "#d02225", size: "large" },
    ],
  },
  en: {
    badge: "✨ Our Work",
    title: "Projects done by The Untold Story",
    subtitle: "Film, video, advertising, documentaries, and corporate content",
    viewAll: "Our Work",
    projects: [
      { img: IMG.commercial, category: "Commercials", title: "Commercial Advertising Production", metric: "Concept to final delivery", color: "#d02225", size: "large" },
      { img: IMG.documentary, category: "Documentary", title: "Documentary Production", metric: "Research led", color: "#f59e0b", size: "small" },
      { img: IMG.post, category: "Post Production", title: "Post Production and Final Delivery", metric: "Edit, color, sound", color: "#10b981", size: "small" },
      { img: IMG.onGround, category: "On-Ground", title: "On Ground Production in Egypt", metric: "Permits, crew, locations", color: "#d02225", size: "large" },
    ],
  },
};

export default function WorkShowcase({ locale = "en", title }: { locale?: string; title?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const d = locale === "ar" ? workShowcase.ar : workShowcase.en;
  const displayTitle = title || d.title;

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
                borderRadius: 0,
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
                {displayTitle}
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
              borderRadius: 0,
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
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "auto",
    gap: 24,
  }}
  className="work-bento"
>
  {d.projects.map((proj, i) => {
    // نفس توزيعك الأصلي للـ Grid
    const gridStyles = i === 0
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
        style={{ ...gridStyles }}
        className={`bento-item`}
      >
        <div
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            cursor: "pointer",
            height: "100%",
          }}
        >
          {/* الصورة بتأثير Hover ناعم */}
          <div style={{
            position: "relative",
            width: "100%",
            height: i < 2 ? 340 : 280, // قللت الارتفاع قليلاً عشان نسيب مساحة للكلام
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: hovered === i ? `0 20px 40px ${proj.color}20` : "0 4px 16px rgba(0,0,0,0.08)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <Image
              src={proj.img}
              alt={proj.title}
              fill
              unoptimized
              style={{
                objectFit: "cover",
                transform: hovered === i ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>

          {/* الكلام تحت الصورة بشكل عصري */}
          <div style={{ padding: "0 4px" }}>
            <span style={{
              color: proj.color,
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              display: "block",
              marginBottom: "8px",
            }}>
              {proj.category}
            </span>
            <h3 style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#111",
              marginBottom: "6px",
            }}>
              {proj.title}
            </h3>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: 14,
              fontWeight: 600,
              color: "#666",
            }}>
              <span style={{ color: "#000" }}>{proj.metric}</span>
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
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .bento-item {
            grid-column: span 12 / span 12 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
