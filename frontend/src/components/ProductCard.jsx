import React from 'react';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isAdded
}) {
  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Product Image */}
      <div
        className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Category & Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-neutral-900 text-white shadow-2xs">
              {product.badge}
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/95 text-neutral-700 backdrop-blur-sm shadow-2xs border border-neutral-200/60">
            {product.category}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 cursor-pointer"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
            <span className="text-[11px] text-neutral-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specs */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.values(product.specs).slice(0, 2).map((val, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-medium"
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-neutral-400 uppercase font-semibold tracking-wider">
              Price
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl sm:text-2xl font-black text-neutral-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
