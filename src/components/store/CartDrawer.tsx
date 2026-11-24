'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGymData } from '@/context/GymDataContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, clearCart } = useGymData();
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const discountAmount = discountApplied ? cartTotal * 0.2 : 0;
  const shippingAmount = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 9.99;
  const finalTotal = cartTotal - discountAmount + (cart.length > 0 ? shippingAmount : 0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'KINETIX20' || promoCode.trim().toUpperCase() === 'MCO20') {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-950 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-dark-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-display">Your Gear Bag</h3>
                <p className="text-[11px] text-zinc-400">
                  {cart.length} unique item{cart.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping goal bar */}
          {cart.length > 0 && (
            <div className="px-5 py-3 bg-dark-900/80 border-b border-white/5 text-xs">
              <div className="flex justify-between font-medium text-zinc-300 mb-1.5">
                <span>
                  {cartTotal >= freeShippingThreshold ? (
                    <span className="text-brand font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Free Priority Express Shipping Unlocked!
                    </span>
                  ) : (
                    <>
                      Add <strong className="text-brand">{formatCurrency(remainingForFreeShipping)}</strong> more for free express shipping
                    </>
                  )}
                </span>
                <span className="text-zinc-400">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full bg-dark-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Your bag is empty</h4>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Browse our performance store for pure whey isolates, IPF lever belts, Cerakote barbells, and athlete apparel.
                </p>
                <Link
                  href="/store"
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-brand text-black font-bold text-xs shadow-glow hover:bg-brand-hover transition-colors"
                >
                  Explore Performance Store
                </Link>
              </div>
            ) : (
              cart.map((item, index) => {
                const unitPrice = item.product.discountPrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="p-3.5 rounded-xl bg-dark-900/70 border border-white/5 flex gap-3.5 relative group hover:border-white/15 transition-all"
                  >
                    <div className="w-18 h-18 w-20 h-20 rounded-lg overflow-hidden bg-dark-850 shrink-0 relative border border-white/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-brand font-medium">
                          {item.product.brand}
                        </p>
                        {(item.selectedFlavor || item.selectedSize) && (
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {item.selectedFlavor && `Flavor: ${item.selectedFlavor}`}
                            {item.selectedFlavor && item.selectedSize && ' • '}
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 rounded-lg bg-dark-950 overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            className="px-2 py-1 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-white">
                            {formatCurrency(unitPrice * item.quantity)}
                          </span>
                          {item.product.discountPrice && (
                            <span className="text-[10px] text-zinc-400 line-through block">
                              {formatCurrency(item.product.price * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-dark-900/90 space-y-3.5">
              {/* Promo code form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try KINETIX20)"
                    className="w-full pl-9 pr-3 py-2 bg-dark-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-brand"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-xs font-semibold text-white hover:border-brand/40 transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatCurrency(cartTotal)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-brand">
                    <span>VIP Promo Discount (20%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingAmount === 0 ? 'FREE' : formatCurrency(shippingAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-brand text-base font-extrabold">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-brand text-black font-bold text-sm text-center shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                  <span>Secure 256-Bit SSL Demo Sandbox</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
