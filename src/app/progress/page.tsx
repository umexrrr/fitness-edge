'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Calendar,
  Dumbbell,
  Scale,
  Plus,
  Flame,
  Target,
  Sparkles,
  CheckCircle2,
  Trash2,
  Activity,
  Zap,
  Edit2,
  ShieldCheck,
} from 'lucide-react';
import { useGymData } from '@/context/GymDataContext';
import { ProgressRecord, PersonalRecord, WorkoutSession } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function ProgressTrackerPage() {
  const {
    profile,
    updateProfile,
    progressRecords,
    addProgressRecord,
    deleteProgressRecord,
    personalRecords,
    addPersonalRecord,
    workoutSessions,
    addWorkoutSession,
    showToast,
  } = useGymData();

  // Modals state
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showPRModal, setShowPRModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  // New weight entry form state
  const [weightInput, setWeightInput] = useState('78.8');
  const [bodyFatInput, setBodyFatInput] = useState('12.2');
  const [chestInput, setChestInput] = useState('109');
  const [waistInput, setWaistInput] = useState('79.5');
  const [armsInput, setArmsInput] = useState('40.5');
  const [notesInput, setNotesInput] = useState('');
  const [recordDateInput, setRecordDateInput] = useState(
    new Date().toISOString().split('T')[0]
  );

  // New PR form state
  const [prExercise, setPrExercise] = useState('Barbell Back Squat');
  const [prWeight, setPrWeight] = useState('190');
  const [prReps, setPrReps] = useState('3');
  const [prCategory, setPrCategory] = useState<'Legs' | 'Chest' | 'Back' | 'Shoulders' | 'Arms'>('Legs');

  // New Workout form state
  const [workoutTitle, setWorkoutTitle] = useState('Heavy Deadlift & Lat Hypertrophy');
  const [workoutCategory, setWorkoutCategory] = useState<'Strength' | 'Hypertrophy' | 'Cardio & HIIT' | 'Mobility'>('Strength');
  const [workoutDuration, setWorkoutDuration] = useState('70');
  const [workoutCalories, setWorkoutCalories] = useState('590');
  const [workoutIntensity, setWorkoutIntensity] = useState<'Medium' | 'High' | 'Elite'>('High');

  // Calculate goal progress
  const totalGoalDelta = profile.startingWeight - profile.targetWeight;
  const currentDelta = profile.startingWeight - profile.currentWeight;
  const goalProgressPct = Math.min(
    100,
    Math.max(0, Math.round((currentDelta / (totalGoalDelta || 1)) * 100))
  );

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProgressRecord({
      date: recordDateInput,
      weight: parseFloat(weightInput),
      bodyFatPercentage: bodyFatInput ? parseFloat(bodyFatInput) : undefined,
      chestCm: chestInput ? parseFloat(chestInput) : undefined,
      waistCm: waistInput ? parseFloat(waistInput) : undefined,
      armsCm: armsInput ? parseFloat(armsInput) : undefined,
      notes: notesInput.trim() || undefined,
    });
    setShowWeightModal(false);
  };

  const handlePRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPersonalRecord({
      exercise: prExercise,
      recordWeightKg: parseFloat(prWeight),
      reps: parseInt(prReps, 10),
      date: new Date().toISOString().split('T')[0],
      category: prCategory,
      improvementPct: 8,
    });
    setShowPRModal(false);
  };

  const handleWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkoutSession({
      date: new Date().toISOString().split('T')[0],
      title: workoutTitle,
      category: workoutCategory,
      durationMinutes: parseInt(workoutDuration, 10),
      caloriesBurned: parseInt(workoutCalories, 10),
      intensity: workoutIntensity,
      exercisesCount: 6,
    });
    setShowWorkoutModal(false);
  };

  // Prepare chart data for weight trajectory
  const weightChartData = progressRecords.map((r) => ({
    date: r.date.slice(5), // "06-01"
    fullDate: r.date,
    weight: r.weight,
    bodyFat: r.bodyFatPercentage ?? 14,
  }));

  // Prepare chart data for weekly activity overview
  const workoutChartData = workoutSessions.slice(0, 7).reverse().map((w) => ({
    day: w.date.slice(5),
    calories: w.caloriesBurned,
    duration: w.durationMinutes,
    title: w.title,
  }));

  return (
    <div className="py-12 sm:py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Member Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand shadow-glow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                {profile.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand text-black">
                {profile.membershipStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Goal: <strong className="text-white">{profile.fitnessGoal}</strong> • Member ID: #{profile.id}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowWeightModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Biometrics</span>
          </button>
          <button
            onClick={() => setShowPRModal(true)}
            className="px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white hover:border-brand/40 font-semibold text-xs flex items-center gap-1.5 transition-all"
          >
            <Award className="w-4 h-4 text-brand" />
            <span>Add Milestone PR</span>
          </button>
          <button
            onClick={() => setShowWorkoutModal(true)}
            className="px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-white hover:border-brand/40 font-semibold text-xs flex items-center gap-1.5 transition-all"
          >
            <Dumbbell className="w-4 h-4 text-brand" />
            <span>Log Workout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Starting Weight</span>
            <Scale className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-display">
            {profile.startingWeight} <span className="text-sm font-normal text-zinc-400">kg</span>
          </p>
          <p className="text-[11px] text-zinc-400">Baseline recorded at enrollment</p>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-brand/30 space-y-2 shadow-glow-sm">
          <div className="flex justify-between items-center text-xs text-brand font-semibold">
            <span>Current Weight</span>
            <TrendingUp className="w-4 h-4 text-brand" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-brand font-display">
            {profile.currentWeight} <span className="text-sm font-normal text-zinc-400">kg</span>
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">
            -{(profile.startingWeight - profile.currentWeight).toFixed(1)} kg net lost ({goalProgressPct}% achieved)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Target Weight</span>
            <Target className="w-4 h-4 text-brand" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-display">
            {profile.targetWeight} <span className="text-sm font-normal text-zinc-400">kg</span>
          </p>
          <p className="text-[11px] text-zinc-400">
            {(profile.currentWeight - profile.targetWeight).toFixed(1)} kg remaining to target
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2 shadow-card">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Workout Consistency</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
            {profile.workoutConsistencyPct}%
          </p>
          <p className="text-[11px] text-zinc-400">Rank: Elite 5% Club Cohort</p>
        </div>
      </div>

      {/* Goal Completion Progress Bar */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-3 shadow-card">
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-bold">
          <span className="text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand" />
            Physique Recomposition Target: {profile.targetWeight}kg
          </span>
          <span className="text-brand font-mono text-sm sm:text-base">
            {goalProgressPct}% Completed
          </span>
        </div>
        <div className="w-full bg-dark-950 rounded-full h-3 border border-white/5 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-emerald-500 via-brand to-lime-300 h-full rounded-full transition-all duration-700 shadow-glow"
            style={{ width: `${goalProgressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>Start: {profile.startingWeight} kg</span>
          <span>Current: {profile.currentWeight} kg</span>
          <span>Target: {profile.targetWeight} kg</span>
        </div>
      </div>

      {/* Visual Charts: Weight Trajectory & Weekly Workout Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weight Trajectory Chart */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Bodyweight & Fat % Progression
              </h3>
              <p className="text-xs text-zinc-400">Trajectory recorded from monthly check-ins</p>
            </div>
            <span className="text-xs bg-dark-950 border border-brand/30 text-brand px-2.5 py-1 rounded-lg font-mono">
              Last 6 Months
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#272730" vertical={false} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" domain={['dataMin - 2', 'dataMax + 2']} fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111115',
                    borderColor: 'rgba(204, 255, 0, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any, name: string) => [
                    `${value} ${name === 'weight' ? 'kg' : '%'}`,
                    name === 'weight' ? 'Weight' : 'Body Fat',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#ccff00"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#ccff00', stroke: '#09090b', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#ccff00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Workout Energy Chart */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-dark-900 border border-white/10 space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Workout Caloric Expenditure
              </h3>
              <p className="text-xs text-zinc-400">Calories burned per recorded session</p>
            </div>
            <span className="text-xs bg-dark-950 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-lg">
              Recent Workouts
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workoutChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#272730" vertical={false} />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111115',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${value} kcal`, 'Calories']}
                />
                <Bar dataKey="calories" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Personal Records & Strength Milestones */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Strength Personal Records (PRs)
            </h2>
            <p className="text-xs text-zinc-400">
              Verified compound lifting milestones achieved on Kinetix platforms
            </p>
          </div>
          <button
            onClick={() => setShowPRModal(true)}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add PR</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {personalRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-dark-900 border border-white/10 hover:border-brand/40 transition-all space-y-3 shadow-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand px-2 py-0.5 rounded bg-brand/10">
                  {rec.category}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  +{rec.improvementPct}%
                </span>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-300 line-clamp-1">{rec.exercise}</h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-white font-display">
                    {rec.recordWeightKg}
                  </span>
                  <span className="text-xs text-zinc-400 font-bold">kg</span>
                  <span className="text-[11px] text-zinc-400 ml-1">× {rec.reps} reps</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 pt-2 border-t border-white/5">
                Set on {formatDate(rec.date)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Biometric History Table & Measurement Logs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Biometric Check-In History
          </h2>
          <span className="text-xs text-zinc-400">
            {progressRecords.length} Persistent Check-in Logs
          </span>
        </div>

        <div className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 bg-dark-950/60">
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold text-white">Weight (kg)</th>
                  <th className="py-3 px-4 font-semibold text-white">Body Fat %</th>
                  <th className="py-3 px-4 font-semibold">Chest (cm)</th>
                  <th className="py-3 px-4 font-semibold">Waist (cm)</th>
                  <th className="py-3 px-4 font-semibold">Arms (cm)</th>
                  <th className="py-3 px-4 font-semibold">Coach Notes</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {progressRecords.slice().reverse().map((rec) => (
                  <tr key={rec.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{formatDate(rec.date)}</td>
                    <td className="py-3.5 px-4 font-bold text-brand">{rec.weight} kg</td>
                    <td className="py-3.5 px-4">{rec.bodyFatPercentage ? `${rec.bodyFatPercentage}%` : '—'}</td>
                    <td className="py-3.5 px-4">{rec.chestCm ? `${rec.chestCm} cm` : '—'}</td>
                    <td className="py-3.5 px-4">{rec.waistCm ? `${rec.waistCm} cm` : '—'}</td>
                    <td className="py-3.5 px-4">{rec.armsCm ? `${rec.armsCm} cm` : '—'}</td>
                    <td className="py-3.5 px-4 text-xs text-zinc-400 max-w-xs truncate">{rec.notes || 'Routine check-in'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => deleteProgressRecord(rec.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal: Add Weight / Biometrics */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowWeightModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">Record New Biometrics</h3>
              <p className="text-xs text-zinc-400">Update current weight and tape measurements.</p>
            </div>

            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={recordDateInput}
                    onChange={(e) => setRecordDateInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Current Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Body Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 12.5"
                    value={bodyFatInput}
                    onChange={(e) => setBodyFatInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={waistInput}
                    onChange={(e) => setWaistInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Training Notes / Observations</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Hit PR on squat, felt energized, recovery optimal..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all"
              >
                Save Biometric Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add PR */}
      {showPRModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowPRModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">Add Personal Milestone PR</h3>
              <p className="text-xs text-zinc-400">Record a new 1RM or rep-max accomplishment.</p>
            </div>

            <form onSubmit={handlePRSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Exercise Name *</label>
                <input
                  type="text"
                  required
                  value={prExercise}
                  onChange={(e) => setPrExercise(e.target.value)}
                  placeholder="e.g. Incline Barbell Press"
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={prWeight}
                    onChange={(e) => setPrWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Reps *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={prReps}
                    onChange={(e) => setPrReps(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                <select
                  value={prCategory}
                  onChange={(e) => setPrCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                >
                  <option value="Chest">Chest</option>
                  <option value="Legs">Legs</option>
                  <option value="Back">Back</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Arms">Arms</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all"
              >
                Log Strength PR
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Log Workout Session */}
      {showWorkoutModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-950 border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setShowWorkoutModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-display">Log Workout Session</h3>
              <p className="text-xs text-zinc-400">Record session duration, intensity, and calories.</p>
            </div>

            <form onSubmit={handleWorkoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Session Title *</label>
                <input
                  type="text"
                  required
                  value={workoutTitle}
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Duration (mins) *</label>
                  <input
                    type="number"
                    required
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Calories Burned (kcal)</label>
                  <input
                    type="number"
                    value={workoutCalories}
                    onChange={(e) => setWorkoutCalories(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={workoutCategory}
                    onChange={(e) => setWorkoutCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Hypertrophy">Hypertrophy</option>
                    <option value="Cardio & HIIT">Cardio & HIIT</option>
                    <option value="Mobility">Mobility</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Intensity</label>
                  <select
                    value={workoutIntensity}
                    onChange={(e) => setWorkoutIntensity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand text-black font-bold text-xs uppercase tracking-wider shadow-glow hover:bg-brand-hover transition-all"
              >
                Log Workout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
