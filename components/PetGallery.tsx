"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useStore } from "@/lib/store";

// Each photo: real Unsplash URL + caption + emoji fallback
interface PetPhoto {
  url: string;
  caption: string;
  detail?: string;
  fallback: string; // emoji shown when image fails to load
}

interface PetType {
  id: string;
  label: string;
  emoji: string;
  headline: string;
  sub: string;
  fact: string;
  ctaLabel: string;
  photos: PetPhoto[];
  accentColor: string;
  bgColor: string;
  riskNote: string;
}

// Unsplash CDN — verified timestamp-format photo IDs
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`;

const PET_TYPES: PetType[] = [
  {
    id: "dog",
    label: "Dogs",
    emoji: "🐕",
    accentColor: "#0066cc",
    bgColor: "#eff6ff",
    headline: "Man's best friend deserves the best coverage.",
    sub: "From Golden Retrievers to Dachshunds — every breed faces unique health risks. Find a plan built for your dog.",
    fact: "1 in 3 dogs needs emergency vet care each year. Average bill: $1,500–$5,000.",
    ctaLabel: "Compare dog plans",
    riskNote: "ACL tears · Cancer · Hip dysplasia · Bloat",
    photos: [
      { url: u("1530281700549-e82e7bf110d6"), caption: "Golden Retriever", detail: "Buddy, 4 yrs", fallback: "🐕" },
      { url: u("1550973078-ce53733d6117"), caption: "Siberian Husky", detail: "Nova, 3 yrs", fallback: "🐕" },
      { url: u("1521907554502-7440e4702fc3"), caption: "French Bulldog", detail: "Gizmo, 2 yrs", fallback: "🐶" },
      { url: u("1605725657590-b2cf0d31b1a5"), caption: "German Shepherd", detail: "Rex, 5 yrs", fallback: "🦮" },
      { url: u("1617895153857-82fe79adfcd4"), caption: "Husky Puppy", detail: "Koda, 6 mos", fallback: "🐕" },
      { url: u("1553998495-15606c6cb6f7"), caption: "French Bulldog", detail: "Luna, 1 yr", fallback: "🐶" },
      { url: u("1589941013453-ec89f33b5e95"), caption: "German Shepherd", detail: "Zeus, 3 yrs", fallback: "🦮" },
      { url: u("1489924034176-2e678c29d4c6"), caption: "Siberian Husky", detail: "Blizzard, 2 yrs", fallback: "🐕" },
    ],
  },
  {
    id: "cat",
    label: "Cats",
    emoji: "🐈",
    accentColor: "#7c3aed",
    bgColor: "#faf5ff",
    headline: "Independent souls. Surprisingly expensive vet bills.",
    sub: "Cats hide illness well — until a $3,000 emergency reveals what you couldn't see. Be ready before it happens.",
    fact: "HCM affects 1 in 7 cats. Kidney disease costs $2,000–$8,000/year to manage.",
    ctaLabel: "Compare cat plans",
    riskNote: "HCM · Kidney disease · Urinary blockages · Cancer",
    photos: [
      { url: u("1598017720921-946225de6f04"), caption: "Persian", detail: "Duchess, 5 yrs", fallback: "🐱" },
      { url: u("1472491235688-bdc81a63246e"), caption: "Siamese", detail: "Milo, 3 yrs", fallback: "😺" },
      { url: u("1547565295-182fb8657b6b"), caption: "Sphynx", detail: "Wrinkles, 4 yrs", fallback: "🐈" },
      { url: u("1488740304459-45c4277e7daf"), caption: "Siamese", detail: "Bella, 2 yrs", fallback: "🐱" },
      { url: u("1626881255770-2397375aad8d"), caption: "Sphynx", detail: "Pharaoh, 3 yrs", fallback: "😻" },
      { url: u("1585137173132-cf49e10ad27d"), caption: "Persian", detail: "Snowflake, 4 yrs", fallback: "🐈" },
      { url: u("1604242251651-546f5f05ccb7"), caption: "Persian", detail: "Pearl, 5 yrs", fallback: "🐱" },
      { url: u("1592652426689-4e4f12c4aef5"), caption: "Siamese", detail: "Aria, 1 yr", fallback: "😺" },
    ],
  },
  {
    id: "bird",
    label: "Birds",
    emoji: "🦜",
    accentColor: "#059669",
    bgColor: "#f0fdf4",
    headline: "Birds live 20–80 years. So do their vet bills.",
    sub: "Avian vets are specialists — and they charge like it. A single respiratory infection can cost $800–$2,500.",
    fact: "Parrots can live 60+ years. One crop obstruction surgery averages $1,200–$3,000.",
    ctaLabel: "Compare bird plans",
    riskNote: "Psittacosis · Proventricular disease · Crop issues · Feather destructive behavior",
    photos: [
      { url: u("1552728089-57bdde30beb3"), caption: "Alexandrine Parakeet", detail: "Einstein, 12 yrs", fallback: "🦜" },
      { url: u("1452570053594-1b985d6ea890"), caption: "Blue & Gold Macaw", detail: "Kiwi, 8 yrs", fallback: "🦜" },
      { url: u("1555169062-013468b47731"), caption: "Sun Conure", detail: "Coco, 6 yrs", fallback: "🦜" },
      { url: u("1544923408-75c5cef46f14"), caption: "Scarlet Macaw", detail: "Ruby, 15 yrs", fallback: "🦜" },
      { url: u("1512819432727-dbcb57a06f13"), caption: "Rainbow Lorikeet", detail: "Sunny, 5 yrs", fallback: "🐦" },
      { url: u("1606383069718-104a95938112"), caption: "African Ringneck", detail: "Mango, 3 yrs", fallback: "🐦" },
      { url: u("1534566991776-92e46728f72d"), caption: "Green-Cheeked Conure", detail: "Sky, 10 yrs", fallback: "🦜" },
      { url: u("1504579264001-833438f93df2"), caption: "Hyacinth Macaw", detail: "Paco, 20 yrs", fallback: "🦜" },
    ],
  },
  {
    id: "rabbit",
    label: "Rabbits",
    emoji: "🐇",
    accentColor: "#db2777",
    bgColor: "#fdf2f8",
    headline: "Quiet, soft, and surprisingly fragile.",
    sub: "Rabbits mask pain instinctively — by the time you notice something's wrong, a vet visit is urgent. GI stasis kills in hours.",
    fact: "GI stasis surgery costs $1,500–$3,000. Dental spurs require regular $200–$400 treatments.",
    ctaLabel: "Compare rabbit plans",
    riskNote: "GI stasis · Dental disease · Uterine cancer (unspayed) · E. cuniculi",
    photos: [
      { url: u("1585110396000-c9ffd4e4b308"), caption: "Holland Lop", detail: "Pebbles, 3 yrs", fallback: "🐇" },
      { url: u("1663043501785-05d17c625253"), caption: "Flemish Giant", detail: "Goliath, 4 yrs", fallback: "🐰" },
      { url: u("1535241749838-299277b6305f"), caption: "Rex Rabbit", detail: "Velvet, 2 yrs", fallback: "🐇" },
      { url: u("1707835774707-2861ff96de3e"), caption: "Dutch Rabbit", detail: "Oreo, 1 yr", fallback: "🐰" },
      { url: u("1452857297128-d9c29adba80b"), caption: "Lionhead", detail: "Mufasa, 2 yrs", fallback: "🐇" },
      { url: u("1650290145779-e05602773fc7"), caption: "Angora Rabbit", detail: "Fluffington, 3 yrs", fallback: "🐰" },
      { url: u("1581872454565-822dac9367aa"), caption: "Mini Rex", detail: "Copper, 1 yr", fallback: "🐇" },
      { url: u("1591382386627-349b692688ff"), caption: "Californian", detail: "Snowball, 8 mos", fallback: "🐰" },
    ],
  },
  {
    id: "reptile",
    label: "Reptiles",
    emoji: "🦎",
    accentColor: "#65a30d",
    bgColor: "#f7fee7",
    headline: "Cold-blooded pets, warm-hearted bills.",
    sub: "Reptile vets are rare. When your bearded dragon gets metabolic bone disease or your ball python needs surgery, specialist costs are steep.",
    fact: "MBD treatment in bearded dragons: $500–$2,000. Egg-binding surgery in female reptiles: $1,000–$3,500.",
    ctaLabel: "Compare reptile plans",
    riskNote: "Metabolic bone disease · Egg-binding · Respiratory infections · Parasites",
    photos: [
      { url: u("1619816128374-a6b4766ca92c"), caption: "Bearded Dragon", detail: "Spike, 3 yrs", fallback: "🦎" },
      { url: u("1611245241464-97cf73d233a1"), caption: "Ball Python", detail: "Coral, 4 yrs", fallback: "🐍" },
      { url: u("1588271174559-1f5dc8750e5f"), caption: "Crested Gecko", detail: "Camo, 2 yrs", fallback: "🦎" },
      { url: u("1764459931084-449223c5e955"), caption: "Green Iguana", detail: "Verde, 6 yrs", fallback: "🦎" },
      { url: u("1572650117973-7d78c3e9aedf"), caption: "Leopard Gecko", detail: "Dotty, 3 yrs", fallback: "🦎" },
      { url: u("1707478492106-31ecc0c8776f"), caption: "Corn Snake", detail: "Ziggy, 5 yrs", fallback: "🐍" },
      { url: u("1601558729644-8d457193fbb0"), caption: "Bearded Dragon", detail: "Sandy, 4 yrs", fallback: "🦎" },
      { url: u("1654541763260-a1fcbd18da89"), caption: "Green Lizard", detail: "Rocky, 2 yrs", fallback: "🦎" },
    ],
  },
  {
    id: "exotic",
    label: "Small Mammals",
    emoji: "🐹",
    accentColor: "#d97706",
    bgColor: "#fffbeb",
    headline: "Small animals. Big hearts. Unexpected vet bills.",
    sub: "Ferrets, guinea pigs, chinchillas — exotic small mammals need specialized vets. One adrenal disease diagnosis changes everything.",
    fact: "Ferret adrenal surgery: $1,500–$3,000. Guinea pig ovarian cysts: $500–$1,500. Chinchilla malocclusion: $800–$2,000.",
    ctaLabel: "Compare exotic plans",
    riskNote: "Adrenal disease (ferrets) · Malocclusion · Respiratory infections · Ovarian cysts",
    photos: [
      { url: u("1647045965738-94ce0fc81325"), caption: "Ferret", detail: "Bandit, 3 yrs", fallback: "🦦" },
      { url: u("1612267168669-679c961c5b31"), caption: "Guinea Pig", detail: "Peanut, 2 yrs", fallback: "🐾" },
      { url: u("1534278931827-8a259344abe7"), caption: "Hedgehog", detail: "Hazel, 1 yr", fallback: "🦔" },
      { url: u("1571941727012-783f3768de46"), caption: "Ferret", detail: "Noodle, 4 yrs", fallback: "🦦" },
      { url: u("1533152162573-93ad94eb20f6"), caption: "Guinea Pig", detail: "Cheddar, 3 yrs", fallback: "🐾" },
      { url: u("1622227056993-6e7f88420855"), caption: "Hedgehog", detail: "Bramble, 2 yrs", fallback: "🦔" },
      { url: u("1512087499053-023f060e2cea"), caption: "Guinea Pig", detail: "Caramel, 1 yr", fallback: "🐾" },
      { url: u("1470854989922-5be2f7456d78"), caption: "Hedgehog", detail: "Spike, 3 yrs", fallback: "🦔" },
    ],
  },
];

const LIKED_CAPTIONS = [
  "Insured & living their best life 🐾",
  "Protected — just like they deserve 💙",
  "Coverage found. Peace of mind achieved ✓",
  "Happy pet. Happy wallet. ✨",
];

function PhotoCard({
  photo,
  size,
  index,
  liked,
  onLike,
  likeCaption,
  accentColor,
  bgColor,
}: {
  photo: PetPhoto;
  size: "large" | "medium" | "small";
  index: number;
  liked: boolean;
  onLike: () => void;
  likeCaption: boolean;
  accentColor: string;
  bgColor: string;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset state when URL changes (e.g. HMR, tab switch) and handle pre-cached images
  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [photo.url]);

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onLike}
      className="relative cursor-pointer overflow-hidden group"
      style={{
        borderRadius: size === "large" ? 16 : 12,
        background: bgColor,
        height: "100%",
      }}
    >
      {/* Emoji fallback — shown until image loads or on error */}
      {(!imgLoaded || imgError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span style={{ fontSize: size === "large" ? 64 : size === "medium" ? 36 : 24, lineHeight: 1 }}>
            {photo.fallback}
          </span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!imgError && (
        <img
          ref={imgRef}
          src={photo.url}
          alt={photo.caption}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s" }}
          loading="eager"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}
      {/* Bottom gradient + caption */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }}
      >
        <div className="text-white font-semibold leading-tight" style={{ fontSize: size === "large" ? 13 : 10 }}>
          {photo.caption}
        </div>
        {photo.detail && size !== "small" && (
          <div className="text-white/70 leading-none mt-0.5" style={{ fontSize: size === "large" ? 11 : 9 }}>
            {photo.detail}
          </div>
        )}
      </div>
      {/* Heart button */}
      <button
        className="absolute top-2 right-2 flex items-center justify-center transition-transform active:scale-90"
        style={{
          width: size === "large" ? 30 : 22,
          height: size === "large" ? 30 : 22,
          background: liked ? "#fee2e2" : "rgba(255,255,255,0.85)",
          borderRadius: 9999,
          backdropFilter: "blur(4px)",
        }}
        onClick={(e) => { e.stopPropagation(); onLike(); }}
      >
        <Heart
          style={{
            width: size === "large" ? 14 : 10,
            height: size === "large" ? 14 : 10,
            color: liked ? "#ef4444" : "#9ca3af",
            fill: liked ? "#ef4444" : "none",
          }}
        />
      </button>
      {/* Like toast */}
      <AnimatePresence>
        {likeCaption && liked && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-2 bottom-10 text-center px-2 py-1.5 bg-white/90 backdrop-blur"
            style={{ borderRadius: 8, fontSize: 10, color: "#1d1d1f", fontWeight: 500 }}
          >
            {LIKED_CAPTIONS[index % LIKED_CAPTIONS.length]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PetGallery() {
  const { setSelectedAnimal } = useStore();
  const [activePet, setActivePet] = useState<PetType>(PET_TYPES[0]);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [likeCaption, setLikeCaption] = useState<number | null>(null);

  const handleTabClick = (pet: PetType) => {
    setActivePet(pet);
    setLiked(new Set());
    setLikeCaption(null);
    setSelectedAnimal(pet.id as Parameters<typeof setSelectedAnimal>[0]);
  };

  const toggleLike = (idx: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
    setLikeCaption(idx);
    setTimeout(() => setLikeCaption(null), 2200);
  };

  const [p0, p1, p2, p3, p4, p5, p6, p7] = activePet.photos;

  return (
    <section className="bg-white" style={{ padding: "88px 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-white text-[11px] font-semibold mb-4 px-3 py-1"
              style={{ background: activePet.accentColor, borderRadius: 9999, transition: "background 0.4s" }}
            >
              Every pet covered
            </span>
            <h2
              className="font-semibold text-[#1d1d1f] mb-3 leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.374px" }}
            >
              What type of pet do you have?
            </h2>
            <p className="text-[#7a7a7a] mx-auto max-w-lg" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
              Click your pet to see real coverage options, common health risks, and average costs.
            </p>
          </motion.div>
        </div>

        {/* Pet type tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PET_TYPES.map((pet) => (
            <button
              key={pet.id}
              onClick={() => handleTabClick(pet)}
              className="flex items-center gap-2 px-4 py-2.5 transition-all active:scale-95"
              style={{
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: activePet.id === pet.id ? 600 : 400,
                background: activePet.id === pet.id ? pet.accentColor : "#f5f5f7",
                color: activePet.id === pet.id ? "#fff" : "#3a3a3c",
                border: activePet.id === pet.id ? "none" : "1px solid #e0e0e0",
                boxShadow: activePet.id === pet.id ? `0 4px 14px ${pet.accentColor}40` : "none",
              }}
            >
              <span style={{ fontSize: 18 }}>{pet.emoji}</span>
              {pet.label}
            </button>
          ))}
        </div>

        {/* Content — animated on tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePet.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* ── Photo mosaic ── */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                {/* Row 1: large + 2 medium */}
                <div className="grid grid-cols-3 gap-2" style={{ height: 220 }}>
                  <div className="col-span-2 row-span-2" style={{ height: 220 }}>
                    <PhotoCard photo={p0} size="large" index={0} liked={liked.has(0)} onLike={() => toggleLike(0)} likeCaption={likeCaption === 0} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  </div>
                  <div style={{ height: 107 }}>
                    <PhotoCard photo={p1} size="medium" index={1} liked={liked.has(1)} onLike={() => toggleLike(1)} likeCaption={likeCaption === 1} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  </div>
                  <div style={{ height: 107 }}>
                    <PhotoCard photo={p2} size="medium" index={2} liked={liked.has(2)} onLike={() => toggleLike(2)} likeCaption={likeCaption === 2} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  </div>
                </div>

                {/* Row 2: 2 medium + 1 taking right col was already used, show 2 mediums */}
                <div className="grid grid-cols-2 gap-2" style={{ height: 130 }}>
                  <PhotoCard photo={p3} size="medium" index={3} liked={liked.has(3)} onLike={() => toggleLike(3)} likeCaption={likeCaption === 3} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  <PhotoCard photo={p4} size="medium" index={4} liked={liked.has(4)} onLike={() => toggleLike(4)} likeCaption={likeCaption === 4} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                </div>

                {/* Row 3: 3 small */}
                <div className="grid grid-cols-3 gap-2" style={{ height: 90 }}>
                  <PhotoCard photo={p5} size="small" index={5} liked={liked.has(5)} onLike={() => toggleLike(5)} likeCaption={likeCaption === 5} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  <PhotoCard photo={p6} size="small" index={6} liked={liked.has(6)} onLike={() => toggleLike(6)} likeCaption={likeCaption === 6} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                  <PhotoCard photo={p7} size="small" index={7} liked={liked.has(7)} onLike={() => toggleLike(7)} likeCaption={likeCaption === 7} accentColor={activePet.accentColor} bgColor={activePet.bgColor} />
                </div>

                {/* Like counter */}
                <div className="flex items-center gap-2" style={{ fontSize: 12, color: "#7a7a7a" }}>
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  {liked.size > 0 ? (
                    <span>
                      <strong className="text-[#1d1d1f]">{liked.size}</strong> of your favorites — now find them a plan
                    </span>
                  ) : (
                    <span>Tap any photo to show some love ❤️</span>
                  )}
                </div>
              </div>

              {/* ── Info panel ── */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div
                  className="p-6 flex flex-col gap-3"
                  style={{
                    borderRadius: 18,
                    background: activePet.bgColor,
                    border: `1.5px solid ${activePet.accentColor}20`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 36 }}>{activePet.emoji}</span>
                    <h3
                      className="font-semibold text-[#1d1d1f] leading-snug"
                      style={{ fontSize: 19, letterSpacing: "-0.374px" }}
                    >
                      {activePet.headline}
                    </h3>
                  </div>
                  <p className="text-[#3a3a3c]" style={{ fontSize: 13, letterSpacing: "-0.12px", lineHeight: 1.5 }}>
                    {activePet.sub}
                  </p>
                </div>

                <div
                  className="px-4 py-3 flex items-start gap-3"
                  style={{ borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid #e0e0e0" }}
                >
                  <span style={{ fontSize: 20 }}>💡</span>
                  <p className="text-[#3a3a3c]" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    {activePet.fact}
                  </p>
                </div>

                <div
                  className="px-4 py-3"
                  style={{ borderRadius: 12, background: "#fff8f0", border: "1px solid #fed7aa" }}
                >
                  <div className="text-[#92400e] font-semibold mb-1" style={{ fontSize: 11 }}>
                    ⚠ Common health risks
                  </div>
                  <p className="text-[#78350f]" style={{ fontSize: 12 }}>
                    {activePet.riskNote}
                  </p>
                </div>

                <Link
                  href="/compare"
                  className="flex items-center justify-center gap-2 text-white transition-colors active:scale-95 mt-auto"
                  style={{
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 500,
                    padding: "13px 24px",
                    background: activePet.accentColor,
                    boxShadow: `0 4px 14px ${activePet.accentColor}40`,
                  }}
                >
                  {activePet.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
