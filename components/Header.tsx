"use client";
import * as React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Header(){
  const { lang, setLang, t } = useI18n();
  const toggle = () => setLang(lang === "en" ? "zh" : "en");
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3"><Logo /></Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/#portfolio" className="opacity-80 hover:opacity-100">{t("nav_portfolio")}</Link>
          <Link href="/#contact" className="opacity-80 hover:opacity-100">{t("nav_contact")}</Link>
          <button onClick={toggle} className="opacity-80 hover:opacity-100 border rounded-md px-2 py-1" aria-label="Switch language" title="Switch language">
            {lang === "en" ? t("lang_zh") : t("lang_en")}
          </button>
        </nav>
      </div>
    </header>
  );
}
