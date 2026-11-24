'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShoppingBag,
  Calendar,
  User,
  Shield,
  Flame,
  MapPin,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const { cartCount, settings, expiringMembersCount } = useGymData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Free Trial', href: '/free-trial', highlight: true },
    { name: 'Progress Tracker', href: '/progress' },
    { name: 'Store', href: '/store' },
    { name: 'Trainers', href: '/consultations' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-dark-950/95 to-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand text-black flex items-center justify-center font-black text-xl shadow-glow transition-transform group-hover:scale-105">
              <Flame className="w-6 h-6 fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5 font-display">
                FITNESS EDGE
                <span className="text-brand text-xs font-semibold px-1.5 py-0.5 rounded bg-brand/10 border border-brand/30">
                  INDORE
                </span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-tight truncate max-w-[200px] sm:max-w-none flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-brand shrink-0" />
                Mahalaxmi Nagar, Sector A
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white font-semibold bg-white/5'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.highlight && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-dark-900 border border-white/10 text-zinc-300 hover:text-white hover:border-brand/40 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-glow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Portal shortcuts */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-900 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-brand" />
              <span>Portal</span>
            </Link>

            {/* Admin shortcut with expiry alert counter */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-900 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white hover:border-brand/40 transition-colors relative"
            >
              <Shield className="w-3.5 h-3.5 text-brand" />
              <span>Admin</span>
              {expiringMembersCount > 0 && (
                <span className="bg-amber-500 text-black text-[9px] font-extrabold px-1.5 py-0.2 rounded-full" title={`${expiringMembersCount} members expiring soon`}>
                  {expiringMembersCount}
                </span>
              )}
            </Link>

            {/* Book Trial Primary CTA */}
            <Link
              href="/free-trial"
              className="relative group overflow-hidden px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brand text-black font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:bg-brand-hover shadow-glow hover:shadow-glow-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Free Pass</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-dark-900 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/98 border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5 mb-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand/10 text-brand border border-brand/20 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.highlight && (
                    <span className="text-[10px] bg-brand text-black font-bold px-2 py-0.5 rounded-full">
                      Free Pass
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-dark-900 border border-white/10 text-xs font-semibold text-white"
              >
                <User className="w-4 h-4 text-brand" />
                Member Portal
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-dark-900 border border-white/10 text-xs font-semibold text-white"
              >
                <Shield className="w-4 h-4 text-brand" />
                Admin Suite
              </Link>
            </div>
            <Link
              href="/free-trial"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand text-black font-bold text-sm shadow-glow"
            >
              <Calendar className="w-4 h-4" />
              Claim Free Day Pass
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
