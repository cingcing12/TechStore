import React, { useState } from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import SkeletonSlider from './SkeletonSlider';
import HeroSlider from './HeroSlider';
import { CATEGORIES } from '../data/products';
import { Search, ArrowUpDown, Truck, ShieldCheck, RefreshCw, Headphones, SlidersHorizontal } from 'lucide-react';

export default function ProductList({
  products,
  onAddToCart,
  onQuickView,
  recentlyAddedId,
  isLoading
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

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
    return 0;
  });

  const handleSliderSelect = (productId) => {
    const target = products.find(p => p.id === productId);
    if (target) {
      onQuickView(target);
    }
  };

  return (
    <div className="space-y-10">
      {/* Interactive Hero Carousel / Slider or Skeleton */}
      {isLoading ? (
        <SkeletonSlider />
      ) : (
        <HeroSlider onSelectProduct={handleSliderSelect} />
      )}

      {/* Trust & Guarantee Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-1">
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Complimentary Shipping</h4>
            <p className="text-[11px] text-neutral-500">Fast tracked delivery</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">2-Year Warranty</h4>
            <p className="text-[11px] text-neutral-500">100% Genuine hardware</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">30-Day Returns</h4>
            <p className="text-[11px] text-neutral-500">Hassle-free guarantee</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-neutral-200/70 shadow-2xs">
          <div className="p-2 rounded-xl bg-neutral-100 text-neutral-800">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Expert Support</h4>
            <p className="text-[11px] text-neutral-500">Dedicated assistance</p>
          </div>
        </div>
      </div>

      {/* Products Catalog Section */}
      <section className="space-y-6">
        {/* Filter & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
          {/* Categories Tab */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold py-1.5 pl-3 pr-7 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid / Skeleton State - 2 Columns on Mobile, 4 Columns on Desktop */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
            <p className="text-neutral-500 text-xs">No products found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs font-bold text-neutral-900 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
