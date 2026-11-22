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

  // Calculate Subtotal (sum of price * quantity)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate Discount if promo applied
  const discountAmount = appliedPromo
    ? (subtotal * appliedPromo.discountPercent) / 100
    : 0;

  // Estimated standard shipping preview
  const estimatedShipping = subtotal > 0 ? 0 : 0; // standard is free
  const grandTotal = Math.max(0, subtotal - discountAmount + estimatedShipping);

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
      setPromoError('Invalid coupon code. Try "SAVE10" or "WELCOME20"');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Shopping Cart is Empty</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          You haven't added any products to your cart yet. Explore our high-tech catalog featuring Laptops, Mice, Keyboards, and Monitors!
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-6 inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products Now</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-1">
            <span>Practical Exercise 1 • Task 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onContinueShopping}
            className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <button
            onClick={onClearCart}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Main Grid: Left Items List, Right Order Summary (Matching Screenshot on Page 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Unit Price: <span className="font-semibold text-slate-800">${item.price.toFixed(2)}</span>
                    </div>
                    {item.color && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Color: {item.color}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Task 3: Update QTY and remove QTY */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-2xs p-1">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Item Total */}
                  <div className="text-right min-w-[80px]">
                    <div className="text-base font-extrabold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ${item.price} × {item.quantity}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery notice */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center space-x-3 text-xs text-blue-800">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              All purchases come with certified authentic warranty and free 30-day money-back guarantee.
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary (Matching Page 2 PDF Layout) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center space-x-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo ({appliedPromo.code})</span>
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-emerald-600">FREE Ground</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-slate-900">Total</span>
                  <span className="text-[11px] text-slate-400 block font-normal">Taxes calculated at checkout</span>
                </div>
                <span className="text-2xl font-black text-slate-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2 border-t border-slate-100">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">{appliedPromo.code} Applied ({appliedPromo.discountPercent}% OFF)</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs text-emerald-700 hover:text-rose-600 font-bold ml-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Have a promo coupon?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SAVE10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs uppercase font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600">{promoError}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span>Try:</span>
                    <button
                      type="button"
                      onClick={() => setPromoInput('SAVE10')}
                      className="text-blue-600 font-mono font-bold hover:underline"
                    >
                      SAVE10
                    </button>
                    <span>or</span>
                    <button
                      type="button"
                      onClick={() => setPromoInput('WELCOME20')}
                      className="text-blue-600 font-mono font-bold hover:underline"
                    >
                      WELCOME20
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Task 3 Required: Create BTN Proceed to Checkout */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Guaranteed Safe & Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
