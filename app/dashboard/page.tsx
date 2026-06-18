"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────
type Stats = { totalClients: number; activeCampaigns: number; monthlyImpressions: number; conversionRate: number; monthlyRevenue: number; newLeadsThisMonth: number };
type Campaign = { id: number; name: string; client: string; status: string; budget: number; spent: number; impressions: number; clicks: number; conversions: number; startDate: string; endDate: string };
type Lead = { id: number; name: string; email: string; service: string; date: string; status: string };
type MonthData = { month: string; revenue: number; leads: number; campaigns: number };

type LangConfig = {
  siteConfig: {
    name: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    workingHours: string;
  };
  heroData: {
    badge: string;
    headline1: string;
    headline2: string;
    subtext: string;
    cta1: string;
    cta2: string;
  };
  announcementBar: string;
  showAnnouncementBar: boolean;
};

type ApiData = {
  stats: Stats;
  campaigns: Campaign[];
  recentLeads: Lead[];
  monthlyData: MonthData[];
  ar: LangConfig;
  en: LangConfig;
};

// ─── Status Config ────────────────────────────────────────
const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  active:    { bg: "#dcfce7", color: "#15803d", label: "نشط ✓" },
  paused:    { bg: "#fef9c3", color: "#b45309", label: "موقوف ⏸" },
  completed: { bg: "#e0e7ff", color: "#4f46e5", label: "مكتمل ✅" },
  new:       { bg: "#e0e7ff", color: "#4f46e5", label: "جديد 🔵" },
  contacted: { bg: "#fef9c3", color: "#b45309", label: "تم التواصل" },
  proposal:  { bg: "#fce7f3", color: "#be185d", label: "عرض مُرسل" },
  won:       { bg: "#dcfce7", color: "#15803d", label: "مُغلق 🏆" },
};

// ─── Helpers ──────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const s = STATUS[status] ?? { bg: "#f1f5f9", color: "#64748b", label: status };
  return <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>{s.label}</span>;
}

