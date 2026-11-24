'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GymSettings,
  MembershipPlan,
  Trainer,
  Product,
  CartItem,
  Order,
  ProgressRecord,
  WorkoutSession,
  PersonalRecord,
  MemberProfile,
  MemberRecord,
  TrialBooking,
  ConsultationBooking,
  Role,
  BookingStatus,
  OrderStatus,
} from '@/types';
import {
  INITIAL_GYM_SETTINGS,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_MEMBERS,
  INITIAL_TRAINERS,
  INITIAL_PRODUCTS,
  INITIAL_MEMBER_PROFILE,
  INITIAL_PROGRESS_RECORDS,
  INITIAL_PERSONAL_RECORDS,
  INITIAL_WORKOUT_SESSIONS,
  INITIAL_TRIAL_BOOKINGS,
  INITIAL_CONSULTATION_BOOKINGS,
  INITIAL_ORDERS,
} from '@/data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface GymDataContextType {
  // Global Role for demo switching
  currentRole: Role;
  setCurrentRole: (role: Role) => void;

  // Gym Settings
  settings: GymSettings;
  updateSettings: (newSettings: Partial<GymSettings>) => void;

  // Memberships
  plans: MembershipPlan[];
  updatePlan: (id: string, updated: Partial<MembershipPlan>) => void;
  addPlan: (newPlan: Omit<MembershipPlan, 'id'>) => void;

  // Members Directory & Expiry System
  members: MemberRecord[];
  addMember: (member: Omit<MemberRecord, 'id' | 'daysRemaining'>) => void;
  updateMember: (id: string, updated: Partial<MemberRecord>) => void;
  deleteMember: (id: string) => void;
  renewMember: (id: string, durationMonths?: number) => void;
  sendExpiryReminder: (id: string, channel?: 'whatsapp' | 'email') => void;
  expiringMembersCount: number;

  // Trainers
  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, updated: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;

  // Free Trial Bookings
  trialBookings: TrialBooking[];
  addTrialBooking: (booking: Omit<TrialBooking, 'id' | 'refNumber' | 'createdAt' | 'status'>) => TrialBooking;
  updateTrialStatus: (id: string, status: BookingStatus) => void;

  // Consultation Bookings
  consultationBookings: ConsultationBooking[];
  addConsultationBooking: (booking: Omit<ConsultationBooking, 'id' | 'refNumber' | 'createdAt' | 'status'>) => ConsultationBooking;
  updateConsultationStatus: (id: string, status: BookingStatus) => void;

  // Products & E-Commerce
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Shopping Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, flavor?: string, size?: string) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    email: string;
    mobile: string;
    address: { street: string; city: string; state: string; postalCode: string };
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  // Member Fitness Tracker
  profile: MemberProfile;
  updateProfile: (updated: Partial<MemberProfile>) => void;
  progressRecords: ProgressRecord[];
  addProgressRecord: (record: Omit<ProgressRecord, 'id'>) => void;
  updateProgressRecord: (id: string, updated: Partial<ProgressRecord>) => void;
  deleteProgressRecord: (id: string) => void;

  personalRecords: PersonalRecord[];
  addPersonalRecord: (record: Omit<PersonalRecord, 'id'>) => void;
  updatePersonalRecord: (id: string, updated: Partial<PersonalRecord>) => void;

  workoutSessions: WorkoutSession[];
  addWorkoutSession: (session: Omit<WorkoutSession, 'id'>) => void;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Reset to initial demo state
  resetToDefaultData: () => void;
}

const GymDataContext = createContext<GymDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'fitnessedge_gym_settings',
  PLANS: 'fitnessedge_plans',
  MEMBERS: 'fitnessedge_members',
  TRAINERS: 'fitnessedge_trainers',
  TRIALS: 'fitnessedge_trials',
  CONSULTATIONS: 'fitnessedge_consultations',
  PRODUCTS: 'fitnessedge_products',
  CART: 'fitnessedge_cart',
  WISHLIST: 'fitnessedge_wishlist',
  ORDERS: 'fitnessedge_orders',
  PROFILE: 'fitnessedge_profile',
  PROGRESS: 'fitnessedge_progress',
  RECORDS: 'fitnessedge_records',
  WORKOUTS: 'fitnessedge_workouts',
  ROLE: 'fitnessedge_role',
};

// Helper to compute remaining days & status
function computeExpiryDetails(expiryDateStr: string) {
  const target = new Date(expiryDateStr).getTime();
  const now = new Date().getTime();
  const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  let status: 'Active' | 'Expiring Soon' | 'Expired' = 'Active';
  if (diffDays <= 0) {
    status = 'Expired';
  } else if (diffDays <= 7) {
    status = 'Expiring Soon';
  }
  return { daysRemaining: diffDays, status };
}

