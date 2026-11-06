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

export function PawMark({ size = 34 }: { size?: number }) {
  const paw = (
    <>
      <ellipse cx="0" cy="0" rx="8" ry="6.5" />
      <ellipse cx="-10" cy="-10" rx="3.5" ry="4.5" />
      <ellipse cx="-3.5" cy="-15" rx="4" ry="5" />
      <ellipse cx="4" cy="-15" rx="4" ry="5" />
      <ellipse cx="10.5" cy="-9" rx="3.5" ry="4.5" />
    </>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#0b3b3c" />
      <g fill="#ffd23f">
        <g transform="translate(25 41) rotate(-8)">{paw}</g>
        <g transform="translate(44 22) rotate(15) scale(0.52)">{paw}</g>
      </g>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useStore();

  const selectedLang = languages.find((l) => l.code === lang) ?? languages[0];

  const links = [
    { href: "/", label: t.nav_home },
    { href: "/compare", label: t.nav_compare },
    { href: "/resources", label: t.nav_resources },
    { href: "/about", label: t.nav_about },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const inside =
        langRef.current?.contains(target) || langRefMobile.current?.contains(target);
      if (!inside) setLangOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLangOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const langMenu = (
    <div
      role="menu"
      className="absolute right-0 top-full mt-2 overflow-y-auto bg-paper"
      style={{
        border: "2px solid var(--color-ink)",
        borderRadius: 12,
        minWidth: 200,
        maxHeight: 340,
        boxShadow: "4px 4px 0 var(--color-ink)",
        zIndex: 100,
      }}
    >
      {languages.map((l) => (
        <button
          key={l.code}
          role="menuitem"
          onClick={() => {
            setLang(l.code);
            setLangOpen(false);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-mint-soft"
          style={{
            fontSize: 15,
            fontWeight: lang === l.code ? 700 : 500,
            background: lang === l.code ? "var(--color-tag-soft)" : undefined,
          }}
        >
          <span aria-hidden>{l.flag}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-sm"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(246,248,245,0.94)",
          backdropFilter: "blur(10px)",
          borderColor: "var(--color-line)",
          height: 68,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="PetPlan Compare, home">
            <PawMark />
            <span className="heading" style={{ fontSize: 24, lineHeight: 1 }}>
              PetPlan <span style={{ color: "var(--color-teal)" }}>Compare</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="px-3 py-2 rounded-full transition-colors hover:bg-mint-soft"
                style={{ fontSize: 16, fontWeight: isActive(link.href) ? 700 : 500 }}
              >
                <span className={isActive(link.href) ? "highlight" : ""}>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-label={`Language: ${selectedLang.label}`}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-mint-soft"
                style={{ fontSize: 15, fontWeight: 500 }}
              >
                <Globe className="w-4 h-4" />
                <span aria-hidden>{selectedLang.flag}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {langOpen && langMenu}
            </div>
            <Link href="/compare" className="btn btn-sm">
              {t.nav_compareNow}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <div className="relative" ref={langRefMobile}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                className="p-2.5 rounded-full hover:bg-mint-soft"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langOpen && langMenu}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="p-2.5 rounded-full hover:bg-mint-soft"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[68px] left-0 right-0 z-40 md:hidden bg-chart border-b"
            style={{ borderColor: "var(--color-line)" }}
          >
            <div className="px-5 py-5 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="py-3.5 border-b"
                  style={{
                    fontSize: 20,
                    fontWeight: isActive(link.href) ? 700 : 500,
                    borderColor: "var(--color-line)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/compare" onClick={() => setMenuOpen(false)} className="btn mt-5">
                {t.nav_compareNow}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
