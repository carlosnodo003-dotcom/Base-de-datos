import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

interface DetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, color?: string, size?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-full text-neutral-900 dark:text-neutral-100 font-sans pb-28 relative">
      {/* Floating Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.title, url: window.location.href }).catch(() => {});
              }
            }}
            aria-label="Share product"
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleFavorite(product.id)}
            aria-label="Wishlist"
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 transition"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'text-rose-500 fill-rose-500' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-300"
        />
        {product.tag && (
          <div className="absolute bottom-4 left-5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 backdrop-blur-md shadow-sm">
            {product.tag}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery Row */}
      {product.galleryImages.length > 1 && (
        <div className="flex items-center gap-2.5 px-5 py-3 overflow-x-auto border-b border-neutral-100 dark:border-neutral-800/80 scrollbar-none">
          {product.galleryImages.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(imgUrl)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedImage === imgUrl
                  ? 'border-indigo-600 scale-105 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Product Information Body */}
      <div className="px-5 pt-4 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
              {product.brand} &bull; {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/50 dark:border-amber-900/50">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="text-2xl font-black text-neutral-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                Save ${(product.originalPrice - product.price).toFixed(0)}
              </span>
            )}
          </div>
        </div>

        {/* Color Palette Selector */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2.5">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              Finish / Color: <span className="text-neutral-900 dark:text-white font-bold">{selectedColor}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                  selectedColor === color.name
                    ? 'border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                ></span>
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection (if applicable) */}
        {product.sizes && (
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Select Size:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">Size Guide</span>
            </div>
            <div className="flex items-center gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition ${
                    selectedSize === size
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description & Features */}
        <div className="pt-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Overview
          </h2>
          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
            {product.description}
          </p>
        </div>

        {/* Feature Checkpoints */}
        <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Key Specifications</span>
          </div>
          {product.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Guarantees Badges */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-100 dark:border-neutral-800 text-center">
          <div className="p-2 flex flex-col items-center">
            <Truck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1" />
            <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">Express Post</span>
            <span className="text-[9px] text-neutral-400">2-3 Day Delivery</span>
          </div>
          <div className="p-2 flex flex-col items-center border-x border-neutral-100 dark:border-neutral-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
            <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">Authentic</span>
            <span className="text-[9px] text-neutral-400">2-Yr Warranty</span>
          </div>
          <div className="p-2 flex flex-col items-center">
            <RotateCcw className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
            <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200">30-Day Return</span>
            <span className="text-[9px] text-neutral-400">Hassle-free</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add to Cart CTA Bar */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between gap-4 z-30">
        <div>
          <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Total Price</span>
          <span className="text-lg font-black text-neutral-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
