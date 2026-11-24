'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ShoppingBag,
  Heart,
  Star,
  SlidersHorizontal,
  Sparkles,
  Check,
  ArrowRight,
  Package,
  Eye,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { ProductCategory, Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function StorePage() {
  const { products, addToCart, wishlist, toggleWishlist, isInWishlist } = useGymData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);

  const categories: { label: string; value: string }[] = [
    { label: 'All Products', value: 'all' },
    { label: 'Whey Protein', value: 'whey-protein' },
    { label: 'Creatine', value: 'creatine' },
    { label: 'Mass Gainers', value: 'mass-gainers' },
    { label: 'Protein Bars', value: 'protein-bars' },
    { label: 'Gym Accessories', value: 'accessories' },
    { label: 'Gym Equipment', value: 'equipment' },
    { label: 'Shakers & Bottles', value: 'bottles' },
    { label: 'Fitness Apparel', value: 'apparel' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const effectivePrice = p.discountPrice ?? p.price;
        const matchesPrice = effectivePrice <= maxPrice;
        const matchesStock = !inStockOnly || p.inStock;
        const matchesWishlist = !showWishlistOnly || isInWishlist(p.id);

        return (
          matchesCategory &&
          matchesSearch &&
          matchesPrice &&
          matchesStock &&
          matchesWishlist
        );
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default order
      });
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, showWishlistOnly, sortBy, wishlist]);

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          High-Performance Fuel & Equipment
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          The Kinetix Pro Store
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Formulated for elite bio-availability, maximal torque, and unbreakable structural support. Free express shipping on all orders over $75.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-card">
        {/* Top search & sorting row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protein isolates, Creapure, lever belts, Cerakote bars..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                showWishlistOnly
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-dark-950 border border-white/10 text-zinc-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : ''}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-brand text-black shadow-glow font-bold'
                  : 'bg-dark-950 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price Slider & In Stock Filter */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400">Max Price:</span>
            <input
              type="range"
              min={20}
              max={350}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-brand cursor-pointer w-28 sm:w-40"
            />
            <span className="text-white font-bold">{formatCurrency(maxPrice)}</span>
          </div>

          <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded accent-brand"
            />
            <span>In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-dark-900/40 rounded-2xl border border-white/5">
          <Package className="w-12 h-12 text-zinc-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search query, price filter, or category selection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setMaxPrice(350);
              setShowWishlistOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-brand text-black font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = !!product.discountPrice;
            const effectivePrice = product.discountPrice ?? product.price;
            const isWish = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 group hover:border-brand/40 transition-all flex flex-col justify-between shadow-card"
              >
                {/* Image and badges */}
                <div className="relative aspect-square overflow-hidden bg-dark-850 p-4">
                  <Link href={`/store/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="absolute top-6 left-6 bg-brand text-black font-black text-[10px] uppercase px-2 py-0.5 rounded shadow-glow">
                      Save {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                    </span>
                  )}

                  {/* Wishlist toggle button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-rose-400 transition-colors"
                    title={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>

                  {/* Stock tag */}
                  <div className="absolute bottom-6 left-6">
                    {product.inStock ? (
                      <span className="text-[10px] bg-dark-950/90 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                        {product.stockCount} in stock
                      </span>
                    ) : (
                      <span className="text-[10px] bg-red-950/90 text-red-400 font-semibold px-2 py-0.5 rounded border border-red-500/30">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link href={`/store/${product.id}`}>
                      <h3 className="text-sm font-bold text-white group-hover:text-brand transition-colors line-clamp-1 mt-0.5">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <div className="flex items-center gap-1.5 mt-2 text-xs">
                      <div className="flex text-brand">
                        {'★'.repeat(Math.round(product.rating))}
                      </div>
                      <span className="text-zinc-400 text-[11px]">
                        ({product.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-black text-white">
                          {formatCurrency(effectivePrice)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-zinc-400 line-through ml-2">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/store/${product.id}`}
                        className="py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white hover:border-white/30 font-semibold text-xs text-center flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={!product.inStock}
                        className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          product.inStock
                            ? 'bg-brand text-black hover:bg-brand-hover shadow-glow'
                            : 'bg-dark-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
