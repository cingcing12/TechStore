import React from 'react';
import { CheckCircle2, Clock, Package, Printer, ArrowRight, Truck, MapPin, User, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function OrderConfirmationPage({
  order,
  onContinueShopping
}) {
  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500 text-xs">No active order found.</p>
        <button
          onClick={onContinueShopping}
          className="mt-4 px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Catalog
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
    <>
      {/* 1. SCREEN VIEW (Hidden when printing) */}
      <div className="max-w-3xl mx-auto space-y-8 print:hidden">
        {/* Success Banner */}
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 text-center border border-neutral-800 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-emerald-400 border border-white/15">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Order Placed Successfully!
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
            Thank you for your purchase. A receipt has been sent to <span className="text-white underline">{customer.email}</span>.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/10">
              Order ID: <span className="text-neutral-200">{orderId}</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center space-x-1.5 border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Status: {orderStatus}</span>
            </div>
          </div>
        </div>

        {/* Fulfillment Tracker */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                <Clock className="w-4 h-4" />
              </div>
              <span className="mt-2 text-xs font-bold text-neutral-900">Pending</span>
              <span className="text-[10px] text-neutral-400">Order Received</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center font-bold text-xs">
                <Package className="w-4 h-4" />
              </div>
              <span className="mt-2 text-xs font-semibold text-neutral-500">Processing</span>
              <span className="text-[10px] text-neutral-400">Packaging</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center font-bold text-xs">
                <Truck className="w-4 h-4" />
              </div>
              <span className="mt-2 text-xs font-semibold text-neutral-500">Shipped</span>
              <span className="text-[10px] text-neutral-400">In Transit</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="mt-2 text-xs font-semibold text-neutral-500">Delivered</span>
              <span className="text-[10px] text-neutral-400">Completed</span>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-neutral-500" />
              <span>Customer & Delivery</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Customer Name</span>
                <span className="font-bold text-neutral-900">
                  {customer.firstName} {customer.lastName}
                </span>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Order Date</span>
                <span className="font-semibold text-neutral-800">{orderDate}</span>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Contact</span>
                <span className="text-neutral-800">{customer.email}</span>
                <span className="text-neutral-500 block">{customer.phone}</span>
              </div>

              <div className="pt-2 border-t border-neutral-100">
                <span className="text-neutral-400 block text-[11px]">Address</span>
                <p className="text-neutral-800 font-medium">
                  {customer.streetAddress}, {customer.city}, {customer.state} {customer.zipCode}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Method: {shippingMethod.title}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider pb-2 border-b border-neutral-100">
              Payment Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900">${totals.subtotal.toFixed(2)}</span>
              </div>

              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-${totals.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping Fee</span>
                <span className="font-semibold text-neutral-900">
                  {totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-neutral-900">Total Amount</span>
                <span className="text-xl font-black text-neutral-900">
                  ${totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-1.5 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Authorized transaction recorded</span>
            </div>
          </div>
        </div>

        {/* Ordered Products Table */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-2xs">
          <div className="p-4 bg-neutral-50/70 border-b border-neutral-200/80 flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Ordered Products
            </h3>
            <span className="text-xs text-neutral-500">
              {items.reduce((s, i) => s + i.quantity, 0)} Units
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-200/70 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-black text-neutral-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-neutral-500" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={onContinueShopping}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. DEDICATED OFFICIAL PRINT INVOICE (Visible ONLY when printing) */}
      <div className="hidden print:block font-sans text-neutral-900 bg-white max-w-3xl mx-auto py-2">
        {/* Invoice Top Header */}
        <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-5 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-sm">
                TS
              </div>
              <span className="text-2xl font-black tracking-tight text-neutral-900">TechStore</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 font-medium">Hardware Commerce Studio</p>
            <p className="text-[11px] text-neutral-500">support@techstore.com • www.techstore.com</p>
          </div>

          <div className="text-right">
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase">INVOICE</h1>
            <p className="text-xs font-mono font-bold text-neutral-800 mt-1">Invoice ID: {orderId}</p>
            <p className="text-xs text-neutral-600">Date: {orderDate}</p>
            <p className="text-xs text-neutral-600">Status: <span className="font-bold text-neutral-900 uppercase">Paid / {orderStatus}</span></p>
          </div>
        </div>

        {/* Customer & Shipping Addresses */}
        <div className="grid grid-cols-2 gap-8 mb-6 pb-6 border-b border-neutral-200 text-xs">
          <div>
            <h3 className="font-bold text-neutral-400 uppercase tracking-wider text-[10px] mb-1.5">Billed & Sold To</h3>
            <p className="font-bold text-neutral-900 text-sm">{customer.firstName} {customer.lastName}</p>
            <p className="text-neutral-600 mt-0.5">{customer.email}</p>
            <p className="text-neutral-600">{customer.phone}</p>
          </div>

          <div>
            <h3 className="font-bold text-neutral-400 uppercase tracking-wider text-[10px] mb-1.5">Shipping Destination</h3>
            <p className="font-semibold text-neutral-800">{customer.streetAddress}</p>
            <p className="text-neutral-800">{customer.city}, {customer.state} {customer.zipCode}</p>
            <p className="text-neutral-500 mt-1">Shipping Method: {shippingMethod.title}</p>
          </div>
        </div>

        {/* Itemized Table */}
        <table className="w-full text-xs text-left mb-6">
          <thead>
            <tr className="border-b border-neutral-300 text-neutral-500 uppercase text-[10px] font-bold tracking-wider">
              <th className="py-2">Item Description</th>
              <th className="py-2 text-center">Unit Price</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-3">
                  <div className="font-bold text-neutral-900">{item.name}</div>
                  <div className="text-[10px] text-neutral-400">{item.category}</div>
                </td>
                <td className="py-3 text-center text-neutral-700">${item.price.toFixed(2)}</td>
                <td className="py-3 text-center font-bold text-neutral-900">{item.quantity}</td>
                <td className="py-3 text-right font-bold text-neutral-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Summary */}
        <div className="flex justify-end mb-8 pt-2 border-t border-neutral-200">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-medium text-neutral-900">${totals.subtotal.toFixed(2)}</span>
            </div>

            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Discount:</span>
                <span>-${totals.discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-neutral-600">
              <span>Shipping Fee:</span>
              <span className="font-medium text-neutral-900">
                {totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between pt-2.5 border-t-2 border-neutral-900 text-base font-black text-neutral-900">
              <span>Total Amount:</span>
              <span>${totals.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Official Footer */}
        <div className="border-t border-neutral-200 pt-6 text-center text-[10px] text-neutral-400 space-y-1">
          <p className="font-semibold text-neutral-700">Thank you for your purchase with TechStore!</p>
          <p>All items are covered under our 2-Year Manufacturer Warranty. For questions, contact support@techstore.com</p>
        </div>
      </div>
    </>
  );
}
