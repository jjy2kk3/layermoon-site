"use client";
import * as React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useI18n } from "@/components/i18n/I18nProvider";
import { PhoneCall } from "lucide-react";

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const toggle = () => setLang(lang === "en" ? "zh" : "en");

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* 左：Logo */}
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* 左：主导航（紧跟 Logo） */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/#services"  className="opacity-80 hover:opacity-100">{t("nav_services")}</Link>
          <Link href="/#portfolio" className="opacity-80 hover:opacity-100">{t("nav_portfolio")}</Link>
          <Link href="/#catalog"   className="opacity-80 hover:opacity-100">{t("nav_catalog")}</Link>
          <Link href="/#contact"   className="opacity-80 hover:opacity-100">{t("nav_contact")}</Link>
        </nav>

        {/* 右：电话 + 语言按钮 */}
        <div className="ml-auto flex items-center gap-3 text-sm">
          <a className="hidden sm:flex items-center gap-2 opacity-80 hover:opacity-100" href="tel:+12065550123">
            <PhoneCall className="w-4 h-4" /> 206-555-0123
          </a>
          <button
            onClick={toggle}
            className="opacity-80 hover:opacity-100 border rounded-md px-2 py-1"
            aria-label="Switch language"
            title="Switch language"
          >
            {lang === "en" ? t("lang_zh") : t("lang_en")}
          </button>
        </div>
      </div>
    </header>
  );
}
