"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";
import type { ServiceDataItem, WhyListItem } from "../lib/data";

const caseStudies = {
  ar: [
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop",
      service: "الإعلان الرقمي",
      title: "زيادة مبيعات متجر إلكتروني بنسبة 380%",
      desc: "من خلال حملات جوجل وميتا المستهدفة حققنا نتائج مذهلة لعميل في قطاع الأزياء خلال 3 أشهر فقط.",
      stats: ["+380%", "مبيعات"],
      color: "#6366f1",
    },
    {
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=700&auto=format&fit=crop",
      service: "السوشيال ميديا",
      title: "بناء مجتمع 200k متابع في 6 أشهر",
      desc: "استراتيجية محتوى متكاملة أوصلت علامة تجارية جديدة إلى 200 ألف متابع حقيقي ومتفاعل.",
      stats: ["200K", "متابع"],
      color: "#10b981",
    },
    {
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=700&auto=format&fit=crop",
      service: "الهوية البصرية",
      title: "هوية بصرية حوّلت الشركة لعلامة تجارية",
      desc: "تصميم هوية بصرية احترافية رفع قيمة العلامة التجارية وزاد من ثقة العملاء بنسبة 65%.",
      stats: ["+65%", "ثقة العملاء"],
      color: "#f59e0b",
    },
  ],
  en: [
    {
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop",
      service: "Digital Advertising",
      title: "380% Sales Increase for E-commerce Store",
      desc: "Through targeted Google and Meta campaigns, we achieved remarkable results for a fashion client in just 3 months.",
      stats: ["+380%", "Sales Growth"],
      color: "#6366f1",
    },
    {
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=700&auto=format&fit=crop",
      service: "Social Media",
      title: "Building 200K Followers in 6 Months",
      desc: "A comprehensive content strategy brought a new brand to 200K real and engaged followers.",
      stats: ["200K", "Followers"],
      color: "#10b981",
    },
    {
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=700&auto=format&fit=crop",
      service: "Brand Identity",
      title: "Brand Identity That Transformed a Company",
      desc: "Professional visual identity design raised brand equity and increased customer trust by 65%.",
      stats: ["+65%", "Client Trust"],
      color: "#f59e0b",
    },
  ],
};

const toolsShowcase = [
  { name: "Google Ads", icon: "🔵", desc: "PPC & Display" },
  { name: "Meta Ads", icon: "🔷", desc: "Facebook & Instagram" },
  { name: "TikTok Ads", icon: "⬛", desc: "Short Form Video" },
  { name: "SEO Tools", icon: "🔍", desc: "Semrush & Ahrefs" },
  { name: "Analytics", icon: "📊", desc: "GA4 & Data Studio" },
  { name: "Email Marketing", icon: "📧", desc: "Mailchimp & HubSpot" },
  { name: "Design Suite", icon: "🎨", desc: "Figma & Adobe" },
  { name: "Video Prod.", icon: "🎬", desc: "Premiere & After Effects" },
];

