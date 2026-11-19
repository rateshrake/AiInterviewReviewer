import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SearchModal } from '../modals/SearchModal';
import { NotificationsModal } from '../modals/NotificationsModal';
import { UpgradeModal } from '../modals/UpgradeModal';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-dark-surface text-light-on-surface font-body overflow-x-hidden">
      {/* Ambient Obsidian Wave Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] right-0 w-[700px] h-[450px] bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-3xl opacity-70 transform rotate-12" />
        <div className="absolute top-[35%] -left-[10%] w-[500px] h-[500px] bg-primary/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <SearchModal />
      <NotificationsModal />
      <UpgradeModal />
    </div>
  );
};
