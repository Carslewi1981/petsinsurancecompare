"use client";

import { useState, useCallback } from "react";
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
  index,
  liked,
  onLike,
  likeCaption,
  featured = false,
}: {
  photo: PetPhoto;
  index: number;
  liked: boolean;
  onLike: () => void;
  likeCaption: boolean;
  featured?: boolean;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  // Parent keys each card by URL, so state starts fresh. A ref callback catches images the browser already cached.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, []);

  return (
    <figure
      className="relative overflow-hidden group h-full"
      style={{
        borderRadius: 12,
        background: "var(--color-mint-soft)",
        border: "2px solid var(--color-ink)",
        gridColumn: featured ? "span 2" : undefined,
        gridRow: featured ? "span 2" : undefined,
      }}
    >
      {(!imgLoaded || imgError) && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <span style={{ fontSize: featured ? 64 : 34, lineHeight: 1 }}>{photo.fallback}</span>
        </div>
      )}
      {!imgError && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={photo.url}
          alt={photo.caption}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s, transform 0.5s",
          }}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}

      <figcaption
        className="absolute left-2 bottom-2 px-2.5 py-1 rounded-full"
        style={{ background: "var(--color-paper)", border: "2px solid var(--color-ink)", fontSize: featured ? 14 : 12, fontWeight: 650, lineHeight: 1.2 }}
      >
        {photo.caption}
        {photo.detail && featured ? <span style={{ fontWeight: 500, color: "var(--color-muted)" }}>, {photo.detail}</span> : null}
      </figcaption>

      <button
        onClick={onLike}
        aria-pressed={liked}
        aria-label={`${liked ? "Unfavorite" : "Favorite"} ${photo.caption}`}
        className="absolute top-2 right-2 flex items-center justify-center rounded-full"
        style={{
          width: 34,
          height: 34,
          background: liked ? "var(--color-tag)" : "var(--color-paper)",
          border: "2px solid var(--color-ink)",
        }}
      >
        <Heart
          className="w-4 h-4"
          style={{ color: "var(--color-ink)", fill: liked ? "var(--color-stamp)" : "none" }}
        />
      </button>

      <AnimatePresence>
        {likeCaption && liked && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-2 bottom-12 text-center px-2 py-1.5"
            style={{ borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--color-tag)", border: "2px solid var(--color-ink)" }}
          >
            {LIKED_CAPTIONS[index % LIKED_CAPTIONS.length]}
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
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
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
    setLikeCaption(idx);
    setTimeout(() => setLikeCaption(null), 2200);
  };

  const photos = activePet.photos.slice(0, 6);

  return (
    <section style={{ background: "var(--color-mint)", padding: "clamp(64px, 9vw, 120px) 0" }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <h2 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}>
              What type of pet do you have?
            </h2>
            <p className="mt-4 prose-measure" style={{ fontSize: 19, color: "var(--color-muted)", maxWidth: "46ch" }}>
              Choose yours to see common health risks and what a bad week costs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pet type">
            {PET_TYPES.map((pet) => {
              const active = activePet.id === pet.id;
              return (
                <button
                  key={pet.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTabClick(pet)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors"
                  style={{
                    fontSize: 16,
                    fontWeight: active ? 700 : 500,
                    background: active ? "var(--color-scrub)" : "var(--color-paper)",
                    color: active ? "#fff" : "var(--color-ink)",
                    border: "2px solid var(--color-ink)",
                  }}
                >
                  <span aria-hidden style={{ fontSize: 18 }}>
                    {pet.emoji}
                  </span>
                  {pet.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePet.id}
            role="tabpanel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-start"
          >
            <div>
              <div className="grid grid-cols-3 gap-2.5" style={{ gridAutoRows: "clamp(96px, 15vw, 168px)" }}>
                {photos.map((photo, i) => (
                  <PhotoCard
                    key={photo.url}
                    photo={photo}
                    index={i}
                    featured={i === 0}
                    liked={liked.has(i)}
                    onLike={() => toggleLike(i)}
                    likeCaption={likeCaption === i}
                  />
                ))}
              </div>
              <p className="mt-3" style={{ fontSize: 14, color: "var(--color-muted)" }}>
                {liked.size > 0
                  ? `${liked.size} favorite${liked.size === 1 ? "" : "s"}. Now find them a plan.`
                  : "Tap the heart on any photo to save a favorite."}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="heading" style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}>
                  {activePet.headline}
                </h3>
                <p className="mt-3 prose-measure" style={{ fontSize: 17, lineHeight: 1.6 }}>
                  {activePet.sub}
                </p>
              </div>

              <p
                className="px-4 py-3"
                style={{ fontSize: 16, lineHeight: 1.5, background: "var(--color-paper)", borderRadius: 10, borderLeft: "6px solid var(--color-teal)" }}
              >
                {activePet.fact}
              </p>

              <div>
                <h4 className="heading mb-2" style={{ fontSize: 20 }}>
                  Common health risks
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {activePet.riskNote.split(" · ").map((risk) => (
                    <li
                      key={risk}
                      className="px-3 py-1 rounded-full"
                      style={{ fontSize: 14, fontWeight: 550, background: "var(--color-tag-soft)", border: "1.5px solid var(--color-ink)" }}
                    >
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/compare" className="btn self-start">
                {activePet.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
