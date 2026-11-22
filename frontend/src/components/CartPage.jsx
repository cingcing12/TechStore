import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag, Tag, ShieldCheck, Check } from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  promoCode,
  setPromoCode,
  appliedPromo,
  setAppliedPromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...PROMO_CODES[cleanCode]
      });
      setPromoCode(cleanCode);
      setPromoError('');
    } else {
      setPromoError('Coupon code not recognized');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 text-neutral-600 flex items-center justify-center mb-5">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-neutral-900 tracking-tight">Your Cart is Empty</h2>
        <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
          Explore our collection of laptops, displays, and precision input accessories.
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {cart.reduce((total, item) => total + item.quantity, 0)} items in your bag
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onContinueShopping}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <button
            onClick={onClearCart}
            className="text-xs font-semibold text-neutral-400 hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden shadow-2xs">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-20 h-20 rounded-xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 truncate">
                      {item.name}
                    </h3>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Quantity & Controls */}
                <div className="flex items-center justify-between sm:justify-end space-x-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-0.5">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <div className="text-sm font-black text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-100/70 border border-neutral-200/60 flex items-center space-x-2.5 text-xs text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
            <span>2-year manufacturer warranty and complimentary ground delivery included.</span>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-black text-neutral-900 tracking-tight pb-3 border-b border-neutral-100">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">Free Ground</span>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-between items-baseline">
                <span className="text-sm font-black text-neutral-900">Total</span>
                <span className="text-xl font-black text-neutral-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="pt-2 border-t border-neutral-100">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900">
                  <div className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold">{appliedPromo.code} ({appliedPromo.discountPercent}% off)</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs text-rose-600 font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (SAVE10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-neutral-50"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-500">{promoError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Proceed to Checkout button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
