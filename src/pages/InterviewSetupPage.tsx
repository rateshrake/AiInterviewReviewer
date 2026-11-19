import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ExperienceLevel, DifficultyLevel, TargetPackage, InterviewType } from '../types';

export const InterviewSetupPage: React.FC = () => {
  const { config, updateConfig, setCurrentPage, setActiveQuestionIndex } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      updateConfig({
        resumeName: file.name,
        resumeSize: `${sizeMb} MB`,
      });
    }
  };

  const interviewTypes: InterviewType[] = ['Technical', 'HR', 'Behavioral', 'Mixed'];
  const experienceOptions: ExperienceLevel[] = ['Fresher – 1 Year', '1 – 3 Years', '3 – 5 Years', '5+ Years'];
  const difficultyOptions: DifficultyLevel[] = ['🟢 Easy', '📊 Medium', '🔴 Hard'];
  const packageOptions: TargetPackage[] = ['₹ 4 – 8 LPA', '₹ 8 – 15 LPA', '₹ 15 – 30 LPA', '₹ 30+ LPA'];

  const handleStartInterview = () => {
    setActiveQuestionIndex(1); // Set to Question 2 as featured in the Stitch prototype
    setCurrentPage('interview-room');
  };

  return (
    <div className="px-8 py-8 flex-1 space-y-6">
      <div>
        <h1 className="font-headline text-display-lg-mobile lg:text-[28px] font-bold tracking-tight text-white mb-1">
          Configure Your Interview
        </h1>
        <p className="font-body text-[14px] text-white/60">
          Upload your resume and job details to start your AI interview
        </p>
      </div>

      {/* 2-Column Split: Config Form vs Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Setup Form Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upload Resume & Job Description Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Upload Resume Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-obsidian-border-sub hover:border-primary/50 rounded-2xl p-6 bg-obsidian-card/60 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group relative"
            >
              <input 
                ref={fileInputRef} 
                type="file" 
                accept=".pdf,.docx,.doc" 
                className="hidden" 
                onChange={handleFileUpload}
              />
              
              <div className="w-12 h-12 rounded-2xl bg-obsidian-elevated border border-obsidian-border-sub flex items-center justify-center text-white/70 group-hover:text-primary transition-colors mb-3">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              
              {config.resumeName ? (
                <div>
                  <div className="font-headline text-[14px] font-bold text-success flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span className="truncate max-w-[180px]">{config.resumeName}</span>
                  </div>
                  <div className="font-body text-[11px] text-white/50">{config.resumeSize} • Click to replace</div>
                </div>
              ) : (
                <>
                  <div className="font-headline text-[15px] font-bold text-white mb-1">Upload Resume</div>
                  <div className="font-body text-[11px] text-white/50">PDF, DOCX (Max 5MB)</div>
                </>
              )}
            </div>

            {/* Or Paste Job Description Box */}
            <div className="flex flex-col">
              <label className="font-headline text-[13px] font-medium text-white/70 mb-2">
                Or paste Job Description
              </label>
              <textarea
                rows={4}
                value={config.jobDescription}
                onChange={(e) => updateConfig({ jobDescription: e.target.value })}
                placeholder="Paste job description here..."
                className="w-full flex-1 bg-obsidian-card border border-obsidian-border-sub rounded-2xl p-4 text-[13px] text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary/60 transition-colors resize-none"
              />
            </div>
          </div>

          {/* 3 Dropdown Selectors: Experience, Difficulty, Target Package */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Experience Level */}
            <div>
              <label className="font-headline text-[12px] font-medium text-white/70 block mb-1.5">
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={config.experienceLevel}
                  onChange={(e) => updateConfig({ experienceLevel: e.target.value as ExperienceLevel })}
                  className="w-full bg-obsidian-card border border-obsidian-border-sub rounded-xl px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer"
                >
                  {experienceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="font-headline text-[12px] font-medium text-white/70 block mb-1.5">
                Difficulty Level
              </label>
              <div className="relative">
                <select
                  value={config.difficultyLevel}
                  onChange={(e) => updateConfig({ difficultyLevel: e.target.value as DifficultyLevel })}
                  className="w-full bg-obsidian-card border border-obsidian-border-sub rounded-xl px-3.5 py-2.5 text-[13px] text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer"
                >
                  {difficultyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Target Package */}
            <div>
              <label className="font-headline text-[12px] font-medium text-white/70 block mb-1.5">
                Target Package
              </label>
              <div className="relative">
                <select
                  value={config.targetPackage}
                  onChange={(e) => updateConfig({ targetPackage: e.target.value as TargetPackage })}
                  className="w-full bg-obsidian-card border border-obsidian-border-sub rounded-xl px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer"
                >
                  {packageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[18px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Interview Type Selector Pills */}
          <div>
            <label className="font-headline text-[13px] font-semibold text-white block mb-2.5">
              Interview Type
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {interviewTypes.map((type) => {
                const isSelected = config.interviewType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateConfig({ interviewType: type })}
                    className={`px-5 py-2 rounded-full font-headline text-[13px] transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary to-accent text-on-primary font-bold shadow-md shadow-primary/20'
                        : 'bg-obsidian-card border border-obsidian-border text-white/70 hover:text-white font-medium'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enable Coding Questions Pill Toggle */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => updateConfig({ enableCoding: !config.enableCoding })}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-headline text-[13px] font-semibold transition-all ${
                config.enableCoding
                  ? 'bg-obsidian-elevated border-primary/40 text-primary'
                  : 'bg-obsidian-card border-obsidian-border-sub text-white/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>Enable Coding Questions</span>
              <span className={`w-2 h-2 rounded-full ml-1 ${config.enableCoding ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
            </button>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleStartInterview}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[15px] font-bold shadow-xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>Start Interview</span>
              <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Quick Tips Column (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            <span className="font-headline text-[16px] font-bold text-white">Quick Tips</span>
          </div>

          <div className="space-y-4 font-body text-[13px]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-success text-[18px] shrink-0 mt-0.5">check_circle</span>
              <p className="text-white/80">Add a relevant job description for more accurate tailored questions.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-success text-[18px] shrink-0 mt-0.5">check_circle</span>
              <p className="text-white/80">Choose the right difficulty level matching your current target company.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-success text-[18px] shrink-0 mt-0.5">check_circle</span>
              <p className="text-white/80">Enable coding for better preparation on algorithmic problem rounds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
