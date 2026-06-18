"use client";

import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString("ar-EG")}{suffix}</span>;
}

const statsData = {
  ar: [
    {
      icon: "🏆",
      value: 500,
      suffix: "+",
      label: "مشروع ناجح",
      sublabel: "منذ التأسيس",
      color: "#6366f1",
      bg: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    },
    {
      icon: "👥",
      value: 120,
      suffix: "+",
      label: "عميل راضٍ",
      sublabel: "في 15 دولة",
      color: "#10b981",
      bg: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
    },
    {
      icon: "📈",
      value: 340,
      suffix: "%",
      label: "متوسط نمو العملاء",
      sublabel: "في السنة الأولى",
      color: "#f59e0b",
      bg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
    },
    {
      icon: "⭐",
      value: 99,
      suffix: "%",
      label: "معدل الرضا",
      sublabel: "تقييمات موثقة",
      color: "#8b5cf6",
      bg: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
    },
  ],
  en: [
    {
      icon: "🏆",
      value: 500,
      suffix: "+",
      label: "Successful Projects",
      sublabel: "Since launch",
      color: "#6366f1",
      bg: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    },
    {
      icon: "👥",
      value: 120,
      suffix: "+",
      label: "Happy Clients",
      sublabel: "Across 15 countries",
      color: "#10b981",
      bg: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
    },
    {
      icon: "📈",
      value: 340,
      suffix: "%",
      label: "Average Client Growth",
      sublabel: "In the first year",
      color: "#f59e0b",
      bg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
    },
    {
      icon: "⭐",
      value: 99,
      suffix: "%",
      label: "Satisfaction Rate",
      sublabel: "Verified reviews",
      color: "#8b5cf6",
      bg: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
    },
  ],
};

export default function AnimatedStats({ locale = "ar" }: { locale?: string }) {
  const currentStats = statsData[locale === "ar" ? "ar" : "en"];

  return (
    <section style={{
      padding: "100px 24px",
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            padding: "6px 20px",
            borderRadius: 100,
            marginBottom: 20,
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
          }}>
            {locale === "ar" ? "🔥 أرقام تتحدث عن نفسها" : "🔥 Numbers That Speak"}
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: 16,
          }}>
            {locale === "ar" ? "إنجازاتنا بالأرقام" : "Our Achievements in Numbers"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16.5, maxWidth: 480, margin: "0 auto" }}>
            {locale === "ar"
              ? "كل رقم يعكس قصة نجاح حقيقية مع عملائنا حول العالم"
              : "Every number reflects a real success story with our global clients"}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 28,
        }}>
          {currentStats.map((stat, i) => (
            <div key={i} className="stat-card" style={{
              background: stat.bg,
              borderRadius: 24,
              padding: "44px 32px",
              textAlign: "center",
              border: `1.5px solid ${stat.color}22`,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "default",
            }}>
              {/* Glow orb */}
              <div style={{
                position: "absolute",
                bottom: -30, right: -30,
                width: 100, height: 100,
                background: `radial-gradient(circle, ${stat.color}25, transparent)`,
                borderRadius: "50%",
              }} />

              <div style={{
                fontSize: 52,
                marginBottom: 16,
                display: "inline-block",
                animation: `bounce-icon 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}>
                {stat.icon}
              </div>

              <div style={{
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: stat.color,
                lineHeight: 1,
                marginBottom: 10,
              }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
              </div>

              <div style={{
                fontSize: 17,
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: 6,
              }}>
                {stat.label}
              </div>

              <div style={{
                fontSize: 13,
                color: "var(--text-muted)",
                fontWeight: 600,
              }}>
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .stat-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }
      `}</style>
    </section>
  );
}
