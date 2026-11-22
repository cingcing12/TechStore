import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Truck, CreditCard, Lock, AlertCircle, ShoppingBag } from 'lucide-react';
import { SHIPPING_OPTIONS } from '../data/products';

export default function CheckoutPage({
  cart,
  onBackToCart,
  onPlaceOrder,
  appliedPromo,
  isPlacingOrder
}) {
  // Customer store data fields required by Practical Exercise Checkout:
  // 1. First name
  // 2. Last Name
  // 3. Email
  // 4. Phone Number
  // 5. Address (Street address, City, State, Zip Code)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    shippingNotes: ''
  });

  // Shipping Method (Required by Task 7: Shopping Method)
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);

  // Payment method selection preview
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Form field errors for Task 6: Validate Required Fields
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Calculate pricing
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = selectedShipping.price;
  const estimatedTaxes = subtotal > 0 ? Number((subtotal * 0.05).toFixed(2)) : 0; // 5% state tax
  // Task 9: Calculate Grand Total
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTaxes);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation clearance
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Validation logic (Task 6: Validate Required Fields)
  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    switch (name) {
      case 'firstName':
        if (!trimmed) error = 'First name is required';
        else if (trimmed.length < 2) error = 'At least 2 characters';
        break;
      case 'lastName':
        if (!trimmed) error = 'Last name is required';
        break;
      case 'email':
        if (!trimmed) error = 'Email address is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) error = 'Please enter a valid email';
        break;
      case 'phone':
        if (!trimmed) error = 'Phone number is required';
        else if (!/^[+0-9\s\-()]{7,20}$/.test(trimmed)) error = 'Valid phone format required';
        break;
      case 'streetAddress':
        if (!trimmed) error = 'Street address is required';
        break;
      case 'city':
        if (!trimmed) error = 'City is required';
        break;
      case 'state':
        if (!trimmed) error = 'State / Province is required';
        break;
      case 'zipCode':
        if (!trimmed) error = 'Postal / Zip code is required';
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
      return false;
    } else {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
      return true;
    }
  };

  // Submit and Place Order handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
    const fields = ['firstName', 'lastName', 'email', 'phone', 'streetAddress', 'city', 'state', 'zipCode'];
    const newTouched = {};
    const newErrors = {};

    fields.forEach(field => {
      newTouched[field] = true;
      const val = formData[field];
      if (!val || !val.trim()) {
        newErrors[field] = 'This field is required';
      } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
        newErrors[field] = 'Please enter a valid email';
      } else if (field === 'phone' && !/^[+0-9\s\-()]{7,20}$/.test(val.trim())) {
        newErrors[field] = 'Valid phone format required';
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to top of form smoothly
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    // Call onPlaceOrder with full customer and order payload
    onPlaceOrder({
      customer: formData,
      shippingMethod: selectedShipping,
      paymentMethod,
      totals: {
        subtotal,
        discountAmount,
        shippingFee,
        estimatedTaxes,
        grandTotal
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Back button & Title */}
      <div className="flex items-center space-x-4 border-b border-slate-200 pb-5">
        <button
          onClick={onBackToCart}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
          title="Back to Cart"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="text-xs font-semibold text-blue-600">
            Practical Exercise 2 • Slide 27 & 28
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout & Customer Information
          </h1>
        </div>
      </div>

      {/* Main 2-Column Checkout Layout (Matching PDF Page 2 & 3 screenshots) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form & Shipping Options */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Customer Details Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold">
                    1
                  </span>
                  <span>Customer Contact & Shipping Address</span>
                </h2>
                <span className="text-[11px] text-slate-400">* Required fields</span>
              </div>

              {/* Name Fields: 1. First name & 2. Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. John"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.firstName && errors.firstName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-[11px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.firstName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Doe"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.lastName && errors.lastName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-[11px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.lastName}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Email & 4. Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. john@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.email && errors.email
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-[11px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. +1 555-0199"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.phone && errors.phone
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-[11px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* 5. Address (Street address) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 123 Silicon Boulevard, Suite 400"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                    touched.streetAddress && errors.streetAddress
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                      : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                {touched.streetAddress && errors.streetAddress && (
                  <p className="mt-1 text-[11px] text-rose-500 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.streetAddress}</span>
                  </p>
                )}
              </div>

              {/* City, State, Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. San Francisco"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.city && errors.city
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.city && errors.city && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / Province <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. CA"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.state && errors.state
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.state && errors.state && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Zip / Postal Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 94107"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border transition-all ${
                      touched.zipCode && errors.zipCode
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {touched.zipCode && errors.zipCode && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Task 7: Shopping / Shipping Method Selection */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold">
                  2
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Select Shipping Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const isSelected = selectedShipping.id === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-slate-900">{option.title}</span>
                          <span className={`text-xs font-extrabold ${option.price === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {option.price === 0 ? 'FREE' : `$${option.price}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mb-1">
                          {option.time}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-2">
                          {option.description}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium">Tracking included</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Method Selector (Mocked/Modern) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-extrabold">
                  3
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border-2 text-left flex items-center space-x-3 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                    <div className="text-[10px] text-slate-400">Visa, Mastercard, Amex</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border-2 text-left flex items-center space-x-3 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                    <div className="text-[10px] text-slate-400">Pay when receiving items</div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Demo Mode: 256-bit encrypted test simulation. No actual credit card charge will be made.</span>
                </div>
              )}
            </div>

            {/* Desktop / Mobile submit button */}
            <div className="block lg:hidden">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary (Tasks 8, 9, 10 in PDF) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              {/* Task 8: Display Order Summary */}
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Your Order Summary
              </h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                {cart.reduce((t, i) => t + i.quantity, 0)} Items
              </span>
            </div>

            {/* Item Thumbnails List */}
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedPromo.code} - {appliedPromo.discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Shipping ({selectedShipping.title})</span>
                <span className="font-semibold text-slate-900">
                  {selectedShipping.price === 0 ? 'FREE' : `$${selectedShipping.price.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Taxes (5%)</span>
                <span className="font-semibold text-slate-900">${estimatedTaxes.toFixed(2)}</span>
              </div>

              {/* Task 9: Calculate Grand Total */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-base font-black text-slate-900">Grand Total</span>
                <span className="text-2xl font-black text-blue-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Task 10: Create Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isPlacingOrder}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Securing Order...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order Now</span>
                </>
              )}
            </button>

            <div className="p-3 bg-slate-50 rounded-xl text-center text-[11px] text-slate-500 space-y-1">
              <p>By placing your order, you agree to TechStore's terms of sale.</p>
              <p className="text-emerald-600 font-medium flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL 256-Bit Secure Transaction</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
