"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../lib/data";

type Locale = "ar" | "en";

type HeroCtaOverride = {
  label?: string;
  href?: string;
};

type HeroDataOverrides = {
  cta1?: string | HeroCtaOverride;
  cta2?: string | HeroCtaOverride;
  [key: string]: unknown;
};

type LocaleOverrides = {
  heroData?: HeroDataOverrides;
  siteConfig?: Partial<typeof translations.ar.siteConfig>;
  statsData?: Array<{ value?: string; label?: string }>;
  announcementBar?: string;
  showAnnouncementBar?: boolean;
};

type DynamicTranslations = {
  ar?: LocaleOverrides;
  en?: LocaleOverrides;
};

interface LanguageContextProps {
  locale: Locale;
  t: typeof translations.ar;
  toggleLocale: () => void;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [dynamicTrans, setDynamicTrans] = useState(translations);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (saved === "ar" || saved === "en") {
      setLocale(saved);
    }

    // Fetch dynamic configurations
    fetch("/api/ads")
      .then(res => res.json() as Promise<DynamicTranslations>)
      .then(data => {
        if (data) {
          setDynamicTrans(prev => {
            const nextTrans = JSON.parse(JSON.stringify(prev));
            // Merge Arabic overrides
            if (data.ar) {
              if (data.ar.heroData) {
                const { cta1, cta2, ...restHero } = data.ar.heroData;
                nextTrans.ar.heroData = { ...nextTrans.ar.heroData, ...restHero };
                if (typeof cta1 === "string") {
                  nextTrans.ar.heroData.cta1.label = cta1;
                } else if (cta1 && cta1.label) {
                  nextTrans.ar.heroData.cta1 = { ...nextTrans.ar.heroData.cta1, ...cta1 };
                }
                if (typeof cta2 === "string") {
                  nextTrans.ar.heroData.cta2.label = cta2;
                } else if (cta2 && cta2.label) {
                  nextTrans.ar.heroData.cta2 = { ...nextTrans.ar.heroData.cta2, ...cta2 };
                }
              }
              if (data.ar.siteConfig) {
                nextTrans.ar.siteConfig = { ...nextTrans.ar.siteConfig, ...data.ar.siteConfig };
              }
              if (data.ar.statsData) {
                data.ar.statsData.forEach((stat: { value?: string; label?: string }, index: number) => {
                  if (nextTrans.ar.statsData[index]) {
                    nextTrans.ar.statsData[index].value = stat.value ?? nextTrans.ar.statsData[index].value;
                    nextTrans.ar.statsData[index].label = stat.label ?? nextTrans.ar.statsData[index].label;
                  }
                });
              }
              if (data.ar.announcementBar !== undefined) {
                nextTrans.ar.announcementBar = data.ar.announcementBar;
              }
              if (data.ar.showAnnouncementBar !== undefined) {
                nextTrans.ar.showAnnouncementBar = data.ar.showAnnouncementBar;
              }
            }
            // Merge English overrides
            if (data.en) {
              if (data.en.heroData) {
                const { cta1, cta2, ...restHero } = data.en.heroData;
                nextTrans.en.heroData = { ...nextTrans.en.heroData, ...restHero };
                if (typeof cta1 === "string") {
                  nextTrans.en.heroData.cta1.label = cta1;
                } else if (cta1 && cta1.label) {
                  nextTrans.en.heroData.cta1 = { ...nextTrans.en.heroData.cta1, ...cta1 };
                }
                if (typeof cta2 === "string") {
                  nextTrans.en.heroData.cta2.label = cta2;
                } else if (cta2 && cta2.label) {
                  nextTrans.en.heroData.cta2 = { ...nextTrans.en.heroData.cta2, ...cta2 };
                }
              }
              if (data.en.siteConfig) {
                nextTrans.en.siteConfig = { ...nextTrans.en.siteConfig, ...data.en.siteConfig };
              }
              if (data.en.statsData) {
                data.en.statsData.forEach((stat: { value?: string; label?: string }, index: number) => {
                  if (nextTrans.en.statsData[index]) {
                    nextTrans.en.statsData[index].value = stat.value ?? nextTrans.en.statsData[index].value;
                    nextTrans.en.statsData[index].label = stat.label ?? nextTrans.en.statsData[index].label;
                  }
                });
              }
              if (data.en.announcementBar !== undefined) {
                nextTrans.en.announcementBar = data.en.announcementBar;
              }
              if (data.en.showAnnouncementBar !== undefined) {
                nextTrans.en.showAnnouncementBar = data.en.showAnnouncementBar;
              }
            }
            return nextTrans;
          });
        }
      })
      .catch(err => console.error("Error loading dynamic config overrides:", err));
  }, []);

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = locale === "ar" ? dynamicTrans.ar : dynamicTrans.en;
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Render a fallback layout during SSR hydration to avoid mismatch
  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
