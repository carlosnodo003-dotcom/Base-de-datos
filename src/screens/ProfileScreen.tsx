import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  ChevronRight, 
  Bell, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { OrderRecord, Product } from '../types';

interface ProfileScreenProps {
  orders: OrderRecord[];
  favoriteProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToDiscover: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  orders,
  favoriteProducts,
  onSelectProduct,
  onNavigateToDiscover,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'membership'>('orders');
  const [showQr, setShowQr] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-full text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      {/* Header Profile Identity */}
      <div className="p-5 bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-amber-500 p-0.5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Carlos"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-neutral-900"></span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900 dark:text-white">Carlos Nodo</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                VIP Platinum
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">carlosnodo003@gmail.com</p>
            <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>San Francisco, California</span>
            </div>
          </div>
        </div>

        {/* Digital Membership Card Preview */}
        <div className="relative rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-950 text-white p-4 border border-neutral-700/60 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                Studio Pass
              </span>
              <div className="text-xs font-semibold text-neutral-300 mt-0.5">Carlos Nodo</div>
            </div>
            <button
              onClick={() => setShowQr(!showQr)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition text-xs flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">{showQr ? 'Card' : 'Scan QR'}</span>
            </button>
          </div>

          {showQr ? (
            <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-neutral-900 text-center mb-1">
              <div className="w-24 h-24 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-xs font-mono">
                [QR CODE PASS]
              </div>
              <span className="text-[10px] font-mono mt-1 text-neutral-600">ID: AIS-PLAT-89410</span>
            </div>
          ) : (
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase text-neutral-400">Available Reward Credits</span>
                <div className="text-xl font-black text-amber-400 tracking-tight">2,480 pts</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400">Tier Tier Benefit</span>
                <div className="text-xs font-bold text-neutral-200">Free Express Shipping</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 py-3 border-b-2 text-xs font-semibold flex-1 justify-center transition-all ${
            activeTab === 'orders'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-1.5 py-3 border-b-2 text-xs font-semibold flex-1 justify-center transition-all ${
            activeTab === 'wishlist'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved ({favoriteProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('membership')}
          className={`flex items-center gap-1.5 py-3 border-b-2 text-xs font-semibold flex-1 justify-center transition-all ${
            activeTab === 'membership'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-850 overflow-hidden flex-shrink-0">
                  <img src={ord.thumbnailUrl} alt={ord.id} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{ord.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ord.status === 'In Transit'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {ord.itemsCount} items &bull; ${ord.total.toFixed(2)} &bull; {ord.date}
                  </div>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                    {ord.estimatedDelivery}
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-10 text-neutral-400">
                <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No saved products yet.</p>
                <button
                  onClick={onNavigateToDiscover}
                  className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-bold underline"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {favoriteProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 cursor-pointer hover:border-indigo-500 transition"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-2">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                      {p.title}
                    </div>
                    <div className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100 mt-1">
                      ${p.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'membership' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3">
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider text-[10px]">
                App Preferences
              </span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  <Bell className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Order Push Alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Biometric Sign-In</span>
                </div>
                <input
                  type="checkbox"
                  checked={biometricsEnabled}
                  onChange={(e) => setBiometricsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
              <button className="w-full py-2 flex items-center justify-between text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Saved Payment Methods</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <button className="w-full py-2 flex items-center justify-between text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>VIP Concierge Support</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
