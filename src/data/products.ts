/**
 * The four GlowWithin® products — editorial content from the brand document's
 * "OUR PRODUCTS" section (hero ingredient → functional benefit → emotional
 * benefit → reason to buy).
 *
 * Prices, stock and the Buy button resolve against WooCommerce by `wooId`
 * (shop.glowwithin.co.in product IDs). `slug` is the apex editorial route;
 * `shopSlug` is the product's current slug on the shop (still the theme demo
 * slugs — rename them in wp-admin and update here; the live permalink from the
 * Store API is preferred whenever it is available).
 */

export interface HeroIngredient {
  name: string;
  role: string;
}

export interface Product {
  slug: string;
  wooId: number;
  /** Current product slug on shop.glowwithin.co.in (theme demo slugs until renamed in wp-admin). */
  shopSlug: string;
  category: string;
  categorySlug: string;
  /** Full marketing name, e.g. "GlowWithin® Nourishing Hair Serum". */
  name: string;
  /** Short name used on cards and in the collection line. */
  shortName: string;
  /** One-line glow promise, e.g. "Nourish Your Glow." */
  promise: string;
  /** Hero-ingredient headline, e.g. "RICE BRAN WATER + AMLA + BHRINGRAJ + BRAHMI". */
  heroLine: string;
  /** The hook question / statement. */
  hook: string;
  /** Brand-story style paragraph(s) from the "ABOUT OUR BRANDS" section. */
  story: string[];
  /** Full formulation sentence from the "OUR PRODUCTS" section. */
  formulation: string;
  heroIngredientsLabel: string;
  heroIngredients: HeroIngredient[];
  heroClosing?: string;
  experienceLabel: string;
  experience: string[];
  transformationLabel: string;
  transformation: string;
  /** Optional extra block ("Why GEL?", "Why make it part of her routine?"). */
  extra?: { title: string; text?: string; bullets?: string[] };
  /** Closing line under the product. */
  closing?: string;
  image: { src: string; alt: string; width: number; height: number };
  banner: string;
  netQty: string;
}

