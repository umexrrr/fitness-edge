export type Role = 'member' | 'admin' | 'trainer' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  memberId?: string;
}

export type PricingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  duration: string;
  facilities: string[];
  gymAccessTimings: string;
  personalTraining: string;
  groupClasses: string;
  benefits: string[];
  exclusions: string[];
  isPopular?: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface TrialBooking {
  id: string;
  refNumber: string;
  fullName: string;
  mobile: string;
  email: string;
  workoutType: string;
  preferredTrainer?: string;
  date: string;
  timeSlot: string;
  additionalNotes?: string;
  status: BookingStatus;
  createdAt: string;
}

export type ConsultationType = 
  | 'Weight Management Guidance'
  | 'Strength Training Consultation'
  | 'Personal Training Consultation'
  | 'General Fitness Assessment'
  | 'Workout Planning';

export interface ConsultationBooking {
  id: string;
  refNumber: string;
  clientName: string;
  mobile: string;
  email: string;
  trainerId: string;
  trainerName: string;
  consultationType: ConsultationType;
  date: string;
  timeSlot: string;
  fitnessGoals: string;
  message?: string;
  fee: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  qualifications: string[];
  bio: string;
  image: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availableDays: string[];
  availableSlots: string[];
  activeClientsCount: number;
}

export type ProductCategory =
  | 'whey-protein'
  | 'creatine'
  | 'mass-gainers'
  | 'protein-bars'
  | 'accessories'
  | 'equipment'
  | 'bottles'
  | 'apparel';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  features: string[];
  flavors?: string[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  email: string;
  mobile: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  paymentStatus: 'Demo Verified (Pre-paid)';
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface ProgressRecord {
  id: string;
  date: string;
  weight: number; // in kg
  bodyFatPercentage?: number;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  title: string;
  category: 'Strength' | 'Hypertrophy' | 'Cardio & HIIT' | 'Mobility';
  durationMinutes: number;
  caloriesBurned: number;
  intensity: 'Medium' | 'High' | 'Elite';
  exercisesCount: number;
}

export interface PersonalRecord {
  id: string;
  exercise: string;
  recordWeightKg: number;
  reps: number;
  date: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms';
  improvementPct: number;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  membershipStatus: 'Active' | 'Expiring Soon' | 'Expired';
  joinDate: string;
  expiryDate: string;
  daysRemaining: number;
  assignedTrainer?: string;
  totalVisits: number;
  reminderSent?: boolean;
  reminderSentDate?: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  planId: string;
  planName: string;
  membershipStatus: 'Active' | 'Expiring Soon' | 'Expired';
  joinDate: string;
  expiryDate: string;
  daysRemaining: number;
  startingWeight: number;
  currentWeight: number;
  targetWeight: number;
  fitnessGoal: string;
  heightCm: number;
  workoutConsistencyPct: number;
}

export interface GymSettings {
  name: string;
  tagline: string;
  developerCredit: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  googleMapsEmbed: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  instagramUrl: string;
  facebookUrl: string;
  announcement: string;
}
