import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import Toast from './components/Toast';
import { INITIAL_PRODUCTS } from './data/products';
import { triggerConfetti } from './utils/confetti';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Initial skeleton loading simulation (700ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Cart state: start with Laptop ($650) and Mouse ($15) for immediate demonstration
  const [cart, setCart] = useState(() => [
    { ...INITIAL_PRODUCTS[0], quantity: 1 },
    { ...INITIAL_PRODUCTS[1], quantity: 1 }
  ]);

  // Views: 'products' | 'cart' | 'checkout' | 'confirmation'
  const [currentView, setCurrentView] = useState('products');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Orders
  const [orderCounter, setOrderCounter] = useState(1);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // UI helpers
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    // Keep at most 2 active toasts to prevent alert stacking
    setToasts(prev => [...prev.slice(-1), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleAddToCart = (product, quantityToAdd = 1) => {
    const qty = Math.max(1, Number(quantityToAdd) || 1);

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);

    const label = product.shortName || product.name;
    const msg = qty > 1 ? `Added ${qty} × "${label}" to cart` : `Added "${label}" to cart`;
    addToast(msg, 'success');
  };

  const handleUpdateQty = (productId, newQty) => {
    // When qty = 1, can't decrease below 1 (use remove button/trash to delete)
    if (newQty < 1) return;

    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const itemToRemove = cart.find(i => i.id === productId);
    setCart(prev => prev.filter(item => item.id !== productId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.shortName || itemToRemove.name}" from cart`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
    addToast('Cart cleared', 'info');
  };

  const handlePlaceOrder = ({ customer, shippingMethod, paymentMethod, totals }) => {
    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderNumberStr = String(orderCounter).padStart(4, '0');
      const orderId = `ORD-${orderNumberStr}`;
      setOrderCounter(prev => prev + 1);

      const placedOrder = {
        orderId,
        customer,
        orderDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...cart],
        shippingMethod,
        paymentMethod,
        totals,
        orderStatus: 'Pending'
      };

      setCurrentOrder(placedOrder);
      setCart([]);
      setIsPlacingOrder(false);
      setCurrentView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      triggerConfetti();
      addToast(`Order placed successfully: ${orderId}`, 'success');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        cartTotal={cartTotal}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
        {currentView === 'products' && (
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            recentlyAddedId={recentlyAddedId}
            isLoading={isLoading}
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

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-neutral-200/80 py-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-6 h-6 rounded-lg bg-neutral-900 flex items-center justify-center text-white">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-black text-neutral-900">TechStore</span>
              <span className="text-xs text-neutral-400">• Modern Hardware Commerce</span>
            </div>

            <div className="flex items-center space-x-5 text-xs text-neutral-500 font-medium">
              <button
                onClick={() => setCurrentView('products')}
                className="hover:text-neutral-900 cursor-pointer"
              >
                Products
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className="hover:text-neutral-900 cursor-pointer"
              >
                Cart
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 600);
                }}
                className="hover:text-neutral-900 cursor-pointer text-neutral-400"
              >
                Reload Skeleton
              </button>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center text-xs text-neutral-400">
            Copyright 2026 TechStore. Clean architecture designed with React & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}
