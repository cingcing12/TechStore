import React, { useState } from 'react';
import { X, ShoppingCart, Star, Check, ShieldCheck, Zap } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 shadow-md backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-slate-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white backdrop-blur-md">
                <Zap className="w-3 h-3 text-amber-400 mr-1 fill-amber-400" />
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-3">
                <span className="text-3xl font-black text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  In Stock ({product.stockCount} available)
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Specifications:
                </h4>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div key={label} className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500 capitalize">{label}:</span>
                      <span className="font-semibold text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {quantity} to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>30-Day Money Back Guarantee • Authentic Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
