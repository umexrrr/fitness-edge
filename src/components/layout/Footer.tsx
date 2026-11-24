'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';

export default function Footer() {
  const { settings } = useGymData();

  return (
    <footer className="bg-dark-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top CTA banner */}
        <div className="rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand/20 p-8 sm:p-10 mb-16 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              BUILD YOUR STRONGER SELF
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Elevate Your Fitness at Fitness Edge Indore
            </h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              Experience the premier fitness destination in Mahalaxmi Nagar, Indore. Book a complimentary zero-obligation day pass and consultation with our certified coaches.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/free-trial"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand text-black font-bold text-sm text-center shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
            >
              <span>Claim Free Day Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/memberships"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-sm text-center hover:border-white/30 transition-all"
            >
              View Membership Tiers
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand text-black flex items-center justify-center font-black shadow-glow">
                <Flame className="w-6 h-6 fill-black" />
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white font-display">
                FITNESS EDGE <span className="text-brand">INDORE</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Indore’s premier athletic sanctuary combining competition-grade strength facilities, Olympic platforms, sub-zero contrast recovery, and personalized coaching.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand hover:border-brand/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand hover:border-brand/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Now • Closes 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Navigation</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-brand transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link href="/memberships" className="hover:text-brand transition-colors">Membership Plans & Pricing</Link>
              </li>
              <li>
                <Link href="/free-trial" className="hover:text-brand transition-colors text-brand font-medium">Book Free Trial Pass</Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-brand transition-colors">Fitness Progress Tracker</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-brand transition-colors">Fitness Nutrition & Store</Link>
              </li>
              <li>
                <Link href="/consultations" className="hover:text-brand transition-colors">Trainer Consultation Booking</Link>
              </li>
            </ul>
          </div>

          {/* Member & Admin portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Client Systems</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/dashboard" className="hover:text-brand transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Member Portal & Pass
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Admin Suite (All Members & Expiry)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand transition-colors">Our Story & Facilities</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand transition-colors">Contact Concierge</Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-brand transition-colors">Nutrition Catalog & Orders</Link>
              </li>
            </ul>
          </div>

          {/* Club Contact in Indore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Indore Flagship Location</h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>708-A Sector, near kibs hospital, Sector A, Mahalaxmi Nagar, Indore, Madhya Pradesh 452010</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                <Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Weekdays: {settings.openingHours.weekdays}</p>
                  <p>Sat: {settings.openingHours.saturday}</p>
                  <p>Sun: {settings.openingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with M&Co Studios credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Fitness Edge, Indore. All Rights Reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900 border border-brand/30 text-white font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>Developed by <strong className="text-brand font-semibold">M&Co Studios</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Privacy Policy</span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Terms of Service</span>
            <span className="text-zinc-400 hover:text-zinc-200 cursor-pointer">Facility Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
