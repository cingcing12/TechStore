import React from 'react';
import { ShoppingCart, ShoppingBag, Database, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  cartTotal,
  onOpenERD
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PDF Assignment Ready
            </span>
            <span className="hidden sm:inline text-slate-300">
              Practical Exercise 1, 2, 3 & Database Design
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-300 text-[11px]">
            <span>Use Promo Code: <strong className="text-amber-400 font-mono">SAVE10</strong> for 10% OFF</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <button
              onClick={onOpenERD}
              className="hidden md:flex items-center space-x-1 text-sky-300 hover:text-white transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>View Database ERD (Page 4)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('products')}
              className="flex items-center space-x-2.5 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                  Tech<span className="text-blue-600">Store</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-600 block mt-0.5">
                  E-Commerce Lab
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setCurrentView('products')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === 'products'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Products Catalog
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center space-x-1.5 ${
                  currentView === 'cart'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>Shopping Cart</span>
                {cartCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={onOpenERD}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/60 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Database className="w-4 h-4 text-indigo-500" />
                <span>Database ERD (Slide 29)</span>
              </button>
            </nav>
          </div>

          {/* Stepper Breadcrumb (Desktop) */}
          <div className="hidden lg:flex items-center text-xs font-medium text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
            <button
              onClick={() => setCurrentView('products')}
              className={`hover:text-blue-600 transition-colors cursor-pointer ${currentView === 'products' ? 'text-blue-600 font-bold' : ''}`}
            >
              1. Products
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-600" />
            <button
              onClick={() => setCurrentView('cart')}
              className={`hover:text-blue-600 transition-colors cursor-pointer ${currentView === 'cart' ? 'text-blue-600 font-bold' : ''}`}
            >
              2. Cart ({cartCount})
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-600" />
            <span className={currentView === 'checkout' ? 'text-blue-600 font-bold' : ''}>
              3. Checkout
            </span>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-600" />
            <span className={currentView === 'confirmation' ? 'text-emerald-600 font-bold' : ''}>
              4. Confirmation
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Database ERD Mobile Trigger */}
            <button
              onClick={onOpenERD}
              title="View Database ERD"
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Database className="w-5 h-5 text-indigo-600" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-medium leading-none">Your Cart</span>
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
