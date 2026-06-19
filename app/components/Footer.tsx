"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer style={{
      background: "#0a0a0a",
      color: "#fff",
      padding: "64px 24px 32px",
      marginTop: 80,
      borderTop: "3px solid var(--primary)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
  
        {/* استبدلنا الـ div بهذا الوسم */}
        <img 
          src="/white.png" 
          alt="Logo" 
          style={{ width: 70, height: 50, objectFit: "unset" }} 
        />

        {/* <span style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", letterSpacing: "-0.5px" }}>
          Ad<span style={{ color: "var(--primary)" }}>Vision</span>
        </span> */}
      </Link>
            <p style={{
              color: "#94a3b8",
              fontSize: 14.5,
              lineHeight: 1.8,
              maxWidth: 320,
              textAlign: "justify"
            }}>
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 20, fontSize: 16, color: "#fff", position: "relative" }}>
              {t.footer.quickLinks}
              <span style={{
                display: "block",
                width: 30,
                height: 2,
                background: "var(--primary)",
                marginTop: 8,
                borderRadius: 0
              }} />
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {t.navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: 14,
                  transition: "all 0.2s",
                  display: "inline-block",
                }}
                className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 20, fontSize: 16, color: "#fff", position: "relative" }}>
              {t.footer.contactUs}
              <span style={{
                display: "block",
                width: 30,
                height: 2,
                background: "var(--primary)",
                marginTop: 8,
                borderRadius: 0
              }} />
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, color: "#94a3b8", fontSize: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>📧</span>
                <a href={`mailto:${t.siteConfig.email}`} style={{ color: "inherit", textDecoration: "none" }}>{t.siteConfig.email}</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>📞</span>
                <span style={{ direction: "ltr" }}>{t.siteConfig.phone}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>📍</span>
                <span>{t.siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #1e293b",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <p style={{ color: "#64748b", fontSize: 13.5 }}>
            © {new Date().getFullYear()} Untold Agency. {t.footer.allRights}
          </p>
          {/* <Link href="/dashboard" style={{
            color: "#818cf8",
            textDecoration: "none",
            fontSize: 13.5,
            fontWeight: 600,
            transition: "color 0.2s"
          }}
          className="admin-dashboard-link"
          >
            {t.footer.adminDashboard}
          </Link> */}
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--primary) !important;
          transform: translateX(${locale === "ar" ? "-4px" : "4px"});
        }
        .admin-dashboard-link:hover {
          color: #fff !important;
        }
      `}</style>
    </footer>
  );
}
