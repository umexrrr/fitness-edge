'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Award,
  ShieldCheck,
  Target,
  Sparkles,
  Dumbbell,
  HeartPulse,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { GYM_FACILITIES } from '@/data/mockData';

export default function AboutPage() {
  const { trainers } = useGymData();

  return (
    <div className="py-12 sm:py-16 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Fitness Edge Legacy
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          Forged For The Dedicated
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          We founded FITNESS EDGE in Indore to restore integrity, science, and uncompromising athletic standards to physical fitness.
        </p>
      </div>

      {/* Story & Origins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
              alt="Kinetix Origins"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
          </div>
          <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 glass-panel-elevated p-6 rounded-2xl border border-brand/30 shadow-card max-w-xs">
            <p className="text-2xl font-black text-white font-display">EST. 2021</p>
            <p className="text-xs text-brand font-semibold uppercase mt-0.5">Mahalaxmi Nagar • Indore</p>
            <p className="text-xs text-zinc-400 mt-1">Near Kibs Hospital, Sector A. 25,000 sq ft designed for high-performance athletics.</p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Our Origin Story
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            Frustrated By Commercial Gym Shortcuts, We Built A Sanctuary.
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            In 2021, a group of former collegiate strength coaches, biomechanists, and competitive powerlifters observed a glaring void: commercial gyms were overcrowded, under-equipped, and filled with broken machines and distracted influencers.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            KINETIX was engineered from the ground up as the antidote. We invested in calibrated Swedish Eleiko barbells, competition-grade bumper discs, plate-loaded Hammer Strength machinery, and clinical recovery modalities. No corners cut. No compromises.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-dark-900 border border-white/5 space-y-1">
              <p className="text-brand font-black text-xl font-display">Zero Crowds</p>
              <p className="text-xs text-zinc-400">Strict member-to-sq-ft capacity limits enforce pristine training flow.</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-900 border border-white/5 space-y-1">
              <p className="text-brand font-black text-xl font-display">Medical Recovery</p>
              <p className="text-xs text-zinc-400">Sub-zero cryo and contrast therapy restore the CNS within hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl p-8 bg-dark-900 border border-white/10 space-y-4 shadow-card">
          <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-display">Our Mission</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            To provide athletes, professionals, and driven individuals with the highest tier of equipment, physiological guidance, and restorative amenities required to build durable, functional strength and break physical barriers safely.
          </p>
        </div>

        <div className="rounded-2xl p-8 bg-dark-900 border border-white/10 space-y-4 shadow-card">
          <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-display">Our Vision</h3>
          <p className="text-zinc-300 text-sm leading-relaxed">
            To establish the global gold standard for athletic sanctuaries, merging the gritty discipline of Olympic barbell rooms with the clinical precision of sports medicine and the hospitality of a 5-star private club.
          </p>
        </div>
      </div>

      {/* Training Philosophy */}
      <div className="rounded-3xl bg-dark-900/60 border border-white/10 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Scientific Methodology
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            The Three Pillars of Kinetix Training
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-dark-950 border border-white/5 space-y-3">
            <span className="text-2xl font-black text-brand font-display">01</span>
            <h4 className="text-lg font-bold text-white">Biomechanical Precision</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every compound lift is evaluated through kinematics. We prioritize optimal bar paths, joint angles, and spinal neutrality before adding load.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-dark-950 border border-white/5 space-y-3">
            <span className="text-2xl font-black text-brand font-display">02</span>
            <h4 className="text-lg font-bold text-white">Progressive Overload</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No arbitrary fatigue. Every training cycle is mathematically periodized with micro-loading, planned deloads, and tracked 1-rep-max percentages.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-dark-950 border border-white/5 space-y-3">
            <span className="text-2xl font-black text-brand font-display">03</span>
            <h4 className="text-lg font-bold text-white">Autonomic Nervous Recovery</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Muscles do not grow in the gym; they grow during recovery. Sub-zero cryotherapy, sauna vasodilation, and sleep metrics drive maximal adaptation.
            </p>
          </div>
        </div>
      </div>

      {/* Master Trainers */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Leadership
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            Meet The Master Coaches
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-bold text-white font-display">{t.name}</h4>
                <p className="text-xs text-brand font-semibold">{t.role}</p>
                <p className="text-xs text-zinc-400 line-clamp-2">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facility Gallery */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            The Spaces
          </span>
          <h2 className="text-3xl font-bold text-white font-display">
            A Glimpse Inside Kinetix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GYM_FACILITIES.map((f, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 relative group aspect-[16/10]">
              <img
                src={f.image}
                alt={f.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand">{f.tag}</span>
                <h4 className="text-base font-bold text-white">{f.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand/30 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
          Ready To Experience The Standard?
        </h2>
        <p className="text-zinc-300 text-sm max-w-xl mx-auto">
          Claim a complimentary guest pass or schedule a 1-on-1 private tour with our concierge team today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/free-trial"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors"
          >
            Claim Free Day Pass
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-xs hover:border-white/30 transition-colors"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
