'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
  Award,
  User,
  Phone,
  Mail,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Flame,
  Check,
  Target,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { ConsultationBooking, ConsultationType, Trainer } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function ConsultationsPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-zinc-400">Loading consultations...</div>}>
      <ConsultationsContent />
    </React.Suspense>
  );
}

function ConsultationsContent() {
  const { trainers, consultationBookings, addConsultationBooking, showToast } = useGymData();
  const searchParams = useSearchParams();
  const initialTrainerId = searchParams.get('trainer') || trainers[0]?.id || '';

  const [selectedTrainerId, setSelectedTrainerId] = useState(initialTrainerId);
  const [consultationType, setConsultationType] = useState<ConsultationType>('Strength Training Consultation');
  const [clientName, setClientName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('08:00 AM');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [message, setMessage] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<ConsultationBooking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedTrainer = trainers.find((t) => t.id === selectedTrainerId) || trainers[0];

  const consultationTypes: ConsultationType[] = [
    'Weight Management Guidance',
    'Strength Training Consultation',
    'Personal Training Consultation',
    'General Fitness Assessment',
    'Workout Planning',
  ];

  const isSlotBooked = (date: string, slot: string, trainerId: string) => {
    return consultationBookings.some(
      (b) =>
        b.trainerId === trainerId &&
        b.date === date &&
        b.timeSlot === slot &&
        b.status !== 'Cancelled'
    );
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clientName.trim() || !mobile.trim() || !email.trim() || !fitnessGoals.trim()) {
      setErrorMessage('Please fill in your name, contact phone, email, and primary fitness goals.');
      return;
    }

    if (isSlotBooked(selectedDate, selectedSlot, selectedTrainer.id)) {
      setErrorMessage(`The ${selectedSlot} slot on ${selectedDate} with Coach ${selectedTrainer.name} is already booked. Please choose another time slot.`);
      return;
    }

    const booking = addConsultationBooking({
      clientName: clientName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      consultationType,
      date: selectedDate,
      timeSlot: selectedSlot,
      fitnessGoals: fitnessGoals.trim(),
      message: message.trim(),
      fee: selectedTrainer.consultationFee,
    });

    setConfirmedBooking(booking);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Master Biomechanics Consultation
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          Train With Elite Coaches
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Book private one-on-one consultation sessions with our certified master coaches. Tailored barbell kinematics, body recomposition blueprints, and periodized programming.
        </p>
      </div>

      {/* Trainer Roster Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Select Your Master Coach
          </h2>
          <span className="text-xs text-brand font-semibold">
            {trainers.length} Certified Master Coaches Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => {
            const isSelected = selectedTrainerId === trainer.id;
            return (
              <div
                key={trainer.id}
                onClick={() => setSelectedTrainerId(trainer.id)}
                className={`rounded-2xl overflow-hidden bg-dark-900 border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand shadow-glow bg-dark-850'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 text-[11px] text-white font-bold">
                    <Star className="w-3 h-3 text-brand fill-brand" />
                    <span>{trainer.rating}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-3 left-3 bg-brand text-black font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded shadow-glow">
                      Active Selection
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      {trainer.name}
                    </h3>
                    <p className="text-xs text-brand font-semibold">{trainer.role}</p>
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2">
                      {trainer.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {trainer.qualifications.map((q, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-dark-950 px-2 py-0.5 rounded border border-white/10 text-zinc-300"
                        >
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Assessment Fee</span>
                      <strong className="text-white text-sm">
                        {formatCurrency(trainer.consultationFee)}
                      </strong>
                    </div>
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-brand text-black shadow-glow'
                          : 'bg-dark-800 text-white hover:bg-dark-700'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Choose Coach'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Form Section */}
      {!confirmedBooking ? (
        <div className="rounded-3xl bg-dark-900 border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-brand text-xs font-bold uppercase tracking-widest">
                Session Registration Form
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                Book With {selectedTrainer.name}
              </h3>
            </div>
            <div className="px-4 py-2 rounded-xl bg-dark-950 border border-brand/30 text-xs">
              <span className="text-zinc-400">Consultation Rate: </span>
              <strong className="text-brand font-bold text-sm">
                {formatCurrency(selectedTrainer.consultationFee)}
              </strong>{' '}
              <span className="text-zinc-400">(Demo Mode: Complimentary)</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleBookSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Client Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Alexander Reed"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Mobile Phone *
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
            </div>

            {/* Consultation Type & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Consultation Pathway Focus
                </label>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value as ConsultationType)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                >
                  {consultationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Select Consultation Date
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
            </div>

            {/* Time Slot Picker for Trainer */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 block">
                Available Time Slots for {selectedTrainer.name}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {selectedTrainer.availableSlots.map((slot) => {
                  const booked = isSlotBooked(selectedDate, slot, selectedTrainer.id);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      type="button"
                      key={slot}
                      disabled={booked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-brand text-black border-brand font-bold shadow-glow'
                          : booked
                          ? 'bg-dark-950/40 border-white/5 text-zinc-400 line-through cursor-not-allowed'
                          : 'bg-dark-950 border-white/10 text-zinc-300 hover:border-brand/40 hover:text-white'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{slot}</span>
                      <span className="text-[10px] opacity-75">
                        {booked ? 'Booked' : 'Available'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fitness Goals */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Primary Fitness Goals & Current PRs *
              </label>
              <input
                type="text"
                required
                value={fitnessGoals}
                onChange={(e) => setFitnessGoals(e.target.value)}
                placeholder="e.g. Add 20kg to deadlift, achieve 12% body fat, fix lower back mobility..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Additional Message or Past Injury Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any past surgeries, medical clearances, or specific equipment questions..."
                className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand text-black font-extrabold text-sm uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Confirm Coach Consultation Booking</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Confirmation Screen */
        <div className="max-w-2xl mx-auto rounded-3xl bg-dark-900 border border-brand/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center text-brand mx-auto shadow-glow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              Consultation Scheduled
            </span>
            <h2 className="text-3xl font-black text-white font-display">
              Session Locked In!
            </h2>
            <p className="text-zinc-300 text-sm">
              Your consultation with {confirmedBooking.trainerName} has been booked and synced to the coaching roster.
            </p>
          </div>

          <div className="rounded-2xl bg-dark-950 border border-white/10 p-6 text-left space-y-3.5 max-w-md mx-auto text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-zinc-400">Reference Number:</span>
              <strong className="text-brand font-mono text-sm">{confirmedBooking.refNumber}</strong>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-zinc-400 block text-[11px]">Master Coach</span>
                <strong className="text-white">{confirmedBooking.trainerName}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Focus Pathway</span>
                <strong className="text-white truncate block">{confirmedBooking.consultationType}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Date & Time</span>
                <strong className="text-white">{confirmedBooking.date} • {confirmedBooking.timeSlot}</strong>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Status</span>
                <span className="text-emerald-400 font-bold">Confirmed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setClientName('');
                setFitnessGoals('');
              }}
              className="px-6 py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
            >
              Book Another Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
