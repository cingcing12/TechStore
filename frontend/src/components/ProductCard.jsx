import React from 'react';
import { ShoppingCart, Eye, Star, Check, Zap } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isAdded
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white backdrop-blur-md shadow-xs">
              <Zap className="w-3 h-3 text-amber-400 mr-1 fill-amber-400" />
              {product.badge}
            </span>
          )}
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/90 text-slate-700 backdrop-blur-md shadow-2xs">
            {product.category}
          </span>
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 cursor-pointer"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-600">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Specs preview */}
          <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specs tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
              <span
                key={key}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-600 uppercase font-semibold tracking-wider">
              Price
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-600 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Required Task 2: បង្កើតប៊ូតុង Add to Cart */}
          <button
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
