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
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces,entropy&w=600&h=600&q=80`;

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
      { url: "https://upload.wikimedia.org/wikipedia/commons/1/18/2008-07-28_Dog_at_Frolick_Field.jpg", caption: "French Bulldog", detail: "Gizmo, 2 yrs", fallback: "🐶" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Face_of_german_shepherd.jpg", caption: "German Shepherd", detail: "Rex, 5 yrs", fallback: "🦮" },
      { url: u("1527179122541-293c3b972d24"), caption: "Labrador", detail: "Sunny, 2 yrs", fallback: "🐕" },
      { url: u("1631048905843-88f82fba8fd4"), caption: "Beagle", detail: "Biscuit, 3 yrs", fallback: "🐶" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Black_and_tan_dachshund_%288109028486%29.jpg", caption: "Dachshund", detail: "Pretzel, 4 yrs", fallback: "🐕" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Welsh_Pembroke_Corgi.jpg", caption: "Corgi", detail: "Winston, 2 yrs", fallback: "🐾" },
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
      { url: u("1708863827435-931d4491050c"), caption: "Bengal", detail: "Nala, 2 yrs", fallback: "🐱" },
      { url: u("1526336024174-e58f5cdd8e13"), caption: "Norwegian Forest Cat", detail: "Misty, 4 yrs", fallback: "🐈" },
      { url: u("1455970022149-a8f26b6902dd"), caption: "Maine Coon", detail: "Thor, 4 yrs", fallback: "😺" },
      { url: u("1595433708220-3aa013e5e43f"), caption: "Scottish Fold", detail: "Pixel, 2 yrs", fallback: "🐱" },
      { url: u("1629624467541-f73ef8f12df2"), caption: "British Shorthair", detail: "Cobalt, 3 yrs", fallback: "🐈" },
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Eclectus_Parrot_%28Eclectus_roratus%29_-pair.jpg", caption: "Eclectus Parrot", detail: "Mango, 8 yrs", fallback: "🦜" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Ara_ararauna_Luc_Viatour.jpg", caption: "Blue & Gold Macaw", detail: "Kiwi, 8 yrs", fallback: "🦜" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Aratinga_solstitialis_on_perch.jpg", caption: "Sun Conure", detail: "Coco, 6 yrs", fallback: "🦜" },
      { url: u("1517101724602-c257fe568157"), caption: "Cockatiel", detail: "Sunshine, 5 yrs", fallback: "🐦" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Rainbow_Lorikeet_Trichoglossus_haematodus_Closeup_2400px.jpg", caption: "Rainbow Lorikeet", detail: "Sunny, 5 yrs", fallback: "🐦" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Rose-ringed_parakeet_at_Mumbai_%28Oct%2C_24%29_01.jpg", caption: "African Ringneck", detail: "Mango, 3 yrs", fallback: "🐦" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Yellow_budgerigar.jpg", caption: "Budgerigar", detail: "Pickles, 4 yrs", fallback: "🦜" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Cacatua_galerita_-Cranbourne%2C_Melbourne%2C_Australia_-head-8.jpg", caption: "Cockatoo", detail: "Snowy, 10 yrs", fallback: "🦜" },
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Holland_lop_rabbit.jpg", caption: "Holland Lop", detail: "Pebbles, 3 yrs", fallback: "🐇" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/0/05/English_Lop.jpg", caption: "English Lop", detail: "Dumbo, 3 yrs", fallback: "🐰" },
      { url: u("1535241749838-299277b6305f"), caption: "Rex Rabbit", detail: "Velvet, 2 yrs", fallback: "🐇" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Belgian_Hare.jpg", caption: "Belgian Hare", detail: "Mocha, 3 yrs", fallback: "🐰" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Lionhead_rabbit_Dobby.jpg", caption: "Lionhead", detail: "Mufasa, 2 yrs", fallback: "🐇" },
      { url: u("1650290145779-e05602773fc7"), caption: "Angora Rabbit", detail: "Fluffington, 3 yrs", fallback: "🐰" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Fast_Track%2C_Lilac_Mini_Rex.jpg/3840px-Fast_Track%2C_Lilac_Mini_Rex.jpg", caption: "Mini Rex", detail: "Copper, 1 yr", fallback: "🐇" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kr%C3%B3liki_kalifornijskie_666.jpg", caption: "Californian", detail: "Snowball, 8 mos", fallback: "🐰" },
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Tiliqua_scincoides_scincoides.jpg", caption: "Blue-tongued Skink", detail: "Blaze, 5 yrs", fallback: "🦎" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Chinese_Water_Dragon_%28Physignathus_cocincinus%29_-_Khao_Yai_National_Park_-_1.jpg/3840px-Chinese_Water_Dragon_%28Physignathus_cocincinus%29_-_Khao_Yai_National_Park_-_1.jpg", caption: "Chinese Water Dragon", detail: "Jade, 3 yrs", fallback: "🦎" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Crested_gecko_-_1.jpg", caption: "Crested Gecko", detail: "Camo, 2 yrs", fallback: "🦎" },
      { url: u("1768156127147-b7c78be66854"), caption: "Green Iguana", detail: "Verde, 6 yrs", fallback: "🦎" },
      { url: u("1511144788721-42c510dee079"), caption: "Chameleon", detail: "Koda, 3 yrs", fallback: "🦎" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Eublepharis_macularius1.jpg", caption: "Leopard Gecko", detail: "Spot, 4 yrs", fallback: "🦎" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Eastern_Box_Turtle2.jpg", caption: "Box Turtle", detail: "Shell, 15 yrs", fallback: "🐢" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Lacerta_viridis_-_male_01.JPG", caption: "Green Lizard", detail: "Rocky, 2 yrs", fallback: "🦎" },
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
      { url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Short-tailed_chinchilla.jpg", caption: "Chinchilla", detail: "Ash, 2 yrs", fallback: "🐭" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Golden_hamster_front_1.jpg", caption: "Hamster", detail: "Biscuit, 1 yr", fallback: "🐹" },
      { url: u("1779873448735-ac43e73bd0c9"), caption: "Sugar Glider", detail: "Glider, 2 yrs", fallback: "🐾" },
      { url: u("1762115815924-b6d5f3ae05a1"), caption: "Gerbil", detail: "Pebble, 1 yr", fallback: "🐭" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Lyonblackandwhitehoodedrat.jpg/3840px-Lyonblackandwhitehoodedrat.jpg", caption: "Pet Rat", detail: "Chip, 2 yrs", fallback: "🐭" },
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
