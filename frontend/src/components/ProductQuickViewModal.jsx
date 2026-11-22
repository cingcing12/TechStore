import React, { useState } from 'react';
import { X, ShoppingBag, Star, Check, ShieldCheck, Zap } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-neutral-200/80 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-400 hover:text-neutral-900 border border-neutral-200/50 shadow-2xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column - Full Height, Never Cut Out */}
          <div className="relative h-72 sm:h-96 md:h-full min-h-[380px] w-full bg-neutral-100/70 flex items-center justify-center p-6 sm:p-8 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[380px] object-contain object-center drop-shadow-sm"
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  {product.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5">
                  {product.name}
                </h2>
              </div>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-neutral-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-neutral-800">{product.rating}</span>
                  <span className="text-[11px] text-neutral-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Short summary */}
              <p className="text-xs text-neutral-500 leading-relaxed">
                {product.description}
              </p>

              {/* Clean Micro-Spec Grid (No messy heavy tables!) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-150/60"
                  >
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block capitalize">
                      {key}
                    </span>
                    <span className="text-xs font-bold text-neutral-800 truncate block mt-0.5">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper & Add to Cart */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-neutral-200 rounded-xl p-0.5 bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-white hover:text-neutral-900 font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-500"
                    title={quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-white hover:text-neutral-900 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-95 cursor-pointer ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>2-Year Warranty • Free Delivery Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
