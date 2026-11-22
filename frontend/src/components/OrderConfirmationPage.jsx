import React from 'react';
import { CheckCircle2, Clock, Package, Printer, ArrowRight, Truck, MapPin, User, Calendar, ShieldCheck, Download } from 'lucide-react';

export default function OrderConfirmationPage({
  order,
  onContinueShopping
}) {
  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No recent order found.</p>
        <button
          onClick={onContinueShopping}
          className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const {
    orderId,
    customer,
    orderDate,
    items,
    shippingMethod,
    totals,
    orderStatus = 'Pending'
  } = order;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 print:m-0 print:p-0">
      {/* Success Notification Banner - Exact matching PDF Page 3 & 4 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 sm:p-10 text-center shadow-xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 shadow-lg border border-white/30 animate-bounce">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>

        {/* Required Message: Order Placed Successfully! */}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
          Thank you for your purchase! A confirmation receipt and tracking code have been dispatched to <strong className="text-white underline">{customer.email}</strong>.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
          {/* Required Order ID: ORD-0001 */}
          <div className="px-4 py-2 rounded-xl bg-slate-900/40 backdrop-blur-md text-white font-mono text-sm font-bold border border-white/20">
            Order ID: <span className="text-amber-300">{orderId}</span>
          </div>

          {/* Required Order Status: Pending */}
          <div className="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-sm flex items-center space-x-1.5 shadow-xs">
            <Clock className="w-4 h-4 text-slate-900" />
            <span>Order Status: {orderStatus}</span>
          </div>
        </div>
      </div>

      {/* Order Status Timeline tracker */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Fulfillment Timeline
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs ring-4 ring-amber-100">
              <Clock className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-bold text-amber-600">Pending</span>
            <span className="text-[10px] text-slate-400">Order Placed</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-500">Processing</span>
            <span className="text-[10px] text-slate-400">Warehouse Prep</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
              <Truck className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-500">Shipped</span>
            <span className="text-[10px] text-slate-400">On the way</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-500">Delivered</span>
            <span className="text-[10px] text-slate-400">Doorstep</span>
          </div>
        </div>
      </div>

      {/* Order Specification Details (Slide 28 & Page 4 PDF Requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer & Shipping Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-blue-600" />
            <span>Customer Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            {/* Required: Customer Name */}
            <div>
              <span className="text-slate-400 block font-medium">Customer Name</span>
              <span className="text-sm font-bold text-slate-900">
                {customer.firstName} {customer.lastName}
              </span>
            </div>

            {/* Required: Order Date */}
            <div>
              <span className="text-slate-400 block font-medium">Order Date & Time</span>
              <span className="font-semibold text-slate-800">
                {orderDate}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Email & Contact Phone</span>
              <span className="font-semibold text-slate-800">{customer.email}</span>
              <span className="text-slate-400 block">{customer.phone}</span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-400 block font-medium flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Shipping Address</span>
              </span>
              <p className="font-semibold text-slate-800 mt-0.5">
                {customer.streetAddress}, {customer.city}, {customer.state} {customer.zipCode}
              </p>
              <p className="text-[11px] text-blue-600 font-medium mt-1">
                Method: {shippingMethod.title} ({shippingMethod.time})
              </p>
            </div>
          </div>
        </div>

        {/* Total Amount Summary */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Payment & Total Breakdown
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">${totals.subtotal.toFixed(2)}</span>
            </div>

            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promotional Discount</span>
                <span>-${totals.discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-900">
                {totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Estimated Sales Tax (5%)</span>
              <span className="font-semibold text-slate-900">${totals.estimatedTaxes.toFixed(2)}</span>
            </div>

            {/* Required: Total Amount */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-sm font-black text-slate-900 block">Total Amount</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  Payment Authorized
                </span>
              </div>
              <span className="text-2xl font-black text-blue-600">
                ${totals.grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted receipt stored in system database</span>
          </div>
        </div>
      </div>

      {/* Ordered Products Table - Slide 28 / Page 4 Required */}
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="p-5 sm:p-6 bg-slate-50/60 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ordered Products
            </h3>
            <p className="text-xs text-slate-500">
              Summary of all items purchased in Order #{orderId}
            </p>
          </div>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
            {items.reduce((sum, i) => sum + i.quantity, 0)} Units
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/40 transition-colors"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Unit Price: ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-xs text-slate-400">
                  Qty: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons: Print Invoice & Continue Shopping */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-2xs hover:shadow"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print / Save Invoice (PDF)</span>
        </button>

        <button
          onClick={onContinueShopping}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
