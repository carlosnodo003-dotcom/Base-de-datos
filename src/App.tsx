import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DeviceFrame } from './components/DeviceFrame';
import { HtmlImporterModal } from './components/HtmlImporterModal';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { DetailScreen } from './screens/DetailScreen';
import { CartScreen } from './screens/CartScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CustomHtmlScreen } from './screens/CustomHtmlScreen';
import { INITIAL_PRODUCTS, MOCK_ORDERS, PRESET_HTML_SCREENS } from './data/mockData';
import { DeviceType, ScreenId, Product, CartItem, CustomScreenData } from './types';
import { Layers, Sparkles, Code2, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('discover');
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [zoomScale, setZoomScale] = useState<number>(0.95);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Commerce & App State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Matte Obsidian',
    },
    {
      product: INITIAL_PRODUCTS[2],
      quantity: 1,
      selectedColor: 'Wabi Sand',
    }
  ]);
  const [favorites, setFavorites] = useState<string[]>(['prod-1', 'prod-3']);
  const [orders] = useState(MOCK_ORDERS);

  // Custom HTML Screen State (Supports hotlinked images & imported HTML)
  const [customScreen, setCustomScreen] = useState<CustomScreenData>(PRESET_HTML_SCREENS[0]);
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  // Toggle Dark Mode on document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart Handlers
  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedColor: color || product.colors[0]?.name,
          selectedSize: size || product.sizes?.[0],
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorites
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Product Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  // HTML Screen Import
  const handleImportScreen = (newScreen: CustomScreenData) => {
    setCustomScreen(newScreen);
    setCurrentScreen('custom_html');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header Studio Navigation */}
      <Header
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        deviceType={deviceType}
        onDeviceChange={setDeviceType}
        cartCount={totalCartCount}
        onOpenImporter={() => setIsImporterOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        zoomScale={zoomScale}
        onZoomChange={setZoomScale}
      />

      {/* Main Studio Viewport */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 overflow-x-hidden relative">
        {/* Subtle grid background pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Quick Context Banner */}
        <div className="w-full max-w-4xl mb-4 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm z-10">
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              Active Screen: <strong className="text-neutral-900 dark:text-white capitalize">{currentScreen.replace('_', ' ')}</strong>
            </span>
            <span className="hidden sm:inline text-neutral-400">&bull;</span>
            <span className="hidden sm:inline text-neutral-500 dark:text-neutral-400">
              Hotlinked high-res images enabled
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsImporterOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold flex items-center gap-1 transition"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Paste Custom HTML</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Device Frame with active screen */}
        <DeviceFrame
          deviceType={deviceType}
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          cartCount={totalCartCount}
          zoomScale={zoomScale}
        >
          {currentScreen === 'discover' && (
            <DiscoverScreen
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p) => handleAddToCart(p)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentScreen === 'detail' && (
            <DetailScreen
              product={selectedProduct}
              onBack={() => setCurrentScreen('discover')}
              onAddToCart={handleAddToCart}
              isFavorite={favorites.includes(selectedProduct.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onNavigateToDiscover={() => setCurrentScreen('discover')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              orders={orders}
              favoriteProducts={favoriteProducts}
              onSelectProduct={handleSelectProduct}
              onNavigateToDiscover={() => setCurrentScreen('discover')}
            />
          )}

          {currentScreen === 'custom_html' && (
            <CustomHtmlScreen
              customScreen={customScreen}
              onUpdateScreen={setCustomScreen}
              onOpenImporter={() => setIsImporterOpen(true)}
            />
          )}
        </DeviceFrame>
      </main>

      {/* HTML Importer Dialog */}
      <HtmlImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImport={handleImportScreen}
      />
    </div>
  );
}
