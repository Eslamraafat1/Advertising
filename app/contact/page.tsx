"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../components/LanguageContext";
import Reveal from "../components/Reveal";
import type { InfoItem as OfficeItem } from "../lib/data";
import { EMPTY_FORM, buildMailto, validateContact as validate, type ContactForm as FormState, type FieldErrors } from "../lib/contact";

const whyContactUs = {
  ar: [
    { icon: "⚡", title: "عرض سعر خلال 24 ساعة", desc: "أرسل لنا تفاصيل مشروعك وسنرد عليك بالخطة المناسبة والخطوات التالية." },
    { icon: "🎬", title: "دورة إنتاج كاملة", desc: "من التخطيط والتصوير إلى ما بعد الإنتاج والتعريب والتسليم النهائي." },
    { icon: "🌍", title: "مكاتب في مصر والإمارات", desc: "فريقنا قريب منك لخدمة منطقة الشرق الأوسط وشمال أفريقيا والعملاء حول العالم." },
    { icon: "🇪🇬", title: "إنتاج على أرض الواقع في مصر", desc: "تصاريح وطاقم ومعدات ولوجستيات ومواقع تصوير للإنتاج الدولي." },
  ],
  en: [
    { icon: "⚡", title: "Quote within 24h", desc: "Send us your brief and we will respond with the right plan and next steps." },
    { icon: "🎬", title: "Full Production Cycle", desc: "From planning and filming to post production, localization, and final delivery." },
    { icon: "🌍", title: "Offices in Egypt & UAE", desc: "Close to you, serving MENA and clients worldwide." },
    { icon: "🇪🇬", title: "On-Ground in Egypt", desc: "Permits, crews, gear, logistics, and locations for international shoots." },
  ],
};

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const cp = t.contactPage;
  const offices = cp.offices;
  const whyUs = locale === "ar" ? whyContactUs.ar : whyContactUs.en;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const ar = locale === "ar";
  const serviceOptions = t.servicesData.map(sv => ({ id: sv.id, label: sv.title }));

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key in errors) setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  // The site has no mail backend: a valid form opens the visitor's email app
  // with the message pre-filled (mailto). Nothing is sent from the browser.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(form, locale);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof FieldErrors)[]).find(k => found[k]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    const serviceLabel = serviceOptions.find(o => o.id === form.service)?.label ?? "";
    const href = buildMailto(cp.email, form, serviceLabel, locale);
    setMailtoHref(href);
    window.scrollTo({ top: 0 });
    window.location.assign(href);
  }

  if (mailtoHref) {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "var(--bg)" }}>
        <Reveal direction="down">
          <div style={{
            textAlign: "center",
            background: "var(--bg-card)",
            borderRadius: 0,
            padding: "72px 56px",
            border: "1.5px solid var(--border)",
            maxWidth: 520,
            boxShadow: "0 24px 60px rgba(99,102,241,0.15)",
          }}>
            <div aria-hidden="true" style={{ fontSize: 64, marginBottom: 24 }}>✉️</div>
            <h2 role="status" style={{ fontWeight: 900, fontSize: 28, color: "var(--text)", marginBottom: 14 }}>
              {ar ? "رسالتك جاهزة للإرسال" : "Your message is ready to send"}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
              {ar
                ? `شكراً ${form.name.trim()}. فتحنا تطبيق البريد لديك ومعه رسالتك جاهزة — اضغط "إرسال" هناك لتصلنا.`
                : `Thanks ${form.name.trim()}. We opened your email app with your message filled in — press "Send" there to reach us.`}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.8, marginBottom: 32 }}>
              {ar ? "لم يُفتح تطبيق البريد؟ راسلنا مباشرة على " : "Email app didn't open? Write to us directly at "}
              <a href={`mailto:${cp.email}`} style={{ color: "var(--primary)", fontWeight: 700, direction: "ltr", display: "inline-block" }}>{cp.email}</a>
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={mailtoHref} style={{
                textDecoration: "none",
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                color: "#fff", padding: "14px 28px", borderRadius: 0,
                fontWeight: 700, fontSize: 15.5, display: "inline-block",
              }}>
                {ar ? "فتح البريد مرة أخرى" : "Open email again"}
              </a>
              <button onClick={() => { setMailtoHref(null); setForm(EMPTY_FORM); setErrors({}); setStep(1); }}
                style={{
                  border: "2px solid #0a0a0a", cursor: "pointer",
                  background: "#0a0a0a",
                  color: "#fff", padding: "14px 32px", borderRadius: 0,
                  fontWeight: 700, fontSize: 15.5,
                  fontFamily: "inherit",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  transition: "all 0.25s ease",
                }}
                className="success-btn"
              >
                {t.common.sendAnother}
              </button>
              <Link href="/" style={{
                textDecoration: "none",
                border: "1.5px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
                padding: "14px 28px", borderRadius: 0,
                fontWeight: 600, fontSize: 15.5,
                display: "inline-block",
                transition: "all 0.25s ease",
              }}>
                {locale === "ar" ? "← العودة للرئيسية" : "← Back to Home"}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  const inputStyle = (fieldName: string): React.CSSProperties => ({
    width: "100%", padding: "14px 18px",
    border: `1.5px solid ${focusedField === fieldName ? "var(--primary)" : "var(--border)"}`,
    borderRadius: 0, fontSize: 15,
    fontFamily: "inherit", outline: "none",
    background: focusedField === fieldName ? "rgba(99,102,241,0.04)" : "var(--bg)",
    color: "var(--text)",
    transition: "all 0.25s ease",
    direction: locale === "ar" ? "rtl" : "ltr",
    textAlign: locale === "ar" ? "right" : "left",
    boxShadow: focusedField === fieldName ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
  });

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
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(99,102,241,0.15) 1.5px, transparent 1.5px)", backgroundSize: "36px 36px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <Reveal direction="down">
            <span style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc",
              fontWeight: 700, fontSize: 13,
              padding: "6px 20px", borderRadius: 0, marginBottom: 20,
            }}>{cp.badge}</span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
              {cp.title}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p style={{ color: "#94a3b8", fontSize: 17.5, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              {cp.subtext}
            </p>
          </Reveal>

          {/* Office cities */}
          <Reveal direction="up" delay={350}>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 48, flexWrap: "wrap" }}>
              {offices.map((office, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14, padding: "12px 22px",
                  display: "flex", alignItems: "center", gap: 10,
                  transition: "all 0.25s ease",
                }}
                className="office-chip"
                >
                  <span style={{ fontSize: 22 }}>{office.flag}</span>
                  <div style={{ textAlign: "start" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{office.title}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{office.status} · {office.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why Contact Us ────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--bg-card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
            {whyUs.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  padding: "20px 0",
                }}>
                  <div style={{
                    width: 52, height: 52, flexShrink: 0,
                    background: "var(--primary-light)",
                    borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24,
                  }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75 }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Info ───────────────── */}
      <section style={{ padding: "80px 24px 100px", background: "var(--bg)" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          gap: 52,
          alignItems: "start",
        }} className="contact-split">

          {/* Info Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal direction="right">
              <h3 style={{ fontWeight: 800, fontSize: 19, color: "var(--text)", marginBottom: 4, textAlign: "start" }}>
                {cp.infoTitle}
              </h3>
            </Reveal>
            <Reveal direction="right" delay={50}>
              <div style={{
                background: "var(--bg-card)",
                borderRadius: 0, padding: "20px 22px",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "flex-start", gap: 14,
                textAlign: "start",
                transition: "all 0.3s ease",
              }}
              className="info-card"
              >
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: "var(--primary-light)",
                  borderRadius: 12, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22,
                }}>📧</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>
                    {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </div>
                  <a href={`mailto:${cp.email}`} style={{ fontWeight: 700, fontSize: 15.5, color: "var(--text)", textDecoration: "none", direction: "ltr", display: "inline-block" }}>
                    {cp.email}
                  </a>
                </div>
              </div>
            </Reveal>
            {offices.map((office: OfficeItem, i: number) => (
              <Reveal key={i} delay={(i + 1) * 100} direction="right">
                <div style={{
                  background: "var(--bg-card)",
                  borderRadius: 0, padding: "20px 22px",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "flex-start", gap: 14,
                  textAlign: "start",
                  transition: "all 0.3s ease",
                }}
                className="info-card"
                >
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: "var(--primary-light)",
                    borderRadius: 12, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 22,
                  }}>{office.flag}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontWeight: 800, fontSize: 15.5, color: "var(--text)" }}>{office.title}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>
                        {locale === "ar" ? "عنوان المكتب" : "Office Address"}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text)", lineHeight: 1.6 }}>{office.address}</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>
                        {locale === "ar" ? "رقم الهاتف" : "Phone Number"}
                      </div>
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} style={{ fontWeight: 700, fontSize: 15.5, color: "var(--text)", textDecoration: "none", direction: "ltr", display: "inline-block" }}>
                        {office.phone}
                      </a>
                    </div>
                    {"email" in office && office.email && (
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--text-muted)", marginBottom: 4 }}>
                          {locale === "ar" ? "البريد الإلكتروني" : "Email Address"}
                        </div>
                        <a href={`mailto:${office.email}`} style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text)", textDecoration: "none", direction: "ltr", display: "inline-block" }}>
                          {office.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

          </div>

          {/* Form */}
          <Reveal direction="left" delay={150}>
            <form onSubmit={handleSubmit} noValidate aria-label={cp.formTitle} style={{
              background: "var(--bg-card)",
              borderRadius: 2, padding: "44px 40px",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
              display: "flex", flexDirection: "column", gap: 24,
            }}
            className="contact-form"
            >
              {/* Step indicator */}
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{
                    flex: 1, height: 4, borderRadius: 0,
                    background: s <= step ? "linear-gradient(90deg, var(--primary), var(--primary-dark))" : "var(--border)",
                    transition: "background 0.4s ease",
                  }} />
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 8 }}>
                {locale === "ar" ? `الخطوة ${step} من 3` : `Step ${step} of 3`}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row-2">
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="contact-name" style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>{cp.labels.name}</label>
                  <input id="contact-name" name="name" autoComplete="name" required style={inputStyle("name")} placeholder={cp.placeholders.name}
                    aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined}
                    value={form.name} onChange={e => { updateField("name", e.target.value); if (e.target.value.trim().length >= 2) setStep(s => Math.max(s, 2)); }}
                    onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                    className="form-input" />
                  {errors.name && <p id="contact-name-error" className="field-error">{errors.name}</p>}
                </div>
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="contact-email" style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>{cp.labels.email}</label>
                  <input id="contact-email" name="email" autoComplete="email" required type="email" style={inputStyle("email")} placeholder={cp.placeholders.email}
                    aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}
                    value={form.email} onChange={e => updateField("email", e.target.value)}
                    onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                    className="form-input" />
                  {errors.email && <p id="contact-email-error" className="field-error">{errors.email}</p>}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="form-row-2">
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="contact-phone" style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>{cp.labels.phone}</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" style={inputStyle("phone")} placeholder={cp.placeholders.phone}
                    value={form.phone} onChange={e => updateField("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                    className="form-input" />
                </div>
                <div style={{ textAlign: "start" }}>
                  <label htmlFor="contact-service" style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>{cp.labels.service}</label>
                  <select id="contact-service" name="service" style={{ ...inputStyle("service") }}
                    value={form.service} onChange={e => { updateField("service", e.target.value); if (e.target.value) setStep(3); }}
                    onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)}
                    className="form-input">
                    <option value="">{cp.labels.chooseService}</option>
                    {serviceOptions.map(o => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget selector */}
              <div style={{ textAlign: "start" }}>
                <label style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 12 }}>
                  {locale === "ar" ? "الميزانية التقريبية:" : "Approximate Budget:"}
                </label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["< $5,000", "$5,000 - $20,000", "$20,000 - $50,000", "$50,000+"].map((b, i) => (
                    <button
                      key={i} type="button"
                      aria-pressed={form.budget === b}
                      onClick={() => updateField("budget", form.budget === b ? "" : b)}
                      style={{
                        background: form.budget === b
                          ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
                          : "var(--bg)",
                        color: form.budget === b ? "#fff" : "var(--text-muted)",
                        border: `1.5px solid ${form.budget === b ? "var(--primary)" : "var(--border)"}`,
                        padding: "9px 16px", borderRadius: 0,
                        fontSize: 13, fontWeight: 700, cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.25s ease",
                      }}
                    >{b}</button>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "start" }}>
                <label htmlFor="contact-message" style={{ display: "block", fontWeight: 700, fontSize: 13.5, color: "var(--text)", marginBottom: 8 }}>{cp.labels.message}</label>
                <textarea id="contact-message" name="message" required rows={5} style={{ ...inputStyle("message"), resize: "vertical" }}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}
                  placeholder={cp.placeholders.message}
                  value={form.message} onChange={e => updateField("message", e.target.value)}
                  onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                  className="form-input" />
                {errors.message && <p id="contact-message-error" className="field-error">{errors.message}</p>}
              </div>

              <button type="submit" style={{
                border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                color: "#fff",
                padding: "17px 32px",
                borderRadius: 1,
                fontWeight: 800, fontSize: 16.5,
                fontFamily: "inherit",
                boxShadow: "0 6px 24px rgba(99,102,241,0.32)",
                transition: "all 0.25s ease",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
              className="submit-btn"
              >
                {`${t.common.submitBtn} ${ar ? "←" : "→"}`}
              </button>
              <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.7, margin: 0, textAlign: "start" }}>
                {ar
                  ? `يفتح هذا النموذج تطبيق البريد لديك برسالة جاهزة إلى ${cp.email}.`
                  : `This form opens your email app with a ready-to-send message to ${cp.email}.`}
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ── Map / Locations Banner ────────────── */}
      <section style={{
        padding: "80px 24px",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Reveal direction="down">
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, color: "var(--text)", marginBottom: 16 }}>
              🌍 {cp.officesSectionTitle}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 52 }}>
              {cp.officesSectionSubtext}
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 720, margin: "0 auto" }}>
            {offices.map((office, i) => (
              <Reveal key={i} direction="up" delay={i * 120}>
                <div style={{
                  background: i === 0
                    ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
                    : "var(--bg-card)",
                  borderRadius: 0, padding: "36px 28px",
                  border: i === 0 ? "none" : "1.5px solid var(--border)",
                  boxShadow: i === 0 ? "0 12px 36px rgba(99,102,241,0.3)" : "var(--shadow-sm)",
                  textAlign: "center",
                  transition: "all 0.35s ease",
                }}
                className="office-card"
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{office.flag}</div>
                  <h3 style={{ fontWeight: 900, fontSize: 20, color: i === 0 ? "#fff" : "var(--text)", marginBottom: 6 }}>{office.title}</h3>
                  <p style={{ color: i === 0 ? "rgba(255,255,255,0.75)" : "var(--text-muted)", fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}>{office.address}</p>
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`} style={{
                    color: i === 0 ? "#fff" : "var(--primary)",
                    fontWeight: 700, fontSize: 15, textDecoration: "none",
                    direction: "ltr", display: "inline-block", marginBottom: 14,
                  }}>{office.phone}</a>
                  <br />
                  <span style={{
                    background: i === 0 ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                    color: i === 0 ? "#fff" : "var(--primary)",
                    border: i === 0 ? "1px solid rgba(255,255,255,0.3)" : "none",
                    padding: "5px 14px", borderRadius: 0,
                    fontSize: 12, fontWeight: 700,
                  }}>{office.status}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pop-in { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .info-card:hover { border-color: var(--primary) !important; transform: translateX(4px); box-shadow: var(--shadow-sm); }
        .field-error { color: #b91c1c; font-size: 13px; font-weight: 600; margin: 6px 0 0; }
        .office-chip:hover { background: rgba(255,255,255,0.12) !important; }
        .form-input:focus { border-color: var(--primary) !important; }
        .submit-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 10px 28px rgba(99,102,241,0.45) !important; }
        .success-btn:hover { transform: translateY(-2px); }
        .office-card:hover { transform: translateY(-6px); }
        @media (max-width: 768px) {
          .contact-split { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-row-2 { grid-template-columns: 1fr !important; gap: 20px !important; }
          .contact-form { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  );
}
