"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "../lib/data";
import type { CmsHeroSlide, CmsWorkShowcase } from "../lib/cmsMerge";

type Locale = "ar" | "en";

interface LanguageContextProps {
  locale: Locale;
  t: typeof translations.ar;
  toggleLocale: () => void;
  dir: "rtl" | "ltr";
  cmsReady: boolean;
  heroSlides: CmsHeroSlide[] | null;
  workShowcase: CmsWorkShowcase | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [dynamicTrans, setDynamicTrans] = useState(translations);
  const [cmsReady, setCmsReady] = useState(false);
  const [heroSlides, setHeroSlides] = useState<CmsHeroSlide[] | null>(null);
  const [workShowcase, setWorkShowcase] = useState<CmsWorkShowcase | null>(null);

  const loadCms = useCallback(async (activeLocale: Locale) => {
    try {
      const { loadCmsForLocale } = await import("../lib/cmsMerge");
      const base = translations[activeLocale];
      const result = await loadCmsForLocale(activeLocale, base);

      setDynamicTrans((prev) => ({
        ...prev,
        [activeLocale]: result.translation,
      }));
      setHeroSlides(result.heroSlides.length ? result.heroSlides : null);
      setWorkShowcase(result.workShowcase);
    } catch (err) {
      console.error("CMS load failed, using static translations:", err);
    } finally {
      setCmsReady(true);
    }
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (saved === "ar" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    loadCms(locale);
  }, [locale, loadCms]);

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

  return (
    <LanguageContext.Provider
      value={{ locale, t, toggleLocale, dir, cmsReady, heroSlides, workShowcase }}
    >
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
