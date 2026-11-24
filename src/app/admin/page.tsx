'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ShieldCheck,
  Users,
  CreditCard,
  Calendar,
  ShoppingBag,
  UserCheck,
  TrendingUp,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Package,
  DollarSign,
  AlertCircle,
  Eye,
  RefreshCw,
  AlertTriangle,
  Send,
  MessageSquare,
  Search,
  Filter,
  Check,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { MembershipPlan, Product, Trainer, MemberRecord, BookingStatus, OrderStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const {
    settings,
    updateSettings,
    plans,
    updatePlan,
    addPlan,
    members,
    addMember,
    updateMember,
    deleteMember,
    renewMember,
    sendExpiryReminder,
    expiringMembersCount,
    trainers,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    trialBookings,
    updateTrialStatus,
    consultationBookings,
    updateConsultationStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    profile,
    progressRecords,
    personalRecords,
    showToast,
    resetToDefaultData,
  } = useGymData();

  const [activeModule, setActiveModule] = useState<
    'overview' | 'members' | 'memberships' | 'bookings' | 'products' | 'trainers' | 'progress' | 'website'
  >('members'); // default to members so admin immediately sees all members!

  // Member search & filter
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState<'all' | 'Expiring Soon' | 'Expired' | 'Active'>('all');
  const [memberPlanFilter, setMemberPlanFilter] = useState('all');

  // Modal states
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRecord | null>(null);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);

  // New member form state
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    planId: 'plan-premium',
    planName: 'Premium Membership',
    billingCycle: 'monthly' as 'monthly' | 'quarterly' | 'yearly',
    expiryDate: (() => {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      return d.toISOString().split('T')[0];
    })(),
    assignedTrainer: 'Marcus Vance',
  });

  // New product form
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'whey-protein',
    brand: 'FITNESS EDGE LABS',
    price: 49,
    discountPrice: 39,
    shortDescription: '',
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
  });

  // New trainer form
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    role: 'Strength Coach',
    specialization: 'Hypertrophy & Conditioning',
    experience: '6+ Years',
    bio: '',
    consultationFee: 75,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  });

  // Website Settings form
  const [settingsForm, setSettingsForm] = useState({
    name: settings.name,
    tagline: settings.tagline,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    announcement: settings.announcement,
  });

  // Filter members list
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.phone.includes(memberSearch) ||
      m.id.toLowerCase().includes(memberSearch.toLowerCase());

    const matchesStatus =
      memberStatusFilter === 'all' || m.membershipStatus === memberStatusFilter;

    const matchesPlan =
      memberPlanFilter === 'all' || m.planId === memberPlanFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Demo revenue data
  const revenueChartData = [
    { month: 'Jun', memberships: 38400, store: 12200, total: 50600 },
    { month: 'Jul', memberships: 41200, store: 14500, total: 55700 },
    { month: 'Aug', memberships: 45000, store: 16800, total: 61800 },
    { month: 'Sep', memberships: 49800, store: 18400, total: 68200 },
    { month: 'Oct', memberships: 54600, store: 21900, total: 76500 },
    { month: 'Nov', memberships: 62400, store: 24800, total: 87200 },
  ];

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenPlan = plans.find((p) => p.id === newMemberForm.planId) || plans[0];
    addMember({
      name: newMemberForm.name,
      email: newMemberForm.email,
      phone: newMemberForm.phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      planId: chosenPlan.id,
      planName: chosenPlan.name,
      billingCycle: newMemberForm.billingCycle,
      membershipStatus: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: newMemberForm.expiryDate,
      assignedTrainer: newMemberForm.assignedTrainer,
      totalVisits: 1,
      reminderSent: false,
    });
    setShowAddMemberModal(false);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: productForm.name,
      category: productForm.category as any,
      brand: productForm.brand,
      price: Number(productForm.price),
      discountPrice: productForm.discountPrice ? Number(productForm.discountPrice) : undefined,
      rating: 4.9,
      reviewsCount: 1,
      shortDescription: productForm.shortDescription,
      description: productForm.shortDescription,
      inStock: true,
      stockCount: Number(productForm.stockCount),
      image: productForm.image,
      features: ['Formulated for elite performance', 'Third-party tested purity'],
    });
    setShowAddProductModal(false);
  };

  const handleTrainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainer({
      name: trainerForm.name,
      role: trainerForm.role,
      specialization: trainerForm.specialization,
      experience: trainerForm.experience,
      qualifications: ['CSCS Certified', 'Precision Nutrition'],
      bio: trainerForm.bio,
      image: trainerForm.image,
      rating: 5.0,
      reviewsCount: 12,
      consultationFee: Number(trainerForm.consultationFee),
      availableDays: ['Monday', 'Wednesday', 'Friday'],
      availableSlots: ['08:00 AM', '10:00 AM', '04:00 PM', '06:00 PM'],
      activeClientsCount: 15,
    });
    setShowAddTrainerModal(false);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const handleNotifyAllExpiring = () => {
    const expiring = members.filter(
      (m) => m.membershipStatus === 'Expiring Soon' || m.membershipStatus === 'Expired'
    );
    expiring.forEach((m) => {
      sendExpiryReminder(m.id, 'whatsapp');
    });
    showToast(`Dispatched automated renewal alerts to ${expiring.length} members via WhatsApp & SMS.`, 'success');
  };

  const modules = [
    { id: 'members', label: 'All Members & Expiry Alerts', icon: Users, count: members.length, alert: expiringMembersCount > 0 },
    { id: 'overview', label: 'Overview & Analytics', icon: TrendingUp },
    { id: 'memberships', label: 'Membership Plans & Pricing', icon: CreditCard, count: plans.length },
    { id: 'bookings', label: 'Booking Desk', icon: Calendar, count: trialBookings.length + consultationBookings.length },
    { id: 'products', label: 'Store & Orders', icon: ShoppingBag, count: orders.length },
    { id: 'trainers', label: 'Trainer Roster', icon: UserCheck, count: trainers.length },
    { id: 'progress', label: 'Athlete Biometrics', icon: Sparkles },
    { id: 'website', label: 'Website Content & Address', icon: Settings },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Admin Header */}
      <div className="rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand text-black flex items-center justify-center font-black shadow-glow">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                Fitness Edge Admin Suite
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand text-black">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 text-brand" />
              <span>708-A Sector, near kibs hospital, Mahalaxmi Nagar, Indore (452010)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToDefaultData}
            className="px-3.5 py-2 rounded-xl bg-dark-800 border border-white/10 text-white hover:text-brand hover:border-brand/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>

      {/* Main Admin Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 rounded-2xl bg-dark-900 border border-white/10 p-3 space-y-1 shadow-card sticky top-24">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Control Modules
          </div>
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand text-black font-bold shadow-glow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{m.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {m.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  {m.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-black text-brand font-bold' : 'bg-dark-950 text-zinc-300'
                      }`}
                    >
                      {m.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Module Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* ========================================================
              MODULE 1: ALL MEMBERS DIRECTORY & EXPIRY ALERTS
             ======================================================== */}
          {activeModule === 'members' && (
            <div className="space-y-6">
              {/* Expiry Alert Box for Admin */}
              {expiringMembersCount > 0 && (
                <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/80 via-dark-900 to-amber-950/80 border-2 border-amber-500/80 shadow-glow flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Membership Expiry Alert</span>
                        <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.2 rounded-full">
                          {expiringMembersCount} Action Items
                        </span>
                      </h4>
                      <p className="text-xs text-zinc-300">
                        {members.filter((m) => m.membershipStatus === 'Expiring Soon').length} members have memberships expiring within 7 days, and {members.filter((m) => m.membershipStatus === 'Expired').length} have expired.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleNotifyAllExpiring}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Reminders to All</span>
                  </button>
                </div>
              )}

              {/* Members Header & Search Filters */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-4 shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">
                      All Member Directory ({members.length})
                    </h2>
                    <p className="text-xs text-zinc-400">
                      View all registered members, membership tiers, expiration countdowns, and dispatch automated alerts.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="px-4 py-2 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Enroll Member</span>
                  </button>
                </div>

                {/* Filter and Search controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search member name, ID, phone..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <select
                      value={memberStatusFilter}
                      onChange={(e) => setMemberStatusFilter(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                    >
                      <option value="all">All Statuses ({members.length})</option>
                      <option value="Expiring Soon">⚠️ Expiring Soon ({members.filter(m => m.membershipStatus === 'Expiring Soon').length})</option>
                      <option value="Expired">🚨 Expired ({members.filter(m => m.membershipStatus === 'Expired').length})</option>
                      <option value="Active">Active ({members.filter(m => m.membershipStatus === 'Active').length})</option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={memberPlanFilter}
                      onChange={(e) => setMemberPlanFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                    >
                      <option value="all">All Membership Plans</option>
                      {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Members Table */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400 bg-dark-950/60">
                        <th className="py-3 px-3.5">Member ID</th>
                        <th className="py-3 px-3.5">Name & Contact</th>
                        <th className="py-3 px-3.5">Membership Tier</th>
                        <th className="py-3 px-3.5">Expiry Date</th>
                        <th className="py-3 px-3.5">Days Left</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5">Reminder Log</th>
                        <th className="py-3 px-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {filteredMembers.map((m) => {
                        const isSoon = m.membershipStatus === 'Expiring Soon';
                        const isExp = m.membershipStatus === 'Expired';

                        return (
                          <tr
                            key={m.id}
                            className={`hover:bg-white/[0.02] transition-colors ${
                              isSoon ? 'bg-amber-500/[0.04]' : isExp ? 'bg-red-500/[0.04]' : ''
                            }`}
                          >
                            <td className="py-3.5 px-3.5 font-mono text-brand font-bold">
                              {m.id}
                            </td>

                            <td className="py-3.5 px-3.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={m.avatar}
                                  alt={m.name}
                                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                                />
                                <div>
                                  <strong className="text-white block">{m.name}</strong>
                                  <span className="text-[10px] text-zinc-400">
                                    {m.phone} • {m.email}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-3.5">
                              <span className="font-semibold text-white block">{m.planName}</span>
                              <span className="text-[10px] text-zinc-400 capitalize">
                                Billed {m.billingCycle}
                              </span>
                            </td>

                            <td className="py-3.5 px-3.5 font-mono">
                              {formatDate(m.expiryDate)}
                            </td>

                            <td className="py-3.5 px-3.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold inline-block ${
                                  isExp
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : isSoon
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-emerald-500/10 text-emerald-400'
                                }`}
                              >
                                {m.daysRemaining <= 0
                                  ? `${Math.abs(m.daysRemaining)}d ago (Expired)`
                                  : `${m.daysRemaining} days left`}
                              </span>
                            </td>

                            <td className="py-3.5 px-3.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  isExp
                                    ? 'bg-red-500/20 text-red-400'
                                    : isSoon
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-emerald-500/20 text-emerald-400'
                                }`}
                              >
                                {m.membershipStatus}
                              </span>
                            </td>

                            <td className="py-3.5 px-3.5 text-[11px]">
                              {m.reminderSent ? (
                                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Sent {m.reminderSentDate || 'Recent'}</span>
                                </span>
                              ) : (
                                <span className="text-zinc-500">Not Dispatched</span>
                              )}
                            </td>

                            <td className="py-3.5 px-3.5 text-right space-x-1.5 whitespace-nowrap">
                              {/* Remind Button */}
                              {(isSoon || isExp) && (
                                <button
                                  onClick={() => sendExpiryReminder(m.id, 'whatsapp')}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                                  title="Send WhatsApp Expiry Reminder"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>Remind</span>
                                </button>
                              )}

                              {/* Renew Button */}
                              <button
                                onClick={() => renewMember(m.id, 12)}
                                className="px-2.5 py-1 rounded-lg bg-dark-800 text-white hover:bg-brand hover:text-black font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                                title="Renew membership for +12 months"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Renew</span>
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => deleteMember(m.id)}
                                className="text-zinc-500 hover:text-red-400 p-1 transition-colors inline-block align-middle"
                                title="Remove member"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 2: OVERVIEW & ANALYTICS
             ======================================================== */}
          {activeModule === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
                  <span className="text-xs text-zinc-400">Total Enrolled Members</span>
                  <p className="text-2xl sm:text-3xl font-black text-white font-display">
                    {members.length} Active
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold">+18% this quarter</p>
                </div>
                <div className="p-5 rounded-2xl bg-dark-900 border border-brand/30 space-y-2 shadow-glow-sm">
                  <span className="text-xs text-brand font-semibold">Expiring Soon / Expired</span>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                    {expiringMembersCount}
                  </p>
                  <p className="text-[11px] text-zinc-400">Requires renewal outreach</p>
                </div>
                <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
                  <span className="text-xs text-zinc-400">Monthly Revenue (Nov)</span>
                  <p className="text-2xl sm:text-3xl font-black text-brand font-display">$87,200</p>
                  <p className="text-[11px] text-zinc-400">Recurring dues + Nutrition Store</p>
                </div>
                <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
                  <span className="text-xs text-zinc-400">Store Orders</span>
                  <p className="text-2xl sm:text-3xl font-black text-white font-display">{orders.length}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">100% Demo fulfilled</p>
                </div>
              </div>

              {/* Expiring Soon Quick Attention Box */}
              {expiringMembersCount > 0 && (
                <div className="rounded-2xl p-5 bg-dark-900 border border-amber-500/40 space-y-3 shadow-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Immediate Renewal Outreach Required ({expiringMembersCount})</span>
                    </h3>
                    <button
                      onClick={() => setActiveModule('members')}
                      className="text-xs font-semibold text-brand hover:underline"
                    >
                      View All in Directory
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {members
                      .filter((m) => m.membershipStatus === 'Expiring Soon' || m.membershipStatus === 'Expired')
                      .slice(0, 4)
                      .map((m) => (
                        <div
                          key={m.id}
                          className="p-3 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold text-white">{m.name} ({m.planName})</p>
                            <p className="text-[11px] text-zinc-400">
                              Expires: {m.expiryDate} ({m.daysRemaining <= 0 ? 'Expired' : `${m.daysRemaining}d left`})
                            </p>
                          </div>
                          <button
                            onClick={() => sendExpiryReminder(m.id, 'whatsapp')}
                            className="px-2.5 py-1 rounded bg-amber-500 text-black font-bold text-[10px] hover:bg-amber-400"
                          >
                            Remind
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Monthly Revenue Chart */}
              <div className="rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      Platform Monthly Revenue Trajectory
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Aggregated recurring dues and supplement sales at Fitness Edge Indore
                    </p>
                  </div>
                  <span className="text-xs text-brand font-bold">2024 Performance Record</span>
                </div>

                <div className="h-64 sm:h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#272730" vertical={false} />
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111115',
                          borderColor: 'rgba(204, 255, 0, 0.3)',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                        formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="memberships" fill="#22c55e" radius={[4, 4, 0, 0]} name="Memberships" />
                      <Bar dataKey="store" fill="#ccff00" radius={[4, 4, 0, 0]} name="Store" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 3: MEMBERSHIP PLANS & PRICING
             ======================================================== */}
          {activeModule === 'memberships' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Membership Tier Pricing Management
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Edit pricing, benefits, and popular highlights. Changes persist instantly.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-4 shadow-card flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-base font-bold text-white font-display">
                          {plan.name}
                        </h4>
                        {plan.isPopular && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-brand text-black px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1">{plan.tagline}</p>

                      <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                        <div className="p-2 rounded-lg bg-dark-950 border border-white/5">
                          <span className="text-[10px] text-zinc-400 block">Monthly</span>
                          <strong className="text-brand font-mono text-sm">{formatCurrency(plan.monthlyPrice)}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-dark-950 border border-white/5">
                          <span className="text-[10px] text-zinc-400 block">Quarterly</span>
                          <strong className="text-white font-mono text-sm">{formatCurrency(plan.quarterlyPrice)}</strong>
                        </div>
                        <div className="p-2 rounded-lg bg-dark-950 border border-white/5">
                          <span className="text-[10px] text-zinc-400 block">Annual</span>
                          <strong className="text-white font-mono text-sm">{formatCurrency(plan.yearlyPrice)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex gap-2">
                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="flex-1 py-2 rounded-xl bg-dark-800 border border-white/10 text-white hover:border-brand text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-brand" />
                        <span>Edit Pricing</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 4: BOOKINGS MANAGEMENT
             ======================================================== */}
          {activeModule === 'bookings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Trial & Consultation Bookings
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Approve, confirm, or cancel member and visitor session reservations
                  </p>
                </div>
              </div>

              {/* Consultation Bookings Table */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shadow-card space-y-3 p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand">
                  Trainer Consultations ({consultationBookings.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400">
                        <th className="py-2.5 px-3">Ref</th>
                        <th className="py-2.5 px-3">Client</th>
                        <th className="py-2.5 px-3">Coach</th>
                        <th className="py-2.5 px-3">Focus Pathway</th>
                        <th className="py-2.5 px-3">Date & Slot</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {consultationBookings.map((cb) => (
                        <tr key={cb.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-3 font-mono text-brand font-bold">{cb.refNumber}</td>
                          <td className="py-3 px-3">
                            <strong className="text-white block">{cb.clientName}</strong>
                            <span className="text-[10px] text-zinc-400">{cb.mobile}</span>
                          </td>
                          <td className="py-3 px-3 font-medium text-white">{cb.trainerName}</td>
                          <td className="py-3 px-3">{cb.consultationType}</td>
                          <td className="py-3 px-3">{cb.date} • {cb.timeSlot}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              cb.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                              cb.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {cb.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1.5">
                            {cb.status !== 'Confirmed' && (
                              <button
                                onClick={() => updateConsultationStatus(cb.id, 'Confirmed')}
                                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-[11px]"
                              >
                                Approve
                              </button>
                            )}
                            {cb.status !== 'Cancelled' && (
                              <button
                                onClick={() => updateConsultationStatus(cb.id, 'Cancelled')}
                                className="px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white font-semibold text-[11px]"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Free Trial Bookings Table */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shadow-card space-y-3 p-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand">
                  Free Trial Bookings ({trialBookings.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400">
                        <th className="py-2.5 px-3">Ref</th>
                        <th className="py-2.5 px-3">Visitor Name</th>
                        <th className="py-2.5 px-3">Workout Type</th>
                        <th className="py-2.5 px-3">Date & Slot</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {trialBookings.map((tb) => (
                        <tr key={tb.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-3 font-mono text-brand font-bold">{tb.refNumber}</td>
                          <td className="py-3 px-3">
                            <strong className="text-white block">{tb.fullName}</strong>
                            <span className="text-[10px] text-zinc-400">{tb.email} • {tb.mobile}</span>
                          </td>
                          <td className="py-3 px-3">{tb.workoutType}</td>
                          <td className="py-3 px-3">{tb.date} • {tb.timeSlot}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tb.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                              tb.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                              'bg-zinc-800 text-zinc-400'
                            }`}>
                              {tb.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1.5">
                            {tb.status !== 'Confirmed' && (
                              <button
                                onClick={() => updateTrialStatus(tb.id, 'Confirmed')}
                                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-[11px]"
                              >
                                Confirm
                              </button>
                            )}
                            {tb.status !== 'Completed' && (
                              <button
                                onClick={() => updateTrialStatus(tb.id, 'Completed')}
                                className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold text-[11px]"
                              >
                                Mark Attended
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 5: PRODUCTS & ORDER MANAGEMENT
             ======================================================== */}
          {activeModule === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Product Catalog & Store Orders
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Manage stock inventory, catalog items, and fulfill customer orders
                  </p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Order Status Table */}
              <div className="rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-3 shadow-card">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand">
                  Customer Orders ({orders.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400">
                        <th className="py-2 px-3">Order #</th>
                        <th className="py-2 px-3">Customer</th>
                        <th className="py-2 px-3">Items</th>
                        <th className="py-2 px-3">Total</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {orders.map((o) => (
                        <tr key={o.id}>
                          <td className="py-3 px-3 font-mono text-brand font-bold">{o.orderNumber}</td>
                          <td className="py-3 px-3">{o.customerName}</td>
                          <td className="py-3 px-3">{o.items.length} items</td>
                          <td className="py-3 px-3 font-bold text-white">{formatCurrency(o.total)}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-brand/10 text-brand font-bold text-[10px]">
                              {o.orderStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <select
                              value={o.orderStatus}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 rounded-lg bg-dark-950 border border-white/10 text-white text-[11px]"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Catalog Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-brand">
                  Live Catalog Items ({products.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl bg-dark-900 border border-white/10 flex gap-3 relative group"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 rounded-lg object-cover bg-dark-850 shrink-0"
                      />
                      <div className="flex-1 text-xs space-y-1">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-white line-clamp-1">{p.name}</p>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-zinc-500 hover:text-red-400 p-1"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-brand font-bold">
                          {formatCurrency(p.discountPrice ?? p.price)}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                          Stock: <strong className="text-white">{p.stockCount} units</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 6: TRAINER MANAGEMENT
             ======================================================== */}
          {activeModule === 'trainers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Trainer & Coach Directory
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Add coaching staff, manage assessment fees and availability
                  </p>
                </div>
                <button
                  onClick={() => setShowAddTrainerModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Coach</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trainers.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex gap-4 items-start shadow-card"
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-brand/30"
                    />
                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white font-display">{t.name}</h4>
                        <button
                          onClick={() => deleteTrainer(t.id)}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-brand font-semibold text-[11px]">{t.role}</p>
                      <p className="text-zinc-400 text-[11px] line-clamp-2">{t.bio}</p>
                      <div className="pt-2 flex justify-between items-center text-[11px]">
                        <span className="text-white font-bold">{formatCurrency(t.consultationFee)} / session</span>
                        <span className="text-zinc-400">{t.activeClientsCount} Active Clients</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 7: ATHLETE PROGRESS REVIEW
             ======================================================== */}
          {activeModule === 'progress' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white font-display">
                  Athlete Biometric Milestones
                </h2>
                <span className="text-xs text-zinc-400">Member: {profile.name} (#{profile.id})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                  <span className="text-xs text-zinc-400">Starting Weight</span>
                  <p className="text-xl font-bold text-white mt-1">{profile.startingWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-brand/30">
                  <span className="text-xs text-brand">Current Weight</span>
                  <p className="text-xl font-bold text-brand mt-1">{profile.currentWeight} kg</p>
                </div>
                <div className="p-4 rounded-xl bg-dark-900 border border-white/10">
                  <span className="text-xs text-zinc-400">Target Goal</span>
                  <p className="text-xl font-bold text-white mt-1">{profile.targetWeight} kg</p>
                </div>
              </div>

              <div className="rounded-2xl bg-dark-900 border border-white/10 p-5 space-y-3">
                <h3 className="text-sm font-bold text-white">Strength PR Trophies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {personalRecords.map((r) => (
                    <div key={r.id} className="p-3.5 rounded-xl bg-dark-950 border border-white/5 space-y-1 text-xs">
                      <span className="text-[10px] font-bold text-brand uppercase">{r.category}</span>
                      <p className="text-sm font-bold text-white">{r.exercise}</p>
                      <p className="text-brand font-black text-base">{r.recordWeightKg} kg × {r.reps} reps</p>
                      <p className="text-[10px] text-zinc-400">Set on {formatDate(r.date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MODULE 8: WEBSITE CONTENT & OFFICIAL ADDRESS
             ======================================================== */}
          {activeModule === 'website' && (
            <div className="rounded-2xl bg-dark-900 border border-white/10 p-6 sm:p-8 space-y-6 shadow-card">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Fitness Edge Website Settings & Address
                </h2>
                <p className="text-xs text-zinc-400">
                  Update gym official name, street address in Indore, telephone, and announcements.
                </p>
              </div>

              <form onSubmit={handleSettingsSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Gym Name
                    </label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Tagline / Headline
                    </label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Concierge Phone
                    </label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Concierge Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Official Gym Address (Indore, MP)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Exact location: 708-A Sector, near kibs hospital, Sector A, Mahalaxmi Nagar, Indore, Madhya Pradesh 452010
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcement}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors"
                >
                  Save Global Settings
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Enroll New Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Enroll New Member</h3>
              <p className="text-xs text-zinc-400">Add member to the Fitness Edge database.</p>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yashwardhan Rathore"
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 00000"
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="member@email.com"
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Membership Plan</label>
                  <select
                    value={newMemberForm.planId}
                    onChange={(e) => {
                      const p = plans.find((pl) => pl.id === e.target.value);
                      setNewMemberForm({
                        ...newMemberForm,
                        planId: e.target.value,
                        planName: p ? p.name : 'Premium Membership',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Billing Cycle</label>
                  <select
                    value={newMemberForm.billingCycle}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, billingCycle: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly (Annual)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={newMemberForm.expiryDate}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Assigned Coach</label>
                  <select
                    value={newMemberForm.assignedTrainer}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, assignedTrainer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors"
              >
                Enroll Member & Generate Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Membership Plan Pricing */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setEditingPlan(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white font-display">
              Edit Pricing: {editingPlan.name}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePlan(editingPlan.id, {
                  monthlyPrice: editingPlan.monthlyPrice,
                  quarterlyPrice: editingPlan.quarterlyPrice,
                  yearlyPrice: editingPlan.yearlyPrice,
                  isPopular: editingPlan.isPopular,
                });
                setEditingPlan(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Monthly Rate ($)</label>
                <input
                  type="number"
                  value={editingPlan.monthlyPrice}
                  onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Quarterly Rate ($)</label>
                <input
                  type="number"
                  value={editingPlan.quarterlyPrice}
                  onChange={(e) => setEditingPlan({ ...editingPlan, quarterlyPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Annual Rate ($)</label>
                <input
                  type="number"
                  value={editingPlan.yearlyPrice}
                  onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingPlan.isPopular}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded accent-brand"
                />
                <span>Highlight as "Most Popular" Tier</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-colors"
              >
                Save Plan Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Product */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white font-display">Add Catalog Product</h3>

            <form onSubmit={handleProductSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nitro-Core Pre-Workout"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="whey-protein">Whey Protein</option>
                    <option value="creatine">Creatine</option>
                    <option value="mass-gainers">Mass Gainers</option>
                    <option value="protein-bars">Protein Bars</option>
                    <option value="accessories">Gym Accessories</option>
                    <option value="equipment">Gym Equipment</option>
                    <option value="bottles">Shakers & Bottles</option>
                    <option value="apparel">Fitness Apparel</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Discount Price ($)</label>
                  <input
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({ ...productForm, discountPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Trainer */}
      {showAddTrainerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowAddTrainerModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white font-display">Add Master Coach</h3>

            <form onSubmit={handleTrainerSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Coach Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaxson Miller"
                  value={trainerForm.name}
                  onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={trainerForm.role}
                    onChange={(e) => setTrainerForm({ ...trainerForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Fee ($/session)</label>
                  <input
                    type="number"
                    value={trainerForm.consultationFee}
                    onChange={(e) => setTrainerForm({ ...trainerForm, consultationFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Specialization</label>
                <input
                  type="text"
                  value={trainerForm.specialization}
                  onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Bio Summary</label>
                <textarea
                  rows={2}
                  value={trainerForm.bio}
                  onChange={(e) => setTrainerForm({ ...trainerForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow"
              >
                Add Coach Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
