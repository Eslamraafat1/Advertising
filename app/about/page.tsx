"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";
import type { StatDataItem, ValueItem, TeamMember } from "../lib/data";

/* ── Timeline Section ───────────────────────── */
const timelineData = {
  ar: [
    { year: "2015", title: "التأسيس", desc: "انطلقنا بفريق صغير من المبدعين بحلم كبير لتغيير مشهد الإعلان العربي", icon: "🚀" },
    { year: "2017", title: "أول 100 عميل", desc: "حققنا معلماً بارزاً بإتمام خدمة 100 عميل راضٍ في منطقة الخليج", icon: "🎯" },
    { year: "2019", title: "التوسع الإقليمي", desc: "افتتحنا مكاتب في دبي والقاهرة وبيروت لخدمة العملاء في كل مكان", icon: "🌍" },
    { year: "2021", title: "جائزة أفضل وكالة", desc: "فزنا بجائزة أفضل وكالة إعلانية رقمية في منطقة الشرق الأوسط وشمال أفريقيا", icon: "🏆" },
    { year: "2024", title: "500+ مشروع ناجح", desc: "أتممنا أكثر من 500 مشروع ناجح عبر 15 دولة مع أكثر من 120 شريك استراتيجي", icon: "⭐" },
  ],
  en: [
    { year: "2015", title: "Foundation", desc: "Started with a small team of creatives with a big dream to transform Arab advertising", icon: "🚀" },
    { year: "2017", title: "First 100 Clients", desc: "Reached a milestone of serving 100 satisfied clients across the Gulf region", icon: "🎯" },
    { year: "2019", title: "Regional Expansion", desc: "Opened offices in Dubai, Cairo, and Beirut to serve clients everywhere", icon: "🌍" },
    { year: "2021", title: "Best Agency Award", desc: "Won the Best Digital Advertising Agency award in the MENA region", icon: "🏆" },
    { year: "2024", title: "500+ Successful Projects", desc: "Completed over 500 successful projects across 15 countries with 120+ strategic partners", icon: "⭐" },
  ],
};

/* ── Skills Bar Section ───────────────────────── */
const skillsData = {
  ar: [
    { label: "التسويق الرقمي", percent: 97, color: "#6366f1" },
    { label: "الهوية البصرية والتصميم", percent: 94, color: "#f59e0b" },
    { label: "إدارة السوشيال ميديا", percent: 96, color: "#10b981" },
    { label: "إنتاج المحتوى المرئي", percent: 90, color: "#8b5cf6" },
    { label: "تحسين محركات البحث SEO", percent: 88, color: "#ef4444" },
    { label: "تحليل البيانات والاستراتيجية", percent: 93, color: "#06b6d4" },
  ],
  en: [
    { label: "Digital Marketing", percent: 97, color: "#6366f1" },
    { label: "Brand Identity & Design", percent: 94, color: "#f59e0b" },
    { label: "Social Media Management", percent: 96, color: "#10b981" },
    { label: "Visual Content Production", percent: 90, color: "#8b5cf6" },
    { label: "SEO Optimization", percent: 88, color: "#ef4444" },
    { label: "Data Analysis & Strategy", percent: 93, color: "#06b6d4" },
  ],
};

