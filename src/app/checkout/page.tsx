'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  ArrowLeft,
  Truck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, clearCart } = useGymData();

  const [customerName, setCustomerName] = useState('Alexander Reed');
  const [email, setEmail] = useState('alexander.reed@example.com');
  const [mobile, setMobile] = useState('+1 (555) 438-9921');
  const [street, setStreet] = useState('245 W 19th St, Apt 4B');
  const [city, setCity] = useState('New York');
  const [stateVal, setStateVal] = useState('NY');
  const [postalCode, setPostalCode] = useState('10011');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Demo Verified)');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const shipping = cartTotal >= 75 || cartTotal === 0 ? 0 : 9.99;
  const orderTotal = cartTotal + (cart.length > 0 ? shipping : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder({
        customerName,
        email,
        mobile,
        address: {
          street,
          city,
          state: stateVal,
          postalCode,
        },
        paymentMethod,
      });
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 1000);
  };

  if (completedOrder) {
    return (
      <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center text-brand mx-auto shadow-glow">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Order Dispatched & Registered
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
            Thank You For Your Order!
          </h1>
          <p className="text-zinc-400 text-sm">
            Order <strong className="text-white font-mono">{completedOrder.orderNumber}</strong> has been confirmed. You will receive an automated dispatch notification.
          </p>
        </div>

        <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 sm:p-8 text-left space-y-5 shadow-card">
          <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs">
            <div>
              <span className="text-zinc-400 block text-[11px]">Recipient</span>
              <strong className="text-white">{completedOrder.customerName}</strong>
            </div>
            <div className="text-right">
              <span className="text-zinc-400 block text-[11px]">Payment Mode</span>
              <span className="text-brand font-semibold">{completedOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Purchased Items
            </h4>
            <div className="divide-y divide-white/5 space-y-2 text-xs">
              {completedOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-dark-850"
                    />
                    <div>
                      <p className="text-white font-semibold">{item.product.name}</p>
                      <p className="text-[10px] text-zinc-400">
                        Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`} {item.selectedFlavor && `• Flavor: ${item.selectedFlavor}`}
                      </p>
                    </div>
                  </div>
                  <strong className="text-white">
                    {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">{formatCurrency(completedOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="text-white">{completedOrder.shipping === 0 ? 'FREE' : formatCurrency(completedOrder.shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>Total Paid (Demo)</span>
              <span className="text-brand">{formatCurrency(completedOrder.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
          >
            View In Member Orders
          </Link>
          <Link
            href="/store"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-xs hover:border-white/20"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-zinc-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-zinc-400">
          Add some performance items before heading to checkout.
        </p>
        <Link
          href="/store"
          className="inline-block px-6 py-3 rounded-xl bg-brand text-black font-bold text-xs shadow-glow"
        >
          Explore Store
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Customer & Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Details */}
            <div className="rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>1. Athlete Contact Details</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>2. Delivery Address</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={stateVal}
                      onChange={(e) => setStateVal(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method (Demo Labelled Architecture) */}
            <div className="rounded-2xl p-6 bg-dark-900 border border-brand/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>3. Payment Gateway (Demo Mode)</span>
                </h3>
                <span className="text-[10px] bg-brand text-black font-extrabold px-2 py-0.5 rounded">
                  SANDBOX
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-brand font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Clearly Labelled Client Demo Checkout</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  This e-commerce architecture is configured for client review. Submitting this order registers the purchase in the live database without charging actual payment credentials.
                </p>
              </div>

              <div className="space-y-2">
                {['Credit Card (Demo Verified)', 'Apple Pay (Demo Verified)', 'Club Member Account On-File'].map((mode) => (
                  <label
                    key={mode}
                    onClick={() => setPaymentMethod(mode)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === mode
                        ? 'bg-dark-950 border-brand text-white font-semibold'
                        : 'bg-dark-950/60 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-brand" />
                      <span className="text-xs sm:text-sm">{mode}</span>
                    </div>
                    {paymentMethod === mode && <CheckCircle2 className="w-4 h-4 text-brand" />}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-brand text-black font-extrabold text-sm uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Registering Order in Demo Database...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Demo Order • {formatCurrency(orderTotal)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-5 sticky top-24 shadow-card">
          <h3 className="text-base font-bold text-white font-display">
            Order Summary ({cart.length} item{cart.length === 1 ? '' : 's'})
          </h3>

          <div className="divide-y divide-white/5 space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-dark-850 shrink-0"
                />
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-white line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`} {item.selectedFlavor && `• Flavor: ${item.selectedFlavor}`}
                  </p>
                  <p className="text-brand font-bold mt-1">
                    {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-medium">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Priority Club Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>Grand Total</span>
              <span className="text-brand text-lg">{formatCurrency(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