function StatCard({ icon, label, value, sub, accent }: { icon: string; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{ background: accent ? "linear-gradient(135deg, var(--primary), var(--primary-dark))" : "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: "22px 24px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontSize: 13, color: accent ? "#c7d2fe" : "var(--text-muted)", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontWeight: 900, fontSize: 26, color: accent ? "#fff" : "var(--text)" }}>{value}</div>
      {sub && <div style={{ color: accent ? "#a5b4fc" : "var(--text-light)", fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function BarChart({ data }: { data: MonthData[] }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{(d.revenue / 1000).toFixed(0)}k</span>
          <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${Math.max((d.revenue / max) * 100, 4)}%`, background: "linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%)", borderRadius: "6px 6px 0 0", transition: "height 0.5s ease", minHeight: 4 }} />
          </div>
          <span style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Edit Content Modal ───────────────────────────────────
function EditContentModal({
  arContent,
  enContent,
  onClose,
  onSave,
}: {
  arContent: LangConfig;
  enContent: LangConfig;
  onClose: () => void;
  onSave: (ar: LangConfig, en: LangConfig) => void;
}) {
  const [activeTab, setActiveTab] = useState<"ar" | "en">("ar");
  const [arForm, setArForm] = useState(arContent);
  const [enForm, setEnForm] = useState(enContent);

  const inp = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid var(--border)",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    background: "var(--bg)",
    color: "var(--text)",
    outline: "none",
  };

  const handleSave = () => {
    onSave(arForm, enForm);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: 36, maxWidth: 640, width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, color: "var(--text)" }}>✏️ تعديل محتوى الموقع / Edit Site Content</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1.5px solid var(--border)", paddingBottom: 10 }}>
          <button
            onClick={() => setActiveTab("ar")}
            style={{
              padding: "8px 16px",
              background: activeTab === "ar" ? "var(--primary-light)" : "transparent",
              color: activeTab === "ar" ? "var(--primary)" : "var(--text-muted)",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            🇸🇦 العربية (Arabic)
          </button>
          <button
            onClick={() => setActiveTab("en")}
            style={{
              padding: "8px 16px",
              background: activeTab === "en" ? "var(--primary-light)" : "transparent",
              color: activeTab === "en" ? "var(--primary)" : "var(--text-muted)",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            🇬🇧 English
          </button>
        </div>

        {activeTab === "ar" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, direction: "rtl", textAlign: "right" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>شارة الهيرو (Hero Badge)</label>
              <input style={inp} value={arForm.heroData.badge} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, badge: e.target.value } })} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>العنوان الأول (Headline 1)</label>
                <input style={inp} value={arForm.heroData.headline1} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, headline1: e.target.value } })} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>العنوان الثاني (الملون)</label>
                <input style={inp} value={arForm.heroData.headline2} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, headline2: e.target.value } })} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>النص التعريفي للهيرو (Hero Subtext)</label>
              <textarea rows={3} style={{ ...inp, resize: "vertical" }} value={arForm.heroData.subtext} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, subtext: e.target.value } })} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>نص زر البداية (CTA 1)</label>
                <input style={inp} value={arForm.heroData.cta1} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, cta1: e.target.value } })} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>نص زر الخدمات (CTA 2)</label>
                <input style={inp} value={arForm.heroData.cta2} onChange={e => setArForm({ ...arForm, heroData: { ...arForm.heroData, cta2: e.target.value } })} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>نص شريط الإعلانات (Announcement Bar)</label>
              <input style={inp} value={arForm.announcementBar} onChange={e => setArForm({ ...arForm, announcementBar: e.target.value })} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="checkbox" id="arShowBar" checked={arForm.showAnnouncementBar} onChange={e => setArForm({ ...arForm, showAnnouncementBar: e.target.checked })} style={{ width: 18, height: 18, cursor: "pointer" }} />
              <label htmlFor="arShowBar" style={{ fontWeight: 600, fontSize: 14, color: "var(--text)", cursor: "pointer" }}>تفعيل شريط الإعلانات باللغة العربية</label>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18, direction: "ltr", textAlign: "left" }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>Hero Badge</label>
              <input style={inp} value={enForm.heroData.badge} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, badge: e.target.value } })} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>Headline 1</label>
                <input style={inp} value={enForm.heroData.headline1} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, headline1: e.target.value } })} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>Headline 2 (Colored)</label>
                <input style={inp} value={enForm.heroData.headline2} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, headline2: e.target.value } })} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>Hero Subtext</label>
              <textarea rows={3} style={{ ...inp, resize: "vertical" }} value={enForm.heroData.subtext} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, subtext: e.target.value } })} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>CTA 1 Button Label</label>
                <input style={inp} value={enForm.heroData.cta1} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, cta1: e.target.value } })} />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>CTA 2 Button Label</label>
                <input style={inp} value={enForm.heroData.cta2} onChange={e => setEnForm({ ...enForm, heroData: { ...enForm.heroData, cta2: e.target.value } })} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: 13, color: "var(--text-muted)", marginBottom: 7 }}>Announcement Bar Text</label>
              <input style={inp} value={enForm.announcementBar} onChange={e => setEnForm({ ...enForm, announcementBar: e.target.value })} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="checkbox" id="enShowBar" checked={enForm.showAnnouncementBar} onChange={e => setEnForm({ ...enForm, showAnnouncementBar: e.target.checked })} style={{ width: 18, height: 18, cursor: "pointer" }} />
              <label htmlFor="enShowBar" style={{ fontWeight: 600, fontSize: 14, color: "var(--text)", cursor: "pointer" }}>Enable English Announcement Bar</label>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button onClick={handleSave} style={{ flex: 1, border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 800, fontSize: 15, fontFamily: "inherit" }}>
            💾 حفظ التغييرات / Save Content
          </button>
          <button onClick={onClose} style={{ flex: 1, border: "1.5px solid var(--border)", cursor: "pointer", background: "none", color: "var(--text)", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, fontFamily: "inherit" }}>
            إلغاء / Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"overview" | "campaigns" | "leads" | "content">("overview");
  const [editOpen, setEditOpen] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    fetch("/api/ads")
      .then(r => r.json())
      .then((d: ApiData) => { setData(d); setLoading(false); })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("حدث خطأ أثناء تحميل بيانات الداشبورد. يرجى إعادة المحاولة لاحقاً.");
        setLoading(false);
      });
  }, []);

  async function handleSaveContent(ar: LangConfig, en: LangConfig) {
    if (!data) return;
    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ar, en }),
      });
      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success) {
          setData({ ...data, ar, en });
          setSavedMsg("✅ تم حفظ التغييرات في قاعدة البيانات بنجاح!");
        } else {
          setSavedMsg("❌ خطأ أثناء حفظ التغييرات.");
        }
      } else {
        setSavedMsg("❌ فشل الاتصال بالخادم لحفظ التغييرات.");
      }
    } catch (e) {
      console.error("Error saving content:", e);
      setSavedMsg("❌ حدث خطأ غير متوقع.");
    }
    setEditOpen(false);
    setTimeout(() => setSavedMsg(""), 4000);
  }

  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "var(--text-muted)", fontSize: 17 }}>جارٍ تحميل البيانات...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 520, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>تعذّر تحميل لوحة التحكم</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 22 }}>{error}</p>
        <button onClick={() => { setLoading(true); setError(""); window.location.reload(); }} style={{ border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14 }}>إعادة المحاولة</button>
      </div>
    </div>
  );

  if (!data) return null;
  const { stats, campaigns, recentLeads, monthlyData } = data;

  const tabs = [
    { id: "overview", label: "📊 نظرة عامة" },
    { id: "campaigns", label: "🎯 الحملات" },
    { id: "leads", label: "👥 العملاء" },
    { id: "content", label: "✏️ محتوى الموقع" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "0 0 80px" }}>
      {/* Announcement bars preview */}
      {data.ar.showAnnouncementBar && (
        <div style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "10px 24px", textAlign: "center", fontSize: 13.5, fontWeight: 600 }}>
          📢 (العربية) {data.ar.announcementBar}
        </div>
      )}
      {data.en.showAnnouncementBar && (
        <div style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "10px 24px", textAlign: "center", fontSize: 13.5, fontWeight: 600 }}>
          📢 (English) {data.en.announcementBar}
        </div>
      )}

      {/* Dashboard Header */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "24px 32px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: 26, color: "var(--text)", marginBottom: 4 }}>🎛️ لوحة تحكم الإدارة</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>إدارة كاملة لأداء الوكالة وتعديل محتوى الموقع</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {savedMsg && <span style={{ color: "#16a34a", fontWeight: 600, fontSize: 14 }}>{savedMsg}</span>}
            <button onClick={() => setEditOpen(true)} style={{ border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "10px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, fontFamily: "inherit" }}>
              ✏️ تعديل الموقع
            </button>
            <Link href="/" style={{ textDecoration: "none", fontSize: 14, fontWeight: 600, color: "var(--primary)", padding: "10px 20px", border: "1.5px solid var(--primary-light)", borderRadius: 10, background: "var(--primary-light)" }}>
              ← الموقع
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 0" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "2px solid var(--border)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ border: "none", background: "none", cursor: "pointer", padding: "10px 20px", fontFamily: "inherit", fontWeight: 600, fontSize: 14, color: tab === t.id ? "var(--primary)" : "var(--text-muted)", borderBottom: `3px solid ${tab === t.id ? "var(--primary)" : "transparent"}`, marginBottom: -2, transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Overview ─────────────────────────────── */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 18 }}>
              <StatCard accent icon="💰" label="الإيرادات الشهرية" value={`${stats.monthlyRevenue.toLocaleString("ar")} ريال`} sub="يونيو ٢٠٢٥" />
              <StatCard icon="👥" label="إجمالي العملاء" value={stats.totalClients.toString()} sub="عميل نشط" />
              <StatCard icon="🎯" label="الحملات النشطة" value={stats.activeCampaigns.toString()} sub="حملة الآن" />
              <StatCard icon="👁" label="المشاهدات الشهرية" value={`${(stats.monthlyImpressions / 1000000).toFixed(1)}م`} sub="هذا الشهر" />
              <StatCard icon="📈" label="معدل التحويل" value={`${stats.conversionRate}%`} sub="متوسط الحملات" />
              <StatCard icon="🌟" label="عملاء جدد" value={stats.newLeadsThisMonth.toString()} sub="هذا الشهر" />
            </div>

            {/* Chart + Quick Lists */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: 28, border: "1px solid var(--border)" }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 20 }}>📈 الإيرادات الشهرية (ريال)</h3>
                <BarChart data={monthlyData} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: 22, border: "1px solid var(--border)" }}>
                  <h4 style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 14 }}>🎯 أحدث الحملات</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {campaigns.slice(0, 3).map(c => (
                      <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                        <Badge status={c.status} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: 22, border: "1px solid var(--border)" }}>
                  <h4 style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 14 }}>👥 أحدث العملاء</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {recentLeads.slice(0, 3).map(l => (
                      <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{l.name}</span>
                        <Badge status={l.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Table */}
            <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>📅 الأداء الشهري</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "var(--bg-muted)" }}>
                      {["الشهر", "الإيرادات", "العملاء الجدد", "الحملات"].map(h => (
                        <th key={h} style={{ padding: "12px 20px", textAlign: "right", fontWeight: 600, color: "var(--text-muted)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((m, i) => (
                      <tr key={i} style={{ borderTop: "1px solid var(--border)", background: i % 2 ? "var(--bg-muted)" : "transparent" }}>
                        <td style={{ padding: "13px 20px", fontWeight: 700, color: "var(--text)" }}>{m.month}</td>
                        <td style={{ padding: "13px 20px", color: "var(--primary)", fontWeight: 700 }}>{m.revenue.toLocaleString("ar")} ريال</td>
                        <td style={{ padding: "13px 20px", color: "var(--text)" }}>{m.leads}</td>
                        <td style={{ padding: "13px 20px", color: "var(--text)" }}>{m.campaigns}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Campaigns ─────────────────────────────── */}
        {tab === "campaigns" && (
          <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>جميع الحملات الإعلانية ({campaigns.length})</h2>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>آخر تحديث: يونيو ٢٠٢٥</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "var(--bg-muted)" }}>
                    {["الحملة", "العميل", "الميزانية", "المُنفق %", "المشاهدات", "الضغطات", "التحويلات", "الحالة"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => {
                    const pct = Math.round((c.spent / c.budget) * 100);
                    return (
                      <tr key={c.id} style={{ borderTop: "1px solid var(--border)", background: i % 2 ? "var(--bg-muted)" : "transparent" }}>
                        <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap" }}>{c.name}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-muted)" }}>{c.client}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text)", fontWeight: 600 }}>{c.budget.toLocaleString("ar")} ر</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 90 }}>
                            <span style={{ fontWeight: 700, color: pct > 80 ? "#dc2626" : "var(--text)", fontSize: 13 }}>{pct}%</span>
                            <div style={{ height: 5, background: "var(--border)", borderRadius: 3 }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: pct > 80 ? "#dc2626" : "var(--primary)", borderRadius: 3, transition: "width 0.5s" }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", color: "var(--text-muted)" }}>{c.impressions.toLocaleString("ar")}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-muted)" }}>{c.clicks.toLocaleString("ar")}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text)", fontWeight: 600 }}>{c.conversions}</td>
                        <td style={{ padding: "14px 16px" }}><Badge status={c.status} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Leads ─────────────────────────────────── */}
        {tab === "leads" && (
          <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>العملاء المحتملون ({recentLeads.length})</h2>
            </div>
            <div>
              {recentLeads.map((lead, i) => (
                <div key={lead.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderTop: i > 0 ? "1px solid var(--border)" : "none", background: i % 2 ? "var(--bg-muted)" : "transparent", flexWrap: "wrap" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                    {lead.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{lead.name}</div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{lead.email}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", minWidth: 130 }}>🛠️ {lead.service}</div>
                  <div style={{ fontSize: 13, color: "var(--text-light)", minWidth: 100 }}>📅 {lead.date}</div>
                  <Badge status={lead.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Website Content Editor ─────────────────── */}
        {tab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="dashboard-content-grid">
              
              {/* Arabic Content */}
              <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: 32, direction: "rtl", textAlign: "right" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <h2 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>🇸🇦 المحتوى العربي</h2>
                  <button onClick={() => setEditOpen(true)} style={{ border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>
                    ✏️ تعديل الكل
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "شارة الهيرو", value: data.ar.heroData.badge },
                    { label: "عنوان الهيرو الرئيسي", value: `${data.ar.heroData.headline1} ${data.ar.heroData.headline2}` },
                    { label: "النص التعريفي للهيرو", value: data.ar.heroData.subtext },
                    { label: "شريط الإعلانات", value: data.ar.announcementBar },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "var(--bg-muted)", borderRadius: 10, padding: "14px 18px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500, lineHeight: 1.6 }}>{item.value}</div>
                    </div>
                  ))}
                  <div style={{ background: data.ar.showAnnouncementBar ? "#dcfce7" : "#fef2f2", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{data.ar.showAnnouncementBar ? "✅" : "❌"}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: data.ar.showAnnouncementBar ? "#15803d" : "#dc2626" }}>
                      شريط الإعلانات العربي {data.ar.showAnnouncementBar ? "مُفعّل" : "مُعطّل"}
                    </span>
                  </div>
                </div>
              </div>

              {/* English Content */}
              <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: 32, direction: "ltr", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <h2 style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>🇬🇧 English Content</h2>
                  <button onClick={() => setEditOpen(true)} style={{ border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>
                    ✏️ Edit All
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "Hero Badge", value: data.en.heroData.badge },
                    { label: "Hero Headline", value: `${data.en.heroData.headline1} ${data.en.heroData.headline2}` },
                    { label: "Hero Subtext", value: data.en.heroData.subtext },
                    { label: "Announcement Bar", value: data.en.announcementBar },
                  ].map((item, i) => (
                    <div key={i} style={{ background: "var(--bg-muted)", borderRadius: 10, padding: "14px 18px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: "var(--text)", fontWeight: 500, lineHeight: 1.6 }}>{item.value}</div>
                    </div>
                  ))}
                  <div style={{ background: data.en.showAnnouncementBar ? "#dcfce7" : "#fef2f2", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{data.en.showAnnouncementBar ? "✅" : "❌"}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: data.en.showAnnouncementBar ? "#15803d" : "#dc2626" }}>
                      English Announcement Bar {data.en.showAnnouncementBar ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Preview Arabic */}
            <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", background: "var(--bg-muted)", direction: "rtl", textAlign: "right" }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>👁️ معاينة الهيرو (العربية)</h3>
              </div>
              <div style={{ padding: 32, background: "linear-gradient(135deg, #f8fafc, #eef2ff)", textAlign: "center", direction: "rtl" }}>
                <span style={{ display: "inline-block", background: "var(--primary-light)", color: "var(--primary)", fontWeight: 700, fontSize: 12, padding: "5px 14px", borderRadius: 100, marginBottom: 12 }}>
                  {data.ar.heroData.badge}
                </span>
                <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 900, color: "var(--text)", marginBottom: 12 }}>
                  {data.ar.heroData.headline1} <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{data.ar.heroData.headline2}</span>
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.75 }}>
                  {data.ar.heroData.subtext}
                </p>
                <span style={{ display: "inline-block", background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
                  {data.ar.heroData.cta1} ←
                </span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && data && (
        <EditContentModal
          arContent={data.ar}
          enContent={data.en}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveContent}
        />
      )}
    </div>
  );
}
