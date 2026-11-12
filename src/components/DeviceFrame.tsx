import React from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  User, 
  Code2,
  Signal
} from 'lucide-react';
import { DeviceType, ScreenId } from '../types';

interface DeviceFrameProps {
  deviceType: DeviceType;
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  cartCount: number;
  zoomScale: number;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceType,
  currentScreen,
  onScreenChange,
  cartCount,
  zoomScale,
  children,
}) => {
  if (deviceType === 'desktop') {
    return (
      <div className="w-full max-w-5xl mx-auto my-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col min-h-[750px]">
        {/* Desktop Browser Chrome Mockup */}
        <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-850 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <div className="px-6 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-750 text-xs text-neutral-500 font-mono flex items-center gap-1.5">
            <span className="text-emerald-500">https://</span>
            <span>screencraft.app/v1/{currentScreen}</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div 
        className="my-8 mx-auto transition-transform duration-300"
        style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
      >
        {/* Tablet Bezel */}
        <div className="w-[680px] h-[860px] bg-neutral-950 rounded-[44px] p-4 shadow-2xl shadow-neutral-900/40 border-[8px] border-neutral-800 relative flex flex-col">
          {/* Tablet Camera */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700"></div>

          {/* Screen Canvas */}
          <div className="flex-1 bg-white dark:bg-neutral-950 rounded-[32px] overflow-hidden flex flex-col relative">
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Bottom App Navigation */}
            <nav className="h-14 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-around px-4 z-20">
              <button
                onClick={() => onScreenChange('discover')}
                className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
                  currentScreen === 'discover' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span className="text-[10px]">Discover</span>
              </button>

              <button
                onClick={() => onScreenChange('detail')}
                className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
                  currentScreen === 'detail' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px]">Detail</span>
              </button>

              <button
                onClick={() => onScreenChange('cart')}
                className={`relative flex flex-col items-center gap-0.5 text-xs font-semibold ${
                  currentScreen === 'cart' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[10px]">Bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onScreenChange('profile')}
                className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
                  currentScreen === 'profile' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-[10px]">Profile</span>
              </button>

              <button
                onClick={() => onScreenChange('custom_html')}
                className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
                  currentScreen === 'custom_html' ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-400'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span className="text-[10px]">HTML Screen</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: Mobile Phone Frame (iPhone 16 Pro mockup)
  return (
    <div 
      className="my-6 mx-auto transition-transform duration-300"
      style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
    >
      {/* Outer Titanium Casing with buttons */}
      <div className="relative w-[390px] h-[790px] bg-neutral-900 rounded-[54px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[4px] border-neutral-700/80 ring-1 ring-white/10 flex flex-col">
        {/* Physical hardware side buttons */}
        <div className="absolute -left-[7px] top-28 w-[3px] h-9 bg-neutral-600 rounded-l-md"></div>
        <div className="absolute -left-[7px] top-42 w-[3px] h-12 bg-neutral-600 rounded-l-md"></div>
        <div className="absolute -left-[7px] top-58 w-[3px] h-12 bg-neutral-600 rounded-l-md"></div>
        <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-neutral-600 rounded-r-md"></div>

        {/* Screen Bezel Inside Frame */}
        <div className="flex-1 bg-white dark:bg-neutral-950 rounded-[44px] overflow-hidden flex flex-col relative border border-neutral-800/20">
          
          {/* iOS Top Status Bar + Dynamic Island */}
          <div className="relative z-40 px-6 pt-3 pb-1 flex items-center justify-between text-neutral-900 dark:text-white select-none">
            {/* Clock */}
            <span className="text-xs font-semibold tracking-tight font-sans">9:41</span>

            {/* Dynamic Island */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-indigo-950/80"></span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></span>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-bold">100</span>
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="flex-1 overflow-y-auto relative scroll-smooth">
            {children}
          </div>

          {/* Bottom App Navigation Bar */}
          <nav className="h-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-around px-2 z-30 select-none pb-2">
            <button
              onClick={() => onScreenChange('discover')}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                currentScreen === 'discover'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="text-[10px]">Discover</span>
            </button>

            <button
              onClick={() => onScreenChange('detail')}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                currentScreen === 'detail'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px]">Product</span>
            </button>

            <button
              onClick={() => onScreenChange('cart')}
              className={`relative flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                currentScreen === 'cart'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[10px]">Bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onScreenChange('profile')}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                currentScreen === 'profile'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="text-[10px]">Profile</span>
            </button>

            <button
              onClick={() => onScreenChange('custom_html')}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
                currentScreen === 'custom_html'
                  ? 'text-amber-500 font-bold scale-105'
                  : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span className="text-[10px]">HTML Screen</span>
            </button>
          </nav>

          {/* Bottom Swipe Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-400/50 dark:bg-neutral-600 rounded-full z-40 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