export function GymDataProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>('guest');
  const [settings, setSettings] = useState<GymSettings>(INITIAL_GYM_SETTINGS);
  const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [trialBookings, setTrialBookings] = useState<TrialBooking[]>(INITIAL_TRIAL_BOOKINGS);
  const [consultationBookings, setConsultationBookings] = useState<ConsultationBooking[]>(INITIAL_CONSULTATION_BOOKINGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-5']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [profile, setProfile] = useState<MemberProfile>(INITIAL_MEMBER_PROFILE);
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>(INITIAL_PROGRESS_RECORDS);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(INITIAL_PERSONAL_RECORDS);
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>(INITIAL_WORKOUT_SESSIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
        if (storedRole) setCurrentRole(storedRole as Role);

        const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (storedSettings) setSettings(JSON.parse(storedSettings));

        const storedPlans = localStorage.getItem(STORAGE_KEYS.PLANS);
        if (storedPlans) setPlans(JSON.parse(storedPlans));

        const storedMembers = localStorage.getItem(STORAGE_KEYS.MEMBERS);
        if (storedMembers) {
          const parsed = JSON.parse(storedMembers);
          // Recalculate live days remaining
          const refreshed = parsed.map((m: MemberRecord) => {
            const { daysRemaining, status } = computeExpiryDetails(m.expiryDate);
            return { ...m, daysRemaining, membershipStatus: status };
          });
          setMembers(refreshed);
        }

        const storedTrainers = localStorage.getItem(STORAGE_KEYS.TRAINERS);
        if (storedTrainers) setTrainers(JSON.parse(storedTrainers));

        const storedTrials = localStorage.getItem(STORAGE_KEYS.TRIALS);
        if (storedTrials) setTrialBookings(JSON.parse(storedTrials));

        const storedConsultations = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
        if (storedConsultations) setConsultationBookings(JSON.parse(storedConsultations));

        const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (storedProducts) setProducts(JSON.parse(storedProducts));

        const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (storedCart) setCart(JSON.parse(storedCart));

        const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

        const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        if (storedOrders) setOrders(JSON.parse(storedOrders));

        const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
        if (storedProfile) {
          const parsedProf = JSON.parse(storedProfile);
          const { daysRemaining, status } = computeExpiryDetails(parsedProf.expiryDate);
          setProfile({ ...parsedProf, daysRemaining, membershipStatus: status });
        }

        const storedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (storedProgress) setProgressRecords(JSON.parse(storedProgress));

        const storedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS);
        if (storedRecords) setPersonalRecords(JSON.parse(storedRecords));

        const storedWorkouts = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
        if (storedWorkouts) setWorkoutSessions(JSON.parse(storedWorkouts));
      }
    } catch (e) {
      console.warn('Error hydrating from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) { console.error(e); }
  }, [settings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
    } catch (e) { console.error(e); }
  }, [currentRole, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
    } catch (e) { console.error(e); }
  }, [plans, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch (e) { console.error(e); }
  }, [members, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(trainers));
    } catch (e) { console.error(e); }
  }, [trainers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TRIALS, JSON.stringify(trialBookings));
    } catch (e) { console.error(e); }
  }, [trialBookings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(consultationBookings));
    } catch (e) { console.error(e); }
  }, [consultationBookings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) { console.error(e); }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) { console.error(e); }
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) { console.error(e); }
  }, [profile, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressRecords));
    } catch (e) { console.error(e); }
  }, [progressRecords, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(personalRecords));
    } catch (e) { console.error(e); }
  }, [personalRecords, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workoutSessions));
    } catch (e) { console.error(e); }
  }, [workoutSessions, isLoaded]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Gym Settings
  const updateSettings = (newSettings: Partial<GymSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Fitness Edge club details updated.');
  };

  // Members Management & Expiry System
  const expiringMembersCount = members.filter(
    (m) => m.membershipStatus === 'Expiring Soon' || m.membershipStatus === 'Expired'
  ).length;

  const addMember = (data: Omit<MemberRecord, 'id' | 'daysRemaining'>) => {
    const id = `FE-${Math.floor(100 + Math.random() * 900)}`;
    const { daysRemaining, status } = computeExpiryDetails(data.expiryDate);
    const newMember: MemberRecord = {
      ...data,
      id,
      daysRemaining,
      membershipStatus: status,
      totalVisits: 0,
    };
    setMembers((prev) => [newMember, ...prev]);
    showToast(`Member ${data.name} enrolled with ID #${id}.`, 'success');
  };

  const updateMember = (id: string, updated: Partial<MemberRecord>) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const merged = { ...m, ...updated };
          if (updated.expiryDate) {
            const { daysRemaining, status } = computeExpiryDetails(updated.expiryDate);
            merged.daysRemaining = daysRemaining;
            merged.membershipStatus = status;
          }
          return merged;
        }
        return m;
      })
    );
    showToast('Member details updated.');
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast('Member removed from directory.', 'info');
  };

  const renewMember = (id: string, durationMonths = 12) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const currentExp = new Date(m.expiryDate);
          const baseDate = currentExp.getTime() < Date.now() ? new Date() : currentExp;
          baseDate.setMonth(baseDate.getMonth() + durationMonths);
          const newExpStr = baseDate.toISOString().split('T')[0];
          const { daysRemaining, status } = computeExpiryDetails(newExpStr);

          // If renewed member is current active profile, also sync profile!
          if (m.id === profile.id) {
            setProfile((p) => ({
              ...p,
              expiryDate: newExpStr,
              daysRemaining,
              membershipStatus: status,
            }));
          }

          return {
            ...m,
            expiryDate: newExpStr,
            daysRemaining,
            membershipStatus: status,
            reminderSent: false,
          };
        }
        return m;
      })
    );
    showToast(`Membership renewed for +${durationMonths} months!`, 'success');
  };

  const sendExpiryReminder = (id: string, channel: 'whatsapp' | 'email' = 'whatsapp') => {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              reminderSent: true,
              reminderSentDate: new Date().toISOString().split('T')[0],
            }
          : m
      )
    );

    const message =
      member.daysRemaining <= 0
        ? `⚠️ Expiry notice dispatched to ${member.name} (${member.phone}) via ${channel.toUpperCase()}: "Your Fitness Edge membership has expired. Renew today to restore 24/7 club access."`
        : `⚡ Expiry reminder dispatched to ${member.name} (${member.phone}) via ${channel.toUpperCase()}: "Your Fitness Edge membership expires in ${member.daysRemaining} days on ${member.expiryDate}."`;

    showToast(message, 'info');
  };

  // Membership Plans
  const updatePlan = (id: string, updated: Partial<MembershipPlan>) => {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Membership plan pricing updated.');
  };

  const addPlan = (newPlan: Omit<MembershipPlan, 'id'>) => {
    const id = `plan-${Date.now()}`;
    setPlans((prev) => [...prev, { ...newPlan, id }]);
    showToast('New membership plan created.');
  };

  // Trainers
  const addTrainer = (trainer: Omit<Trainer, 'id'>) => {
    const id = `trainer-${Date.now()}`;
    setTrainers((prev) => [...prev, { ...trainer, id }]);
    showToast('Trainer added successfully.');
  };

  const updateTrainer = (id: string, updated: Partial<Trainer>) => {
    setTrainers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    showToast('Trainer profile updated.');
  };

  const deleteTrainer = (id: string) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
    showToast('Trainer removed.');
  };

  // Free Trial Bookings
  const addTrialBooking = (data: Omit<TrialBooking, 'id' | 'refNumber' | 'createdAt' | 'status'>): TrialBooking => {
    const refNumber = `TRL-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: TrialBooking = {
      ...data,
      id: `trial-${Date.now()}`,
      refNumber,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setTrialBookings((prev) => [newBooking, ...prev]);
    showToast(`Free trial pass booked! Ref: ${refNumber}`, 'success');
    return newBooking;
  };

  const updateTrialStatus = (id: string, status: BookingStatus) => {
    setTrialBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Trial booking status set to ${status}.`);
  };

  // Consultation Bookings
  const addConsultationBooking = (data: Omit<ConsultationBooking, 'id' | 'refNumber' | 'createdAt' | 'status'>): ConsultationBooking => {
    const refNumber = `CNS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: ConsultationBooking = {
      ...data,
      id: `cons-${Date.now()}`,
      refNumber,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    setConsultationBookings((prev) => [newBooking, ...prev]);
    showToast(`Trainer consultation scheduled! Ref: ${refNumber}`, 'success');
    return newBooking;
  };

  const updateConsultationStatus = (id: string, status: BookingStatus) => {
    setConsultationBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    showToast(`Consultation status set to ${status}.`);
  };

  // Products
  const addProduct = (product: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    setProducts((prev) => [
      {
        ...product,
        id,
      },
      ...prev,
    ]);
    showToast('Product added to catalog.');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed.');
  };

  // Cart
  const addToCart = (product: Product, quantity = 1, flavor?: string, size?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedFlavor === flavor &&
          item.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedFlavor: flavor, selectedSize: size }];
    });
    showToast(`Added "${product.name}" to cart.`);
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const unitPrice = item.product.discountPrice ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    email: string;
    mobile: string;
    address: { street: string; city: string; state: string; postalCode: string };
    paymentMethod: string;
  }): Order => {
    const orderNumber = `FE-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      items: [...cart],
      subtotal: cartTotal,
      shipping: cartTotal > 75 ? 0 : 9.99,
      total: cartTotal + (cartTotal > 75 ? 0 : 9.99),
      customerName: orderData.customerName,
      email: orderData.email,
      mobile: orderData.mobile,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'Demo Verified (Pre-paid)',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = cart.find((ci) => ci.product.id === p.id);
        if (cartItem) {
          const newStock = Math.max(0, p.stockCount - cartItem.quantity);
          return { ...p, stockCount: newStock, inStock: newStock > 0 };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o)));
    showToast(`Order #${id} marked as ${status}.`);
  };

  // Member Fitness Tracking
  const updateProfile = (updated: Partial<MemberProfile>) => {
    setProfile((prev) => {
      const merged = { ...prev, ...updated };
      if (updated.expiryDate) {
        const { daysRemaining, status } = computeExpiryDetails(updated.expiryDate);
        merged.daysRemaining = daysRemaining;
        merged.membershipStatus = status;
      }
      return merged;
    });
    showToast('Member profile updated.');
  };

  const addProgressRecord = (record: Omit<ProgressRecord, 'id'>) => {
    const newRecord: ProgressRecord = {
      ...record,
      id: `pr-${Date.now()}`,
    };
    setProgressRecords((prev) => [...prev, newRecord].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setProfile((prev) => ({ ...prev, currentWeight: record.weight }));
    showToast('New progress entry recorded.');
  };

  const updateProgressRecord = (id: string, updated: Partial<ProgressRecord>) => {
    setProgressRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
    showToast('Progress record updated.');
  };

  const deleteProgressRecord = (id: string) => {
    setProgressRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Progress record removed.', 'info');
  };

  const addPersonalRecord = (record: Omit<PersonalRecord, 'id'>) => {
    const newRecord: PersonalRecord = {
      ...record,
      id: `rec-${Date.now()}`,
    };
    setPersonalRecords((prev) => [newRecord, ...prev]);
    showToast(`New Personal Record added: ${record.exercise} (${record.recordWeightKg}kg)!`);
  };

  const updatePersonalRecord = (id: string, updated: Partial<PersonalRecord>) => {
    setPersonalRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
    );
    showToast('Personal record updated.');
  };

  const addWorkoutSession = (session: Omit<WorkoutSession, 'id'>) => {
    const newSession: WorkoutSession = {
      ...session,
      id: `w-${Date.now()}`,
    };
    setWorkoutSessions((prev) => [newSession, ...prev]);
    showToast(`Workout session logged: ${session.title}!`);
  };

  // Reset demo
  const resetToDefaultData = () => {
    localStorage.clear();
    setSettings(INITIAL_GYM_SETTINGS);
    setPlans(INITIAL_MEMBERSHIP_PLANS);
    setMembers(INITIAL_MEMBERS);
    setTrainers(INITIAL_TRAINERS);
    setTrialBookings(INITIAL_TRIAL_BOOKINGS);
    setConsultationBookings(INITIAL_CONSULTATION_BOOKINGS);
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setWishlist(['prod-1', 'prod-5']);
    setOrders(INITIAL_ORDERS);
    setProfile(INITIAL_MEMBER_PROFILE);
    setProgressRecords(INITIAL_PROGRESS_RECORDS);
    setPersonalRecords(INITIAL_PERSONAL_RECORDS);
    setWorkoutSessions(INITIAL_WORKOUT_SESSIONS);
    setCurrentRole('guest');
    showToast('Fitness Edge demo data restored to defaults.', 'info');
  };

  return (
    <GymDataContext.Provider
      value={{
        currentRole,
        setCurrentRole,
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
        addTrialBooking,
        updateTrialStatus,
        consultationBookings,
        addConsultationBooking,
        updateConsultationStatus,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        profile,
        updateProfile,
        progressRecords,
        addProgressRecord,
        updateProgressRecord,
        deleteProgressRecord,
        personalRecords,
        addPersonalRecord,
        updatePersonalRecord,
        workoutSessions,
        addWorkoutSession,
        toasts,
        showToast,
        dismissToast,
        resetToDefaultData,
      }}
    >
      {children}
    </GymDataContext.Provider>
  );
}

export function useGymData() {
  const context = useContext(GymDataContext);
  if (!context) {
    throw new Error('useGymData must be used within a GymDataProvider');
  }
  return context;
}
