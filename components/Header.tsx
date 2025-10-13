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
        {/* 左：Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="hidden sm:inline font-semibold">Layer Moon Staging</span>
        </Link>

        {/* 中：主导航 */}
        <nav className="flex-1 flex items-center justify-center gap-6 text-sm">
          <Link href="/#services"  className="opacity-80 hover:opacity-100">{t("nav_services")}</Link>
          <Link href="/#portfolio" className="opacity-80 hover:opacity-100">{t("nav_portfolio")}</Link>
          <Link href="/#catalog"   className="opacity-80 hover:opacity-100">{t("nav_catalog")}</Link>
          <Link href="/#contact"   className="opacity-80 hover:opacity-100">{t("nav_contact")}</Link>
        </nav>

        {/* 右：语言 & 电话（无 Login、无 RFQ Cart） */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="border rounded-md px-2 py-1 text-sm opacity-80 hover:opacity-100"
            aria-label="Switch language"
            title="Switch language"
          >
            {lang === "en" ? t("lang_zh") : t("lang_en")}
          </button>

          <a href="tel:2065550123"
             className="hidden sm:inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            206-555-0123
          </a>
        </div>
      </div>
    </header>
  );
}
