// Shared helpers for the contact / quote forms.
// The site has no mail backend, so a valid form opens the visitor's email app
// with a pre-filled message (mailto:) instead of pretending to send it.

export type ContactForm = { name: string; email: string; phone: string; service: string; message: string; budget: string };
export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export const EMPTY_FORM: ContactForm = { name: "", email: "", phone: "", service: "", message: "", budget: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(form: ContactForm, locale: string): FieldErrors {
  const ar = locale === "ar";
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = ar ? "يرجى إدخال الاسم (حرفان على الأقل)." : "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = ar ? "يرجى إدخال بريد إلكتروني صحيح." : "Please enter a valid email address.";
  if (form.message.trim().length < 10) errors.message = ar ? "يرجى كتابة رسالة (10 أحرف على الأقل)." : "Please write a message (at least 10 characters).";
  return errors;
}

export function buildMailto(to: string, form: ContactForm, serviceLabel: string, locale: string): string {
  const ar = locale === "ar";
  const subject = ar ? `طلب مشروع من ${form.name.trim()}` : `Project enquiry from ${form.name.trim()}`;
  const lines = [
    `${ar ? "الاسم" : "Name"}: ${form.name.trim()}`,
    `${ar ? "البريد الإلكتروني" : "Email"}: ${form.email.trim()}`,
  ];
  if (form.phone.trim()) lines.push(`${ar ? "الهاتف" : "Phone"}: ${form.phone.trim()}`);
  if (serviceLabel) lines.push(`${ar ? "الخدمة" : "Service"}: ${serviceLabel}`);
  if (form.budget) lines.push(`${ar ? "الميزانية" : "Budget"}: ${form.budget}`);
  lines.push("", form.message.trim());
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
