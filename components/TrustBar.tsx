"use client";

import { Lock, ShieldCheck, BarChart3, UserX, Star, FileText } from "lucide-react";

const SIGNALS = [
  {
    icon: <Lock className="w-4 h-4" />,
    title: "We never sell your data",
    desc: "Your info stays private. Always.",
    color: "#16a34a",
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    title: "SSL encrypted",
    desc: "All connections are secured end-to-end.",
    color: "#0066cc",
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Independent & unbiased",
    desc: "We compare all providers fairly.",
    color: "#7c3aed",
  },
  {
    icon: <UserX className="w-4 h-4" />,
    title: "No account required",
    desc: "Compare plans without signing up.",
    color: "#d97706",
  },
  {
    icon: <Star className="w-4 h-4" />,
    title: "50,000+ comparisons",
    desc: "Trusted by pet owners across the US.",
    color: "#dc2626",
  },
  {
    icon: <FileText className="w-4 h-4" />,
    title: "Always free to use",
    desc: "No hidden fees. No subscriptions.",
    color: "#0891b2",
  },
];

export default function TrustBar() {
  return (
    <div className="bg-[#f5f5f7] border-y border-[#e0e0e0]" style={{ padding: "20px 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SIGNALS.map((s) => (
            <div key={s.title} className="flex items-start gap-2.5">
              <div
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center mt-0.5"
                style={{ color: s.color, background: s.color + "15", borderRadius: 8 }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  className="font-semibold text-[#1d1d1f] leading-tight"
                  style={{ fontSize: 11, letterSpacing: "-0.12px" }}
                >
                  {s.title}
                </div>
                <div className="text-[#7a7a7a] leading-tight mt-0.5" style={{ fontSize: 10 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
