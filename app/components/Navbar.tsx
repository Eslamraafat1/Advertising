"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t, toggleLocale } = useLanguage();

  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "var(--shadow-sm)",
    }}>
      {t.showAnnouncementBar && t.announcementBar && (
        <div style={{
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          color: "#fff",
          padding: "10px 24px",
          textAlign: "center",
          fontSize: 13.5,
          fontWeight: 600,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.5s ease"
        }}>
          {t.announcementBar}
        </div>
      )}
      <nav style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40,
            background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 20,
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
          }}>A</div>
          <span style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", letterSpacing: "-0.5px" }}>
            Ad<span style={{ color: "var(--primary)" }}>Vision</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }} className="desktop-nav">
          {t.navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: pathname === link.href ? 600 : 500,
              color: pathname === link.href ? "var(--primary)" : "var(--text-muted)",
              background: pathname === link.href ? "var(--primary-light)" : "transparent",
              transition: "all 0.25s ease",
            }}>
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 12px" }} />

          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            style={{
              background: "var(--bg-muted)",
              border: "1.5px solid var(--border)",
              color: "var(--text)",
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s ease",
            }}
            className="lang-toggle-btn"
          >
            🌐 {locale === "ar" ? "English" : "العربية"}
          </button>

          {/* Dashboard Button */}
          {/* <Link href="/dashboard" style={{
            marginInlineStart: 8,
            textDecoration: "none",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
            transition: "all 0.2s",
          }}>
            {t.common.dashboardBtn}
          </Link> */}
        </div>

        {/* Mobile Actions (Language Toggle + Hamburger) */}
        <div style={{ display: "none", gap: 12, alignItems: "center" }} className="mobile-actions">
          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLocale}
            style={{
              background: "var(--bg-muted)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "5px 10px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🌐 {locale === "ar" ? "EN" : "عربي"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none",
              fontSize: 24, cursor: "pointer", color: "var(--text)",
              padding: 4,
            }}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border)",
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          boxShadow: "var(--shadow-md)",
        }}>
          {t.navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: pathname === link.href ? 600 : 500,
                color: pathname === link.href ? "var(--primary)" : "var(--text)",
                background: pathname === link.href ? "var(--primary-light)" : "transparent",
              }}>
                {link.label}
            </Link>
          ))}
          <Link href="/dashboard"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 10,
              textDecoration: "none",
              padding: "11px 16px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              textAlign: "center",
            }}>
              {t.common.dashboardBtn}
          </Link>
        </div>
      )}

      <style>{`
        .lang-toggle-btn:hover {
          background: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </nav>
    </div>
  );
}
