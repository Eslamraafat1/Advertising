"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";

// Article previews. Full articles are not published yet, so cards are
// marked "Coming soon" and link to the contact page instead of fake posts.
const featuredPost = {
  ar: {
    category: "الإنتاج",
    date: "قريباً",
    title: "من الشرارة الأولى إلى الإطار الأخير: كيف تعمل دورة الإنتاج الكاملة",
    excerpt: "جولة في المراحل التي نعمل بها في كل مشروع — التخطيط، التصوير، البث المباشر، ما بعد الإنتاج والتسليم، والتعريب.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    author: "فريق The Untold Story",
    tags: ["الإنتاج", "التخطيط", "التعريب"],
  },
  en: {
    category: "Production",
    date: "Coming soon",
    title: "From First Spark to Final Frame: How the Full Production Cycle Works",
    excerpt: "A walkthrough of the stages we run on every project — planning, filming, live, post production and final delivery, and localization.",
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    author: "The Untold Story team",
    tags: ["Production", "Planning", "Localization"],
  },
};

const newsletterTopics = {
  ar: ["أخبار الشركة", "كواليس الإنتاج", "الإنتاج في مصر", "التعريب"],
  en: ["Company news", "Behind the scenes", "Producing in Egypt", "Localization"],
};

export default function BlogPage() {
  const { locale, t } = useLanguage();
  const blog = t.blogPage;
  const featured = locale === "ar" ? featuredPost.ar : featuredPost.en;
  const topics = locale === "ar" ? newsletterTopics.ar : newsletterTopics.en;
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  const allTags = [locale === "ar" ? "الكل" : "All", ...Array.from(new Set(blog.posts.map(p => p.category)))];
  const visiblePosts = activeTag === "all" ? blog.posts : blog.posts.filter(p => p.category === activeTag);
  const mailingListHref = `mailto:${t.siteConfig.email}?subject=${encodeURIComponent(locale === "ar" ? "الاشتراك في قائمة الأخبار" : "Mailing list sign-up")}&body=${encodeURIComponent(email)}`;

  return (
    <div>
      {/* ── Hero ──────────────────────────────── */}
      <section style={{
        background: "#0a0a0a",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "3px solid var(--primary)",
      }}>
        {/* Animated dots grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }} />
        {/* Glow blobs */}
        <div style={{ position: "absolute", top: -100, right: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent)", borderRadius: "0%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(233,41,44,0.08), transparent)", borderRadius: "0%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal direction="down">
            <span style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc",
              fontWeight: 700, fontSize: 13,
              padding: "7px 22px", borderRadius: 0, marginBottom: 24,
            }}>
              {blog.badge}
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 900, color: "#fff",
              marginBottom: 20, lineHeight: 1.1,
            }}>
              {blog.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 17.5, maxWidth: 680, margin: "0 auto", lineHeight: 1.75 }}>
              {blog.subtext}
            </p>
          </Reveal>

          {/* Tag Filter */}
          <Reveal direction="up" delay={350}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 48, flexWrap: "wrap" }}>
              {allTags.map((tag, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={i === 0 ? activeTag === "all" : activeTag === tag}
                  onClick={() => setActiveTag(i === 0 ? "all" : tag)}
                  style={{
                    background: (i === 0 ? activeTag === "all" : activeTag === tag)
                      ? "rgba(99,102,241,0.35)"
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid ${(i === 0 ? activeTag === "all" : activeTag === tag)
                      ? "rgba(99,102,241,0.6)"
                      : "rgba(255,255,255,0.12)"}`,
                    color: (i === 0 ? activeTag === "all" : activeTag === tag) ? "#a5b4fc" : "#94a3b8",
                    padding: "8px 20px", borderRadius: 0,
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.25s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────── */}
      <section style={{ padding: "64px 24px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal direction="up">
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 48,
              background: "var(--bg-card)",
              borderRadius: 0,
              overflow: "hidden",
              border: "1.5px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
            className="featured-post"
            >
              {/* Image */}
              <div style={{ position: "relative", minHeight: 380, overflow: "hidden" }}>
                <Image
                  src={featured.img} alt={featured.title}
                  fill unoptimized
                  style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                  className="featured-img"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)",
                }} />
                <div style={{
                  position: "absolute", top: 20, left: 20,
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  color: "#fff", padding: "6px 16px", borderRadius: 0,
                  fontSize: 12, fontWeight: 700,
                }}>
                  ⭐ {locale === "ar" ? "المقالة المميزة" : "Featured Post"}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "44px 40px 44px 0", display: "flex", flexDirection: "column", justifyContent: "center" }} className="featured-content">
                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  {featured.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: "var(--primary-light)", color: "var(--primary)",
                      padding: "4px 14px", borderRadius: 0,
                      fontSize: 12, fontWeight: 700,
                    }}>{tag}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 900, color: "var(--text)", marginBottom: 16, lineHeight: 1.35 }}>
                  {featured.title}
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{featured.author}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{featured.date}</div>
                  </div>
                </div>
                <Link href="/contact" style={{
                  textDecoration: "none",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  color: "#fff", padding: "13px 28px",
                  borderRadius: 0, fontWeight: 700, fontSize: 15,
                  display: "inline-block", boxShadow: "0 4px 16px rgba(99,102,241,0.25)",
                  transition: "all 0.25s ease",
                }}
                className="featured-cta"
                >
                  {locale === "ar" ? "تحدث معنا عن مشروعك" : "Talk to us about your project"} →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Posts Grid ────────────────────────── */}
      <section style={{ padding: "60px 24px 80px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {visiblePosts.map((post, index) => (
              <Reveal key={post.id} direction="up" delay={index * 100}>
                <article
                  onMouseEnter={() => setHoveredPost(index)}
                  onMouseLeave={() => setHoveredPost(null)}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: 0,
                    border: `1.5px solid ${hoveredPost === index ? "var(--primary)" : "var(--border)"}`,
                    overflow: "hidden",
                    boxShadow: hoveredPost === index ? "0 20px 50px rgba(99,102,241,0.12)" : "var(--shadow-sm)",
                    transform: hoveredPost === index ? "translateY(-8px)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Top colored bar */}
                  <div style={{
                    height: 5,
                    background: `linear-gradient(90deg, ${["#6366f1","#f59e0b","#10b981","#8b5cf6"][index % 4]}, ${["#8b5cf6","#ef4444","#06b6d4","#6366f1"][index % 4]})`,
                    transform: hoveredPost === index ? "scaleX(1)" : "scaleX(0.3)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease",
                  }} />

                  <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
                      <span style={{
                        fontWeight: 700, color: "var(--primary)", fontSize: 12.5,
                        background: "var(--primary-light)", padding: "4px 12px", borderRadius: 0,
                      }}>{post.category}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{post.date}</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(1.2rem, 2vw, 1.55rem)", fontWeight: 900, marginBottom: 14, lineHeight: 1.4, color: "var(--text)" }}>{post.title}</h2>
                    <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.85, flex: 1, marginBottom: 24 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Link href="/contact" style={{
                        textDecoration: "none",
                        background: hoveredPost === index
                          ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
                          : "var(--primary-light)",
                        color: hoveredPost === index ? "#fff" : "var(--primary)",
                        padding: "10px 22px", borderRadius: 0,
                        fontWeight: 700, fontSize: 13.5,
                        transition: "all 0.3s ease",
                      }}>
                        {locale === "ar" ? "تواصل معنا" : "Get in touch"} →
                      </Link>

                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter Section ────────────────── */}
      <section style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #dc2528 0%, #000000 50%, #000000e0 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Reveal direction="down">
            <div style={{ fontSize: 64, marginBottom: 20 }}>📬</div>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
              {locale === "ar" ? "ابقَ على اطلاع" : "Stay in the Loop"}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 16.5, marginBottom: 32, lineHeight: 1.8 }}>
              {locale === "ar"
                ? "اترك بريدك الإلكتروني لنخبرك عند نشر مقالات وأخبار جديدة."
                : "Leave your email and we will let you know when new articles and news are published."}
            </p>
          </Reveal>

          {/* Topics */}
          <Reveal direction="up" delay={300}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
              {topics.map((t, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#94a3b8", padding: "6px 16px",
                  borderRadius: 0, fontSize: 13, fontWeight: 600,
                }}>
                  ✓ {t}
                </span>
              ))}
            </div>
          </Reveal>

          {subscribed ? (
            <Reveal direction="up">
              <div style={{
                background: "rgba(16,185,129,0.15)",
                border: "1.5px solid rgba(16,185,129,0.4)",
                borderRadius: 0, padding: "32px 40px",
              }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: "#34d399", fontWeight: 800, fontSize: 22, marginBottom: 8 }}>
                  {locale === "ar" ? "أكمل الاشتراك من بريدك" : "Finish signing up in your email app"}
                </h3>
                <p style={{ color: "#94a3b8", fontSize: 15 }}>
                  {locale === "ar" ? "فتحنا تطبيق البريد برسالة اشتراك جاهزة — اضغط \"إرسال\" للتأكيد." : "We opened your email app with a sign-up request — press \"Send\" to confirm."}
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal direction="up" delay={400}>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubscribed(true); window.location.assign(mailingListHref); }}
                style={{ display: "flex", gap: 12, maxWidth: 540, margin: "0 auto" }}
                className="newsletter-form"
              >
                <input
                  type="email"
                  required
                  aria-label={locale === "ar" ? "البريد الإلكتروني" : "Email address"}
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={locale === "ar" ? "أدخل بريدك الإلكتروني..." : "Enter your email..."}
                  style={{
                    flex: 1, padding: "14px 20px",
                    borderRadius: 0, border: "1.5px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff", fontSize: 15,
                    fontFamily: "inherit", outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  className="newsletter-input"
                />
                <button type="submit" style={{
                  background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                  color: "#fff", border: "none",
                  padding: "14px 28px", borderRadius: 0,
                  fontWeight: 700, fontSize: 15, cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                  transition: "all 0.25s ease", whiteSpace: "nowrap",
                }}
                className="newsletter-btn"
                >
                  {locale === "ar" ? "اشترك" : "Sign up"}
                </button>
              </form>
              <p style={{ color: "#475569", fontSize: 12.5, marginTop: 14 }}>
                {locale === "ar" ? "يفتح هذا النموذج تطبيق البريد لديك؛ لا يُرسل شيء تلقائياً." : "This opens your email app; nothing is sent automatically."}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Resources Strip ───────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "var(--text)", textAlign: "center", marginBottom: 48 }}>
              {locale === "ar" ? "📚 موارد مجانية لك" : "📚 Free Resources for You"}
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {(locale === "ar"
              ? [
                  { icon: "📖", title: "دليل التسويق الرقمي 2024", type: "PDF مجاني", color: "#6366f1" },
                  { icon: "📊", title: "قالب تقرير الأداء الشهري", type: "Excel مجاني", color: "#10b981" },
                  { icon: "🎯", title: "مصطلحات التسويق الأساسية", type: "قاموس مجاني", color: "#f59e0b" },
                  { icon: "🎬", title: "ورشة عمل السوشيال ميديا", type: "فيديو مجاني", color: "#8b5cf6" },
                ]
              : [
                  { icon: "📖", title: "Digital Marketing Guide 2024", type: "Free PDF", color: "#6366f1" },
                  { icon: "📊", title: "Monthly Performance Report Template", type: "Free Excel", color: "#10b981" },
                  { icon: "🎯", title: "Essential Marketing Terms Glossary", type: "Free Dictionary", color: "#f59e0b" },
                  { icon: "🎬", title: "Social Media Workshop", type: "Free Video", color: "#8b5cf6" },
                ]
            ).map((r, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div style={{
                  background: "var(--bg-card)", borderRadius: 0,
                  padding: "32px 24px", border: "1.5px solid var(--border)",
                  textAlign: "center", transition: "all 0.35s ease",
                  cursor: "pointer",
                }}
                className="resource-card"
                >
                  <div style={{ fontSize: 44, marginBottom: 14 }}>{r.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 15.5, color: "var(--text)", marginBottom: 10, lineHeight: 1.4 }}>{r.title}</h3>
                  <span style={{
                    background: `${r.color}18`, color: r.color,
                    border: `1px solid ${r.color}33`,
                    padding: "5px 14px", borderRadius: 0,
                    fontSize: 12, fontWeight: 700,
                  }}>{r.type}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .featured-img:hover { transform: scale(1.04) !important; }
        .featured-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.4) !important; }
        .newsletter-input:focus { border-color: rgba(99,102,241,0.5) !important; }
        .newsletter-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.5) !important; }
        .resource-card:hover { transform: translateY(-8px); border-color: var(--primary) !important; box-shadow: var(--shadow-md); }
        @media (max-width: 768px) {
          .featured-post { grid-template-columns: 1fr !important; }
          .featured-content { padding: 32px 24px !important; }
          .newsletter-form { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
}
