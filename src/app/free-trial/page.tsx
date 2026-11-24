'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  Mail,
  Dumbbell,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Flame,
  Check,
  FileText,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { TrialBooking } from '@/types';

export default function FreeTrialPage() {
  const { trainers, trialBookings, addTrialBooking, showToast } = useGymData();

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [workoutType, setWorkoutType] = useState('Strength & Conditioning');
  const [preferredTrainer, setPreferredTrainer] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    // Tomorrow by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('07:00 AM');
  const [notes, setNotes] = useState('');

  // Booking result
  const [confirmedBooking, setConfirmedBooking] = useState<TrialBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeSlots = [
    { time: '06:00 AM', label: 'Dawn Lifters', capacity: 3 },
    { time: '07:00 AM', label: 'Morning Peak', capacity: 3 },
    { time: '08:00 AM', label: 'Executive Block', capacity: 3 },
    { time: '05:00 PM', label: 'Evening Surge', capacity: 3 },
    { time: '06:00 PM', label: 'Prime Athletic', capacity: 3 },
    { time: '07:00 PM', label: 'Power Hour', capacity: 3 },
  ];

  const workoutTypes = [
    'Strength & Conditioning',
    'Olympic Barbell & Powerlifting',
    'Hyrox & Metabolic Endurance',
    'Hypertrophy & Physique Architecture',
    'Mobility & Injury Prehab',
    'General Fitness Assessment',
  ];

  // Calculate booked counts for each slot on the chosen date
  const getSlotBookedCount = (slotTime: string) => {
    return trialBookings.filter(
      (b) =>
        b.date === selectedDate &&
        b.timeSlot === slotTime &&
        b.status !== 'Cancelled'
    ).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !mobile.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }

    // Check duplicate booking on same date with same email
    const duplicate = trialBookings.find(
      (b) =>
        b.email.toLowerCase() === email.toLowerCase().trim() &&
        b.date === selectedDate &&
        b.status !== 'Cancelled'
    );

    if (duplicate) {
      setErrorMessage(
        `A trial session is already active for this email on ${selectedDate} (Ref: ${duplicate.refNumber}). Please select another date.`
      );
      showToast('Duplicate booking detected for this date.', 'error');
      return;
    }

    // Check slot capacity
    const slotCount = getSlotBookedCount(selectedTimeSlot);
    if (slotCount >= 3) {
      setErrorMessage(`The ${selectedTimeSlot} slot on ${selectedDate} is fully booked. Please select another time slot.`);
      return;
    }

    const booking = addTrialBooking({
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      workoutType,
      preferredTrainer: preferredTrainer || 'First Available Master Coach',
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      additionalNotes: notes.trim(),
    });

    setConfirmedBooking(booking);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Complimentary Sanctuary Access
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          Experience Kinetix Free
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Step onto our competition platforms, immerse yourself in our sub-zero contrast spa, and experience true high-performance training with a zero-cost, zero-pressure day pass.
        </p>
      </div>

      {!confirmedBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: What's included highlight card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-dark-900 border border-white/10 space-y-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand text-black flex items-center justify-center font-black">
                  <Flame className="w-6 h-6 fill-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-display">
                    Your Complimentary Day Pass
                  </h3>
                  <p className="text-xs text-brand font-medium">100% Free • No Credit Card Required</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Full 24-Hour Arena Access</strong>
                    Full access to our Eleiko weightlifting deck, turf track, and dumbbell rows up to 150 lbs.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Contrast Spa Session</strong>
                    Access to our 3°C cold plunge tubs and Nordic infrared sauna chambers.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">InBody 770 Body Composition Scan</strong>
                    Full medical-grade segmental muscle mass and visceral fat diagnostic analysis.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block text-sm">Luxury Amenities & Shakes</strong>
                    Rainfall showers, Malin+Goetz grooming amenities, and complimentary post-workout protein shake.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand" />
                <span>Strictly 1 complimentary pass per athlete. ID verified upon check-in.</span>
              </div>
            </div>

            {/* Coach Quote */}
            <div className="p-5 rounded-2xl bg-dark-900/60 border border-white/5 space-y-2">
              <p className="text-xs italic text-zinc-300">
                "We don't do hard sales. We let our facility, our coaching standards, and the energy of our athletes speak for themselves."
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <strong className="text-white">Marcus Vance</strong>
                <span className="text-zinc-400">• Head Performance Director</span>
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-dark-900/80 border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Reserve Your Session
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Select your preferred date, workout specialization, and available time slot below.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Name and Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Jordan Sterling"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Mobile Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* Workout type & Coach Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Preferred Workout Focus
                      </label>
                      <div className="relative">
                        <Dumbbell className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={workoutType}
                          onChange={(e) => setWorkoutType(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                        >
                          {workoutTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Preferred Coach (Optional)
                      </label>
                      <select
                        value={preferredTrainer}
                        onChange={(e) => setPreferredTrainer(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                      >
                        <option value="">First Available Master Coach</option>
                        {trainers.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name} ({t.specialization})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Select Trial Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  {/* Time Slots (Interactive Capacity Grid) */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-zinc-300 block">
                      Select Available Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {timeSlots.map((slot) => {
                        const booked = getSlotBookedCount(slot.time);
                        const isFull = booked >= slot.capacity;
                        const isSelected = selectedTimeSlot === slot.time;

                        return (
                          <button
                            type="button"
                            key={slot.time}
                            disabled={isFull}
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'bg-brand text-black border-brand font-bold shadow-glow'
                                : isFull
                                ? 'bg-dark-950/40 border-white/5 text-zinc-400 cursor-not-allowed line-through'
                                : 'bg-dark-950 border-white/10 text-zinc-300 hover:border-brand/40 hover:text-white'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold flex items-center justify-between">
                              <span>{slot.time}</span>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div className="text-[10px] mt-0.5 opacity-80 flex justify-between">
                              <span>{slot.label}</span>
                              <span>{isFull ? 'Full' : `${slot.capacity - booked} left`}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Additional Notes / Fitness Goals (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Any injuries, past experience, or specific equipment questions..."
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-brand text-black font-extrabold text-sm uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>Confirm Free Trial Pass</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Screen */
        <div className="max-w-2xl mx-auto rounded-3xl bg-dark-900 border border-brand/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center text-brand mx-auto shadow-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Pass Confirmed & Registered
            </span>
            <h2 className="text-3xl font-black text-white font-display">
              You’re In, {confirmedBooking.fullName}!
            </h2>
            <p className="text-zinc-300 text-sm">
              Your complimentary trial pass has been issued and stored in the club management system.
            </p>
          </div>

          {/* Digital Pass Card */}
          <div className="rounded-2xl bg-dark-950 border border-white/10 p-6 text-left space-y-4 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs text-zinc-400">Booking Reference</span>
              <span className="text-sm font-mono font-bold text-brand">
                {confirmedBooking.refNumber}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-400 block text-[11px]">Date</span>
                <strong className="text-white">{confirmedBooking.date}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Time Slot</span>
                <strong className="text-white">{confirmedBooking.timeSlot}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Workout Type</span>
                <strong className="text-white truncate block">{confirmedBooking.workoutType}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Status</span>
                <span className="text-emerald-400 font-bold">Confirmed</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Present this reference at front desk for turnstile pass</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
            >
              View In Member Portal
            </Link>
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setFullName('');
                setEmail('');
                setMobile('');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-800 border border-white/10 text-white font-semibold text-xs hover:border-white/20"
            >
              Book Another Trial
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
