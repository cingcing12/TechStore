import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal, ShieldCheck, Truck, RefreshCw, Headphones, ArrowUpDown } from 'lucide-react';

export default function ProductList({
  products,
  onAddToCart,
  onQuickView,
  recentlyAddedId
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured/default
  });

  return (
    <div className="space-y-10">
      {/* Hero Banner with Assignment Highlights */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>Practical Exercise 1 • Products Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Premium Hardware for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Modern Creators</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Discover our curated lineup: High-performance <strong>Laptop</strong> ($650), Ergonomic <strong>Mouse</strong> ($15), RGB Mechanical <strong>Keyboard</strong> ($25), and 4K UltraSharp <strong>Monitor</strong> ($120).
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#catalog"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Explore All 4 Products
            </a>
            <div className="flex items-center space-x-2 text-xs text-slate-400 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>All 4 Items In Stock & Ready to Ship</span>
            </div>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -top-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
      </section>

      {/* Trust & Guarantee Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Fast Shipping</h4>
            <p className="text-[11px] text-slate-500">Free ground shipping available</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">2-Year Warranty</h4>
            <p className="text-[11px] text-slate-500">100% Genuine guaranteed</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">30 Days Return</h4>
            <p className="text-[11px] text-slate-500">Hassle-free exchange policy</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">24/7 Tech Support</h4>
            <p className="text-[11px] text-slate-500">Direct expert consultation</p>
          </div>
        </div>
      </div>

      {/* Products Catalog Section */}
      <section id="catalog" className="space-y-6">
        {/* Filter & Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {/* Categories Tab */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid - Exactly the 4 items required in Task 1 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">No products found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isAdded={recentlyAddedId === product.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
