import React from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Code2, 
  ShoppingBag, 
  Compass, 
  User, 
  Layers, 
  Sparkles,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { DeviceType, ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  deviceType: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  cartCount: number;
  onOpenImporter: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  zoomScale: number;
  onZoomChange: (scale: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onScreenChange,
  deviceType,
  onDeviceChange,
  cartCount,
  onOpenImporter,
  isDarkMode,
  onToggleDarkMode,
  zoomScale,
  onZoomChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors bg-white/90 border-neutral-200 dark:bg-neutral-900/90 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                ScreenCraft
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                Studio
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
              Multi-screen app viewer & hotlinked HTML importer
            </p>
          </div>
        </div>

        {/* Screen Navigator Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl border border-neutral-200/80 dark:border-neutral-750">
          <button
            onClick={() => onScreenChange('discover')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'discover'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => onScreenChange('detail')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'detail'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Detail</span>
          </button>

          <button
            onClick={() => onScreenChange('cart')}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'cart'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onScreenChange('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'profile'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onScreenChange('custom_html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'custom_html'
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-sm font-semibold'
                : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML Screen</span>
          </button>
        </nav>

        {/* Right Action Tools: Device Switcher, Zoom, HTML Importer, Dark Mode */}
        <div className="flex items-center gap-2">
          {/* Device Frame Buttons */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200/80 dark:border-neutral-750">
            <button
              onClick={() => onDeviceChange('mobile')}
              title="Mobile Device Frame"
              aria-label="Mobile Frame"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceType === 'mobile'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              title="Tablet Device Frame"
              aria-label="Tablet Frame"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceType === 'tablet'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceChange('desktop')}
              title="Full Responsive View"
              aria-label="Full View"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                deviceType === 'desktop'
                  ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Scale Control for Mobile View */}
          {deviceType === 'mobile' && (
            <div className="hidden lg:flex items-center bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-xl border border-neutral-200/80 dark:border-neutral-750 text-xs text-neutral-600 dark:text-neutral-300 gap-1.5">
              <button 
                onClick={() => onZoomChange(Math.max(0.7, zoomScale - 0.1))}
                className="hover:text-neutral-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-medium">{Math.round(zoomScale * 100)}%</span>
              <button 
                onClick={() => onZoomChange(Math.min(1.1, zoomScale + 0.1))}
                className="hover:text-neutral-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* HTML Importer Button */}
          <button
            onClick={onOpenImporter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 text-xs font-semibold shadow-sm transition-all"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Import HTML</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-750 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
