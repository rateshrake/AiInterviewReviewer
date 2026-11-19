import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'interview-setup', label: 'Interview', icon: 'video_call' },
  { id: 'performance-analytics', label: 'Analytics', icon: 'insights' },
  { id: 'my-interviews', label: 'History', icon: 'history' },
  { id: 'subscription', label: 'Subscription', icon: 'credit_card' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, isProUser, setUpgradeModalOpen } = useApp();

  const handleNav = (id: PageId) => {
    setCurrentPage(id);
  };

  return (
    <aside className="w-64 border-r border-obsidian-border bg-obsidian-card/90 backdrop-blur-md flex flex-col justify-between p-5 shrink-0 select-none z-20">
      <div>
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-3 px-2 py-3 mb-6 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-[22px]">auto_awesome</span>
          </div>
          <div>
            <div className="font-headline text-[18px] font-bold tracking-tight text-white leading-tight">
              AI Interview <span className="text-primary">Pro</span>
            </div>
            <div className="font-body text-[10px] text-white/50 tracking-wider">Practice. Perform. Progress.</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id || 
              (item.id === 'interview-setup' && (currentPage === 'interview-room' || currentPage === 'interview-report'));

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-headline text-label-lg transition-all text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-accent text-on-primary shadow-lg shadow-primary/25 font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 group'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${
                  isActive ? 'text-on-primary' : 'text-white/50 group-hover:text-primary transition-colors'
                }`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Upgrade to Pro Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1C1A20] to-[#121115] border border-obsidian-border-sub p-4 text-center">
        {isProUser ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-headline text-[11px] font-bold mb-2">
              <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
              PRO MEMBER
            </div>
            <div className="font-headline text-[15px] font-bold text-white mb-1">Unlimited Access</div>
            <div className="font-body text-[12px] text-white/70">All AI models & unlimited mock interviews active</div>
          </div>
        ) : (
          <div>
            <div className="font-headline text-[15px] font-bold text-white mb-1">Upgrade to Pro</div>
            <div className="font-body text-[12px] text-white/70 mb-3.5 leading-snug">
              Unlock unlimited interviews &amp; insights
            </div>
            <button
              onClick={() => setUpgradeModalOpen(true)}
              className="block w-full py-2 px-3 rounded-xl bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Go Pro →
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
