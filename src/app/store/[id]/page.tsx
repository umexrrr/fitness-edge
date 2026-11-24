'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Check,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, isInWishlist, toggleWishlist } = useGymData();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors && product.flavors.length > 0 ? product.flavors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const effectivePrice = product.discountPrice ?? product.price;
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFlavor, selectedSize);
  };

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Performance Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-dark-900 border border-white/10 p-8 shadow-card flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            {product.discountPrice && (
              <span className="absolute top-6 left-6 bg-brand text-black font-black text-xs uppercase px-3 py-1 rounded-full shadow-glow">
                Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-6 right-6 p-3 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-rose-400 transition-colors shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 text-center text-xs space-y-1">
              <Truck className="w-4 h-4 text-brand mx-auto" />
              <p className="text-white font-semibold">Priority Express</p>
              <p className="text-[10px] text-zinc-400">Next-day club pickup</p>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 text-center text-xs space-y-1">
              <ShieldCheck className="w-4 h-4 text-brand mx-auto" />
              <p className="text-white font-semibold">Lab Certified</p>
              <p className="text-[10px] text-zinc-400">100% HPLC Purity</p>
            </div>
            <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 text-center text-xs space-y-1">
              <RotateCcw className="w-4 h-4 text-brand mx-auto" />
              <p className="text-white font-semibold">Club Guarantee</p>
              <p className="text-[10px] text-zinc-400">30-day exchange</p>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex text-brand">
                {'★'.repeat(Math.round(product.rating))}
              </div>
              <span className="text-zinc-400 font-medium">
                {product.rating} ({product.reviewsCount} verified athlete reviews)
              </span>
              <span className="text-zinc-500">•</span>
              <span className={product.inStock ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                {product.inStock ? `${product.stockCount} units ready to ship` : 'Temporarily Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-dark-900/80 border border-white/5">
            <span className="text-3xl font-black text-white font-display">
              {formatCurrency(effectivePrice)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-zinc-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="text-xs text-brand font-semibold ml-auto">
              Member Pricing Active
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {product.description}
          </p>

          {/* Flavor Selection */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">
                Select Flavor: <strong className="text-brand">{selectedFlavor}</strong>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedFlavor === flavor
                        ? 'bg-brand text-black font-bold shadow-glow'
                        : 'bg-dark-900 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">
                Select Size / Tub: <strong className="text-brand">{selectedSize}</strong>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-brand text-black font-bold shadow-glow'
                        : 'bg-dark-900 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Product Highlights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-xl bg-dark-900 overflow-hidden w-full sm:w-auto justify-between">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-zinc-400 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-zinc-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-glow flex items-center justify-center gap-2 transition-all ${
                product.inStock
                  ? 'bg-brand text-black hover:bg-brand-hover hover:shadow-glow-lg'
                  : 'bg-dark-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add {quantity} to Bag • {formatCurrency(effectivePrice * quantity)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
