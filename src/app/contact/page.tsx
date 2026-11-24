'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';

export default function ContactPage() {
  const { settings, showToast } = useGymData();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in your name, email, and message.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received by our concierge desk.', 'success');
  };

  return (
    <div className="py-12 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Concierge Services
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          Connect With Fitness Edge
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Located in Sector A, Mahalaxmi Nagar near Kibs Hospital in Indore. Whether inquiring about memberships, scheduling a walkthrough, or consulting with our master coaches, our concierge is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl p-6 sm:p-8 bg-dark-900 border border-white/10 space-y-6 shadow-card">
            {/* Live Status Badge */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sanctuary Open Now</span>
              </div>
              <span className="text-zinc-400 font-medium">Closes at 11:00 PM</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm font-semibold">Club Address</strong>
                  <span className="text-zinc-400">{settings.address}</span>
                  <p className="text-[11px] text-brand mt-0.5">Complimentary Member Underground Valet</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm font-semibold">Telephone Concierge</strong>
                  <span className="text-zinc-400">{settings.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm font-semibold">Email Concierge</strong>
                  <span className="text-zinc-400">{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block text-sm font-semibold">Operating Timings</strong>
                  <div className="text-zinc-400 space-y-0.5 mt-1 text-xs">
                    <p className="flex justify-between gap-6">
                      <span>Mon – Fri:</span>
                      <strong className="text-white">{settings.openingHours.weekdays}</strong>
                    </p>
                    <p className="flex justify-between gap-6">
                      <span>Saturday:</span>
                      <strong className="text-white">{settings.openingHours.saturday}</strong>
                    </p>
                    <p className="flex justify-between gap-6">
                      <span>Sunday:</span>
                      <strong className="text-white">{settings.openingHours.sunday}</strong>
                    </p>
                    <p className="text-[11px] text-brand pt-1">
                      * 24/7 keycard entry available for Standard, Premium & Annual VIP tiers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Social / WhatsApp Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Kinetix%20Concierge,%20I%20would%20like%20to%20inquire%20about%20club%20memberships.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Direct On WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white hover:text-brand hover:border-brand/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white hover:text-brand hover:border-brand/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl p-6 sm:p-8 bg-dark-900/80 border border-white/10 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Send A Message
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Our general manager or head coach will reply within 2 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Sterling"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
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
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    >
                      <option value="Membership Inquiry">Membership Inquiry</option>
                      <option value="Private Coaching Consultation">Private Coaching Consultation</option>
                      <option value="Executive Corporate Partnership">Executive Corporate Partnership</option>
                      <option value="Facility Tour Booking">Facility Tour Booking</option>
                      <option value="Store & Nutrition Inquiries">Store & Nutrition Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your fitness history, specific goals, or scheduling preferences..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Concierge Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand/10 border-2 border-brand flex items-center justify-center text-brand mx-auto shadow-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Message Dispatched</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                  Thank you, {form.name}. A member of our High Line concierge team will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', subject: 'Membership Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-dark-800 text-white hover:bg-dark-700 text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="rounded-2xl overflow-hidden border border-white/10 h-80 sm:h-96 shadow-card">
        <iframe
          src={settings.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
          allowFullScreen={false}
          loading="lazy"
          title="Kinetix Club Location Map"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