function SkillBar({ label, percent, color, delay }: { label: string; percent: number; color: string; delay: number }) {
  const [animated, setAnimated] = useState(false);
  return (
    <Reveal direction="up" delay={delay}>
      <div
        style={{ marginBottom: 28 }}
        ref={(el) => {
          if (!el) return;
          const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
          }, { threshold: 0.3 });
          obs.observe(el);
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{label}</span>
          <span style={{ fontWeight: 800, fontSize: 14, color }}>{percent}%</span>
        </div>
        <div style={{ height: 10, background: "var(--bg-muted)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: animated ? `${percent}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            borderRadius: 100,
            transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay * 0.5}ms`,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: "shimmer 2s infinite",
            }} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const ad = t.aboutData;
  const timeline = locale === "ar" ? timelineData.ar : timelineData.en;
  const skills = locale === "ar" ? skillsData.ar : skillsData.en;
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);

  return (
    <div>
      {/* ── Hero with particle bg ────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #dc2528 0%, #000000 50%, #000000e0 100%)",
        padding: "100px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated circles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            border: `1px solid rgba(99,102,241,${0.15 - i * 0.02})`,
            borderRadius: "50%",
            top: `${20 + i * 8}%`,
            left: `${10 + i * 15}%`,
            animation: `spin-slow ${8 + i * 2}s linear infinite`,
            pointerEvents: "none",
          }} />
        ))}
        <div style={{ position: "relative" }}>
          <Reveal direction="down">
            <span style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#fff",
              fontWeight: 700, fontSize: 13,
              padding: "6px 20px", borderRadius: 100, marginBottom: 20,
            }}>{ad.badge}</span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
              {ad.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>
              {ad.subtext}
            </p>
          </Reveal>
          {/* Quick stats row */}
          <Reveal direction="up" delay={350}>
            <div style={{
              display: "flex", justifyContent: "center", gap: 40, marginTop: 56,
              flexWrap: "wrap",
            }}>
              {[
                { value: "9+", label: locale === "ar" ? "سنوات خبرة" : "Years Experience" },
                { value: "500+", label: locale === "ar" ? "مشروع ناجح" : "Successful Projects" },
                { value: "15", label: locale === "ar" ? "دولة نعمل فيها" : "Countries We Serve" },
                { value: "120+", label: locale === "ar" ? "عميل سعيد" : "Happy Clients" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900,
                    background: "linear-gradient(135deg, #6366f1, #a5b4fc)",
                    color:"#fff",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Story Section ─────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center"
          }} className="about-story-split">
            <div style={{ textAlign: "start" }}>
              <Reveal direction="down">
                <span style={{
                  display: "inline-block",
                  background: "var(--accent-light)", color: "#92400e",
                  fontWeight: 700, fontSize: 13, padding: "5px 16px",
                  borderRadius: 100, marginBottom: 20
                }}>{ad.storyBadge}</span>
              </Reveal>
              <Reveal direction="up" delay={100}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text)", marginBottom: 20, lineHeight: 1.3 }}>
                  {ad.storyTitle}
                </h2>
              </Reveal>
              <Reveal direction="up" delay={200}>
                <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.9, marginBottom: 16 }}>{ad.storyDesc1}</p>
              </Reveal>
              <Reveal direction="up" delay={300}>
                <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.9, marginBottom: 32 }}>{ad.storyDesc2}</p>
              </Reveal>
              <Reveal direction="up" delay={400}>
                <Link href="/contact" style={{
                  textDecoration: "none",
                  display: "inline-block",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  color: "#fff", padding: "14px 32px",
                  borderRadius: 12, fontWeight: 700, fontSize: 15.5,
                  boxShadow: "0 4px 14px rgba(99, 102, 241, 0.25)",
                  transition: "all 0.25s ease",
                }}
                className="story-cta"
                >
                  {ad.storyCta} &rarr;
                </Link>
              </Reveal>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }} className="about-story-graphics">
              <Reveal direction="left" delay={200}>
                <div style={{ position: "relative", width: "100%", minHeight: 280 }}>
                  <Image
                    src={ad.storyImage}
                    alt="Our Creative Journey"
                    width={800} height={450}
                    unoptimized
                    style={{
                      width: "100%", height: "100%",
                      borderRadius: 24,
                      boxShadow: "var(--shadow-lg)",
                      border: "1.5px solid var(--border)",
                      objectFit: "cover",
                    }}
                  />
                  {/* Floating badge on image */}
                  <div style={{
                    position: "absolute", bottom: 20, right: 20,
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 16, padding: "14px 20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontSize: 28 }}>🏆</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>
                        {locale === "ar" ? "أفضل وكالة 2024" : "Best Agency 2024"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>MENA Awards</div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {t.statsData.map((s: StatDataItem, i: number) => (
                  <Reveal key={i} delay={i * 100} direction="up">
                    <div style={{
                      background: i === 0 ? "linear-gradient(135deg, var(--primary), var(--primary-dark))" : "var(--bg-card)",
                      borderRadius: "var(--radius-lg)", padding: 24,
                      textAlign: "center", border: "1px solid var(--border)",
                      transition: "all 0.3s ease",
                    }}
                    className="story-stat-card"
                    >
                      <div style={{ fontSize: 30, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: i === 0 ? "#fff" : "var(--primary)" }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: i === 0 ? "#c7d2fe" : "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "6px 20px", borderRadius: 100, marginBottom: 16 }}>
                {locale === "ar" ? "📅 مسيرتنا عبر السنين" : "📅 Our Journey"}
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--text)" }}>
                {locale === "ar" ? "من الحلم إلى الواقع" : "From Dream to Reality"}
              </h2>
            </Reveal>
          </div>

          <div style={{ position: "relative" }}>
            {/* Center line */}
            <div style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "50%",
              width: 2,
              background: "linear-gradient(to bottom, var(--primary), var(--accent))",
              transform: "translateX(-50%)",
              opacity: 0.3,
            }} />

            {timeline.map((item, i) => (
              <Reveal key={i} direction={i % 2 === 0 ? "right" : "left"} delay={i * 120}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  alignItems: "center",
                  marginBottom: 48,
                  gap: 0,
                }}
                className="timeline-row"
                >
                  {/* Left content (even) or empty (odd) */}
                  <div style={{ padding: "0 24px", textAlign: i % 2 === 0 ? "end" : "start" }}>
                    {i % 2 === 0 && (
                      <div style={{
                        background: "var(--bg-card)",
                        borderRadius: 20,
                        padding: "28px 32px",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                        transition: "all 0.3s ease",
                      }}
                      className="timeline-card"
                      >
                        <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{item.icon}</span>
                        <div style={{ fontWeight: 900, fontSize: 22, color: "var(--primary)", marginBottom: 6 }}>{item.year}</div>
                        <h3 style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 8 }}>{item.title}</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{
                      width: 20, height: 20,
                      background: "linear-gradient(135deg, var(--primary), var(--accent))",
                      borderRadius: "50%",
                      border: "3px solid var(--bg-muted)",
                      boxShadow: "0 0 0 4px rgba(99,102,241,0.2)",
                      zIndex: 1,
                    }} />
                  </div>

                  {/* Right content (odd) or empty (even) */}
                  <div style={{ padding: "0 24px" }}>
                    {i % 2 === 1 && (
                      <div style={{
                        background: "var(--bg-card)",
                        borderRadius: 20,
                        padding: "28px 32px",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                        transition: "all 0.3s ease",
                      }}
                      className="timeline-card"
                      >
                        <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{item.icon}</span>
                        <div style={{ fontWeight: 900, fontSize: 22, color: "var(--primary)", marginBottom: 6 }}>{item.year}</div>
                        <h3 style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 8 }}>{item.title}</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills/Expertise ──────────────────── */}
      <section style={{ padding: "100px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="skills-split">
            <div>
              <Reveal direction="down">
                <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "6px 20px", borderRadius: 100, marginBottom: 20 }}>
                  {locale === "ar" ? "💡 خبراتنا ومهاراتنا" : "💡 Our Expertise"}
                </span>
              </Reveal>
              <Reveal direction="up" delay={100}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "var(--text)", marginBottom: 16, lineHeight: 1.3 }}>
                  {locale === "ar" ? "نتقن فن التسويق الرقمي بكل أبعاده" : "We Master Digital Marketing in All Its Dimensions"}
                </h2>
              </Reveal>
              <Reveal direction="up" delay={200}>
                <p style={{ color: "var(--text-muted)", fontSize: 15.5, lineHeight: 1.9, marginBottom: 36 }}>
                  {locale === "ar"
                    ? "فريقنا من الخبراء المتخصصين يمتلك الأدوات والمعرفة لتحقيق نتائج استثنائية في كل مجال."
                    : "Our team of specialized experts possesses the tools and knowledge to achieve exceptional results in every field."}
                </p>
              </Reveal>
              <Reveal direction="up" delay={300}>
                <div style={{
                  display: "flex", gap: 16, flexWrap: "wrap",
                }}>
                  {["UI/UX", "SEO", "PPC", "CRM", "Analytics", "Email"].map((tag, i) => (
                    <span key={i} style={{
                      background: "var(--primary-light)",
                      color: "var(--primary)",
                      padding: "8px 18px",
                      borderRadius: 100,
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1px solid rgba(99,102,241,0.2)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
            <div>
              {skills.map((skill, i) => (
                <SkillBar key={i} {...skill} delay={i * 80} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────── */}
      <section style={{ padding: "90px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <Reveal direction="up">
              <div style={{
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                borderRadius: "var(--radius-lg)", padding: 44,
                textAlign: "center", height: "100%",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ fontSize: 52, marginBottom: 20 }}>🎯</div>
                <h3 style={{ fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 18 }}>{ad.missionTitle}</h3>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15.5, lineHeight: 1.9 }}>{ad.missionDesc}</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <div style={{
                background: "var(--bg-card)", borderRadius: "var(--radius-lg)",
                padding: 44, border: "1.5px solid var(--border)",
                textAlign: "center", height: "100%",
                transition: "all 0.3s ease",
              }}
              className="vision-card"
              >
                <div style={{ fontSize: 52, marginBottom: 20 }}>🔭</div>
                <h3 style={{ fontWeight: 900, fontSize: 22, color: "var(--text)", marginBottom: 18 }}>{ad.visionTitle}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 15.5, lineHeight: 1.9 }}>{ad.visionDesc}</p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                borderRadius: "var(--radius-lg)", padding: 44,
                textAlign: "center", height: "100%",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, background: "rgba(255,255,255,0.08)", borderRadius: "50%" }} />
                <div style={{ fontSize: 52, marginBottom: 20 }}>💡</div>
                <h3 style={{ fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 18 }}>
                  {locale === "ar" ? "قيمنا وفلسفتنا" : "Our Values & Philosophy"}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15.5, lineHeight: 1.9 }}>
                  {locale === "ar" ? "نؤمن بأن الإبداع الحقيقي يولد من فهم عميق لاحتياجات العميل وسوقه." : "We believe true creativity is born from a deep understanding of the client's needs and market."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────── */}
      <section style={{ padding: "90px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "5px 18px", borderRadius: 100, marginBottom: 16 }}>{ad.valuesBadge}</span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text)" }}>{ad.valuesTitle}</h2>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 28 }}>
            {ad.valuesList.map((v: ValueItem, i: number) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <div style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-lg)", padding: 32,
                  textAlign: "center", border: "1px solid var(--border)",
                  height: "100%", transition: "all 0.35s ease",
                }}
                className="about-value-card"
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────── */}
      <section style={{ padding: "90px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "5px 18px", borderRadius: 100, marginBottom: 16 }}>{ad.teamBadge}</span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "var(--text)" }}>{ad.teamTitle}</h2>
            </Reveal>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {ad.teamList.map((m: TeamMember, i: number) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <div
                  onMouseEnter={() => setHoveredTeam(i)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-lg)", padding: 32,
                    textAlign: "center",
                    border: `1.5px solid ${hoveredTeam === i ? "var(--primary)" : "var(--border)"}`,
                    boxShadow: hoveredTeam === i ? "var(--shadow-lg)" : "var(--shadow-sm)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredTeam === i ? "translateY(-10px)" : "none",
                    height: "100%",
                  }}
                >
                  <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 20px" }}>
                    <Image
                      src={m.image} alt={m.name}
                      width={90} height={90}
                      unoptimized
                      style={{
                        width: "100%", height: "100%",
                        borderRadius: "50%", objectFit: "cover",
                        border: `3px solid ${hoveredTeam === i ? "var(--primary)" : "var(--primary-light)"}`,
                        boxShadow: hoveredTeam === i ? "0 0 0 4px rgba(99,102,241,0.15)" : "0 4px 10px rgba(0,0,0,0.1)",
                        transition: "all 0.4s ease",
                      }}
                    />
                    {/* Online indicator */}
                    <div style={{
                      position: "absolute", bottom: 4, right: 4,
                      width: 14, height: 14,
                      background: "#10b981",
                      borderRadius: "50%",
                      border: "2px solid var(--bg-card)",
                    }} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 17.5, color: "var(--text)" }}>{m.name}</h3>
                  <p style={{ color: "var(--primary)", fontWeight: 600, fontSize: 13.5, margin: "6px 0 12px" }}>{m.role}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.8 }}>{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners Strip ────────────────────── */}
      <section style={{ padding: "64px 24px", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="down">
            <p style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 700, marginBottom: 32, letterSpacing: 1 }}>{ad.partnersBadge}</p>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {["Google Partner", "Meta Business", "TikTok For Business", "HubSpot Certified", "ISO 9001"].map((p, i) => (
                <span key={i} style={{
                  background: "var(--bg-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: 12, padding: "12px 28px",
                  fontSize: 14, fontWeight: 700,
                  color: "var(--text-muted)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.25s ease",
                }}
                className="partner-badge"
                >{p}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .about-value-card:hover { transform: translateY(-8px); border-color: var(--primary) !important; box-shadow: var(--shadow-md); }
        .timeline-card:hover { transform: translateY(-4px); border-color: var(--primary) !important; box-shadow: var(--shadow-md); }
        .vision-card:hover { border-color: var(--primary) !important; box-shadow: var(--shadow-md); transform: translateY(-6px); }
        .partner-badge:hover { border-color: var(--primary) !important; color: var(--primary) !important; transform: translateY(-2px); }
        .story-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.35) !important; }
        .story-stat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
        @media (max-width: 768px) {
          .about-story-split { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center !important; }
          .about-story-graphics { gap: 24px !important; }
          .skills-split { grid-template-columns: 1fr !important; gap: 40px !important; }
          .timeline-row { grid-template-columns: 1fr !important; }
          .timeline-row > div:first-child, .timeline-row > div:last-child { display: block !important; }
        }
      `}</style>
    </div>
  );
}
