import React from 'react';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isAdded
}) {
  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Container */}
      <div
        className="relative aspect-4/3 w-full bg-neutral-100/60 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Single Minimal Category Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/95 text-neutral-700 backdrop-blur-md shadow-2xs border border-neutral-200/50">
            {product.category}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/95 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 cursor-pointer"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Clean Minimal Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-bold text-neutral-800">{product.rating}</span>
            <span className="text-[10px] sm:text-[11px] text-neutral-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* One Clean Spec Line */}
          <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-1">
            {Object.values(product.specs).slice(0, 3).join(' • ')}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 sm:pt-3 border-t border-neutral-100 flex flex-col xs:flex-row xs:items-center sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
          <div className="flex items-baseline space-x-1 sm:space-x-1.5">
            <span className="text-base sm:text-xl font-black text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`w-full xs:w-auto px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center space-x-1 sm:space-x-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0 ${
              isAdded
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
