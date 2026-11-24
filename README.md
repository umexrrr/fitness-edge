# ⚡ FITNESS EDGE — Premium Gym & Fitness Management Platform

> **A high-octane, dark luxury fitness platform and membership management system.**  
> Crafted by **M&Co Studios** for client presentation and production deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umexrrr/fitness-edge)
![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📍 Gym Location & Contact
- **Facility:** Fitness Edge Indore
- **Address:** 708-A Sector, near kibs hospital, Sector A, Mahalaxmi Nagar, Indore, Madhya Pradesh 452010
- **Phone:** +91 98765 43210 / +91 731 298 7654
- **Email:** contact@fitnessedge.in
- **Operating Hours:** Mon – Sat: 5:30 AM – 10:30 PM | Sun: 7:00 AM – 1:00 PM

---

## 🚀 Key Features

### 1. Public Experience & Brand Showcase
- **Hero & Landing Page:** High-energy dark luxury aesthetic (`#0A0A0A` carbon with `#10B981` / neon electric lime accents), video/photo hero, membership highlights, facilities showcase, trainer roster, interactive Google Maps location, and Instagram feed.
- **Membership Plans & Pricing:** Interactive Monthly / Quarterly / Yearly toggle, plan comparison table, benefits matrix, and instant registration checkout.
- **Free Trial Booking System:** Live date picker, time slot selector with real-time capacity and duplicate prevention, instant confirmation with unique reference code (`FE-TRL-XXXX`).
- **Trainer Consultation Booking:** Certified master trainers roster, specialization filters, consultation types, calendar booking, and automatic slot reserving.
- **Fitness Store / E-Commerce:** Product catalog across 8 categories (Whey Protein, Creatine, Mass Gainers, Gym Equipment, Apparel, etc.), category filters, search, responsive slide-out cart drawer, and interactive demo checkout.
- **About & Facilities:** Gym philosophy, world-class equipment gallery, training methodology, and trainer credentials.
- **Contact & Map:** Interactive contact form, WhatsApp direct messaging button, Google Maps iframe pointing to Mahalaxmi Nagar Indore.

### 2. Member Dashboard
- **Active Membership Card:** Visual countdown of days remaining until expiry, status badge (Active, Expiring Soon, Expired), and 1-click renewal.
- **Upcoming Schedule:** Free trial bookings and trainer consultation appointments with status.
- **Interactive Progress Tracker:** Recharts weight progression line chart, weekly workout volume bar chart, starting/current/target weight stats, and entry modal.
- **Order History:** E-commerce store purchases, tracking status, and itemized summaries.
- **Expiry Notification Alert:** Prominent banner alert warning members when their membership is expiring within 7 days.

### 3. Comprehensive Admin Dashboard
- **Executive Metrics:** Total members, active memberships, expiring memberships, revenue stats, today's appointments, and pending orders.
- **Members Management with Expiry Alerts:**
  - Search and filter all members by status, name, or plan.
  - Days remaining countdown for every member.
  - **Automated Expiring Soon Reminders & Alert Banner** highlighting members needing renewal.
  - "Send Reminder" button to alert members directly.
  - Add/Edit member modal, toggle status, and extend memberships.
- **Booking Management:** Trial sessions and trainer consultations with Approve, Complete, and Cancel controls.
- **Store & Inventory Manager:** Add/edit products, stock status toggles, pricing controls, and order dispatch workflows.
- **Trainer Management:** Profile editor, specializations, hourly consultation rates, and active/inactive status.
- **Membership Plans Manager:** Create and modify membership pricing, perks, and durations dynamically.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom glassmorphism and animations
- **State & Database Engine:** `GymDataContext` — Reactive persistent store with LocalStorage synchronization, zero-latency state updates, and pre-seeded realistic data.
- **Charts:** Recharts (ResponsiveContainer, LineChart, BarChart, Tooltip)
- **Icons:** Lucide React
- **Notifications:** Custom animated Toast notification engine

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/umexrrr/fitness-edge.git
cd fitness-edge
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploy to Vercel (1-Click)

Click the button below to instantly deploy your own live copy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umexrrr/fitness-edge)

Or import directly via the [Vercel Dashboard](https://vercel.com/new):
1. Sign in to Vercel.
2. Click **Add New Project** -> **Import Git Repository**.
3. Select `umexrrr/fitness-edge`.
4. Click **Deploy**. Your live URL will be ready in ~45 seconds!

---

## 🎨 Credits & Ownership
- **Brand:** Fitness Edge Indore
- **Agency:** M&Co Studios
- **Author:** Umer Khan
