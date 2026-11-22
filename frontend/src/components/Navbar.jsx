import React from 'react';
import { ShoppingBag, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  cartTotal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('products')}
              className="flex items-center space-x-2.5 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white shadow-xs group-hover:bg-neutral-800 transition-colors">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-neutral-950 block leading-none">
                  TechStore
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 block mt-0.5">
                  Hardware Studio
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setCurrentView('products')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentView === 'products'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  currentView === 'cart'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="w-4.5 h-4.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Stepper Breadcrumb (Desktop) */}
          <div className="hidden lg:flex items-center text-xs font-medium text-neutral-400 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200/70">
            <button
              onClick={() => setCurrentView('products')}
              className={`hover:text-neutral-900 transition-colors cursor-pointer ${
                currentView === 'products' ? 'text-neutral-950 font-bold' : ''
              }`}
            >
              1. Catalog
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-300" />
            <button
              onClick={() => setCurrentView('cart')}
              className={`hover:text-neutral-900 transition-colors cursor-pointer ${
                currentView === 'cart' ? 'text-neutral-950 font-bold' : ''
              }`}
            >
              2. Cart ({cartCount})
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-300" />
            <span className={currentView === 'checkout' ? 'text-neutral-950 font-bold' : ''}>
              3. Checkout
            </span>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-neutral-300" />
            <span className={currentView === 'confirmation' ? 'text-neutral-950 font-bold' : ''}>
              4. Confirmation
            </span>
          </div>

          {/* Cart Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('cart')}
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left pl-1">
                <span className="text-[10px] text-neutral-400 font-medium leading-none">Cart</span>
                <span className="text-xs font-bold text-white leading-tight mt-0.5">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
