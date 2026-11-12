import { Product, OrderRecord, CustomScreenData, ExtractedImage } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aura Studio ANC Headphones',
    brand: 'SonicAura',
    category: 'Audio',
    price: 349.00,
    originalPrice: 420.00,
    rating: 4.9,
    reviewsCount: 384,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop',
    ],
    tag: 'Best Seller',
    description: 'Precision-tuned acoustic architecture with custom 40mm beryllium drivers, active spatial transparency, and up to 48 hours battery life wrapped in memory foam lambskin.',
    features: [
      'Active Noise Cancellation with Transparency Mode',
      'Custom 40mm Beryllium acoustic drivers',
      'Bluetooth 5.3 with multipoint device switching',
      'Fast charge: 15 mins provides 8 hours playtime',
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1c1c1e' },
      { name: 'Silver Lunar', hex: '#d1d5db' },
      { name: 'Deep Bronze', hex: '#78350f' },
    ],
    inStock: true,
  },
  {
    id: 'prod-2',
    title: 'Vektor Minimal Mechanical Timepiece',
    brand: 'Chronos Lab',
    category: 'Accessories',
    price: 580.00,
    originalPrice: 650.00,
    rating: 4.8,
    reviewsCount: 192,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    ],
    tag: 'Editor Pick',
    description: 'Automatic mechanical caliber with 42-hour power reserve, domed anti-reflective sapphire crystal, and 316L surgical stainless steel body hand-finished in Switzerland.',
    features: [
      'Swiss-made mechanical movement',
      'Scratchproof domed sapphire crystal',
      '5 ATM water resistance rating (50m)',
      'Italian vegetable-tanned calfskin strap',
    ],
    colors: [
      { name: 'Steel & Cream', hex: '#f3f4f6' },
      { name: 'Midnight PVD', hex: '#111827' },
      { name: 'Rose Gold', hex: '#e2b197' },
    ],
    sizes: ['38mm', '41mm'],
    inStock: true,
  },
  {
    id: 'prod-3',
    title: 'Kyoto Ceramic Pour-Over Set',
    brand: 'Komorebi Crafts',
    category: 'Living',
    price: 94.00,
    originalPrice: 110.00,
    rating: 4.95,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    ],
    tag: 'Trending',
    description: 'Wheel-thrown artisanal stoneware with tactile matte ash glaze. Engineered with conical ribbing for optimal water thermal extraction and clean aroma clarity.',
    features: [
      'Handcrafted high-fire stoneware ceramic',
      'Precision thermal retention body',
      'Includes 600ml matching carafe & dripper',
      'Microwave and dishwasher safe',
    ],
    colors: [
      { name: 'Wabi Sand', hex: '#d6c7b2' },
      { name: 'Charcoal Basalt', hex: '#374151' },
      { name: 'Mist Olive', hex: '#6b7280' },
    ],
    inStock: true,
  },
  {
    id: 'prod-4',
    title: 'Nordic Wool Architect Overshirt',
    brand: 'Klar Studio',
    category: 'Apparel',
    price: 220.00,
    originalPrice: 260.00,
    rating: 4.7,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    ],
    tag: 'New Season',
    description: 'Double-faced 100% recycled Scandinavian wool tailored for structural drape. Reinforced horn buttons, deep architect patch pockets, and subtle drop shoulders.',
    features: [
      '100% Recycled Merino and Shetland wool',
      'Natural water and wind resistance',
      'Internal discreet passport pocket',
      'Fair-wear certified tailoring in Portugal',
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#d7cec7' },
      { name: 'Forest Moss', hex: '#2d3748' },
      { name: 'Midnight Ink', hex: '#1e293b' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
  {
    id: 'prod-5',
    title: 'Lumina Portable Ambient Lantern',
    brand: 'Studio Nook',
    category: 'Living',
    price: 165.00,
    originalPrice: 195.00,
    rating: 4.88,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    ],
    tag: 'Design Award',
    description: 'Sculptural cordless luminaire featuring smooth brass touch dimming, warm 2200K twilight glow, and IP54 splash resistance for indoor reading or twilight garden dining.',
    features: [
      '3-stage capacitive touch step dimming',
      'Warm twilight LED filament (2200K - 95 CRI)',
      'USB-C magnetic dock charging',
      '18 hours continuous battery life on single charge',
    ],
    colors: [
      { name: 'Brushed Brass', hex: '#d4af37' },
      { name: 'Matte White', hex: '#f9fafb' },
      { name: 'Anodized Sage', hex: '#4d7c0f' },
    ],
    inStock: true,
  },
  {
    id: 'prod-6',
    title: 'Terraform Botanical Diffuser',
    brand: 'Arbor & Stone',
    category: 'Living',
    price: 88.00,
    rating: 4.65,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    ],
    description: 'Cold-mist ultrasonic scent diffuser carved from solid travertine limestone. Gently purifies ambient air with pure botanical extracts.',
    features: [
      'Carved natural porous travertine rock',
      'Ultrasonic whisper-quiet operation (<20dB)',
      'Ambient halo glow ring',
      'Automatic dry shutoff sensor',
    ],
    colors: [
      { name: 'Beige Travertine', hex: '#e5e0d8' },
      { name: 'Black Basalt', hex: '#262626' },
    ],
    inStock: true,
  }
];

