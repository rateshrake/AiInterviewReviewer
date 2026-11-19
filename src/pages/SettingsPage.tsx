import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

type SettingsTab = 'profile' | 'ai' | 'integrations' | 'preferences' | 'privacy';

export const SettingsPage: React.FC = () => {
  const { aiConfig, updateAiConfig } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('ai');
  const [apiKey, setApiKey] = useState(aiConfig.apiKey);
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success'>('idle');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTest = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
      updateAiConfig({ isConnected: true, apiKey });
      setTimeout(() => setTestStatus('idle'), 3000);
    }, 800);
  };

  const handleSave = () => {
    updateAiConfig({ apiKey });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="px-8 py-8 flex-1 space-y-6">
      <div>
        <h1 className="font-headline text-display-lg-mobile lg:text-[28px] font-bold tracking-tight text-white mb-1">
          Settings
        </h1>
        <p className="font-body text-[14px] text-white/60">
          Customize your experience
        </p>
      </div>

      {/* 2-Column Split: Settings Vertical Tabs vs Active Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Settings Menu (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-3 shadow-xl space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-[14px] font-medium transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-[14px] font-medium transition-colors text-left ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">psychology</span>
            <span>AI Configuration</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-[14px] font-medium transition-colors text-left ${
              activeTab === 'integrations'
                ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">hub</span>
            <span>Integrations</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-[14px] font-medium transition-colors text-left ${
              activeTab === 'preferences'
                ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">tune</span>
            <span>Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-[14px] font-medium transition-colors text-left ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">security</span>
            <span>Privacy &amp; Security</span>
          </button>
        </div>

        {/* Right Content Panel (8 cols) */}
        <div className="lg:col-span-8 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-6">
          {activeTab === 'ai' && (
            <>
              <div className="border-b border-obsidian-border pb-4">
                <h2 className="font-headline text-[18px] font-bold text-white mb-1">
                  AI Provider Configuration
                </h2>
                <p className="font-body text-[13px] text-white/60">
                  Configure your preferred AI services
                </p>
              </div>

              {/* OpenAI API Key Input */}
              <div className="space-y-2">
                <label className="font-headline text-[13px] font-medium text-white/80 block">
                  OpenAI API Key
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-4 py-2.5 font-code text-[12px] text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary/60 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showKey ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={handleTest}
                    disabled={testStatus === 'testing'}
                    className="px-5 py-2.5 rounded-xl bg-obsidian-elevated border border-primary/50 text-primary hover:bg-primary/10 font-headline text-[13px] font-semibold transition-all shrink-0 flex items-center gap-1.5"
                  >
                    {testStatus === 'testing' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Testing...</span>
                      </>
                    ) : testStatus === 'success' ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] text-success">check</span>
                        <span>Verified!</span>
                      </>
                    ) : (
                      <span>Test</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Model & Voice Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-headline text-[13px] font-medium text-white/80 block mb-1.5">
                    Model
                  </label>
                  <div className="relative">
                    <select
                      value={aiConfig.model}
                      onChange={(e) => updateAiConfig({ model: e.target.value as any })}
                      className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-4 py-2.5 font-code text-[13px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="GPT-4o">GPT-4o</option>
                      <option value="GPT-4o-mini">GPT-4o-mini</option>
                      <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                      <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="font-headline text-[13px] font-medium text-white/80 block mb-1.5">
                    Voice Persona
                  </label>
                  <div className="relative">
                    <select
                      value={aiConfig.voicePersona}
                      onChange={(e) => updateAiConfig({ voicePersona: e.target.value as any })}
                      className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-4 py-2.5 font-headline text-[13px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="Alloy (Balanced)">Alloy (Balanced)</option>
                      <option value="Echo (Warm)">Echo (Warm)</option>
                      <option value="Shimmer (Professional)">Shimmer (Professional)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Connected Status Pill & Disclaimer */}
              <div className="pt-4 border-t border-obsidian-border flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 border border-success/30 text-success font-headline text-[12px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span>Connected</span>
                </span>
                <span className="font-body text-[11px] text-white/70">
                  Your API keys are stored securely and never shared.
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  {saveSuccess ? 'Saved Changes!' : 'Save Configuration'}
                </button>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="border-b border-obsidian-border pb-4">
                <h2 className="font-headline text-[18px] font-bold text-white mb-1">Candidate Profile</h2>
                <p className="font-body text-[13px] text-white/60">Update personal and career target details</p>
              </div>

              <div className="flex items-center gap-4">
                <img src="/images/user_avatar.jpg" alt="Harish" className="w-16 h-16 rounded-full object-cover ring-2 ring-primary" />
                <div>
                  <button className="px-4 py-1.5 rounded-lg bg-obsidian-elevated border border-obsidian-border text-white text-[12px] font-semibold hover:border-primary">Change Photo</button>
                  <p className="text-[11px] text-white/40 mt-1">JPG or PNG under 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] text-white/70 block mb-1">Full Name</label>
                  <input type="text" defaultValue="Harish" className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-3.5 py-2 text-[13px] text-white" />
                </div>
                <div>
                  <label className="text-[12px] text-white/70 block mb-1">Email</label>
                  <input type="email" defaultValue="harish@example.com" className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-3.5 py-2 text-[13px] text-white" />
                </div>
              </div>

              <div>
                <label className="text-[12px] text-white/70 block mb-1">Target Primary Role</label>
                <input type="text" defaultValue="Senior Full Stack Software Engineer" className="w-full bg-obsidian-elevated border border-obsidian-border-sub rounded-xl px-3.5 py-2 text-[13px] text-white" />
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-5">
              <div className="border-b border-obsidian-border pb-4">
                <h2 className="font-headline text-[18px] font-bold text-white mb-1">Connected Integrations</h2>
                <p className="font-body text-[13px] text-white/60">Sync your code repositories and professional profiles</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">code</span>
                    <div>
                      <div className="font-headline font-semibold text-white">GitHub</div>
                      <div className="text-[11px] text-white/50">Auto-pull pinned repositories for context</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-success/20 text-success text-[12px] font-bold">Connected</span>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-info text-[24px]">link</span>
                    <div>
                      <div className="font-headline font-semibold text-white">LinkedIn Profile</div>
                      <div className="text-[11px] text-white/50">Sync career milestones and endorsement skills</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-full bg-white/10 text-white text-[12px] font-bold hover:bg-white/20">Connect</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-5">
              <div className="border-b border-obsidian-border pb-4">
                <h2 className="font-headline text-[18px] font-bold text-white mb-1">Interview Preferences</h2>
                <p className="font-body text-[13px] text-white/60">Adjust AI interviewer personality and pacing</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-elevated">
                  <div>
                    <div className="font-headline text-[13px] font-bold text-white">Strict Grilling Mode</div>
                    <div className="text-[11px] text-white/50">Interviewer challenges edge cases and digs into trade-offs</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-obsidian-border text-primary focus:ring-primary w-4 h-4 bg-obsidian-card" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-elevated">
                  <div>
                    <div className="font-headline text-[13px] font-bold text-white">Real-time Audio Feedback Waveforms</div>
                    <div className="text-[11px] text-white/50">Display live speech pacing and filler word detection</div>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-obsidian-border text-primary focus:ring-primary w-4 h-4 bg-obsidian-card" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="border-b border-obsidian-border pb-4">
                <h2 className="font-headline text-[18px] font-bold text-white mb-1">Privacy &amp; Security</h2>
                <p className="font-body text-[13px] text-white/60">Control your interview recordings, data retention and privacy</p>
              </div>

              <div className="space-y-3 text-[13px] text-white/80">
                <p>All mock interview transcriptions and video feeds are end-to-end encrypted and retained exclusively on your device or private storage.</p>
                <div className="pt-2">
                  <button className="px-4 py-2 rounded-xl bg-error/15 border border-error/30 text-error font-headline font-semibold text-[12px] hover:bg-error/25 transition-colors">
                    Delete All Interview History &amp; Recordings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
