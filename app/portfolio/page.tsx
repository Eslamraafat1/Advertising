"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";

// Production types the studio delivers. Descriptions mirror the services copy;
// no client names, budgets or results are shown because none are published yet.
const projects = {
  ar: [
    { id: 1, title: "إنتاج الإعلانات التجارية", category: "commercial", summary: "إعلانات وأفلام حملات عالية التأثير من الفكرة إلى التصوير والتسليم النهائي.", label: "إعلانات وأفلام حملات", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "إنتاج الأفلام الوثائقية", category: "documentary", summary: "أفلام وثائقية وسلاسل مبنية على البحث للمنصات والقنوات والمؤسسات.", label: "أفلام وسلاسل وثائقية", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "المحتوى المؤسسي والصناعي", category: "corporate", summary: "أفلام مؤسسية واضحة وموثوقة للنفط والغاز والتعليم والعقارات والصناعات المعقدة.", label: "أفلام مؤسسية", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "تغطية الفعاليات والإنتاج المباشر", category: "live", summary: "تغطية متعددة الكاميرات، بث مباشر، طائرات بدون طيار، ومونتاج في نفس اليوم للمؤتمرات والإطلاقات والحفلات.", label: "فعاليات وبث مباشر", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "ما بعد الإنتاج والتسليم النهائي", category: "post", summary: "مونتاج، ألوان، صوت، mastering، ونسخ متعددة الصيغ تلبي مواصفات المنصات والبث.", label: "مونتاج وتشطيب", img: "https://images.unsplash.com/photo-1574717026530-2e874b7698a8?q=80&w=600&auto=format&fit=crop" },
    { id: 6, title: "الدبلجة والتعليق الصوتي والتعريب", category: "post", summary: "ترجمة، تعليق صوتي، دبلجة، ADR، وتعبئة متعددة اللغات وفق معايير التسليم.", label: "تعريب", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop" },
  ],
  en: [
    { id: 1, title: "Commercial Advertising Production", category: "commercial", summary: "High impact commercials and campaign films from concept to filming and final delivery.", label: "Commercials & campaign films", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Documentary Production", category: "documentary", summary: "Research led documentaries and doc series built for platforms, broadcasters, and institutions.", label: "Documentaries & doc series", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Corporate and Industrial Content", category: "corporate", summary: "Clear, credible corporate films for oil and gas, education, real estate, and complex industries.", label: "Corporate films", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "Event Coverage and Live Production", category: "live", summary: "Multi camera coverage, live streaming, drone, and same day edits for conferences, launches, and concerts.", label: "Events & live", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "Post Production and Final Delivery", category: "post", summary: "Editing, color, sound, mastering, and multi format versions that meet platform and broadcast specs.", label: "Editing & finishing", img: "https://images.unsplash.com/photo-1574717026530-2e874b7698a8?q=80&w=600&auto=format&fit=crop" },
    { id: 6, title: "Dubbing, Voice Over and Localization", category: "post", summary: "Subtitles, voice over, dubbing, ADR, and multi language packaging aligned with delivery standards.", label: "Localization", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop" },
  ],
};

const categories = {
  ar: [
    { id: "all", label: "🌟 الكل" },
    { id: "commercial", label: "📺 إعلانات تجارية" },
    { id: "documentary", label: "🎬 أفلام وثائقية" },
    { id: "corporate", label: "🏢 محتوى مؤسسي" },
    { id: "live", label: "🎤 فعاليات وبث مباشر" },
    { id: "post", label: "✂️ ما بعد الإنتاج" },
  ],
  en: [
    { id: "all", label: "🌟 All" },
    { id: "commercial", label: "📺 Commercials" },
    { id: "documentary", label: "🎬 Documentary" },
    { id: "corporate", label: "🏢 Corporate" },
    { id: "live", label: "🎤 Events & Live" },
    { id: "post", label: "✂️ Post Production" },
  ],
};

export default function PortfolioPage() {
  const { locale } = useLanguage();
  const [selectedCat, setSelectedCat] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const activeProjects = locale === "ar" ? projects.ar : projects.en;
  const activeCats = locale === "ar" ? categories.ar : categories.en;
  const filtered = selectedCat === "all" ? activeProjects : activeProjects.filter(p => p.category === selectedCat);

  return (
    <div>
      {/* ── Hero ─────────────────────────────── */}
      <section style={{
        background: "#0a0a0a",
        padding: "100px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "3px solid var(--primary)",
      }}>
        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            background: `rgba(${i % 2 === 0 ? "99,102,241" : "245,158,11"},0.12)`,
            borderRadius: i % 2 === 0 ? "0%" : "0%",
            top: `${15 + i * 15}%`,
            left: `${5 + i * 18}%`,
            animation: `float-shape ${4 + i}s ease-in-out infinite alternate`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative" }}>
          <Reveal direction="down">
            <span style={{
              display: "inline-block",
              background: "linear-gradient(160deg, #dc2528 0%, #000000 50%, #000000e0 100%)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#fff",
              fontWeight: 700, fontSize: 13,
              padding: "6px 20px", borderRadius: 0, marginBottom: 20,
            }}>
              {locale === "ar" ? "🎬 أعمالنا" : "🎬 Our Work"}
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
              {locale === "ar" ? "ما الذي ننتجه" : "What We Produce"}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 17.5, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
              {locale === "ar"
                ? "أفلام، فيديو، إعلانات، أفلام وثائقية، محتوى مؤسسي، وفعاليات حية — دورة إنتاج كاملة للعلامات والمنصات والقنوات والمؤسسات."
                : "Film, video, advertising, documentaries, corporate content, and live events — the full production cycle for brands, platforms, broadcasters, and institutions."}
            </p>
          </Reveal>

          {/* Metrics row */}
          <Reveal direction="up" delay={350}>
            <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 52, flexWrap: "wrap" }}>
              {[
                { num: "3+", label: locale === "ar" ? "مكاتب في المنطقة" : "Offices across MENA" },
                { num: "50+", label: locale === "ar" ? "عميل راضٍ" : "Satisfied clients" },
                { num: "90%", label: locale === "ar" ? "معدل العملاء المتكررين" : "Repeat business rate" },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{m.num}</div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginTop: 6 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Filter Strip ──────────────────────── */}
      <section style={{ padding: "40px 24px 0", background: "var(--bg)", display: "flex", justifyContent: "center" }}>
        <Reveal direction="up">
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center",
            background: "var(--bg-card)", padding: "8px 10px",
            borderRadius: 0, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)",
          }}
          className="filter-strip"
          >
            {activeCats.map(cat => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={selectedCat === cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  background: selectedCat === cat.id ? "linear-gradient(135deg, var(--primary), var(--primary-dark))" : "transparent",
                  color: selectedCat === cat.id ? "#fff" : "var(--text-muted)",
                  border: "none", padding: "9px 22px", borderRadius: 0,
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: selectedCat === cat.id ? "0 4px 14px rgba(99,102,241,0.3)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Portfolio Grid ────────────────────── */}
      <section style={{ padding: "48px 24px 100px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 32,
          }}
          className="portfolio-grid"
          >
            {filtered.map((proj, i) => (
              <Reveal key={proj.id} delay={i * 80} direction="up">
                <div
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: 2, overflow: "hidden",
                    border: `1.5px solid ${hoveredProject === proj.id ? "var(--primary)" : "var(--border)"}`,
                    boxShadow: hoveredProject === proj.id ? "0 24px 60px rgba(99,102,241,0.15)" : "var(--shadow-sm)",
                    transform: hoveredProject === proj.id ? "translateY(-8px)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
                    <Image
                      src={proj.img} alt={proj.title}
                      fill unoptimized
                      style={{
                        objectFit: "cover",
                        transform: hoveredProject === proj.id ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    {/* Category tag */}
                    <div style={{
                      position: "absolute", top: 16, left: locale === "ar" ? "auto" : 16, right: locale === "ar" ? 16 : "auto",
                      background: "linear-gradient(160deg, #dc2528 0%, #000000 50%, #000000e0 100%)", backdropFilter: "blur(6px)",
                      color: "#fff", padding: "5px 14px", borderRadius: 0,
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {activeCats.find(c => c.id === proj.category)?.label}
                    </div>
                    {/* Hover overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, #dc2528, transparent)",
                      opacity: hoveredProject === proj.id ? 0.6 : 0,
                      transition: "opacity 0.4s ease",
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "28px 28px 32px", textAlign: "start" }}>
                    <div style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700, marginBottom: 6 }}>{proj.label}</div>
                    <h3 style={{ fontSize: 18.5, fontWeight: 800, color: "var(--text)", marginBottom: 14, lineHeight: 1.4 }}>{proj.title}</h3>
                    <div style={{
                      background: "var(--primary-light)", color: "var(--primary)",
                      padding: "10px 16px", borderRadius: 10,
                      fontSize: 13.5, fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 16,
                    }}>
                      <span>{proj.summary}</span>
                    </div>
                    <Link href="/contact" style={{
                      textDecoration: "none",
                      color: "var(--primary)", fontWeight: 700, fontSize: 13.5,
                      display: "inline-flex", alignItems: "center", gap: 6,
                      transition: "gap 0.2s ease",
                    }}
                    className="portfolio-link"
                    >
                      {locale === "ar" ? "ناقش مشروعاً مشابهاً" : "Discuss a similar project"} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #dc2528 0%, #000000 50%, #000000e0 100%)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(99,102,241,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
              {locale === "ar" ? "لنحقق ذلك معاً" : "Let’s Make It Happen"}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <p style={{ color: "#94a3b8", fontSize: 17.5, marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
              {locale === "ar" ? "تواصل معنا لمشروعك القادم — احصل على عرض سعر خلال 24 ساعة" : "Contact us for your next project — get a quote in 24h"}
            </p>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <Link href="/contact" style={{
              textDecoration: "none",
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              color: "#fff", padding: "16px 48px",
              borderRadius: 14, fontWeight: 800, fontSize: 17,
              display: "inline-block",
              boxShadow: "0 8px 28px #dc2528",
              transition: "all 0.25s ease",
            }}
            className="portfolio-cta-btn"
            >
              {locale === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now"} →
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes float-shape {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-20px) rotate(15deg); }
        }
        .portfolio-link:hover { gap: 10px !important; }
        .portfolio-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(99,102,241,0.5) !important; }
        @media (max-width: 500px) {
          .filter-strip { border-radius: 20px !important; width: 100%; }
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
