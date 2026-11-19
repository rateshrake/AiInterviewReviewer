import React from 'react';
import { useApp } from '../context/AppContext';

export const SubscriptionPage: React.FC = () => {
  const { billingCycle, setBillingCycle, setUpgradeModalOpen, isProUser } = useApp();

  return (
    <div className="px-8 py-8 flex-1 space-y-8 max-w-6xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h1 className="font-headline text-display-lg-mobile lg:text-[34px] font-bold tracking-tight text-white">
          Upgrade Your Plan
        </h1>
        <p className="font-body text-[14px] text-white/60">
          Unlock more features and accelerate your preparation
        </p>

        {/* Monthly / Yearly Toggle Pill */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-obsidian-card border border-obsidian-border-sub p-1 rounded-full inline-flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-1.5 rounded-full font-headline text-[12px] font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary text-on-primary shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-1.5 rounded-full font-headline text-[12px] font-bold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-on-primary shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Tier Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Free */}
        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="font-headline text-[18px] font-bold text-white mb-1">Free</div>
            <div className="text-[12px] text-white/50 mb-5">Perfect for beginners</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-headline text-[36px] font-bold text-white leading-none">₹0</span>
              <span className="text-[12px] text-white/50">/month</span>
            </div>
            <div className="space-y-3 font-body text-[13px] border-t border-obsidian-border pt-5">
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>3 Interviews / month</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Basic Analytics</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Limited Reports</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border-sub text-white/70 font-headline text-[13px] font-bold cursor-default"
            >
              {isProUser ? 'Starter Tier' : 'Current Plan'}
            </button>
          </div>
        </div>

        {/* Tier 2: Pro (Highlighted Card with Radiant Glow) */}
        <div className="bg-gradient-to-b from-[#221B27] via-obsidian-card to-obsidian-card border-2 border-primary rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
          {/* Most Popular Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[10px] font-bold uppercase tracking-wider shadow-md shadow-primary/30">
            Most Popular
          </div>

          <div>
            <div className="font-headline text-[18px] font-bold text-white mb-1">Pro</div>
            <div className="text-[12px] text-white/50 mb-5">For serious job seekers</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-headline text-[36px] font-bold text-white leading-none">
                {billingCycle === 'monthly' ? '₹299' : '₹239'}
              </span>
              <span className="text-[12px] text-white/50">/month</span>
            </div>
            <div className="space-y-3 font-body text-[13px] border-t border-obsidian-border pt-5">
              <div className="flex items-center gap-2.5 text-white font-medium">
                <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                <span>Unlimited Interviews</span>
              </div>
              <div className="flex items-center gap-2.5 text-white font-medium">
                <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-2.5 text-white font-medium">
                <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                <span>Detailed Feedback</span>
              </div>
              <div className="flex items-center gap-2.5 text-white font-medium">
                <span className="material-symbols-outlined text-primary text-[17px]">check</span>
                <span>Priority Support</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            {isProUser ? (
              <button
                disabled
                className="w-full py-2.5 rounded-xl bg-success/20 border border-success/50 text-success font-headline text-[13px] font-bold"
              >
                Active Plan ✓
              </button>
            ) : (
              <button
                onClick={() => setUpgradeModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/30 hover:brightness-110 active:scale-95 transition-all text-center"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="font-headline text-[18px] font-bold text-white mb-1">Enterprise</div>
            <div className="text-[12px] text-white/50 mb-5">For colleges &amp; cohorts</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-headline text-[36px] font-bold text-white leading-none">
                {billingCycle === 'monthly' ? '₹999' : '₹799'}
              </span>
              <span className="text-[12px] text-white/50">/seat</span>
            </div>
            <div className="space-y-3 font-body text-[13px] border-t border-obsidian-border pt-5">
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Everything in Pro</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Custom Question Banks</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Batch Candidate Analytics</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/80">
                <span className="material-symbols-outlined text-success text-[17px]">check</span>
                <span>Dedicated Success Coach</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={() => alert('Our team will contact you for institutional licensing and custom question banks.')}
              className="w-full py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border-sub hover:border-white/30 text-white font-headline text-[13px] font-bold transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
