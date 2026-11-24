'use client';

import React from 'react';
import Link from 'next/link';
import { useGymData } from '@/context/GymDataContext';
import { RotateCcw, ShieldCheck, UserCheck, Eye, Sparkles } from 'lucide-react';
import { Role } from '@/types';

export default function DemoBar() {
  const { currentRole, setCurrentRole, resetToDefaultData, expiringMembersCount } = useGymData();

  return (
    <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border-b border-white/10 text-xs py-1.5 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
          <span className="font-semibold text-white tracking-wide uppercase text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            M&Co Studios Client Demo
          </span>
          <span className="hidden sm:inline text-zinc-400">|</span>
          <span className="hidden sm:inline text-zinc-400">
            Interactive Showcase for Premium Gym Operators
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Role switcher */}
          <div className="flex items-center bg-dark-950/80 rounded-md p-0.5 border border-white/10">
            <button
              onClick={() => setCurrentRole('guest')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                currentRole === 'guest'
                  ? 'bg-brand text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Browse website as a prospective member"
            >
              <Eye className="w-3 h-3" />
              Visitor View
            </button>
            <Link
              href="/dashboard"
              onClick={() => setCurrentRole('member')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                currentRole === 'member'
                  ? 'bg-brand text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Simulate Member Dashboard"
            >
              <UserCheck className="w-3 h-3" />
              Member Portal
            </Link>
            <Link
              href="/admin"
              onClick={() => setCurrentRole('admin')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                currentRole === 'admin'
                  ? 'bg-brand text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Access Management & Admin Dashboard"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Suite</span>
              {expiringMembersCount > 0 && (
                <span className="bg-amber-400 text-black text-[9px] font-extrabold px-1 rounded-full">
                  {expiringMembersCount} alert
                </span>
              )}
            </Link>
          </div>

          {/* Reset Demo button */}
          <button
            onClick={resetToDefaultData}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-brand transition-colors px-2 py-1"
            title="Reset all bookings, progress records, and store orders to initial demo state"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
