import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const UpgradeModal: React.FC = () => {
  const { upgradeModalOpen, setUpgradeModalOpen, upgradeToPro, billingCycle, setBillingCycle } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!upgradeModalOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradeToPro();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setUpgradeModalOpen(false)}
    >
      <div 
        className="w-full max-w-lg bg-obsidian-card border-2 border-primary/50 rounded-3xl p-7 shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow behind card */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/30 blur-3xl pointer-events-none rounded-full" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">workspace_premium</span>
            <h2 className="font-headline text-[22px] font-bold text-white">Upgrade to Pro</h2>
          </div>
          <button 
            onClick={() => setUpgradeModalOpen(false)}
            className="text-white/40 hover:text-white material-symbols-outlined text-[20px]"
          >
            close
          </button>
        </div>

        <p className="font-body text-[13px] text-white/70 mb-5 leading-relaxed">
          Supercharge your interview preparation with unlimited AI mock interviews, custom DSA challenges, and executive behavioral coaching.
        </p>

        {/* Billing cycle switch */}
        <div className="mb-6 flex justify-center">
          <div className="bg-obsidian-sub border border-obsidian-border-sub p-1 rounded-full inline-flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full font-headline text-[12px] font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-primary text-on-primary shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full font-headline text-[12px] font-bold transition-all ${
                billingCycle === 'yearly' ? 'bg-primary text-on-primary shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Selected Tier Highlights */}
        <div className="bg-obsidian-elevated border border-primary/40 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-headline text-[18px] font-bold text-white">Pro Membership</span>
            <div className="text-right">
              <span className="font-headline text-[28px] font-bold text-primary">
                {billingCycle === 'monthly' ? '₹299' : '₹2,870'}
              </span>
              <span className="text-[12px] text-white/50">{billingCycle === 'monthly' ? '/month' : '/year'}</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-obsidian-border text-[13px]">
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-success text-[16px]">check</span>
              <span>Unlimited Real-time Voice & Code Interviews</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-success text-[16px]">check</span>
              <span>Advanced Deep-Dive Diagnostics & Improvement Roadmap</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-success text-[16px]">check</span>
              <span>GPT-4o, Claude 3.5 Sonnet & Gemini AI Personas</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[15px] font-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              <span>Activating Pro Access...</span>
            </>
          ) : (
            <>
              <span>Complete Upgrade</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
