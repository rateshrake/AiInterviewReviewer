import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HistoryPage: React.FC = () => {
  const { recentActivities, setCurrentPage } = useApp();
  const [filterType, setFilterType] = useState<string>('All');

  const historyItems = [
    ...recentActivities,
    {
      id: 'act-4',
      title: 'System Design – High-Throughput Chat App',
      timeAgo: '4 days ago',
      score: 81,
      scoreColor: 'secondary' as const,
      icon: 'lan',
      type: 'System Design'
    },
    {
      id: 'act-5',
      title: 'Behavioral – Leadership & Conflict Resolution',
      timeAgo: '1 week ago',
      score: 92,
      scoreColor: 'success' as const,
      icon: 'psychology',
      type: 'Behavioral'
    },
    {
      id: 'act-6',
      title: 'DSA Practice – Graphs & Dynamic Programming',
      timeAgo: '2 weeks ago',
      score: 68,
      scoreColor: 'primary' as const,
      icon: 'polyline',
      type: 'Coding'
    }
  ];

  const filtered = filterType === 'All' 
    ? historyItems 
    : historyItems.filter(h => h.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="px-8 py-8 flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-display-lg-mobile lg:text-[28px] font-bold tracking-tight text-white mb-1">
            Interview History
          </h1>
          <p className="font-body text-[14px] text-white/60">
            Review past mock interview sessions, recordings, and score progression
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('interview-setup')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/20 flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Session</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Technical', 'HR', 'Behavioral', 'Coding', 'System Design'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-full font-headline text-[12px] transition-all ${
              filterType === type
                ? 'bg-primary text-on-primary font-bold shadow'
                : 'bg-obsidian-card border border-obsidian-border text-white/60 hover:text-white font-medium'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* History Table Card */}
      <div className="bg-obsidian-card border border-obsidian-border rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-obsidian-border">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentPage('interview-report')}
              className="p-5 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  item.scoreColor === 'success'
                    ? 'bg-success/10 border border-success/20 text-success'
                    : item.scoreColor === 'secondary'
                    ? 'bg-secondary/10 border border-secondary/20 text-secondary'
                    : 'bg-primary/10 border border-primary/20 text-primary'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <div className="font-headline text-[15px] font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-3 text-white/50 text-[12px] mt-0.5">
                    <span>{item.timeAgo}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-obsidian-elevated border border-obsidian-border text-[10px] font-headline font-bold text-white/70">
                      {item.type}
                    </span>
                    <span>•</span>
                    <span>Duration: 24 mins</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className={`font-headline text-[20px] font-bold ${
                    item.scoreColor === 'success'
                      ? 'text-success'
                      : item.scoreColor === 'secondary'
                      ? 'text-secondary'
                      : 'text-primary'
                  }`}>
                    {item.score}%
                  </div>
                  <div className="text-[11px] text-white/40">Overall Score</div>
                </div>

                <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
