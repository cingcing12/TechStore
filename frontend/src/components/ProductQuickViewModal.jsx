import React, { useState } from 'react';
import { X, ShoppingBag, Star, Check, ShieldCheck } from 'lucide-react';

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
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-500 hover:text-neutral-900 shadow-sm backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                {product.category}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-neutral-900 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-1.5 mt-2">
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
                <span className="text-xs text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-2">
                <span className="text-2xl font-black text-neutral-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="mt-4 pt-3 border-t border-neutral-100 space-y-1">
                <h4 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
                  Specifications
                </h4>
                <div className="grid grid-cols-1 gap-1 text-[11px]">
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div key={label} className="flex justify-between py-0.5 border-b border-neutral-50">
                      <span className="text-neutral-400 capitalize">{label}:</span>
                      <span className="font-semibold text-neutral-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-neutral-100 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-neutral-200 rounded-xl p-0.5 bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-white hover:text-neutral-900 font-bold transition-colors cursor-pointer"
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
                <span>2-Year Warranty & Free Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
