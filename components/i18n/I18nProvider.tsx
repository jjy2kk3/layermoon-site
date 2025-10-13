"use client";
import * as React from "react";
type Lang = "en" | "zh";
type Dict = Record<string, { en: string; zh: string }>;
const dict: Dict = {
  nav_services: { en: "Services", zh: "服务" },
  nav_portfolio: { en: "Portfolio", zh: "案例展示" },
  nav_catalog:  { en: "Catalog",  zh: "目录" },
  nav_contact:   { en: "Contact",   zh: "联系我们" },
  lang_en:       { en: "EN",        zh: "英" },
  lang_zh:       { en: "中文",       zh: "中" },
  hero_title:    { en: "Stage faster. Sell better.", zh: "更快布置，更好成交。" },
  hero_sub:      { en: "Greater Seattle home staging—vacant, partial, Airbnb. Furniture + styling rentals.", zh: "西雅图地区家居陈设——空房、部分房、短租；家具与软装租赁。" },
  portfolio_title: { en: "Recent Projects (Links)", zh: "近期项目（外链）" },
  portfolio_hint:  { en: "Add Redfin/Zillow links in Admin → Portfolio.", zh: "可在后台 → 案例链接 添加 Redfin/Zillow 外链。" },
  portfolio_view:  { en: "View", zh: "打开" },
  portfolio_empty: { en: "No links yet.", zh: "暂无案例链接。" },
  contact_title: { en: "Tell us about your project", zh: "告诉我们你的项目" },
  contact_name:  { en: "Name", zh: "姓名" },
  contact_email: { en: "Email", zh: "邮箱" },
  contact_phone: { en: "Phone (optional)", zh: "电话（可选）" },
  contact_notes: { en: "Notes", zh: "备注（风格/预算/时间）" },
  contact_send:  { en: "Send", zh: "发送" },
  contact_ok:    { en: "Submitted. We'll reply soon.", zh: "提交成功，我们会尽快联系你。" },
  footer_privacy:  { en: "Privacy", zh: "隐私" },
  footer_terms:    { en: "Terms", zh: "条款" },
};
type I18nCtx = { lang: Lang; t: (key: keyof typeof dict) => string; setLang: (l: Lang) => void; };
export const I18nContext = React.createContext<I18nCtx | null>(null);
export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("en");
  React.useEffect(() => { const saved = typeof window !== "undefined" ? window.localStorage.getItem("lm_lang") : null; if (saved === "zh" || saved === "en") setLang(saved); }, []);
  React.useEffect(() => { if (typeof window !== "undefined") window.localStorage.setItem("lm_lang", lang); }, [lang]);
  const t = React.useCallback((key: keyof typeof dict) => dict[key]?.[lang] ?? String(key), [lang]);
  return (<I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>);
}
export function useI18n(){ const ctx = React.useContext(I18nContext); if(!ctx) throw new Error("useI18n must be used within I18nProvider"); return ctx; }
