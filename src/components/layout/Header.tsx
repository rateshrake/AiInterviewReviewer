import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { setSearchOpen, setNotificationsOpen, setCurrentPage } = useApp();

  return (
    <header className="h-20 border-b border-obsidian-border px-8 flex items-center justify-between gap-6 shrink-0 bg-dark-surface/80 backdrop-blur-md z-10">
      {/* Global Search Input trigger */}
      <div 
        onClick={() => setSearchOpen(true)}
        className="relative w-full max-w-md cursor-pointer"
      >
        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-[18px]">
          search
        </span>
        <input
          type="text"
          readOnly
          placeholder="Search anything... (questions, skills, history)"
          className="w-full bg-obsidian-card border border-obsidian-border-sub rounded-full pl-10 pr-12 py-2 text-[13px] text-white placeholder-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary/70 transition-colors cursor-pointer"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-code text-[11px] text-white/80 bg-white/10 border border-white/20 px-1.5 py-0.5 rounded pointer-events-none">
          ⌘K
        </span>
      </div>

      {/* Right User & Notifications */}
      <div className="flex items-center gap-4 shrink-0">
        <button 
          onClick={() => setNotificationsOpen(true)}
          className="relative w-10 h-10 rounded-full bg-obsidian-sub border border-obsidian-border-sub flex items-center justify-center text-white/70 hover:text-white focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[19px]">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-dark-surface animate-pulse" />
        </button>

        <div 
          onClick={() => setCurrentPage('settings')}
          className="flex items-center gap-2.5 pl-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img 
            src="/images/user_avatar.jpg" 
            alt="Harish profile" 
            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/40"
            onError={(e) => {
              // fallback if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-headline text-[14px] font-medium text-white">Harish</span>
          <span className="material-symbols-outlined text-[16px] text-white/50">expand_more</span>
        </div>
      </div>
    </header>
  );
};
