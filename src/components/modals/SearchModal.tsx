import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setCurrentPage, questions, recentActivities } = useApp();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setSearchOpen(false);
  };

  const navMatches = [
    { title: 'Dashboard', icon: 'dashboard', page: 'dashboard' as PageId, desc: 'Overview, stats & streak' },
    { title: 'Configure Interview', icon: 'video_call', page: 'interview-setup' as PageId, desc: 'Upload resume & pick difficulty' },
    { title: 'Live Interview Room', icon: 'mic', page: 'interview-room' as PageId, desc: 'Real-time AI voice & code session' },
    { title: 'Interview Report', icon: 'workspace_premium', page: 'interview-report' as PageId, desc: 'Detailed score & analysis' },
    { title: 'Analytics & Insights', icon: 'insights', page: 'performance-analytics' as PageId, desc: 'Skill growth & metrics' },
    { title: 'Interview History', icon: 'history', page: 'my-interviews' as PageId, desc: 'Past interview logs & recordings' },
    { title: 'Subscription & Plans', icon: 'credit_card', page: 'subscription' as PageId, desc: 'Upgrade or manage plan' },
    { title: 'AI & Profile Settings', icon: 'settings', page: 'settings' as PageId, desc: 'Configure OpenAI / Claude keys' },
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const questionMatches = questions.filter(q =>
    q.question.toLowerCase().includes(query.toLowerCase()) ||
    q.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-xl bg-obsidian-card border border-obsidian-border rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-obsidian-border p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-white/50 text-[20px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search features, pages, questions, or topics..."
            className="w-full bg-transparent text-[15px] text-white placeholder-white/40 focus:outline-none"
          />
          <button 
            onClick={() => setSearchOpen(false)}
            className="text-[12px] font-code bg-white/10 px-2 py-1 rounded text-white/60 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          <div>
            <div className="px-3 py-1 font-headline text-[11px] font-bold text-white/40 uppercase tracking-wider">
              Navigation
            </div>
            <div className="space-y-1">
              {navMatches.map((item) => (
                <div
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div>
                      <div className="font-headline text-[13px] font-semibold text-white">{item.title}</div>
                      <div className="font-body text-[11px] text-white/50">{item.desc}</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[14px] text-white/30 group-hover:text-white transition-colors">
                    arrow_forward
                  </span>
                </div>
              ))}
            </div>
          </div>

          {questionMatches.length > 0 && (
            <div>
              <div className="px-3 py-1 font-headline text-[11px] font-bold text-white/40 uppercase tracking-wider">
                Interview Questions
              </div>
              <div className="space-y-1">
                {questionMatches.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => navigateTo('interview-room')}
                    className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-headline font-bold bg-primary/20 text-primary">
                        {q.category}
                      </span>
                      <span className="text-[11px] text-white/50">Question #{q.id}</span>
                    </div>
                    <div className="font-body text-[12px] text-white/80 line-clamp-2">
                      {q.question}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