export const MOCK_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-89241',
    date: 'Nov 08, 2026',
    itemsCount: 2,
    total: 443.00,
    status: 'In Transit',
    estimatedDelivery: 'Tomorrow by 2:00 PM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'ORD-76120',
    date: 'Oct 24, 2026',
    itemsCount: 1,
    total: 94.00,
    status: 'Delivered',
    estimatedDelivery: 'Delivered to front door',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'ORD-61099',
    date: 'Sep 15, 2026',
    itemsCount: 3,
    total: 618.00,
    status: 'Delivered',
    estimatedDelivery: 'Signed by recipient',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop',
  }
];

export const PRESET_HTML_SCREENS: CustomScreenData[] = [
  {
    id: 'preset-artisan-cafe',
    title: 'Artisan Coffee Roasters',
    description: 'Specialty cafe storefront with hotlinked espresso imagery, origin tags, and roast profiles.',
    themeColor: '#78350f',
    rawHtml: `
<div class="min-h-full bg-stone-900 text-stone-100 p-5 font-sans pb-16">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <span class="text-xs uppercase tracking-widest text-amber-400 font-semibold">Single Origin Hub</span>
      <h1 class="text-2xl font-bold tracking-tight text-white mt-1">Kurasu Kyoto Roasters</h1>
    </div>
    <div class="w-10 h-10 rounded-full border border-stone-700 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Barista" class="w-full h-full object-cover" />
    </div>
  </div>

  <!-- Hero Feature Card -->
  <div class="relative overflow-hidden rounded-2xl bg-stone-800 border border-stone-700/60 shadow-xl mb-6">
    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop" alt="Coffee Pour" class="w-full h-48 object-cover brightness-90" />
    <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
    <div class="absolute bottom-4 left-4 right-4">
      <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500 text-stone-950 uppercase tracking-wider">Seasonal Harvest</span>
      <h2 class="text-xl font-bold text-white mt-1.5">Ethiopia Yirgacheffe G1</h2>
      <p class="text-xs text-stone-300 mt-1 line-clamp-1">Bergamot blossom, candied peach, sweet jasmine tea finish.</p>
    </div>
  </div>

  <!-- Fast Filter Pills -->
  <div class="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
    <button class="px-4 py-2 rounded-full text-xs font-semibold bg-amber-500 text-stone-950 whitespace-nowrap">All Blends</button>
    <button class="px-4 py-2 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700 whitespace-nowrap">Filter Roast</button>
    <button class="px-4 py-2 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700 whitespace-nowrap">Espresso</button>
    <button class="px-4 py-2 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700 whitespace-nowrap">Drip Bags</button>
  </div>

  <!-- Product List Grid -->
  <h3 class="text-sm font-semibold tracking-wider uppercase text-stone-400 mb-3">Fresh Roasts This Week</h3>
  <div class="grid grid-cols-2 gap-3 mb-6">
    <div class="p-3 rounded-xl bg-stone-800/80 border border-stone-700/70 hover:border-amber-500/50 transition">
      <div class="h-28 rounded-lg overflow-hidden mb-2.5 bg-stone-900">
        <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop" alt="Dark Roast" class="w-full h-full object-cover" />
      </div>
      <div class="text-xs font-semibold text-white">Sumatra Mandheling</div>
      <div class="text-[11px] text-stone-400">Dark Cocoa & Spice</div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-xs font-bold text-amber-400">$21.50</span>
        <button class="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">+</button>
      </div>
    </div>

    <div class="p-3 rounded-xl bg-stone-800/80 border border-stone-700/70 hover:border-amber-500/50 transition">
      <div class="h-28 rounded-lg overflow-hidden mb-2.5 bg-stone-900">
        <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop" alt="Pour Over" class="w-full h-full object-cover" />
      </div>
      <div class="text-xs font-semibold text-white">Geisha Panama Lot 9</div>
      <div class="text-[11px] text-stone-400">Papaya & Lychee</div>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-xs font-bold text-amber-400">$36.00</span>
        <button class="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">+</button>
      </div>
    </div>
  </div>

  <!-- Subscription Banner -->
  <div class="p-4 rounded-xl bg-gradient-to-r from-amber-600/30 to-amber-950/40 border border-amber-500/30 flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">☕</div>
    <div class="flex-1">
      <div class="text-xs font-bold text-white">Bi-weekly Roaster Club</div>
      <div class="text-[11px] text-stone-300">Free courier delivery + 15% off bags</div>
    </div>
    <button class="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400">Join</button>
  </div>
</div>
`,
    extractedImages: [
      { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', alt: 'Barista' },
      { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop', alt: 'Coffee Pour' },
      { src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop', alt: 'Dark Roast' },
      { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400&auto=format&fit=crop', alt: 'Pour Over' },
    ]
  },
  {
    id: 'preset-luxury-resort',
    title: 'Aura Alpine Retreats',
    description: 'High-end travel and boutique chalet booking experience with panoramic scenery.',
    themeColor: '#0284c7',
    rawHtml: `
<div class="min-h-full bg-slate-950 text-slate-100 p-5 font-sans pb-16">
  <!-- Top bar -->
  <div class="flex items-center justify-between mb-5">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-xs font-medium text-slate-400">Zermatt, Switzerland</span>
    </div>
    <button class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">Explore Map</button>
  </div>

  <h1 class="text-2xl font-extrabold text-white leading-tight mb-2">Sanctuary Above the Clouds</h1>
  <p class="text-xs text-slate-400 mb-5">Handpicked architectural chalets with geothermal hot springs and Michelin dining.</p>

  <!-- Big Hero Retreat -->
  <div class="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-6">
    <img src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop" alt="Alpine Chalet" class="w-full h-56 object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
    <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-400 font-semibold">★ 4.98 (86)</div>
    <div class="absolute bottom-4 left-4 right-4">
      <span class="text-[10px] uppercase font-bold tracking-widest text-sky-400">Exclusive Villa</span>
      <div class="text-lg font-bold text-white">Chalet Matterhorn Noir</div>
      <div class="flex items-center justify-between mt-2">
        <div>
          <span class="text-lg font-bold text-white">$1,450</span>
          <span class="text-xs text-slate-400"> / night</span>
        </div>
        <button class="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs transition">Reserve Now</button>
      </div>
    </div>
  </div>

  <!-- Experiences Grid -->
  <div class="flex items-center justify-between mb-3">
    <h3 class="text-xs uppercase font-bold tracking-wider text-slate-400">Curated Experiences</h3>
    <a href="#" class="text-xs text-sky-400 font-semibold">See all (14)</a>
  </div>

  <div class="space-y-3">
    <div class="flex gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 items-center">
      <img src="https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=200&auto=format&fit=crop" alt="Spa" class="w-16 h-16 rounded-lg object-cover" />
      <div class="flex-1">
        <div class="text-xs font-bold text-white">Private Cedar Onsen Spa</div>
        <div class="text-[11px] text-slate-400">Mineral heated baths facing peaks</div>
        <div class="text-xs font-semibold text-sky-400 mt-1">$120 / person</div>
      </div>
    </div>

    <div class="flex gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 items-center">
      <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200&auto=format&fit=crop" alt="Mountain" class="w-16 h-16 rounded-lg object-cover" />
      <div class="flex-1">
        <div class="text-xs font-bold text-white">Heli-Skiing Glacier Route</div>
        <div class="text-[11px] text-slate-400">Certified mountain guide included</div>
        <div class="text-xs font-semibold text-sky-400 mt-1">$480 / session</div>
      </div>
    </div>
  </div>
</div>
`,
    extractedImages: [
      { src: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop', alt: 'Alpine Chalet' },
      { src: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=200&auto=format&fit=crop', alt: 'Spa' },
      { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200&auto=format&fit=crop', alt: 'Mountain' },
    ]
  }
];

export function extractImagesFromHtml(html: string): ExtractedImage[] {
  const images: ExtractedImage[] = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    const altMatch = /alt=["']([^"']*)["']/i.exec(fullTag);
    const alt = altMatch ? altMatch[1] : 'Hotlinked image';
    if (src && !images.some(img => img.src === src)) {
      images.push({ src, alt });
    }
  }

  // Also check background images url(...)
  const bgRegex = /url\(["']?(https?:\/\/[^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src && !images.some(img => img.src === src)) {
      images.push({ src, alt: 'Background Hotlink' });
    }
  }

  return images;
}
