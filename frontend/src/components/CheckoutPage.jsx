import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Truck, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { SHIPPING_OPTIONS } from '../data/products';

export default function CheckoutPage({
  cart,
  onBackToCart,
  onPlaceOrder,
  appliedPromo,
  isPlacingOrder
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const shippingFee = selectedShipping.price;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    switch (name) {
      case 'firstName':
        if (!trimmed) error = 'First name is required';
        break;
      case 'lastName':
        if (!trimmed) error = 'Last name is required';
        break;
      case 'email':
        if (!trimmed) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) error = 'Invalid email address';
        break;
      case 'phone':
        if (!trimmed) error = 'Phone is required';
        else if (!/^[+0-9\s\-()]{7,20}$/.test(trimmed)) error = 'Invalid phone number';
        break;
      case 'streetAddress':
        if (!trimmed) error = 'Street address is required';
        break;
      case 'city':
        if (!trimmed) error = 'City is required';
        break;
      case 'state':
        if (!trimmed) error = 'State is required';
        break;
      case 'zipCode':
        if (!trimmed) error = 'Postal code is required';
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
      return false;
    } else {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = ['firstName', 'lastName', 'email', 'phone', 'streetAddress', 'city', 'state', 'zipCode'];
    const newTouched = {};
    const newErrors = {};

    fields.forEach(field => {
      newTouched[field] = true;
      const val = formData[field];
      if (!val || !val.trim()) {
        newErrors[field] = 'Required';
      } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
        newErrors[field] = 'Invalid email';
      } else if (field === 'phone' && !/^[+0-9\s\-()]{7,20}$/.test(val.trim())) {
        newErrors[field] = 'Invalid phone';
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    onPlaceOrder({
      customer: formData,
      shippingMethod: selectedShipping,
      paymentMethod,
      totals: {
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center space-x-3 border-b border-neutral-200/80 pb-5">
        <button
          onClick={onBackToCart}
          className="p-2 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          title="Back to Cart"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Complete your contact and delivery information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                1. Customer & Shipping Address
              </h2>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First name"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.firstName && errors.firstName
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-1 focus:ring-rose-400'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-[10px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.firstName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Last name"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.lastName && errors.lastName
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-1 focus:ring-rose-400'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-[10px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.lastName}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="alex@example.com"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.email && errors.email
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-1 focus:ring-rose-400'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-[10px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+1 (555) 012-3456"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.phone && errors.phone
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-1 focus:ring-rose-400'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-[10px] text-rose-500 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Street and house or apartment number"
                  className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                    touched.streetAddress && errors.streetAddress
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-1 focus:ring-rose-400'
                      : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                  }`}
                />
                {touched.streetAddress && errors.streetAddress && (
                  <p className="mt-1 text-[10px] text-rose-500 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.streetAddress}</span>
                  </p>
                )}
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="City"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.city && errors.city
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="State"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.state && errors.state
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="ZIP / Postal"
                    className={`w-full px-3 py-2 rounded-xl text-xs bg-neutral-50 border transition-all ${
                      touched.zipCode && errors.zipCode
                        ? 'border-rose-400 bg-rose-50/30'
                        : 'border-neutral-200 focus:bg-white focus:ring-1 focus:ring-neutral-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method Selection */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs space-y-3.5">
              <h2 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                2. Shipping Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SHIPPING_OPTIONS.map((option) => {
                  const isSelected = selectedShipping.id === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedShipping(option)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-neutral-900">{option.title}</span>
                          <span className="text-xs font-black text-neutral-900">
                            {option.price === 0 ? 'FREE' : `$${option.price}`}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {option.time}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
                        <span>Tracked</span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
              <h2 className="text-sm font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                3. Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border-2 text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-neutral-900 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-neutral-700" />
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Card Payment</div>
                    <div className="text-[10px] text-neutral-400">Visa, Mastercard</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border-2 text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-900 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <Truck className="w-4 h-4 text-neutral-700" />
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Pay on Delivery</div>
                    <div className="text-[10px] text-neutral-400">Cash on arrival</div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-2xs space-y-5 sticky top-24">
            <h2 className="text-base font-black text-neutral-900 tracking-tight pb-3 border-b border-neutral-100">
              Order Summary
            </h2>

            {/* Items list */}
            <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-1 space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover border border-neutral-200/70 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-neutral-400">{item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                  <div className="font-bold text-neutral-900 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-3 border-t border-neutral-100 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping ({selectedShipping.title})</span>
                <span className="font-semibold text-neutral-900">
                  {selectedShipping.price === 0 ? 'FREE' : `$${selectedShipping.price.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="text-sm font-black text-neutral-900">Grand Total</span>
                <span className="text-xl font-black text-neutral-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isPlacingOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Encrypted 256-bit secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
