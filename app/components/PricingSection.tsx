"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function PricingSection() {
  const { t } = useLanguage();
  const hd = t.homeData;

  return (
    <section style={{
      padding: "110px 24px",
      background: "linear-gradient(180deg, var(--bg-muted) 0%, var(--bg) 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
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
            {hd.quoteBadge}
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: 16,
          }}>
            {hd.quoteTitle}
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 28,
          marginBottom: 48,
        }}>
          {hd.quoteSteps.map((step, i) => (
            <div key={i} style={{
              background: i === 1 ? "#0a0a0a" : "var(--bg-card)",
              borderRadius: 0,
              padding: "40px 32px",
              border: i === 1 ? "none" : "1.5px solid var(--border)",
              borderLeft: i === 1 ? "3px solid var(--primary)" : undefined,
              textAlign: "center",
              boxShadow: i === 1 ? "0 24px 60px rgba(0,0,0,0.25)" : "var(--shadow-sm)",
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: 20, color: i === 1 ? "#fff" : "var(--text)", marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: i === 1 ? "rgba(255,255,255,0.8)" : "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          {hd.quotePillars.map((pillar, i) => (
            <span key={i} style={{
              background: "var(--primary-light)",
              color: "var(--primary)",
              padding: "10px 20px",
              borderRadius: 0,
              fontSize: 13.5,
              fontWeight: 700,
              border: "1px solid rgba(99,102,241,0.2)",
            }}>{pillar}</span>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/contact" style={{
            textDecoration: "none",
            background: "#0a0a0a",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: 0,
            fontWeight: 800,
            fontSize: 16,
            display: "inline-block",
            border: "2px solid #0a0a0a",
          }}>
            {t.common.contactUs} →
          </Link>
        </div>
      </div>
    </section>
  );
}
