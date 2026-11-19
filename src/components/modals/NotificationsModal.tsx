import React from 'react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, setCurrentPage } = useApp();

  if (!notificationsOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Interview Analysis Ready!',
      desc: 'Your Technical Interview (Software Engineer) scored 78%. View the full dossier.',
      time: '2 hours ago',
      unread: true,
      action: 'interview-report' as const,
      icon: 'insights',
      iconColor: 'text-primary'
    },
    {
      id: 2,
      title: 'Weekly Practice Goal 75% Complete',
      desc: 'You have finished 3 out of 8 target interviews for this week. Keep up the momentum!',
      time: '5 hours ago',
      unread: true,
      action: 'dashboard' as const,
      icon: 'flag',
      iconColor: 'text-secondary'
    },
    {
      id: 3,
      title: 'OpenAI API Connected',
      desc: 'GPT-4o provider verified with 28ms latency response time.',
      time: '1 day ago',
      unread: false,
      action: 'settings' as const,
      icon: 'check_circle',
      iconColor: 'text-success'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-8 bg-black/40 backdrop-blur-xs"
      onClick={() => setNotificationsOpen(false)}
    >
      <div 
        className="w-full max-w-sm bg-obsidian-card border border-obsidian-border rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-obsidian-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline text-[15px] font-bold text-white">Notifications</span>
            <span className="px-2 py-0.5 rounded-full bg-error/20 text-error text-[11px] font-bold">2 new</span>
          </div>
          <button 
            onClick={() => setNotificationsOpen(false)}
            className="text-white/40 hover:text-white material-symbols-outlined text-[18px]"
          >
            close
          </button>
        </div>

        <div className="divide-y divide-obsidian-border max-h-[380px] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                setCurrentPage(n.action);
                setNotificationsOpen(false);
              }}
              className={`p-4 hover:bg-white/5 cursor-pointer transition-colors flex items-start gap-3.5 ${
                n.unread ? 'bg-primary/5' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined text-[18px] ${n.iconColor}`}>{n.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-headline text-[13px] font-bold text-white">{n.title}</div>
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-error" />}
                </div>
                <div className="font-body text-[12px] text-white/70 leading-snug mb-1.5">{n.desc}</div>
                <div className="text-[11px] text-white/40">{n.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-obsidian-sub border-t border-obsidian-border text-center">
          <button 
            onClick={() => setNotificationsOpen(false)}
            className="font-headline text-[12px] text-primary hover:text-accent font-semibold transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
