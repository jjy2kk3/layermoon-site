"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header(){
  const [lang, setLang] = React.useState<"en"|"zh">("en");
  React.useEffect(()=>{
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("lm_lang"): null;
    if(saved === "zh" || saved === "en") setLang(saved);
  },[]);
  React.useEffect(()=>{
    if (typeof window !== "undefined") window.localStorage.setItem("lm_lang", lang);
  },[lang]);
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="LM" className="h-8 w-auto"/>
          <span className="font-semibold hidden sm:inline">Layer Moon Staging</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/#portfolio" className="opacity-80 hover:opacity-100">Portfolio</Link>
          <Link href="/#contact" className="opacity-80 hover:opacity-100">Contact</Link>
          <button onClick={()=>setLang(lang==='en'?'zh':'en')} className="opacity-80 hover:opacity-100 border rounded-md px-2 py-1">
            {lang==='en'?'中文':'EN'}
          </button>
        </nav>
      </div>
    </header>
  );
}
