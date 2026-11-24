'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  Calendar,
  Dumbbell,
  TrendingUp,
  ShoppingBag,
  CreditCard,
  QrCode,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Flame,
  Award,
  RefreshCw,
  Edit2,
  MapPin,
  Phone,
  Mail,
  Zap,
  AlertTriangle,
  Bell,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function MemberDashboardPage() {
  const {
    profile,
    updateProfile,
    plans,
    trialBookings,
    consultationBookings,
    orders,
    workoutSessions,
    personalRecords,
    progressRecords,
    renewMember,
    showToast,
  } = useGymData();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'membership' | 'bookings' | 'progress' | 'workouts' | 'orders' | 'profile'
  >('overview');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    fitnessGoal: profile.fitnessGoal,
    targetWeight: profile.targetWeight,
  });

  const activePlan = plans.find((p) => p.id === profile.planId) || plans[2];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleRenew = () => {
    renewMember(profile.id, 12);
  };

  const isExpiringSoon = profile.daysRemaining <= 7 && profile.daysRemaining > 0;
  const isExpired = profile.daysRemaining <= 0;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'membership', label: 'My Membership & Pass', icon: CreditCard },
    { id: 'bookings', label: 'My Bookings', icon: Calendar, badge: trialBookings.length + consultationBookings.length },
    { id: 'progress', label: 'Fitness Progress', icon: TrendingUp },
    { id: 'workouts', label: 'Workout History', icon: Dumbbell, badge: workoutSessions.length },
    { id: 'orders', label: 'Store Orders', icon: ShoppingBag, badge: orders.length },
    { id: 'profile', label: 'Profile & Settings', icon: Edit2 },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* ========================================================
          MEMBERSHIP EXPIRY WARNING REMINDER BANNER FOR MEMBER
         ======================================================== */}
      {isExpiringSoon && (
        <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-amber-950/90 via-dark-900 to-amber-950/90 border-2 border-amber-500/80 shadow-glow flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                  ⚠️ Membership Renewal Reminder
                </span>
                <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                  Expires in {profile.daysRemaining} Days
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Your Fitness Edge membership expires on {formatDate(profile.expiryDate)}
              </h3>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                Renew your membership today to ensure uninterrupted 24/7 keycard turnstile access at Sector A, Mahalaxmi Nagar, retain your locker, and keep your contrast spa privileges.
              </p>
            </div>
          </div>
          <button
            onClick={handleRenew}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-brand text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Renew Membership (+1 Year)</span>
          </button>
        </div>
      )}

      {isExpired && (
        <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-red-950/95 via-dark-900 to-red-950/95 border-2 border-red-500 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-extrabold text-xs uppercase tracking-wider">
                  🚨 Membership Expired • Turnstile Locked
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Your Fitness Edge membership expired on {formatDate(profile.expiryDate)}
              </h3>
              <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                Biometric turnstile check-in is currently suspended. Please renew your membership to reactivate 24/7 access immediately.
              </p>
            </div>
          </div>
          <button
            onClick={handleRenew}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-brand text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reactivate Membership Now</span>
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-brand shadow-glow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                {profile.name}
              </h1>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isExpired
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : isExpiringSoon
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {profile.membershipStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tier: <strong className="text-brand">{activePlan.name}</strong> • Member ID: #{profile.id} • Fitness Edge Indore
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRenew}
            className="px-4 py-2 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Renew Membership</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 rounded-2xl bg-dark-900 border border-white/10 p-3 space-y-1 shadow-card sticky top-24">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Member Portal
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand text-black font-bold shadow-glow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-black text-brand font-bold' : 'bg-dark-950 text-zinc-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Digital Pass / Keycard Card */}
              <div className="rounded-3xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border-2 border-brand/40 p-6 sm:p-8 relative overflow-hidden shadow-card">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-wider">
                      <Flame className="w-4 h-4 fill-brand" />
                      <span>FITNESS EDGE INDORE • BIOMETRIC KEYCARD</span>
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                        {activePlan.name}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand" />
                        708-A Sector, near kibs hospital, Mahalaxmi Nagar
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-xs pt-1">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Expiry Date</span>
                        <strong className={isExpiringSoon ? 'text-amber-400' : isExpired ? 'text-red-400' : 'text-white'}>
                          {formatDate(profile.expiryDate)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Days Remaining</span>
                        <strong className={`font-mono ${isExpiringSoon ? 'text-amber-400 font-bold' : isExpired ? 'text-red-400 font-bold' : 'text-brand'}`}>
                          {profile.daysRemaining <= 0 ? 'Expired' : `${profile.daysRemaining} Days`}
                        </strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Turnstile Code</span>
                        <strong className="text-brand font-mono">FE-PASS-708A</strong>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="p-3 rounded-2xl bg-white flex flex-col items-center justify-center shrink-0 shadow-lg">
                    <QrCode className="w-24 h-24 text-black" />
                    <span className="text-[9px] font-mono font-bold text-black uppercase mt-1">
                      SCAN FOR TURNSTILE
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-1">
                  <span className="text-[11px] text-zinc-400">Current Weight</span>
                  <p className="text-xl font-bold text-brand font-display">{profile.currentWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-1">
                  <span className="text-[11px] text-zinc-400">Net Lost</span>
                  <p className="text-xl font-bold text-emerald-400 font-display">
                    -{(profile.startingWeight - profile.currentWeight).toFixed(1)} kg
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-1">
                  <span className="text-[11px] text-zinc-400">Consistency</span>
                  <p className="text-xl font-bold text-white font-display">{profile.workoutConsistencyPct}%</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-1">
                  <span className="text-[11px] text-zinc-400">Strength PRs</span>
                  <p className="text-xl font-bold text-white font-display">{personalRecords.length} Trophies</p>
                </div>
              </div>

              {/* Upcoming Bookings preview */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-display">
                    Upcoming Bookings & Sessions
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-brand hover:underline font-semibold"
                  >
                    View All ({trialBookings.length + consultationBookings.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {consultationBookings.slice(0, 2).map((cb) => (
                    <div
                      key={cb.id}
                      className="p-3.5 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {cb.consultationType} with {cb.trainerName}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {formatDate(cb.date)} at {cb.timeSlot} • Ref: {cb.refNumber}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {cb.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERSHIP & PASS */}
          {activeTab === 'membership' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-brand text-xs font-bold uppercase tracking-wider">
                      Active Subscription
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                      {activePlan.name}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">{activePlan.tagline}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isExpired
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : isExpiringSoon
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {profile.membershipStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-dark-950 border border-white/5 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Billing Rate</span>
                    <strong className="text-white text-sm">{formatCurrency(activePlan.monthlyPrice)} / month</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Join Date</span>
                    <strong className="text-white">{formatDate(profile.joinDate)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Expiry Date</span>
                    <strong className={`text-sm ${isExpiringSoon ? 'text-amber-400 font-bold' : isExpired ? 'text-red-400 font-bold' : 'text-brand'}`}>
                      {formatDate(profile.expiryDate)} ({profile.daysRemaining <= 0 ? 'Expired' : `${profile.daysRemaining} days left`})
                    </strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Included Tier Privileges:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activePlan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  <button
                    onClick={handleRenew}
                    className="px-6 py-2.5 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
                  >
                    Renew 1-Year Membership
                  </button>
                  <Link
                    href="/memberships"
                    className="px-6 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-xs hover:border-white/20"
                  >
                    Change / Upgrade Tier
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Scheduled Bookings & Sessions
                </h2>
                <div className="flex gap-2">
                  <Link
                    href="/free-trial"
                    className="px-3.5 py-1.5 rounded-xl bg-brand text-black font-bold text-xs"
                  >
                    Book Day Pass
                  </Link>
                  <Link
                    href="/consultations"
                    className="px-3.5 py-1.5 rounded-xl bg-dark-800 text-white font-semibold text-xs border border-white/10"
                  >
                    Book Coach
                  </Link>
                </div>
              </div>

              {/* Consultation Bookings */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand">
                  Coach Consultations ({consultationBookings.length})
                </h3>
                <div className="space-y-3">
                  {consultationBookings.map((cb) => (
                    <div
                      key={cb.id}
                      className="p-4 rounded-xl bg-dark-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{cb.consultationType}</strong>
                          <span className="text-[10px] font-mono text-brand bg-brand/10 px-2 py-0.5 rounded">
                            {cb.refNumber}
                          </span>
                        </div>
                        <p className="text-zinc-400 mt-1">
                          Coach: <strong className="text-white">{cb.trainerName}</strong> • {formatDate(cb.date)} at {cb.timeSlot}
                        </p>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {cb.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Fitness Progress & PR Trophies
                </h2>
                <Link
                  href="/progress"
                  className="px-4 py-2 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
                >
                  Open Full Progress Tracker
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                  <span className="text-xs text-zinc-400">Start Weight</span>
                  <p className="text-xl font-bold text-white mt-1">{profile.startingWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-brand/30">
                  <span className="text-xs text-brand font-semibold">Current Weight</span>
                  <p className="text-xl font-bold text-brand mt-1">{profile.currentWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                  <span className="text-xs text-zinc-400">Target Weight</span>
                  <p className="text-xl font-bold text-white mt-1">{profile.targetWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                  <span className="text-xs text-zinc-400">Consistency</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{profile.workoutConsistencyPct}%</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WORKOUTS */}
          {activeTab === 'workouts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Training History ({workoutSessions.length} sessions)
                </h2>
                <Link
                  href="/progress"
                  className="px-3.5 py-1.5 rounded-xl bg-brand text-black font-bold text-xs"
                >
                  Log Workout
                </Link>
              </div>

              <div className="space-y-3">
                {workoutSessions.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 rounded-2xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{w.title}</h4>
                        <span className="text-[10px] font-semibold text-brand px-2 py-0.5 rounded bg-brand/10">
                          {w.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {formatDate(w.date)} • {w.durationMinutes} Minutes • {w.caloriesBurned} kcal burned
                      </p>
                    </div>
                    <span className="self-start sm:self-auto text-xs font-bold text-zinc-300 bg-dark-950 px-3 py-1 rounded-lg border border-white/10">
                      Intensity: <strong className="text-brand">{w.intensity}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Store Purchases & Orders
                </h2>
                <Link
                  href="/store"
                  className="px-3.5 py-1.5 rounded-xl bg-brand text-black font-bold text-xs"
                >
                  Visit Store
                </Link>
              </div>

              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-4 shadow-card"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs">
                      <div>
                        <span className="text-zinc-400">Order Number: </span>
                        <strong className="text-brand font-mono text-sm">{o.orderNumber}</strong>
                        <span className="text-zinc-500 ml-2">({formatDate(o.createdAt)})</span>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-brand/10 text-brand border border-brand/20">
                        {o.orderStatus}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-9 h-9 rounded-lg object-cover bg-dark-850"
                            />
                            <div>
                              <p className="text-white font-semibold">{item.product.name}</p>
                              <p className="text-[10px] text-zinc-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <strong className="text-white">
                            {formatCurrency((item.product.discountPrice ?? item.product.price) * item.quantity)}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Paid with {o.paymentMethod}</span>
                      <span className="text-sm font-bold text-white">
                        Total: <strong className="text-brand">{formatCurrency(o.total)}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE & SETTINGS */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Personal Profile & Biometric Targets
                </h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-dark-800 border border-white/10 text-white text-xs font-semibold hover:border-brand/40 flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-brand" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      disabled={!isEditingProfile}
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled={!isEditingProfile}
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditingProfile}
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Target Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      disabled={!isEditingProfile}
                      value={profileForm.targetWeight}
                      onChange={(e) => setProfileForm({ ...profileForm, targetWeight: parseFloat(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Primary Fitness Goal
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.fitnessGoal}
                    onChange={(e) => setProfileForm({ ...profileForm, fitnessGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm disabled:opacity-60"
                  />
                </div>

                {isEditingProfile && (
                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-6 py-2.5 rounded-xl bg-dark-800 text-white font-semibold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
