"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { LangCode } from "@/lib/translations";

const languages: { code: LangCode; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh", label: "中文 (简体)", flag: "🇨🇳" },
  { code: "zh-tw", label: "中文 (繁體)", flag: "🇹🇼" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "th", label: "ภาษาไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useStore();

  const selectedLang = languages.find((l) => l.code === lang) ?? languages[0];

  const links = [
    { href: "/", label: t.nav_home },
    { href: "/compare", label: t.nav_compare },
    { href: "/resources", label: t.nav_resources },
    { href: "/about", label: t.nav_about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(12,12,13,0.88)" : "rgba(12,12,13,0)",
          borderBottomColor: scrolled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
          height: 64,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Family paw mark */}
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <mask id="nav-paw-mask">
                  <rect width="64" height="64" fill="white"/>
                  {/* Big paw */}
                  <g transform="translate(25 41) rotate(-8)">
                    <ellipse cx="0" cy="0" rx="8" ry="6.5" fill="black"/>
                    <ellipse cx="-10" cy="-10" rx="3.5" ry="4.5" fill="black"/>
                    <ellipse cx="-3.5" cy="-15" rx="4" ry="5" fill="black"/>
                    <ellipse cx="4" cy="-15" rx="4" ry="5" fill="black"/>
                    <ellipse cx="10.5" cy="-9" rx="3.5" ry="4.5" fill="black"/>
                  </g>
                  {/* Small paw */}
                  <g transform="translate(44 22) rotate(15) scale(0.52)">
                    <ellipse cx="0" cy="0" rx="8" ry="6.5" fill="black"/>
                    <ellipse cx="-10" cy="-10" rx="3.5" ry="4.5" fill="black"/>
                    <ellipse cx="-3.5" cy="-15" rx="4" ry="5" fill="black"/>
                    <ellipse cx="4" cy="-15" rx="4" ry="5" fill="black"/>
                    <ellipse cx="10.5" cy="-9" rx="3.5" ry="4.5" fill="black"/>
                  </g>
                </mask>
              </defs>
              <circle cx="32" cy="32" r="30" fill="#c9a96e" mask="url(#nav-paw-mask)"/>
            </svg>
            <div className="flex items-baseline gap-1">
              <span
                className="font-[var(--font-playfair-next)] italic text-white leading-none tracking-tight"
                style={{ fontSize: 20, fontWeight: 500 }}
              >
                PetPlan
              </span>
              <span
                className="font-[var(--font-inter-next)] text-white/40 leading-none"
                style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 3 }}
              >
                Compare
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = pathname === link.href ? "#fff" : "rgba(255,255,255,0.45)"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 transition-colors"
                style={{ fontSize: 11, letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                <Globe className="w-3 h-3" />
                <span>{selectedLang.flag}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 overflow-y-auto"
                    style={{
                      background: "#111115",
                      border: "1px solid rgba(255,255,255,0.1)",
                      minWidth: 190,
                      maxHeight: 340,
                      boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
                    }}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
                        style={{
                          fontSize: 12,
                          color: lang === l.code ? "#c9a96e" : "rgba(255,255,255,0.5)",
                          background: lang === l.code ? "rgba(201,169,110,0.06)" : "transparent",
                        }}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                        {lang === l.code && <span className="ml-auto text-[#c9a96e]">·</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link href="/compare" className="btn-gold" style={{ fontSize: 11, padding: "10px 24px" }}>
              {t.nav_compareNow}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}
              >
                <Globe className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 overflow-y-auto"
                    style={{
                      background: "#111115",
                      border: "1px solid rgba(255,255,255,0.1)",
                      minWidth: 190,
                      maxHeight: 320,
                      boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
                      zIndex: 100,
                    }}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5"
                        style={{
                          fontSize: 12,
                          color: lang === l.code ? "#c9a96e" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[64px] left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(12,12,13,0.97)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/compare"
                onClick={() => setMenuOpen(false)}
                className="btn-gold text-center justify-center mt-2"
                style={{ fontSize: 11 }}
              >
                {t.nav_compareNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
