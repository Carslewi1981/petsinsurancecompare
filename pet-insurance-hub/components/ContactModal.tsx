"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Globe, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ContactModal() {
  const { activeModal, setActiveModal, contactInsurer, t } = useStore();
  const [copied, setCopied] = useState<string | null>(null);
  const isOpen = activeModal === "contact" && contactInsurer !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveModal(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, setActiveModal]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!contactInsurer) return null;

  const contacts = [
    { key: "phone", icon: Phone, label: t.modal_phone, value: contactInsurer.contact.phone },
    { key: "website", icon: Globe, label: t.modal_website, value: contactInsurer.contact.website },
    { key: "email", icon: Mail, label: t.modal_email, value: contactInsurer.contact.email },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: "rgba(7,42,43,0.6)" }}
          onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            className="bg-paper w-full max-w-md overflow-hidden"
            style={{ borderRadius: 16, border: "2px solid var(--color-ink)", boxShadow: "6px 6px 0 var(--color-ink)" }}
          >
            <div
              className="flex items-start justify-between gap-3 p-6"
              style={{ borderBottom: "2px solid var(--color-ink)", background: "var(--color-mint-soft)" }}
            >
              <div>
                <h2 id="contact-title" className="heading flex items-center gap-2.5" style={{ fontSize: 30 }}>
                  <span aria-hidden className="inline-block rounded-full flex-shrink-0" style={{ width: 12, height: 12, background: contactInsurer.color }} />
                  {contactInsurer.name}
                </h2>
                <p className="mt-1" style={{ fontSize: 15, color: "var(--color-muted)", lineHeight: 1.4 }}>
                  {contactInsurer.tagline}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Close"
                className="p-2 -m-2 rounded-full hover:bg-black/10 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {contacts.map(({ key, icon: Icon, label, value }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3"
                  style={{ border: "2px solid var(--color-line)", borderRadius: 12 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-teal)" }} aria-hidden />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 14, color: "var(--color-muted)" }}>{label}</div>
                    <div className="truncate" style={{ fontSize: 16, fontWeight: 600 }}>
                      {value}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="btn btn-quiet btn-sm"
                    style={{ padding: "7px 12px" }}
                  >
                    {copied === key ? (
                      <>
                        <Check className="w-4 h-4" />
                        {t.modal_copied}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {t.modal_copy}
                      </>
                    )}
                  </button>
                </div>
              ))}

              <div className="flex flex-col gap-2.5 pt-3">
                <a href={contactInsurer.contact.website} target="_blank" rel="noopener noreferrer" className="btn">
                  <ExternalLink className="w-4 h-4" />
                  {t.modal_visit}
                </a>
                <button className="btn btn-quiet">{t.modal_callback}</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