export default function ServicesPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const { locale, t } = useLanguage();
  const sp = t.servicesPage;
  const cases = locale === "ar" ? caseStudies.ar : caseStudies.en;

  return (
    <div>
      {/* ── Header ────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
        padding: "100px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(99,102,241,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <Reveal direction="down">
            <span style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.25)",
              border: "1px solid rgba(99,102,241,0.5)",
              color: "#a5b4fc",
              fontWeight: 700, fontSize: 13,
              padding: "6px 20px", borderRadius: 100, marginBottom: 20,
            }}>{sp.badge}</span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 900, color: "#fff",
              marginBottom: 20, lineHeight: 1.1,
            }}>
              {sp.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
              {sp.subtext}
            </p>
          </Reveal>
          {/* Tool logos strip */}
          <Reveal direction="up" delay={350}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
              {toolsShowcase.map((tool, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "all 0.25s ease",
                }}
                className="tool-chip"
                >
                  <span style={{ fontSize: 18 }}>{tool.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{tool.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────── */}
      <section style={{ padding: "90px 24px 100px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "6px 18px", borderRadius: 100, marginBottom: 16 }}>
                {locale === "ar" ? "🚀 خدماتنا الاحترافية" : "🚀 Our Professional Services"}
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--text)", marginBottom: 12 }}>
                {locale === "ar" ? "حلول شاملة لكل احتياجاتك التسويقية" : "Comprehensive Solutions for All Your Marketing Needs"}
              </h2>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 32 }}>
            {t.servicesData.map((s: ServiceDataItem, i: number) => (
              <Reveal key={s.id} delay={i * 100} direction="up">
                <div
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: hovered === s.id
                      ? "linear-gradient(145deg, #4f46e5, #7c3aed)"
                      : "var(--bg-card)",
                    borderRadius: "var(--radius-lg)", padding: 36,
                    border: `1.5px solid ${hovered === s.id ? "transparent" : "var(--border)"}`,
                    boxShadow: hovered === s.id ? "0 24px 60px rgba(99,102,241,0.3)" : "var(--shadow-sm)",
                    transform: hovered === s.id ? "translateY(-10px) scale(1.02)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex", flexDirection: "column", height: "100%",
                  }}
                >
                  <div style={{
                    width: 64, height: 64,
                    background: hovered === s.id ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                    borderRadius: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 32, marginBottom: 20,
                    transition: "all 0.3s ease",
                    color: hovered === s.id ? "#fff" : "var(--primary)",
                    boxShadow: hovered === s.id ? "0 4px 16px rgba(255,255,255,0.2)" : "none",
                  }}>{s.icon}</div>
                  <h2 style={{ fontWeight: 800, fontSize: 21, color: hovered === s.id ? "#fff" : "var(--text)", marginBottom: 8 }}>{s.title}</h2>
                  <p style={{ color: hovered === s.id ? "rgba(255,255,255,0.8)" : "var(--primary)", fontWeight: 700, fontSize: 14.5, marginBottom: 16 }}>{s.price}</p>
                  <p style={{ color: hovered === s.id ? "rgba(255,255,255,0.85)" : "var(--text-muted)", fontSize: 14.5, lineHeight: 1.85, marginBottom: 24 }}>{s.fullDesc}</p>
                  
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36, padding: 0 }}>
                    {s.features.map((f: string, j: number) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: hovered === s.id ? "rgba(255,255,255,0.9)" : "var(--text)" }}>
                        <span style={{
                          width: 22, height: 22,
                          background: hovered === s.id ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                          color: hovered === s.id ? "#fff" : "var(--primary)",
                          borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, flexShrink: 0, fontWeight: 700,
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/contact" style={{
                    marginTop: "auto",
                    textDecoration: "none",
                    background: hovered === s.id ? "#fff" : "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                    color: hovered === s.id ? "#4f46e5" : "#fff",
                    padding: "14px 24px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 15.5,
                    textAlign: "center",
                    boxShadow: hovered === s.id ? "0 8px 24px rgba(0,0,0,0.15)" : "0 4px 12px rgba(99, 102, 241, 0.15)",
                    transition: "all 0.3s ease",
                  }}>
                    {t.common.requestService}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ──────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--accent-light)", color: "#92400e", fontWeight: 700, fontSize: 13, padding: "6px 20px", borderRadius: 100, marginBottom: 16 }}>
                {locale === "ar" ? "📈 دراسات الحالة" : "📈 Case Studies"}
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--text)" }}>
                {locale === "ar" ? "نتائج حقيقية لعملاء حقيقيين" : "Real Results for Real Clients"}
              </h2>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
            {cases.map((cs, i) => (
              <Reveal key={i} direction="up" delay={i * 120}>
                <div
                  onMouseEnter={() => setActiveCase(i)}
                  onMouseLeave={() => setActiveCase(null)}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: 24,
                    overflow: "hidden",
                    border: `1.5px solid ${activeCase === i ? cs.color + "66" : "var(--border)"}`,
                    boxShadow: activeCase === i ? `0 20px 50px ${cs.color}22` : "var(--shadow-sm)",
                    transform: activeCase === i ? "translateY(-8px)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div style={{ position: "relative", height: 220 }}>
                    <Image src={cs.img} alt={cs.title} fill unoptimized style={{ objectFit: "cover", transform: activeCase === i ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${cs.color}cc, transparent)` }} />
                    {/* Big metric */}
                    <div style={{
                      position: "absolute", bottom: 20, left: locale === "ar" ? "auto" : 20, right: locale === "ar" ? 20 : "auto",
                      textAlign: locale === "ar" ? "right" : "left",
                    }}>
                      <div style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{cs.stats[0]}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{cs.stats[1]}</div>
                    </div>
                    <div style={{
                      position: "absolute", top: 16, right: locale === "ar" ? "auto" : 16, left: locale === "ar" ? 16 : "auto",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      color: "#fff", padding: "5px 14px", borderRadius: 100,
                      fontSize: 12, fontWeight: 700,
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}>
                      {cs.service}
                    </div>
                  </div>
                  <div style={{ padding: "28px 28px 32px" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>{cs.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8, marginBottom: 20 }}>{cs.desc}</p>
                    <Link href="/portfolio" style={{
                      textDecoration: "none",
                      color: cs.color,
                      fontWeight: 700, fontSize: 14,
                      display: "inline-flex", alignItems: "center", gap: 6,
                    }}>
                      {locale === "ar" ? "اقرأ القصة الكاملة" : "Read Full Story"} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────── */}
      <section style={{ padding: "90px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text)", marginBottom: 52 }}>
              {sp.whyTitle}
            </h2>
          </Reveal>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 28 }}>
            {sp.whyList.map((item: WhyListItem, i: number) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <div style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-lg)", padding: 32,
                  border: "1px solid var(--border)", height: "100%",
                  transition: "all 0.35s ease",
                }}
                className="why-card"
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Strip ─────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "var(--text)", textAlign: "center", marginBottom: 48 }}>
              {locale === "ar" ? "⚡ كيف نعمل؟" : "⚡ How We Work?"}
            </h2>
          </Reveal>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }} className="process-strip">
            {(locale === "ar"
              ? ["التشاور", "التحليل", "الاستراتيجية", "التنفيذ", "القياس"]
              : ["Consult", "Analyze", "Strategize", "Execute", "Measure"]
            ).map((step, i, arr) => (
              <Reveal key={i} direction="up" delay={i * 100}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    background: i % 2 === 0 ? "linear-gradient(135deg, var(--primary), var(--primary-dark))" : "var(--bg-card)",
                    color: i % 2 === 0 ? "#fff" : "var(--text)",
                    borderRadius: 16, padding: "18px 24px",
                    fontWeight: 800, fontSize: 15,
                    border: i % 2 === 1 ? "1.5px solid var(--border)" : "none",
                    boxShadow: i % 2 === 0 ? "0 6px 20px rgba(99,102,241,0.25)" : "none",
                    textAlign: "center",
                    minWidth: 120,
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>
                      {["💬", "🔍", "📋", "⚙️", "📊"][i]}
                    </div>
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ color: "var(--text-light)", fontSize: 24, margin: "0 8px" }}>→</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section style={{
        padding: "110px 24px",
        background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
        <Reveal direction="down">
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            {sp.ctaTitle}
          </h2>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <p style={{ color: "#c7d2fe", fontSize: 18, marginBottom: 44, maxWidth: 540, margin: "0 auto 44px" }}>{sp.ctaSub}</p>
        </Reveal>
        <Reveal direction="up" delay={200}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              textDecoration: "none",
              background: "#fff", color: "var(--primary)",
              padding: "16px 48px",
              borderRadius: 14, fontWeight: 800, fontSize: 17,
              display: "inline-block",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              transition: "all 0.25s ease",
            }}
            className="services-cta-btn"
            >
              {sp.ctaBtn} →
            </Link>
            <Link href="/portfolio" style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.15)", color: "#fff",
              padding: "16px 40px",
              borderRadius: 14, fontWeight: 700, fontSize: 17,
              border: "2px solid rgba(255,255,255,0.3)",
              display: "inline-block",
              transition: "all 0.25s ease",
            }}
            className="services-cta-btn-outline"
            >
              {locale === "ar" ? "شاهد الأعمال" : "View Portfolio"}
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`
        .why-card:hover { transform: translateY(-8px); border-color: var(--primary) !important; box-shadow: var(--shadow-md); }
        .services-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,255,255,0.2) !important; }
        .services-cta-btn-outline:hover { background: rgba(255,255,255,0.25) !important; transform: translateY(-2px); }
        .tool-chip:hover { background: rgba(255,255,255,0.12) !important; border-color: rgba(99,102,241,0.5) !important; transform: translateY(-2px); }
        .process-strip { justify-content: center; align-items: center; }
        @media (max-width: 640px) {
          .process-strip { flex-direction: column; gap: 12px; }
          .process-strip > div > div:last-child { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
