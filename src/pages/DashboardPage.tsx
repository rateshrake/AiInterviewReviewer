import React from 'react';
import { useApp } from '../context/AppContext';

export const DashboardPage: React.FC = () => {
  const { setCurrentPage, recentActivities } = useApp();

  return (
    <div className="px-8 py-7 space-y-6 flex-1">
      {/* Hero Welcome Banner with Elephant Mascot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1922] via-[#17151C] to-[#121115] border border-obsidian-border p-8 flex items-center justify-between shadow-2xl">
        <div className="relative z-10 max-w-lg">
          <h1 className="font-headline text-display-lg-mobile lg:text-[34px] font-bold tracking-tight text-white mb-2">
            Welcome back, Harish!
          </h1>
          <p className="font-body text-[15px] text-white/70 mb-6">
            Sharpen your skills. Ace your next interview.
          </p>
          <button
            onClick={() => setCurrentPage('interview-setup')}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[14px] font-bold shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Start New Interview</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Mascot Artwork Container */}
        <div className="relative shrink-0 w-64 h-52 flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-primary/30 via-accent/15 to-transparent rounded-full blur-2xl pointer-events-none" />
          <img
            src="/images/cute_elephant_laptop.jpg"
            alt="AI Interview Elephant Mascot"
            className="relative z-10 w-48 h-48 object-cover rounded-2xl shadow-2xl ring-2 ring-primary/30"
          />
        </div>
      </div>

      {/* 3 Glanceable Metric Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Interviews Done */}
        <div 
          onClick={() => setCurrentPage('my-interviews')}
          className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 flex items-center gap-4 shadow-xl hover:border-primary/40 transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">play_circle</span>
          </div>
          <div>
            <div className="font-headline text-[26px] font-bold text-white leading-tight">12</div>
            <div className="font-body text-[13px] text-white/60">Interviews Done</div>
          </div>
        </div>

        {/* Metric 2: Avg Score */}
        <div 
          onClick={() => setCurrentPage('performance-analytics')}
          className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 flex items-center gap-4 shadow-xl hover:border-secondary/40 transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">emoji_events</span>
          </div>
          <div>
            <div className="font-headline text-[26px] font-bold text-white leading-tight">78%</div>
            <div className="font-body text-[13px] text-white/60">Avg Score</div>
          </div>
        </div>

        {/* Metric 3: Improvement */}
        <div 
          onClick={() => setCurrentPage('performance-analytics')}
          className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 flex items-center gap-4 shadow-xl hover:border-success/40 transition-colors cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-success/10 border border-success/25 flex items-center justify-center text-success shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">trending_up</span>
          </div>
          <div>
            <div className="font-headline text-[26px] font-bold text-white leading-tight">+12%</div>
            <div className="font-body text-[13px] text-white/60">Improvement</div>
          </div>
        </div>
      </div>

      {/* Bottom 2-Column Split: Recent Activity & Practice Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity List (8 cols) */}
        <div className="lg:col-span-8 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline text-[17px] font-bold text-white">Recent Activity</h3>
            <button
              onClick={() => setCurrentPage('my-interviews')}
              className="text-primary hover:text-accent font-headline text-[13px] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Activity Rows */}
          <div className="divide-y divide-obsidian-border font-body text-[13px]">
            {recentActivities.map((act) => (
              <div 
                key={act.id} 
                onClick={() => setCurrentPage('interview-report')}
                className="py-3.5 flex items-center justify-between hover:bg-white/5 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    act.scoreColor === 'secondary'
                      ? 'bg-secondary/10 border border-secondary/20 text-secondary'
                      : act.scoreColor === 'success'
                      ? 'bg-success/10 border border-success/20 text-success'
                      : 'bg-primary/10 border border-primary/20 text-primary'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">{act.icon}</span>
                  </div>
                  <div>
                    <div className="font-headline font-semibold text-white">{act.title}</div>
                    <div className="text-white/50 text-[11px]">{act.timeAgo}</div>
                  </div>
                </div>
                <span className={`font-headline font-bold text-[14px] ${
                  act.scoreColor === 'secondary'
                    ? 'text-secondary'
                    : act.scoreColor === 'success'
                    ? 'text-success'
                    : 'text-primary'
                }`}>
                  {act.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Goal Radial Card (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full min-h-[260px]">
          <h3 className="font-headline text-[17px] font-bold text-white mb-4">Your Practice Goal</h3>
          
          <div className="flex items-center gap-5 my-auto">
            {/* Radial Meter */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#222129" strokeWidth="10" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#goal-gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  fill="transparent"
                />
                <defs>
                  <linearGradient id="goal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5100" />
                    <stop offset="100%" stopColor="#FFA000" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline text-[22px] font-bold text-white">75%</span>
              </div>
            </div>

            {/* Goal Text */}
            <div className="space-y-1">
              <div className="font-headline text-[15px] font-bold text-white">Complete 5 more</div>
              <div className="font-body text-[13px] text-white/60">interviews this week</div>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-border text-[12px] text-white/50">
            3 of 8 completed • 4 days remaining
          </div>
        </div>
      </div>
    </div>
  );
};
