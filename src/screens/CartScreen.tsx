import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  CreditCard,
  ShoppingBag,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { CartItem } from '../types';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToDiscover: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToDiscover,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingCost = items.length === 0 ? 0 : shippingMethod === 'standard' ? 0 : 15.00;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'STUDIO20' || code === 'WELCOME20') {
      setAppliedPromo({ code, discountPercent: 20 });
    } else if (code === 'VIP10') {
      setAppliedPromo({ code, discountPercent: 10 });
    } else {
      setPromoError('Invalid coupon. Try STUDIO20 for 20% off.');
    }
  };

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setOrderId('ORD-' + Math.floor(10000 + Math.random() * 90000));
      onClearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="bg-white dark:bg-neutral-950 min-h-full p-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10 animate-bounce">
          <PartyPopper className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
          Payment Confirmed
        </span>
        <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
          Order #{orderId}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-xs leading-relaxed">
          Thank you for your purchase! A confirmation receipt has been sent to your email. Your items are being prepared for dispatch.
        </p>

        <div className="w-full my-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Estimated Delivery:</span>
            <span className="font-bold text-neutral-900 dark:text-white">In 2-3 business days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Shipping Service:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {shippingMethod === 'standard' ? 'Standard Courier (Free)' : 'Priority Express ($15)'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setOrderComplete(false);
            onNavigateToDiscover();
          }}
          className="w-full py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs shadow-md hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-neutral-50 dark:bg-neutral-950 min-h-full p-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-neutral-200/70 dark:bg-neutral-850 flex items-center justify-center text-neutral-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
          Explore our curated catalog of architectural lifestyle design objects and audio tech.
        </p>
        <button
          onClick={onNavigateToDiscover}
          className="mt-6 px-6 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-xs shadow-sm hover:scale-105 transition"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-full text-neutral-900 dark:text-neutral-100 font-sans pb-28">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-20 border-b border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Checkout</span>
          <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
          </h1>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs text-rose-500 hover:text-rose-600 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Item List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
            >
              <div className="w-18 h-18 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-850 flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                      {item.product.title}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-neutral-400 hover:text-rose-500 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {item.selectedColor && <span>{item.selectedColor}</span>}
                    {item.selectedSize && <span>&bull; {item.selectedSize}</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  <div className="flex items-center border border-neutral-200 dark:border-neutral-750 rounded-lg bg-neutral-50 dark:bg-neutral-850">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-l-lg transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-r-lg transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Input */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            <Tag className="w-3.5 h-3.5 text-indigo-500" />
            <span>Promotional Voucher</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g. STUDIO20"
              className="flex-1 px-3 py-1.5 text-xs rounded-lg uppercase bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleApplyPromo}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition"
            >
              Apply
            </button>
          </div>

          {appliedPromo && (
            <div className="mt-2 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {appliedPromo.code} applied ({appliedPromo.discountPercent}% off)
              </span>
              <button
                onClick={() => setAppliedPromo(null)}
                className="text-[11px] underline text-neutral-400 hover:text-neutral-600"
              >
                Remove
              </button>
            </div>
          )}

          {promoError && (
            <p className="mt-1 text-[11px] text-rose-500">{promoError}</p>
          )}
        </div>

        {/* Delivery Method Selector */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">
            Shipping Preference
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShippingMethod('standard')}
              className={`p-2.5 rounded-lg border text-left transition ${
                shippingMethod === 'standard'
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Standard Delivery</div>
              <div className="text-[11px] text-neutral-500">3-5 days &bull; Free</div>
            </button>

            <button
              onClick={() => setShippingMethod('express')}
              className={`p-2.5 rounded-lg border text-left transition ${
                shippingMethod === 'express'
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Priority Courier</div>
              <div className="text-[11px] text-neutral-500">1-2 days &bull; $15.00</div>
            </button>
          </div>
        </div>

        {/* Order Summary Cost Breakdown */}
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-2 text-xs">
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Discount ({appliedPromo.code})</span>
              <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <span>Estimated Sales Tax (8%)</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-sm font-bold text-neutral-900 dark:text-white">
            <span>Total</span>
            <span className="text-base font-black">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Checkout Action */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800 z-30">
        <button
          onClick={handlePlaceOrder}
          disabled={isCheckingOut}
          className="w-full py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
        >
          {isCheckingOut ? (
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              <span>Processing Secure Checkout...</span>
            </div>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Pay ${grandTotal.toFixed(2)} & Complete Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
