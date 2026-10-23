"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { kk } from "./kk";
import { ru, type Dictionary } from "./ru";

export type Lang = "kk" | "ru";

export const dictionaries: Record<Lang, Dictionary> = { ru, kk };

const STORAGE_KEY = "ulybka-lang";
const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current) return current;
  try {
    current = window.localStorage.getItem(STORAGE_KEY) === "kk" ? "kk" : "ru";
  } catch {
    current = "ru";
  }
  return current;
}

function write(lang: Lang) {
  current = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode — the choice simply isn't remembered */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type Ctx = { lang: Lang; t: Dictionary; setLang: (lang: Lang) => void };
const LanguageContext = createContext<Ctx | null>(null);

/**
 * Russian is rendered on the server (and is what search engines index). A visitor who chose
 * Kazakh before gets it right after hydration — useSyncExternalStore makes that switch
 * without a hydration mismatch.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, read, () => "ru" as Lang);
  const setLang = useCallback((next: Lang) => write(next), []);

  useEffect(() => {
    document.documentElement.lang = dictionaries[lang].htmlLang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
