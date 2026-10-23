export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  seed: string;
  images?: string[];
  isNew?: boolean;
  isClearance?: boolean;
  suggestedProductId?: string;
  // Optional label. When set, this product is treated as the FIRST product
  // of a named sub-section inside its category page, and shows up as a
  // jump-link in the category sidebar (e.g. "Blackout", "Curtains with Pelmet").
  sectionLabel?: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  seed: string;
  tagline: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
}

export interface Testimonial {
  id: string;
  type: "text" | "screenshot";
  name?: string;
  text?: string;
  image?: string;
}

export interface Offer {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  whatsappMessage: string;
}

export const OFFERS: Offer[] = [
  {
    id: "offer-reupholstery",
    eyebrow: "Reupholstery",
    title: "20% off your sofa makeover",
    description:
      "Bring us your tired sofa or armchair — we strip, rebuild, and re-upholster it in the fabric of your choice. Free pickup inside Cairo.",
    badge: "-20%",
    image: "lmr-offer-reupholstery",
    whatsappMessage:
      "Hello La Maison Riche, I'd like to use the 20% reupholstery offer.",
  },
  {
    id: "offer-curtains",
    eyebrow: "Curtains",
    title: "Buy two curtains, the third is on us",
    description:
      "Choose any two custom curtains from our showroom and the third one — same size or smaller — is complimentary. Tailoring included.",
    badge: "Buy 2 Get 1",
    image: "lmr-offer-curtains",
    whatsappMessage:
      "Hello La Maison Riche, I'd like the Buy 2 Get 1 Free curtains offer.",
  },
  {
    id: "offer-consultation",
    eyebrow: "Consultation",
    title: "Free in-home design consultation",
    description:
      "Our designers visit your home in greater Cairo, take measurements, and propose a full styling plan — at no cost when you order with us.",
    badge: "Free",
    image: "lmr-offer-consultation",
    whatsappMessage:
      "Hello La Maison Riche, I'd like to book a free home design consultation.",
  },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Sofas",
    slug: "Sofas",
    seed: "Images/New%20folder%20(2)/cat/sofs.jpg",
    tagline: "Statement seating",
  },
  {
    name: "Curtains",
    slug: "Curtains",
    seed: "lmr-cat-curtains",
    tagline: "Drape & light",
  },
  {
    name: "Chairs",
    slug: "Chairs",
    seed: "lmr-cat-chairs",
    tagline: "Sculpted comfort",
  },
  {
    name: "Fabrics",
    slug: "Fabrics",
    seed: "lmr-cat-fabrics",
    tagline: "By the meter",
  },
  {
    name: "Wallpapers",
    slug: "Wallpapers",
    seed: "lmr-cat-wallpapers",
    tagline: "Walls reimagined",
  },
  {
    name: "Carpets",
    slug: "Carpets",
    seed: "lmr-cat-carpets",
    tagline: "Underfoot luxury",
  },
  {
    name: "Lighting",
    slug: "Lighting",
    seed: "lmr-cat-lighting",
    tagline: "Mood by design",
  },
  {
    name: "Decorative Objects",
    slug: "Decorative Objects",
    seed: "lmr-cat-decor",
    tagline: "Finishing notes",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "sofa-1",
    name: "The Versailles Chesterfield",
    category: "Sofas",
    description:
      "A masterful reinterpretation of the classic Chesterfield, featuring deep diamond tufting in crimson velvet with hand-applied gold leaf accents on the carved mahogany base.",
    price: "Inquire",
    seed: "sofa1",
    isNew: true,
  },
  {
    id: "sofa-2",
    name: "L'Etoile Sectional",
    category: "Sofas",
    description:
      "Expansive and inviting, this contemporary luxury sectional is upholstered in woven ivory bouclé, resting on a sleek brushed brass plinth.",
    price: "Inquire",
    seed: "sofa2",
    isNew: true,
  },
  {
    id: "curtain-1",
    name: "Royal Damask Drapes",
    category: "Curtains",
    description:
      "Heavyweight silk damask curtains woven in Italy, featuring a subtle tone-on-tone charcoal pattern with a dramatic puddle-length drop.",
    price: "Inquire",
    seed: "curtain1",
  },
  {
    id: "curtain-2",
    name: "Gossamer Gold Sheers",
    category: "Curtains",
    description:
      "Ethereal linen-blend sheer panels threaded with delicate metallic gold strands to filter Cairo's afternoon sun into a warm, inviting glow.",
    price: "Inquire",
    seed: "curtain2",
    isNew: true,
  },
  {
    id: "chair-1",
    name: "Monarque Accent Chair",
    category: "Chairs",
    description:
      "A sculptural masterpiece featuring a sweeping backrest and upholstered in premium ebony suede with a polished bronze swivel base.",
    price: "Inquire",
    seed: "chair1",
  },
  {
    id: "chair-2",
    name: "Jolie Bergère",
    category: "Chairs",
    description:
      "A classic French-style armchair updated with our signature deep red velvet and an antiqued silver leaf frame.",
    price: "Inquire",
    seed: "chair2",
    isNew: true,
  },
  {
    id: "chair-3",
    name: "Oasis Lounger",
    category: "Chairs",
    description:
      "Low, deep, and impossibly comfortable. This modern lounge chair is wrapped in rich textured chenille with subtle leather piping.",
    price: "Inquire",
    seed: "chair3",
  },
  {
    id: "fabric-1",
    name: "Venetian Brocade",
    category: "Fabrics",
    description:
      "Luxurious heavyweight brocade featuring an intricate floral motif, ideal for bespoke upholstery and heavy drapery. Available by the meter.",
    price: "Inquire",
    seed: "fabric1",
  },
  {
    id: "fabric-2",
    name: "Midnight Velvet",
    category: "Fabrics",
    description:
      "Our signature high-pile cotton velvet. Impossibly soft with a subtle sheen that captures light beautifully. Available by the meter.",
    price: "Inquire",
    seed: "fabric2",
    isNew: true,
  },
  {
    id: "wallpaper-1",
    name: "Gilded Lotus",
    category: "Wallpapers",
    description:
      "Hand-painted metallic lotus motifs on a matte black textured background. Adds immediate drama and depth to any room.",
    price: "Inquire",
    seed: "wallpaper1",
    isNew: true,
  },
  {
    id: "wallpaper-2",
    name: "Silk Moire",
    category: "Wallpapers",
    description:
      "A refined wallcovering that mimics the watered appearance of moiré silk, offering a subtle, sophisticated shimmer.",
    price: "Inquire",
    seed: "wallpaper2",
  },
  {
    id: "carpet-1",
    name: "Persian Noir",
    category: "Carpets",
    description:
      "A hand-knotted wool and silk masterpiece featuring a traditional medallion design over-dyed in deep charcoal with hints of crimson.",
    price: "Inquire",
    seed: "carpet1",
  },
  {
    id: "carpet-2",
    name: "Sahara Silk Runner",
    category: "Carpets",
    description:
      "A luminous 100% pure silk runner, softly transitioning through hues of cream, champagne, and pale gold.",
    price: "Inquire",
    seed: "carpet2",
    isNew: true,
  },
  {
    id: "lighting-1",
    name: "Cristal Cascade Chandelier",
    category: "Lighting",
    description:
      "A breathtaking tiered chandelier composed of hundreds of faceted crystal prisms suspended from a polished brass armature.",
    price: "Inquire",
    seed: "lighting1",
    isNew: true,
  },
  {
    id: "lighting-2",
    name: "Eclipse Sconce",
    category: "Lighting",
    description:
      "Architectural wall lighting featuring a disk of rough-cast bronze that softly back-illuminates against the wall.",
    price: "Inquire",
    seed: "lighting2",
  },
  {
    id: "decor-1",
    name: "Obsidian Obelisk",
    category: "Decorative Objects",
    description:
      "A towering, hand-carved piece of polished black marble, striking in its simplicity and commanding presence.",
    price: "Inquire",
    seed: "decor1",
  },
  {
    id: "decor-2",
    name: "Bronze Lotus Bowl",
    category: "Decorative Objects",
    description:
      "A wide, shallow centerpiece bowl cast in solid bronze with a verdigris patina exterior and a polished interior.",
    price: "Inquire",
    seed: "decor2",
    isNew: true,
  },
  {
    id: "decor-3",
    name: "Gilded Mirror",
    category: "Decorative Objects",
    description:
      "An oversized floor mirror framed in intricately carved wood, finished with authentic 24k gold leaf and antiqued detailing.",
    price: "Inquire",
    seed: "decor3",
  },
];

export interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  description: string;
  beforeSeed: string;
  afterSeed: string;
}

export const BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: "ba-1",
    title: "The Enchanting Classic Sofa Transformation",
    location: "Zamalek, Cairo",
    description:
      "From a faded vintage piece to a vibrant work of art, we completely revitalized this classic luxury sofa using rich, high-end red fabric paired with stylish patterned accent pillows to bring warmth and royal majesty to your living and reception rooms at La Maison Riche.",
    beforeSeed: "Images/New%20folder%20(2)/befaf/2/IMG-20260801-WA0073.jpg",
    afterSeed:
      "Images/New%20folder%20(2)/befaf/2/motion_photo_8152359463603602332.jpg",
  },
  {
    id: "ba-2",
    title: "The Enchanting Modern Sofa Transformation",
    location: "Maadi, Cairo",
    description:
      "From a dated patterned design to a modern piece radiating minimalism and elegance; we completely transformed this sofa using a sleek, serene gray fabric and ultra-soft texturing with matching accent pillows to bring a comfortable and luxurious vibe to modern living spaces at La Maison Riche.",
    beforeSeed: "Images/New%20folder%20(2)/befaf/1/IMG-20260208-WA0366.jpg",
    afterSeed: "Images/New%20folder%20(2)/befaf/1/IMG-20260208-WaaqA0367.jpg",
  },
  {
    id: "ba-3",
    title: "The Stunning Modern Sofa Transformation",
    location: "New Cairo",
    description:
      "From a conventional repetitive design to a striking modern statement piece; we completely redesigned this large sofa to be upholstered in a soft, luxurious gray fabric that brings brightness and spaciousness to living rooms, paired with clean, comfortable lines reflecting the modern elegance of La Maison Riche.",
    beforeSeed: "Images/New%20folder%20(2)/befaf/1/IMG-20260208-WA0365.jpg",
    afterSeed: "Images/New%20folder%20(2)/befaf/1/IMG-20260208-WA0367.jpg",
  },
  {
    id: "ba-4",
    title: "The Grand Armchair Revival",
    location: "Zamalek, Cairo",
    description:
      "From an outdated vintage piece into a regal statement of style; we completely transformed this classic armchair using vibrant red fabric and an ornate patterned accent pillow, perfectly tailored to elevate the grandeur of luxury classic salons at La Maison Riche.",
    beforeSeed: "Images/New%20folder%20(2)/befaf/2/IMG-20260801-WA0075.jpg",
    afterSeed:
      "Images/New%20folder%20(2)/befaf/2/motion_photo_788542347669741484.jpg",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Ahmed Shobeir Apartment",
    description:
      "A full interior refurbishment project including new sofas, curtains, and decorative finishing.",
    images: [],
    videos: [],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    type: "text",
    name: "Michael R.",
    text: "Beautiful showroom, excellent quality and service.",
  },
  {
    id: "testimonial-2",
    type: "text",
    name: "Sarah L.",
    text: "They transformed our living room completely. Highly recommend.",
  },
  {
    id: "testimonial-3",
    type: "text",
    name: "Ahmed K.",
    text: "Professional team and great attention to detail.",
  },
  {
    id: "testimonial-4",
    type: "text",
    name: "Noura H.",
    text: "Amazing craftsmanship, will definitely order again.",
  },
  { id: "testimonial-5", type: "screenshot", image: "" },
  { id: "testimonial-6", type: "screenshot", image: "" },
];

export const getImageUrl = (seed: string, w = 800, h = 600) => {
  // لو الـ seed عبارة عن مسار فايل (زي images/photo.jpg) هيرجعه هو هو
  if (seed.startsWith("/")) return seed;
  if (seed.includes("/") || seed.includes(".")) {
    return `/${seed}`;
  }
  // لو مجرد كلمة (seed) هيفضل يستخدم الصور العشوائية
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
};

export const getProductImages = (product: Product, w = 1000, h = 800) => {
  const images = product.images?.filter(Boolean);
  return (images?.length ? images : [product.seed]).map((image) => {
    if (
      image.startsWith("data:") ||
      image.startsWith("blob:") ||
      image.startsWith("http") ||
      image.startsWith("/")
    )
      return image;
    return getImageUrl(image, w, h);
  });
};
