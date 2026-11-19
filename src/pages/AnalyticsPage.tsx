import React from 'react';
import { useApp } from '../context/AppContext';

export const AnalyticsPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const skillMetrics = [
    { name: 'Data Structures & Algorithms', score: 85, color: 'bg-primary' },
    { name: 'System Architecture & Scale', score: 76, color: 'bg-secondary' },
    { name: 'Core Computer Science', score: 92, color: 'bg-success' },
    { name: 'Verbal Articulation & STAR', score: 88, color: 'bg-info' },
    { name: 'Code Quality & Clean Architecture', score: 84, color: 'bg-accent' },
  ];

  return (
    <div className="px-8 py-8 flex-1 space-y-6">
      <div>
        <h1 className="font-headline text-display-lg-mobile lg:text-[28px] font-bold tracking-tight text-white mb-1">
          Performance Analytics
        </h1>
        <p className="font-body text-[14px] text-white/60">
          In-depth diagnostics on your interview readiness across core competencies
        </p>
      </div>

      {/* 4 Stat Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 shadow-xl">
          <div className="text-[12px] text-white/50 mb-1">Total Practice Time</div>
          <div className="font-headline text-[24px] font-bold text-white">8.5 hrs</div>
          <div className="text-[11px] text-success mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+2.1 hrs this week</span>
          </div>
        </div>

        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 shadow-xl">
          <div className="text-[12px] text-white/50 mb-1">Highest Score</div>
          <div className="font-headline text-[24px] font-bold text-success">92%</div>
          <div className="text-[11px] text-white/40 mt-1">Behavioral Leadership</div>
        </div>

        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 shadow-xl">
          <div className="text-[12px] text-white/50 mb-1">Average Pacing</div>
          <div className="font-headline text-[24px] font-bold text-secondary">138 wpm</div>
          <div className="text-[11px] text-success mt-1">Optimal clarity range</div>
        </div>

        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-5 shadow-xl">
          <div className="text-[12px] text-white/50 mb-1">Readiness Tier</div>
          <div className="font-headline text-[24px] font-bold text-primary">Senior SDE</div>
          <div className="text-[11px] text-white/40 mt-1">Top 15% percentile</div>
        </div>
      </div>

      {/* 2-Column Split: Skill Breakdown vs Weekly Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Skill Competency Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-5">
          <div className="font-headline text-[16px] font-bold text-white flex items-center justify-between">
            <span>Competency Radar</span>
            <span className="text-[12px] text-white/50 font-normal">Based on 12 mock sessions</span>
          </div>

          <div className="space-y-4 font-body text-[13px]">
            {skillMetrics.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-white/90 mb-1.5">
                  <span className="font-medium">{skill.name}</span>
                  <span className="font-headline font-bold text-white">{skill.score}%</span>
                </div>
                <div className="h-2 bg-obsidian-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-700`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend & Recommendation (5 cols) */}
        <div className="lg:col-span-5 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="font-headline text-[16px] font-bold text-white mb-2">
              Improvement Trajectory
            </div>
            <p className="font-body text-[13px] text-white/70 leading-relaxed mb-5">
              Your average score has progressed from 66% to 84% over the last 30 days. Consistent practice in Distributed Systems will help you clear L5 bar-raisers.
            </p>

            <div className="p-4 rounded-xl bg-obsidian-elevated border border-obsidian-border-sub space-y-2">
              <div className="flex items-center gap-2 text-primary font-headline text-[13px] font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Recommended Focus</span>
              </div>
              <p className="text-[12px] text-white/80">
                Practice 2 System Design interviews with caching &amp; database sharding questions.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-border">
            <button
              onClick={() => setCurrentPage('interview-setup')}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Start Focus Session →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
