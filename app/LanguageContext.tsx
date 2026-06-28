"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load persisted language preference after hydration
    const saved = localStorage.getItem("language") as Language | null;
    const initialLanguage = (saved === "en" || saved === "es") ? saved : "en";
    if (initialLanguage !== "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(initialLanguage);
    }
    document.documentElement.lang = initialLanguage;
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language, isHydrated]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
