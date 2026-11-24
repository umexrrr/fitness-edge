'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Lock,
  ChevronDown,
  Clock,
  Dumbbell,
  Check,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { PricingCycle, MembershipPlan } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function MembershipsPage() {
  return (
    <React.Suspense fallback={<div className="py-20 text-center text-zinc-400">Loading memberships...</div>}>
      <MembershipsContent />
    </React.Suspense>
  );
}

function MembershipsContent() {
  const { plans, showToast } = useGymData();
  const searchParams = useSearchParams();
  const initialPlanId = searchParams.get('plan') || 'plan-premium';

  const [billingCycle, setBillingCycle] = useState<PricingCycle>('monthly');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<MembershipPlan | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Registration modal form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreeTerms: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);

  const handleOpenJoin = (plan: MembershipPlan) => {
    setSelectedPlanForModal(plan);
    setRegisteredSuccess(null);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast('Please fill in all required registration fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegisteredSuccess(`REG-${Math.floor(100000 + Math.random() * 900000)}`);
      showToast(`Welcome to KINETIX! Membership confirmed for ${formData.fullName}.`, 'success');
    }, 800);
  };

  const getPlanPrice = (plan: MembershipPlan) => {
    if (billingCycle === 'yearly') return plan.yearlyPrice;
    if (billingCycle === 'quarterly') return plan.quarterlyPrice;
    return plan.monthlyPrice;
  };

  const getPriceSuffix = () => {
    if (billingCycle === 'yearly') return '/ year (billed annually)';
    if (billingCycle === 'quarterly') return '/ quarter (billed every 3 mos)';
    return '/ month';
  };

  const faqs = [
    {
      q: 'Are there any sign-up fees or annual maintenance charges?',
      a: 'Zero hidden fees. The price you see is strictly what you pay. We never charge registration fees, equipment maintenance charges, or locker rental fees on our standard and premium tiers.',
    },
    {
      q: 'Can I freeze or pause my membership when traveling?',
      a: 'Yes. All members on Standard, Premium, and Annual plans can freeze their membership for up to 60 days per calendar year directly through the Member Portal with zero penalty.',
    },
    {
      q: 'How does 24/7 club access work?',
      a: 'Upon joining, you will receive a digital Bluetooth NFC pass for Apple Wallet / Google Wallet as well as an RFID biometric card that unlocks our secure High Line turnstiles 24 hours a day, 365 days a year.',
    },
    {
      q: 'Can I upgrade or downgrade my tier at any time?',
      a: 'Absolutely. Tier changes can be requested directly in your Member Dashboard or at the front concierge desk and apply at the start of your subsequent billing cycle.',
    },
    {
      q: 'Can I bring guests with my membership?',
      a: 'Premium and Annual VIP members receive 2 complimentary guest passes per month. Additional day guest passes are available at a preferred member rate of $25/day.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Elite Membership Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-display">
          Invest In Undeniable Strength
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Transparent, all-inclusive fitness memberships. Gain access to championship Eleiko platforms, sub-zero contrast therapy, and private coach programming.
        </p>

        {/* Pricing Cycle Toggle */}
        <div className="pt-6 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-dark-900 border border-white/10 shadow-card">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-brand text-black shadow-glow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-brand text-black shadow-glow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[10px] bg-dark-950/80 text-brand px-1.5 py-0.5 rounded border border-brand/30">
                Save 10%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-brand text-black shadow-glow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual VIP</span>
              <span className="text-[10px] bg-brand text-black font-extrabold px-1.5 py-0.5 rounded">
                Save 20%+
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Membership Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {plans.map((plan) => {
          const isPopular = plan.isPopular;
          const price = getPlanPrice(plan);

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                isPopular
                  ? 'bg-dark-900 border-2 border-brand shadow-glow xl:-translate-y-2'
                  : 'bg-dark-900/70 border border-white/10 hover:border-white/20'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-glow">
                  Most Popular
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-black text-white font-display">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-1 min-h-[34px] leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-display">
                      {formatCurrency(price)}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {billingCycle === 'monthly' ? '/mo' : billingCycle === 'quarterly' ? '/qtr' : '/yr'}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">
                    {getPriceSuffix()}
                  </span>
                </div>

                {/* Core specifications */}
                <div className="space-y-2 py-3 border-y border-white/5 text-[11px] text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="truncate">{plan.gymAccessTimings}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="truncate">{plan.personalTraining}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span className="truncate">{plan.groupClasses}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 text-xs">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    Privileges:
                  </p>
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-zinc-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                  {plan.exclusions.map((exclusion, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-zinc-400 text-[11px]">
                      <XCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span className="line-through">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleOpenJoin(plan)}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isPopular
                      ? 'bg-brand text-black hover:bg-brand-hover shadow-glow'
                      : 'bg-dark-800 text-white hover:bg-dark-750 border border-white/10'
                  }`}
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-dark-900/60 rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Detailed Feature Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Plan Feature Comparison Matrix
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="py-3 px-4 font-semibold">Tier Feature</th>
                <th className="py-3 px-4 font-semibold text-white">Basic</th>
                <th className="py-3 px-4 font-semibold text-white">Standard</th>
                <th className="py-3 px-4 font-bold text-brand">Premium (VIP)</th>
                <th className="py-3 px-4 font-semibold text-white">PT Elite</th>
                <th className="py-3 px-4 font-semibold text-white">Annual VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Club Access Hours</td>
                <td className="py-3.5 px-4">8 AM – 5 PM</td>
                <td className="py-3.5 px-4">24/7 Unlimited</td>
                <td className="py-3.5 px-4 text-brand font-semibold">24/7 All Locations</td>
                <td className="py-3.5 px-4">24/7 VIP Priority</td>
                <td className="py-3.5 px-4">24/7 All-Access</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Eleiko Olympic Platforms</td>
                <td className="py-3.5 px-4"><Check className="w-4 h-4 text-brand" /></td>
                <td className="py-3.5 px-4"><Check className="w-4 h-4 text-brand" /></td>
                <td className="py-3.5 px-4"><Check className="w-4 h-4 text-brand" /></td>
                <td className="py-3.5 px-4"><Check className="w-4 h-4 text-brand" /></td>
                <td className="py-3.5 px-4"><Check className="w-4 h-4 text-brand" /></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Sub-Zero Cryo & Cold Plunge</td>
                <td className="py-3.5 px-4 text-zinc-400">—</td>
                <td className="py-3.5 px-4 text-zinc-400">—</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Unlimited Access</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Unlimited Access</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Unlimited Access</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Private One-on-One PT</td>
                <td className="py-3.5 px-4">1 Induction</td>
                <td className="py-3.5 px-4">2 / Quarter</td>
                <td className="py-3.5 px-4 text-brand font-semibold">2 / Month</td>
                <td className="py-3.5 px-4 text-brand font-semibold">8 / Month (Master)</td>
                <td className="py-3.5 px-4 text-brand font-semibold">12 / Year Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">InBody 770 Composition Scans</td>
                <td className="py-3.5 px-4">1 at sign-up</td>
                <td className="py-3.5 px-4">Monthly</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Weekly + DEXA</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Weekly + DEXA</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Store Merchandise Discount</td>
                <td className="py-3.5 px-4 text-zinc-400">—</td>
                <td className="py-3.5 px-4">5% Off</td>
                <td className="py-3.5 px-4 text-brand font-semibold">15% Off All Gear</td>
                <td className="py-3.5 px-4 text-brand font-semibold">20% Off All Gear</td>
                <td className="py-3.5 px-4 text-brand font-semibold">25% Off + Welcome Kit</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Complimentary Guest Passes</td>
                <td className="py-3.5 px-4 text-zinc-400">—</td>
                <td className="py-3.5 px-4">1 / Month</td>
                <td className="py-3.5 px-4 text-brand font-semibold">2 / Month</td>
                <td className="py-3.5 px-4 text-brand font-semibold">4 / Month</td>
                <td className="py-3.5 px-4 text-brand font-semibold">Unlimited Weekends</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Membership FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-dark-900 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-brand transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-brand' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedPlanForModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedPlanForModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            {!registeredSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-brand text-xs font-bold uppercase tracking-wider">
                    Membership Enrollment
                  </span>
                  <h3 className="text-2xl font-black text-white font-display">
                    {selectedPlanForModal.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Selected Cycle:{' '}
                    <strong className="text-white capitalize">{billingCycle}</strong> at{' '}
                    <strong className="text-brand">
                      {formatCurrency(getPlanPrice(selectedPlanForModal))}
                    </strong>{' '}
                    {getPriceSuffix()}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-dark-900/80 border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <CreditCard className="w-4 h-4 text-brand" />
                      <span>Demo Mode: No payment is charged during presentation</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Encrypted biometric pass will be created instantly</span>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-zinc-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded accent-brand"
                    />
                    <span>
                      I agree to the Kinetix Club Member Code of Conduct and 24/7 keycard access security terms.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-brand text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Activating Digital Pass...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Enrollment & Generate Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-brand mx-auto shadow-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white font-display">
                    Welcome To KINETIX Club
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Your enrollment has been successfully recorded in the platform database.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-dark-900 border border-white/10 text-xs space-y-1.5 text-left max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Registration Ref:</span>
                    <strong className="text-brand font-mono">{registeredSuccess}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tier:</span>
                    <strong className="text-white">{selectedPlanForModal.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Member:</span>
                    <strong className="text-white">{formData.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Status:</span>
                    <span className="text-emerald-400 font-semibold">Active (Demo Verified)</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanForModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-dark-800 text-white hover:bg-dark-700 text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
