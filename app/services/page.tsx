"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";
import type { ServiceDataItem, WhyListItem } from "../lib/data";
import { EMPTY_FORM, buildMailto, validateContact, type ContactForm, type FieldErrors } from "../lib/contact";

export default function ServicesPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { locale, t } = useLanguage();
  const sp = t.servicesPage;
  const qf = sp.quoteForm;
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const ar = locale === "ar";

  function updateField<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key in errors) setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  // No mail backend: a valid form opens the visitor's email app (mailto).
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(form, locale);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof FieldErrors)[]).find(k => found[k]);
    if (firstInvalid) {
      document.getElementById(`quote-${firstInvalid}`)?.focus();
      return;
    }
    const serviceLabel = t.servicesData.find(sv => sv.id === form.service)?.title ?? "";
    const href = buildMailto(sp.quoteEmail, form, serviceLabel, locale);
    setMailtoHref(href);
    window.location.assign(href);
  }

  const fieldStyle = (invalid?: boolean): React.CSSProperties => ({
    width: "100%", padding: "14px 16px", border: `1.5px solid ${invalid ? "#b91c1c" : "var(--border)"}`,
    borderRadius: 0, fontFamily: "inherit", background: "var(--bg)",
  });
  const errorStyle: React.CSSProperties = { color: "#b91c1c", fontSize: 13, fontWeight: 600, margin: "6px 0 0" };

  return (
    <div>
      <section style={{
        background: "#0a0a0a",
        padding: "100px 24px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "3px solid var(--primary)",
      }}>
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
              padding: "6px 20px", borderRadius: 0, marginBottom: 20,
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
            <p style={{ color: "#94a3b8", fontSize: 18, maxWidth: 720, margin: "0 auto", lineHeight: 1.8 }}>
              {sp.subtext}
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "90px 24px 100px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Reveal direction="down">
              <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 13, padding: "6px 18px", borderRadius: 0, marginBottom: 16 }}>
                {sp.gridBadge}
              </span>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--text)", marginBottom: 12 }}>
                {sp.gridTitle}
              </h2>
            </Reveal>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 32 }}>
            {t.servicesData.map((s: ServiceDataItem, i: number) => (
              <Reveal key={s.id} delay={i * 80} direction="up">
                <div
                  id={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: hovered === s.id ? "#0a0a0a" : "var(--bg-card)",
                    borderRadius: "0", padding: 36,
                    border: `1.5px solid ${hovered === s.id ? "transparent" : "var(--border)"}`,
                    boxShadow: hovered === s.id ? "0 24px 60px rgba(99,102,241,0.3)" : "var(--shadow-sm)",
                    transform: hovered === s.id ? "translateY(-10px) scale(1.02)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex", flexDirection: "column", height: "100%",
                    scrollMarginTop: 100,
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
                  }}>{s.icon}</div>
                  <h2 style={{ fontWeight: 800, fontSize: 21, color: hovered === s.id ? "#fff" : "var(--text)", marginBottom: 16 }}>{s.title}</h2>
                  <p style={{ color: hovered === s.id ? "rgba(255,255,255,0.85)" : "var(--text-muted)", fontSize: 14.5, lineHeight: 1.85, marginBottom: 32, flexGrow: 1 }}>{s.shortDesc}</p>
                  <Link href="/contact" style={{
                    marginTop: "auto",
                    textDecoration: "none",
                    background: hovered === s.id ? "var(--primary)" : "#0a0a0a",
                    color: "#fff",
                    padding: "14px 24px",
                    borderRadius: 1,
                    fontWeight: 800,
                    fontSize: 15.5,
                    textAlign: "center",
                    border: hovered === s.id ? "2px solid var(--primary)" : "2px solid #0a0a0a",
                  }}>
                    {t.common.requestService}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal direction="down">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "var(--text)", marginBottom: 12 }}>{sp.quoteTitle}</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 16.5, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>{sp.quoteSubtext}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 24, fontSize: 15 }}>
                <div><strong>{sp.quoteEmailLabel}:</strong> <a href={`mailto:${sp.quoteEmail}`} style={{ color: "var(--primary)" }}>{sp.quoteEmail}</a></div>
                <div><strong>{sp.quotePhoneLabel}:</strong> <a href={`tel:${sp.quotePhone.replace(/\s/g, "")}`} style={{ color: "var(--primary)", direction: "ltr", display: "inline-block" }}>{sp.quotePhone}</a></div>
              </div>
            </div>
          </Reveal>

          {mailtoHref ? (
            <Reveal direction="up">
              <div style={{ textAlign: "center", background: "var(--bg-card)", padding: "48px 32px", border: "1px solid var(--border)" }}>
                <div aria-hidden="true" style={{ fontSize: 56, marginBottom: 16 }}>✉️</div>
                <h3 role="status" style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>
                  {ar ? "طلبك جاهز للإرسال" : "Your request is ready to send"}
                </h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 20 }}>
                  {ar
                    ? <>فتحنا تطبيق البريد لديك ومعه طلبك — اضغط &quot;إرسال&quot; هناك. لم يُفتح؟ راسلنا على <a href={`mailto:${sp.quoteEmail}`} style={{ color: "var(--primary)" }}>{sp.quoteEmail}</a>.</>
                    : <>We opened your email app with your request filled in — press &quot;Send&quot; there. Didn&apos;t open? Email us at <a href={`mailto:${sp.quoteEmail}`} style={{ color: "var(--primary)" }}>{sp.quoteEmail}</a>.</>}
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={mailtoHref} style={{ textDecoration: "none", background: "#0a0a0a", color: "#fff", padding: "12px 24px", fontWeight: 700 }}>
                    {ar ? "فتح البريد مرة أخرى" : "Open email again"}
                  </a>
                  <button type="button" onClick={() => { setMailtoHref(null); setForm(EMPTY_FORM); }} style={{ border: "1.5px solid var(--border)", background: "var(--bg)", color: "var(--text)", padding: "12px 24px", fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
                    {t.common.sendAnother}
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal direction="up" delay={150}>
              <form onSubmit={handleSubmit} noValidate aria-label={qf.submit} style={{
                background: "var(--bg-card)",
                padding: "40px 36px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                display: "flex", flexDirection: "column", gap: 20,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row-2">
                  <div style={{ textAlign: "start" }}>
                    <label htmlFor="quote-name" style={{ display: "block", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qf.fullName} *</label>
                    <input id="quote-name" autoComplete="name" required value={form.name} onChange={e => updateField("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "quote-name-error" : undefined}
                      style={fieldStyle(Boolean(errors.name))} />
                    {errors.name && <p id="quote-name-error" style={errorStyle}>{errors.name}</p>}
                  </div>
                  <div style={{ textAlign: "start" }}>
                    <label htmlFor="quote-email" style={{ display: "block", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qf.email} *</label>
                    <input id="quote-email" autoComplete="email" required type="email" value={form.email} onChange={e => updateField("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "quote-email-error" : undefined}
                      style={fieldStyle(Boolean(errors.email))} />
                    {errors.email && <p id="quote-email-error" style={errorStyle}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row-2">
                  <div style={{ textAlign: "start" }}>
                    <label htmlFor="quote-phone" style={{ display: "block", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qf.phone}</label>
                    <input id="quote-phone" type="tel" autoComplete="tel" value={form.phone} onChange={e => updateField("phone", e.target.value)}
                      style={fieldStyle()} />
                  </div>
                  <div style={{ textAlign: "start" }}>
                    <label htmlFor="quote-service" style={{ display: "block", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qf.interestedIn}</label>
                    <select id="quote-service" value={form.service} onChange={e => updateField("service", e.target.value)}
                      style={fieldStyle()}>
                      <option value="">{qf.chooseService}</option>
                      {t.servicesData.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="quote-message" style={{ display: "block", fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qf.message} *</label>
                  <textarea id="quote-message" required rows={5} value={form.message} onChange={e => updateField("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "quote-message-error" : undefined}
                    style={{ ...fieldStyle(Boolean(errors.message)), resize: "vertical" }} />
                  {errors.message && <p id="quote-message-error" style={errorStyle}>{errors.message}</p>}
                </div>
                <button type="submit" style={{
                  border: "none", cursor: "pointer",
                  background: "#0a0a0a",
                  color: "#fff", padding: "16px 32px", borderRadius: 0,
                  fontWeight: 800, fontSize: 16, fontFamily: "inherit",
                }}>
                  {qf.submit}
                </button>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0, textAlign: "start" }}>
                  {ar ? `يفتح هذا النموذج تطبيق البريد لديك برسالة جاهزة إلى ${sp.quoteEmail}.` : `This form opens your email app with a ready-to-send message to ${sp.quoteEmail}.`}
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </section>

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
                  borderRadius: "0", padding: 32,
                  border: "1px solid var(--border)", height: "100%",
                }}>
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "var(--bg-muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 900, color: "var(--text)", textAlign: "center", marginBottom: 48 }}>
              {t.processData.title}
            </h2>
          </Reveal>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {t.processData.steps.map((step, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div style={{
                  background: i % 2 === 0 ? "#0a0a0a" : "var(--bg-card)",
                  color: i % 2 === 0 ? "#fff" : "var(--text)",
                  borderRadius: 0, padding: "18px 22px",
                  border: i % 2 === 1 ? "1.5px solid var(--border)" : "none",
                  fontWeight: 700, fontSize: 14, textAlign: "center", minWidth: 140,
                }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{step.step}</div>
                  {step.title}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: "110px 24px",
        background: "#000",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <Reveal direction="down">
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            {sp.ctaTitle}
          </h2>
        </Reveal>
        <Reveal direction="up" delay={100}>
          <p style={{ color: "#c7d2fe", fontSize: 18, marginBottom: 44, maxWidth: 540, margin: "0 auto 44px" }}>{sp.ctaSub}</p>
        </Reveal>
        <Reveal direction="up" delay={200}>
          <Link href="/contact" style={{
            textDecoration: "none",
            background: "#fff", color: "var(--primary)",
            padding: "16px 48px", borderRadius: 0, fontWeight: 800, fontSize: 17,
            display: "inline-block",
          }}>
            {sp.ctaBtn} →
          </Link>
        </Reveal>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
