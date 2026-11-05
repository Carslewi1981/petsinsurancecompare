"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Globe, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ContactModal() {
  const { activeModal, setActiveModal, contactInsurer, t } = useStore();
  const [copied, setCopied] = useState<string | null>(null);
  const isOpen = activeModal === "contact" && contactInsurer !== null;

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
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="bg-white w-full max-w-md overflow-hidden"
            style={{ borderRadius: 18, border: "1px solid #e0e0e0" }}
          >
            <div className="h-1 w-full" style={{ backgroundColor: contactInsurer.color }} />

            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: contactInsurer.color + "15", borderRadius: 8 }}
                >
                  {contactInsurer.logo}
                </div>
                <div>
                  <h2 className="font-semibold" style={{ fontSize: 17, letterSpacing: "-0.374px", color: contactInsurer.color }}>
                    {contactInsurer.name}
                  </h2>
                  <p className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>{contactInsurer.tagline}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {contacts.map(({ key, icon: Icon, label, value }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3"
                  style={{ background: "#f5f5f7", borderRadius: 11 }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ background: "#e8f0fb", borderRadius: 8 }}
                  >
                    <Icon className="w-4 h-4 text-[#0066cc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#7a7a7a]" style={{ fontSize: 12, letterSpacing: "-0.12px" }}>{label}</div>
                    <div className="text-[#1d1d1f] truncate" style={{ fontSize: 14, letterSpacing: "-0.224px" }}>{value}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="flex items-center gap-1 text-[#0066cc] hover:text-[#0071e3] transition-colors px-3 py-1.5 active:scale-95"
                    style={{ border: "1px solid #0066cc", borderRadius: 9999, fontSize: 12 }}
                  >
                    {copied === key ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">{t.modal_copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        {t.modal_copy}
                      </>
                    )}
                  </button>
                </div>
              ))}

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={contactInsurer.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 text-white transition-colors active:scale-95"
                  style={{ backgroundColor: "#0066cc", borderRadius: 9999, fontSize: 17, letterSpacing: "-0.374px" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.modal_visit}
                </a>
                <button
                  className="flex items-center justify-center gap-2 py-3 text-[#0066cc] hover:text-[#0071e3] transition-colors active:scale-95"
                  style={{ border: "1px solid #0066cc", borderRadius: 9999, fontSize: 17, letterSpacing: "-0.374px" }}
                >
                  {t.modal_callback}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
