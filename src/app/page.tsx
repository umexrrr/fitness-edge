'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Flame,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Shield,
  Star,
  Dumbbell,
  HeartPulse,
  Activity,
  Award,
  Zap,
  Users,
  Clock,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Maximize2,
  MapPin,
  Phone,
  Mail,
  Play,
  Instagram,
  Compass,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { GYM_FACILITIES, TESTIMONIALS } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const { plans, trainers, products, addToCart, settings } = useGymData();
  const [selectedFacilityTab, setSelectedFacilityTab] = useState('All');
  const [galleryModalImage, setGalleryModalImage] = useState<string | null>(null);

  const featuredPrograms = [
    {
      title: 'Olympic Strength & Barbell Mastery',
      category: 'Strength & Power',
      description: 'Periodized barbell mechanics, snatch and clean & jerk kinematics, maximum motor unit recruitment.',
      intensity: 'High / Elite',
      duration: '60-75 Mins',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hypertrophy & Physique Architecture',
      category: 'Body Recomposition',
      description: 'Scientific mechanical tension protocols, targeted muscular failure thresholds, and nutrient timing.',
      intensity: 'Optimal Mass',
      duration: '55 Mins',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hyrox & Engine Conditioning',
      category: 'Metabolic Conditioning',
      description: 'Ergometer intervals, sled pushes, weighted lunges, and lactate threshold threshold expansion.',
      intensity: 'Championship Level',
      duration: '50 Mins',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Sub-Zero Recovery & Cryo Contrast',
      category: 'Biometric Restoration',
      description: 'Whole-body cryotherapy, infrared sauna thermal detox, and Normatec pneumatic lymph drainage.',
      intensity: 'Cellular Restoration',
      duration: '45 Mins',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const whyChooseUs = [
    {
      icon: Dumbbell,
      title: 'Championship-Grade Iron',
      description: 'Eleiko calibrated competition discs, Texas power bars, calibrated dumbbells up to 150 lbs, and Hammer Strength iso-lateral machines.',
    },
    {
      icon: HeartPulse,
      title: 'Sub-Zero Contrast Spa',
      description: '3°C cold plunge tubs, whole body -110°C cryo chambers, and medical-grade infrared saunas for instant central nervous system recovery.',
    },
    {
      icon: Award,
      title: 'Master-Level Biomechanics',
      description: 'Every coach holds premier credentials (CSCS, EXOS, Precision Nutrition) with proven records coaching international athletes and executives.',
    },
    {
      icon: Activity,
      title: 'Real-Time Biometric Tracking',
      description: 'Integrated digital dashboard, InBody 770 composition scans, DEXA calibrated records, and seamless personal milestone logs.',
    },
  ];

  const instagramPosts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      caption: 'The morning dawn grind at the High Line platforms. #KinetixClub #BuildYourStrongerSelf',
      likes: '1.4k',
      comments: '84',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      caption: 'Coach Marcus reviewing heavy pull mechanics. Form over ego always.',
      likes: '2.1k',
      comments: '112',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
      caption: 'Contrast therapy in full session. 3°C plunge followed by cedar sauna.',
      likes: '3.5k',
      comments: '190',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
      caption: 'Hyrox team sprint workout on the turf track. Pure engine development.',
      likes: '1.8k',
      comments: '96',
    },
  ];

  const filteredFacilities =
    selectedFacilityTab === 'All'
      ? GYM_FACILITIES
      : GYM_FACILITIES.filter((f) =>
          f.tag.toLowerCase().includes(selectedFacilityTab.toLowerCase())
        );

  return (
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* ========================================================
          1. HERO SECTION
         ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-20">
        {/* Background Image with Cinematic Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
            alt="Kinetix Elite Athletic Floor"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background" />
          <div className="absolute inset-0 bg-grid-pattern opacity-25" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/40 backdrop-blur-md shadow-glow-sm">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="text-brand font-bold text-xs uppercase tracking-widest">
              INDORE’S PREMIER ATHLETIC SANCTUARY • MAHALAXMI NAGAR
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase font-display leading-[1.05]">
              BUILD YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-brand text-glow">
                STRONGER SELF.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-zinc-300 font-light leading-relaxed">
              Transforming ambitious fitness goals into undeniable physical reality. Elite strength platforms, scientific body recomposition, and medical-grade recovery under one iconic roof.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/free-trial"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand text-black font-extrabold text-sm sm:text-base tracking-wide shadow-glow hover:bg-brand-hover hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Trial Pass</span>
            </Link>

            <Link
              href="/memberships"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-dark-900/90 border border-white/20 text-white font-bold text-sm sm:text-base hover:border-brand/60 hover:bg-dark-850 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Zap className="w-5 h-5 text-brand" />
              <span>Join Membership</span>
            </Link>

            <a
              href="#programs"
              className="w-full sm:w-auto px-6 py-4 rounded-xl text-zinc-300 hover:text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Programs</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10">
            <div className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">25,000</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Sq. Ft Luxury Floor</p>
            </div>
            <div className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-brand font-display">24 / 7</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-0.5">VIP Member Access</p>
            </div>
            <div className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">6 Eleiko</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Olympic Platforms</p>
            </div>
            <div className="text-center p-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-brand font-display">99.4%</p>
              <p className="text-xs text-zinc-400 uppercase tracking-wider mt-0.5">Member Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ABOUT THE GYM SECTION
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80"
                alt="Kinetix Barbell Lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlapping Floating Badge Card */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 glass-panel-elevated p-5 rounded-2xl border border-brand/30 shadow-card max-w-xs space-y-2">
              <div className="flex items-center gap-2 text-brand">
                <Sparkles className="w-5 h-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider">Uncompromising Standards</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                No crowds. No waiting for equipment. Every piece curated for human performance biomechanics.
              </p>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              THE FITNESS EDGE PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Where Relentless Ambition Meets World-Class Athletics.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Founded to eliminate the compromises of crowded commercial gyms, FITNESS EDGE provides high performers, competitive athletes, and driven individuals in Indore with an uncompromised training arena.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We merge calibrated Swedish barbells, plate-loaded Hammer Strength machinery, and a clinical sports recovery spa featuring sub-zero cryotherapy and infrared sauna chambers. Here, every rep, drop of sweat, and recovery minute has purpose.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-dark-900 border border-white/5 space-y-1">
                <p className="text-brand font-bold text-lg font-display">Calibrated Precision</p>
                <p className="text-xs text-zinc-400">Competition standard Eleiko plates & bars.</p>
              </div>
              <div className="p-4 rounded-xl bg-dark-900 border border-white/5 space-y-1">
                <p className="text-brand font-bold text-lg font-display">Contrast Therapy</p>
                <p className="text-xs text-zinc-400">3°C plunge pools & dry cedar saunas.</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-brand/40 text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 text-brand" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. WHY CHOOSE US
         ======================================================== */}
      <section className="bg-dark-950/60 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              The Kinetix Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Why Elite Performers Choose Kinetix
            </h2>
            <p className="text-zinc-400 text-sm">
              We engineered every square foot of our club to maximize athletic potential, accelerate muscle protein synthesis, and optimize recovery speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-dark-900/80 border border-white/5 hover:border-brand/40 transition-all duration-300 group hover:-translate-y-1 shadow-card flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-brand font-medium">
                    <span>Performance standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. FEATURED TRAINING PROGRAMS
         ======================================================== */}
      <section id="programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Curated Athletic Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Signature Training Programs
            </h2>
            <p className="text-zinc-400 text-sm">
              Science-backed programming crafted to build dense, functional muscle, break strength plateaus, and optimize cardiovascular capacity.
            </p>
          </div>
          <Link
            href="/free-trial"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-brand font-semibold text-xs hover:border-brand transition-colors flex items-center gap-2"
          >
            <span>Experience in a Free Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrograms.map((program, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 group hover:border-brand/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  {program.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-brand" /> {program.intensity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" /> {program.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. MEMBERSHIP PLAN PREVIEWS
         ======================================================== */}
      <section className="bg-gradient-to-b from-dark-900/50 via-dark-950 to-dark-900/50 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Transparent Membership Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Invest In Your Peak Performance
            </h2>
            <p className="text-zinc-400 text-sm">
              All plans include complete club access, towel service, and complimentary biometric body scans. No hidden lock-in contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.slice(0, 3).map((plan) => {
              const isPopular = plan.isPopular;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'bg-dark-900 border-2 border-brand shadow-glow'
                      : 'bg-dark-900/70 border border-white/10 hover:border-white/25'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-black text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-glow">
                      Most Popular Plan
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black text-white font-display">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white font-display">
                        {formatCurrency(plan.monthlyPrice)}
                      </span>
                      <span className="text-xs text-zinc-400 uppercase font-medium">
                        / month
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                      <p className="text-zinc-300 font-semibold uppercase text-[11px] tracking-wider text-brand">
                        Included Privileges:
                      </p>
                      {plan.benefits.slice(0, 4).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 space-y-2">
                    <Link
                      href={`/memberships?plan=${plan.id}`}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 ${
                        isPopular
                          ? 'bg-brand text-black hover:bg-brand-hover shadow-glow'
                          : 'bg-dark-800 text-white hover:bg-dark-700 border border-white/10'
                      }`}
                    >
                      <span>Join {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-[10px] text-zinc-400 text-center">
                      Flexible monthly or quarterly billing options
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/memberships"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline"
            >
              <span>View all 5 membership tiers & detailed feature comparison table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. TRAINER PROFILES
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Master Coaching Staff
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Mentored By Industry Champions
            </h2>
            <p className="text-zinc-400 text-sm">
              Our coaching roster holds highest tier exercise physiology and Olympic weightlifting credentials. Book a private consultation directly.
            </p>
          </div>
          <Link
            href="/consultations"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-brand font-semibold text-xs hover:border-brand transition-colors flex items-center gap-2"
          >
            <span>Book 1-on-1 Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 group hover:border-brand/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1 text-[11px] text-white font-bold">
                  <Star className="w-3 h-3 text-brand fill-brand" />
                  <span>{trainer.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-brand font-semibold">{trainer.role}</p>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Rate: {formatCurrency(trainer.consultationFee)}/session</span>
                    <span className="text-white font-medium">{trainer.experience}</span>
                  </div>
                  <Link
                    href={`/consultations?trainer=${trainer.id}`}
                    className="w-full py-2.5 rounded-lg bg-dark-800 border border-white/10 text-white hover:bg-brand hover:text-black font-semibold text-xs text-center transition-all block"
                  >
                    Schedule Assessment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. GYM FACILITIES & EQUIPMENT GALLERY
         ======================================================== */}
      <section className="bg-dark-950 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-brand text-xs font-bold uppercase tracking-widest">
                The Athletic Arena
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                World-Class Facilities & Equipment
              </h2>
              <p className="text-zinc-400 text-sm">
                Explore our precision equipment spaces engineered for Olympic lifting, hypertrophic development, and contrast recovery.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Free Weights', 'Recovery', 'Conditioning'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFacilityTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedFacilityTab === tab
                      ? 'bg-brand text-black shadow-glow'
                      : 'bg-dark-900 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility, idx) => (
              <div
                key={idx}
                onClick={() => setGalleryModalImage(facility.image)}
                className="group relative rounded-2xl overflow-hidden bg-dark-900 border border-white/10 aspect-[16/10] cursor-pointer"
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand">
                    {facility.tag}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {galleryModalImage && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setGalleryModalImage(null)}
            >
              <div className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/20">
                <img
                  src={galleryModalImage}
                  alt="Full preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setGalleryModalImage(null)}
                  className="absolute top-4 right-4 bg-dark-950/80 p-2 rounded-full text-white hover:text-brand border border-white/20"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          8. FEATURED FITNESS STORE PRODUCTS
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Performance Nutrition & Apparel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Fuel Your Output
            </h2>
            <p className="text-zinc-400 text-sm">
              Pharmaceutical-grade Creapure creatine, cold-processed pure whey isolates, and heavy-duty 10mm steerhide leather lever belts.
            </p>
          </div>
          <Link
            href="/store"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-brand font-semibold text-xs hover:border-brand transition-colors flex items-center gap-2"
          >
            <span>Explore Complete Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl overflow-hidden bg-dark-900/80 border border-white/10 group hover:border-brand/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-dark-850 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                {product.discountPrice && (
                  <span className="absolute top-6 left-6 bg-brand text-black font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow-glow">
                    Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-semibold text-brand uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-brand transition-colors line-clamp-1 mt-0.5">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
                    <div className="flex text-brand">
                      {'★'.repeat(5)}
                    </div>
                    <span>({product.reviewsCount})</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-white">
                      {formatCurrency(product.discountPrice ?? product.price)}
                    </span>
                    {product.discountPrice && (
                      <span className="text-xs text-zinc-400 line-through ml-1.5">
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2.5 rounded-xl bg-brand text-black hover:bg-brand-hover shadow-glow transition-all"
                    title="Quick Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. CUSTOMER TESTIMONIALS
         ======================================================== */}
      <section className="bg-dark-900/40 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Real Athlete Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Proven Transformations
            </h2>
            <p className="text-zinc-400 text-sm">
              Discover how executives, competitive powerlifters, and athletes attain peak conditioning within our sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-dark-900 border border-white/10 shadow-card flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-brand">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-11 h-11 rounded-full object-cover border border-brand/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{test.name}</h4>
                      <p className="text-[11px] text-zinc-400">{test.role}</p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-brand/5 border border-brand/20 text-[11px] text-brand font-semibold flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{test.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. INSTAGRAM INTEGRATION SECTION
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Instagram className="w-4 h-4" /> @kinetix.performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Follow The Movement
            </h2>
          </div>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs font-bold text-white hover:text-brand hover:border-brand/40 transition-colors flex items-center gap-2 self-start"
          >
            <span>Follow On Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden group bg-dark-900 border border-white/10"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <p className="text-[11px] line-clamp-2 text-zinc-300 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3 text-xs font-bold text-brand">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          11. GOOGLE MAPS LOCATION & CONTACT SUMMARY
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden bg-dark-900 border border-white/10 grid grid-cols-1 lg:grid-cols-12">
          {/* Map Embed */}
          <div className="lg:col-span-7 h-80 lg:h-auto min-h-[320px] relative">
            <iframe
              src={settings.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kinetix Club Location Map"
              className="w-full h-full"
            />
          </div>

          {/* Location details card */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-dark-850">
            <div className="space-y-4">
              <span className="text-brand text-xs font-bold uppercase tracking-widest">
                Flagship Location
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display">
                Fitness Edge • Mahalaxmi Nagar
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Located near Kibs Hospital in Sector A, Mahalaxmi Nagar with private parking, valet drop-off, and direct elevator access to our training decks.
              </p>

              <div className="space-y-3 pt-2 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand shrink-0" />
                  <span>{settings.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/free-trial"
                className="flex-1 py-3 rounded-xl bg-brand text-black font-bold text-xs text-center shadow-glow hover:bg-brand-hover transition-colors"
              >
                Schedule Club Tour
              </Link>
              <Link
                href="/contact"
                className="flex-1 py-3 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-xs text-center hover:border-white/30 transition-colors"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
