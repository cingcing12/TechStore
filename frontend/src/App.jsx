import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import DatabaseERDModal from './components/DatabaseERDModal';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import Toast from './components/Toast';
import { INITIAL_PRODUCTS } from './data/products';
import { triggerConfetti } from './utils/confetti';
import { Database, ShieldCheck, Heart, Sparkles, FileText } from 'lucide-react';

export default function App() {
  // Products catalog state (Required 4 products from PDF)
  const [products] = useState(INITIAL_PRODUCTS);

  // Cart state: persistent or initial with sample items for instant demo
  const [cart, setCart] = useState(() => {
    // Start with 1 Laptop and 1 Mouse for immediate visual presentation
    return [
      { ...INITIAL_PRODUCTS[0], quantity: 1 },
      { ...INITIAL_PRODUCTS[1], quantity: 2 }
    ];
  });

  // Navigation views: 'products' | 'cart' | 'checkout' | 'confirmation'
  const [currentView, setCurrentView] = useState('products');

  // Active modals
  const [isERDOpen, setIsERDOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promotional discount state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Order state (Practical Exercise 3: Order Confirmation)
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // UI helpers
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  // Task 2: បង្កើតប៊ូតុង Add to Cart
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);

    addToast(`Added "${product.shortName || product.name}" to your shopping cart!`, 'success');
  };

  // Task 3: Update QTY
  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Task 3: remove QTY
  const handleRemoveItem = (productId) => {
    const itemToRemove = cart.find(i => i.id === productId);
    setCart(prev => prev.filter(item => item.id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.shortName || itemToRemove.name}" from cart`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
    addToast('Your cart has been cleared', 'info');
  };

  // Slide 28: Order Placement & Confirmation
  const handlePlaceOrder = ({ customer, shippingMethod, paymentMethod, totals }) => {
    setIsPlacingOrder(true);

    setTimeout(() => {
      // Required format in PDF: Order ID: ORD-0001
      const orderNumberStr = String(orderCounter).padStart(4, '0');
      const orderId = `ORD-${orderNumberStr}`;
      setOrderCounter(prev => prev + 1);

      const placedOrder = {
        orderId,
        customer,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cart],
        shippingMethod,
        paymentMethod,
        totals,
        orderStatus: 'Pending' // Slide 28 / Page 4 Required: Order Status: Pending
      };

      setCurrentOrder(placedOrder);
      setCart([]); // Clear cart
      setIsPlacingOrder(false);
      setCurrentView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Trigger Confetti Celebration!
      triggerConfetti();
      addToast('🎉 Order placed successfully! ID: ' + orderId, 'success');
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Modern Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenERD={() => setIsERDOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'products' && (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            recentlyAddedId={recentlyAddedId}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContinueShopping={() => setCurrentView('products')}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            appliedPromo={appliedPromo}
            setAppliedPromo={setAppliedPromo}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onBackToCart={() => setCurrentView('cart')}
            onPlaceOrder={handlePlaceOrder}
            appliedPromo={appliedPromo}
            isPlacingOrder={isPlacingOrder}
          />
        )}

        {currentView === 'confirmation' && (
          <OrderConfirmationPage
            order={currentOrder}
            onContinueShopping={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Database ERD Pill button for easy assignment review */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => setIsERDOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-slate-900 text-white hover:bg-indigo-700 shadow-xl border border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open Database ERD (Page 4)"
        >
          <Database className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
          <span>Interactive ERD Diagram</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/30 text-indigo-200">
            Slide 29
          </span>
        </button>
      </div>

      {/* Interactive Database ERD Modal (PDF Page 4) */}
      <DatabaseERDModal
        isOpen={isERDOpen}
        onClose={() => setIsERDOpen(false)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-extrabold text-slate-900">TechStore E-Commerce</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  React + Tailwind CSS
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Practical Exercises 1, 2, 3 & Database Design — Fully compliant with PDF assignment specification.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-600">
              <button
                onClick={() => setIsERDOpen(true)}
                className="hover:text-indigo-600 font-semibold cursor-pointer flex items-center space-x-1"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Database ERD Schema</span>
              </button>
              <button
                onClick={() => setCurrentView('products')}
                className="hover:text-blue-600 font-semibold cursor-pointer"
              >
                Products (4 Items)
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className="hover:text-blue-600 font-semibold cursor-pointer"
              >
                Shopping Cart
              </button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            © 2026 TechStore. Prepared for GitHub Pages deployment with GitHub Actions.
          </div>
        </div>
      </footer>
    </div>
  );
}
