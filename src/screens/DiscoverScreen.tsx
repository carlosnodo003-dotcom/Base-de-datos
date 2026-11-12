import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  Plus, 
  ArrowRight, 
  Check,
  Sparkles,
  Flame
} from 'lucide-react';
import { Product } from '../types';

interface DiscoverScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const categories = ['All', 'Audio', 'Accessories', 'Living', 'Apparel'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1200);
  };

  return (
    <div className="pb-24 bg-neutral-50 dark:bg-neutral-950 min-h-full text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Phone In-App Header */}
      <div className="px-5 pt-3 pb-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span>Good morning</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Discover Craft
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="relative p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-neutral-900"></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audio, watches, apparel..."
            className="w-full pl-9 pr-10 py-2 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-neutral-400 hover:text-neutral-600"
            >
              ✕
            </button>
          ) : (
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5" />
          )}
        </div>
      </div>

      <div className="px-5 pt-4 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm font-semibold'
                  : 'bg-white dark:bg-neutral-850 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Editorial Showcase Banner */}
        {selectedCategory === 'All' && !searchQuery && (
          <div 
            onClick={() => onSelectProduct(products[0])}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-neutral-900/5 dark:shadow-none border border-neutral-200/80 dark:border-neutral-800 transition-all hover:scale-[1.01]"
          >
            <div className="h-52 w-full relative bg-neutral-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                alt="Aura ANC Headphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
            </div>

            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[11px] font-semibold text-neutral-900 dark:text-white shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Spotlight Feature</span>
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
                Acoustic Masterpiece
              </span>
              <h2 className="text-lg font-bold leading-tight mt-0.5 group-hover:text-indigo-200 transition">
                Aura Studio ANC Headphones
              </h2>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-white">$349.00</span>
                  <span className="text-xs text-neutral-400 line-through">$420.00</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Title */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
              {selectedCategory === 'All' ? 'Curated Collection' : `${selectedCategory} Collection`}
            </h2>
            <span className="text-xs text-neutral-400">({filteredProducts.length})</span>
          </div>
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
              >
                {/* Product Image Box */}
                <div className="relative aspect-square w-full bg-neutral-100 dark:bg-neutral-850 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Tag Pill */}
                  {product.tag && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-sm">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product.id);
                    }}
                    aria-label="Wishlist"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition shadow-sm"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'text-rose-500 fill-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
                      <span>{product.brand}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        ${product.price.toFixed(2)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] text-neutral-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white'
                      }`}
                      aria-label="Add to bag"
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            <p className="text-sm font-medium">No products match &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-semibold underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