export const products: Product[] = [
  {
    slug: "nourishing-hair-serum",
    wooId: 223,
    shopSlug: "face-natural-skin-facisilis",
    category: "Hair Care",
    categorySlug: "hair-care",
    name: "GlowWithin® Nourishing Hair Serum",
    shortName: "Nourishing Hair Serum",
    promise: "Nourish Your Glow.",
    heroLine: "RICE BRAN WATER + AMLA + BHRINGRAJ + BRAHMI",
    hook: "What if your hair-care ritual could begin with four of India's most celebrated hair botanicals?",
    story: [
      "Beautiful hair is an expression of confidence. GlowWithin® Hair Serum brings together botanical ingredients such as Aloe Vera, Rice Bran Water, Brahmi, Amla, Hibiscus, Bhringraj, Methi and Argan Oil to provide nourishing everyday care for the scalp and hair.",
      "Designed to support stronger-looking, smoother and shinier hair, it transforms a daily hair-care ritual into a moment of nourishment and confidence.",
    ],
    formulation:
      "GlowWithin® Hair Serum combines Rice Bran Water that brings a natural, nourishing story to the formulation, complemented by Aloe Vera, Brahmi, Amla, Hibiscus, Bhringraj, Methi, Ginger, Argan Oil, Panthenol and Hydrolyzed Corn Protein.",
    heroIngredientsLabel: "Why these heroes?",
    heroIngredients: [
      { name: "Rice Bran Water", role: "Brings a natural nourishment to hair." },
      { name: "Amla", role: "Traditionally treasured in hair care for nourishing and conditioning hair." },
      { name: "Bhringraj", role: "A renowned Ayurvedic hair-care botanical traditionally associated with scalp and hair nourishment." },
      { name: "Brahmi", role: "Traditionally valued for scalp care and hair nourishment." },
    ],
    heroClosing:
      "Together with Argan Oil, Aloe Vera, and plant extracts, the formulation provides comprehensive everyday nourishment for the hair and scalp.",
    experienceLabel: "What you can experience",
    experience: ["Nourished scalp", "Stronger-looking hair", "Better manageability", "Natural-looking shine"],
    transformationLabel: "The emotional transformation",
    transformation: "From worrying about every strand to loving the way her hair feels.",
    closing: "Her hair evolves. Her care evolves with it.",
    image: {
      src: "https://shop.glowwithin.co.in/wp-content/uploads/2024/04/Gemini_Generated_Image_vrn5pjvrn5pjvrn5.png",
      alt: "GlowWithin® Nourishing Hair Serum bottle",
      width: 1088,
      height: 960,
    },
    banner: "/images/banners/banner-1.webp",
    netQty: "30 ml",
  },
  {
    slug: "brightening-face-serum",
    wooId: 228,
    shopSlug: "hand-cream-soft-dictum",
    category: "Face Care",
    categorySlug: "face-care",
    name: "GlowWithin® Brightening Face Serum",
    shortName: "Brightening Face Serum",
    promise: "Reveal Your Radiance.",
    heroLine: "SNAIL MUCIN + VITAMIN C + NIACINAMIDE + ALPHA ARBUTIN",
    hook: "The celebrated actives. One radiant skin ritual.",
    story: [
      "Every complexion has its own story - and every woman deserves to feel confident in her own skin. GlowWithin® Face Serum combines Niacinamide, Ethyl Ascorbic Acid, Alpha Arbutin, Hyaluronic Acid, Ferulic Acid, Snail Secretion Filtrate and Allantoin to support brighter, hydrated, smoother and more even-looking skin.",
      "A few drops become a daily ritual of care, helping her reveal the natural radiance she already carries.",
    ],
    formulation:
      "And the formulation goes further with Ferulic Acid, Betaine, Witch Hazel and Allantoin.",
    heroIngredientsLabel: "The hero ingredients",
    heroIngredients: [
      { name: "Snail Secretion Filtrate", role: "Supports skin conditioning, hydration and smoother-looking texture." },
      { name: "Hyaluronic Acid", role: "Helps attract and retain moisture, supporting hydrated, plumper-looking skin." },
      { name: "Niacinamide", role: "Supports the skin barrier and even-looking tone." },
      { name: "Vitamin C", role: "Supports radiance. Helps support brighter, more radiant-looking skin." },
      { name: "Alpha Arbutin", role: "Helps improve the appearance of pigmentation." },
    ],
    experienceLabel: "Why she'll love it",
    experience: ["Deep hydration", "Smoother-looking texture", "Radiance", "Even-looking skin"],
    transformationLabel: "The emotional transformation",
    transformation: "A few drops become a daily ritual of care, helping her reveal the natural radiance she already carries.",
    closing: "Her radiance evolves. Her glow shines through.",
    image: {
      src: "https://shop.glowwithin.co.in/wp-content/uploads/2024/04/Gemini_Generated_Image_peg181peg181peg1.png",
      alt: "GlowWithin® Brightening Face Serum bottle",
      width: 1024,
      height: 1024,
    },
    banner: "/images/banners/banner-3.webp",
    netQty: "30 ml",
  },
  {
    slug: "gel-based-face-cream",
    wooId: 218,
    shopSlug: "body-cream-parturient",
    category: "Face Care",
    categorySlug: "face-care",
    name: "GlowWithin® Gel Based Face Cream",
    shortName: "Gel Based Face Cream",
    promise: "Hydrate Your Glow.",
    heroLine: "HYALURONIC ACID + ALOE VERA + CENTELLA",
    hook: "Lightweight Hydration. Deep Comfort.",
    story: [
      "Hydration should feel refreshing, effortless and comfortable. GlowWithin® Gel Based Face Cream combines Aloe Vera, Rice Bran Water, Centella Asiatica (CICA), Hyaluronic Acid, Squalane, Glycerin and Ethyl Ascorbic Acid in a lightweight gel-based formulation.",
      "Designed to deliver everyday hydration without a heavy or greasy feel, it leaves skin feeling fresh, soft, comfortable and beautifully cared for.",
    ],
    formulation:
      "Why should hydration feel heavy? GlowWithin® Gel Face Cream combines Hyaluronic Acid, Aloe Vera and Centella Asiatica with Rice Bran Water, Ethyl Ascorbic Acid, Squalane and Glycerin.",
    heroIngredientsLabel: "The hero ingredients",
    heroIngredients: [
      { name: "Hyaluronic Acid", role: "Helps attract and retain moisture for hydrated, plumper-looking skin." },
      { name: "Aloe Vera", role: "Helps soothe and hydrate the skin." },
      { name: "Centella Asiatica", role: "Known for its soothing and skin-conditioning properties." },
      { name: "Squalane", role: "Helps maintain skin softness with a lightweight skin feel." },
    ],
    experienceLabel: "Light hydration. Lasting comfort. Everyday glow.",
    experience: ["Fresh", "Lightweight", "Non-greasy feel", "Comfortable everyday hydration", "Deep penetration"],
    transformationLabel: "The emotional transformation",
    transformation: "From heavy skincare to a fresh, weightless feeling she can enjoy every day.",
    extra: {
      title: "Why GEL?",
      text: "Because modern women want hydration without heaviness.",
    },
    closing: "Light hydration. Lasting comfort. Everyday glow.",
    image: {
      src: "https://shop.glowwithin.co.in/wp-content/uploads/2024/04/Gemini_Generated_Image_bbt2x5bbt2x5bbt2.png",
      alt: "GlowWithin® Gel Based Face Cream",
      width: 1088,
      height: 960,
    },
    banner: "/images/banners/banner-2.webp",
    netQty: "100 ml",
  },
  {
    slug: "intimate-wash",
    wooId: 213,
    shopSlug: "schampoo-with-olive",
    category: "Intimate Care",
    categorySlug: "intimate-care",
    name: "GlowWithin® Intimate Wash",
    shortName: "Intimate Wash",
    promise: "Care for Your Glow.",
    heroLine: "LACTIC ACID + CRANBERRY + TEA TREE EXTRACT + INULIN (PRE-BIOTIC)",
    hook: "Gentle Care for Her Most Personal Wellness",
    story: [
      "Some of a woman's most important wellness needs are also the most personal. GlowWithin® Intimate Wash is a gentle, pH-conscious daily cleansing formulation with Lactic Acid, Aloe Vera, Cranberry Extract, Niacinamide, D-Panthenol, Inulin and Tea Tree Extract.",
      "Created to support freshness, comfort and intimate hygiene, it brings thoughtful care to an essential part of her everyday wellness routine.",
    ],
    formulation:
      "Because intimate care deserves its own ritual. GlowWithin® Intimate Wash combines Lactic Acid, Aloe Vera, Cranberry Extract, Niacinamide, D-Panthenol, Inulin, Tea Tree Extract, Glycerin and Urea.",
    heroIngredientsLabel: "The hero ingredients",
    heroIngredients: [
      { name: "Lactic Acid", role: "Helps support the naturally acidic environment of intimate skin." },
      { name: "Aloe Vera", role: "Helps provide gentle cleansing and skin comfort." },
      { name: "Cranberry Extract", role: "A botanical ingredient associated with women's wellness." },
      { name: "Inulin (Pre-biotic)", role: "Supports a gentle, microbiome-conscious approach to intimate care." },
      { name: "Tea Tree Extract", role: "Provides a refreshing cleansing experience." },
      { name: "D-Panthenol", role: "Helps moisturise and condition delicate skin." },
    ],
    experienceLabel: "What she experiences",
    experience: ["Gentle cleansing", "Freshness", "Comfort", "pH-conscious care"],
    transformationLabel: "The emotional transformation",
    transformation: "Feel fresh. Feel comfortable. Feel confidently yourself.",
    extra: {
      title: "Why make it part of her routine?",
      text: "Because intimate wellness is personal care - not occasional care.",
    },
    closing: "Because feeling fresh and comfortable is part of feeling confident.",
    image: {
      src: "https://shop.glowwithin.co.in/wp-content/uploads/2024/04/Gemini_Generated_Image_cqq2p5cqq2p5cqq2.png",
      alt: "GlowWithin® Intimate Wash",
      width: 1088,
      height: 960,
    },
    banner: "/images/banners/banner-5.webp",
    netQty: "100 ml",
  },
];

export const productsIntro = {
  heading: "Our Products",
  subheading: "Nature's Heroes. Thoughtful Care. Her Everyday Glow.",
  text: "Every GlowWithin® formulation begins with a purpose—and every purpose has its hero. We bring together carefully selected ingredients with modern formulation science to create everyday wellness solutions that help her nourish, reveal, hydrate and care for her glow.",
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
