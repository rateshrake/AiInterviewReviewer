import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InterviewRoomPage: React.FC = () => {
  const {
    activeQuestionIndex,
    setActiveQuestionIndex,
    questions,
    currentQuestion,
    code,
    setCode,
    codeLanguage,
    setCodeLanguage,
    notes,
    setNotes,
    isMicMuted,
    setIsMicMuted,
    isCameraOn,
    setIsCameraOn,
    formatSessionTime,
    runCodeOutput,
    setRunCodeOutput,
    runCode,
    nextQuestion,
    endSession,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'coding' | 'notepad' | 'resources'>('coding');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const handleRun = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      runCode();
      setIsRunningCode(false);
    }, 600);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const progressPercent = Math.round(((activeQuestionIndex + 1) / questions.length) * 100);
  const circumference = 251.2;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top Status Header Bar */}
      <header className="h-16 border-b border-obsidian-border px-8 flex items-center justify-between shrink-0 bg-dark-surface/80 backdrop-blur-md">
        {/* Live Indicator & Timer */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error animate-ping" />
            <span className="font-headline text-[14px] font-bold text-white uppercase tracking-wider">LIVE</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5 font-code text-[13px] text-white/90">
            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
            <span>{formatSessionTime()}</span>
          </div>
        </div>

        {/* Question Counter & Stepper Progress */}
        <div className="flex items-center gap-4">
          <span className="font-headline text-[14px] font-bold text-white">
            Question {activeQuestionIndex + 1} / {questions.length}
          </span>
          <div className="w-36 h-2 bg-obsidian-elevated rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={endSession}
          className="px-4 py-1.5 rounded-full bg-obsidian-elevated border border-error/50 hover:bg-error hover:text-white text-error font-headline text-[12px] font-bold transition-all"
        >
          End Session
        </button>
      </header>

      {/* Main Stage 3-Column Split */}
      <div className="px-8 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Video Feed & Speech Bubble (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Video Frame Card */}
          <div className="bg-obsidian-card border border-obsidian-border rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              {isCameraOn ? (
                <img
                  src="/images/interviewer_woman.jpg"
                  alt="Human AI Interviewer Video"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-obsidian-card text-white/50 space-y-2">
                  <span className="material-symbols-outlined text-[48px]">videocam_off</span>
                  <span className="font-headline text-[13px]">Camera Paused</span>
                </div>
              )}

              {/* Subtle top gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Question Subtitle Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0C]/90 backdrop-blur-md border border-obsidian-border-sub rounded-xl p-3 flex items-start gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                </div>
                <p className="font-body text-[13px] text-white/95 leading-relaxed font-medium">
                  "{currentQuestion.question}"
                </p>
              </div>
            </div>

            {/* Call Media Control Icons */}
            <div className="p-3 bg-obsidian-sub flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                aria-label="Mute mic"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  isMicMuted 
                    ? 'bg-error/20 border-error text-error' 
                    : 'bg-obsidian-elevated border-obsidian-border-sub text-white hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isMicMuted ? 'mic_off' : 'mic'}
                </span>
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                aria-label="Camera"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  !isCameraOn 
                    ? 'bg-error/20 border-error text-error' 
                    : 'bg-obsidian-elevated border-obsidian-border-sub text-white hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCameraOn ? 'videocam' : 'videocam_off'}
                </span>
              </button>

              <button
                onClick={endSession}
                aria-label="End call"
                className="w-9 h-9 rounded-full bg-error text-white flex items-center justify-center shadow-lg shadow-error/30 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">call_end</span>
              </button>

              <button
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="w-9 h-9 rounded-full bg-obsidian-elevated border border-obsidian-border-sub text-white hover:text-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>
          </div>

          {/* AI Tips Capsule */}
          <div className="bg-obsidian-card border border-obsidian-border rounded-xl p-4 flex items-start gap-3 shadow-lg">
            <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">lightbulb</span>
            <div>
              <div className="font-headline text-[13px] font-bold text-white mb-0.5">AI Tips</div>
              <p className="font-body text-[12px] text-white/70 leading-relaxed">
                {currentQuestion.tips}
              </p>
            </div>
          </div>
        </div>

        {/* Middle Column: Interactive Workspace & IDE (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Workspace Tool Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-obsidian-card border border-obsidian-border p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('coding')}
              className={`py-1.5 rounded-lg font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'coding'
                  ? 'bg-primary/20 border border-primary text-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">code</span>
              <span>Coding</span>
            </button>

            <button
              onClick={() => setActiveTab('notepad')}
              className={`py-1.5 rounded-lg font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'notepad'
                  ? 'bg-primary/20 border border-primary text-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">edit_note</span>
              <span>Notepad</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`py-1.5 rounded-lg font-headline text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'resources'
                  ? 'bg-primary/20 border border-primary text-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">folder</span>
              <span>Resources</span>
            </button>
          </div>

          {/* Tab 1: Code Sandbox Editor Container */}
          {activeTab === 'coding' && (
            <div className="bg-obsidian-card border border-obsidian-border rounded-2xl overflow-hidden shadow-xl">
              {/* IDE Header Bar */}
              <div className="px-4 py-2.5 bg-obsidian-sub border-b border-obsidian-border flex items-center justify-between">
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="bg-obsidian-elevated border border-obsidian-border-sub rounded px-2.5 py-0.5 font-code text-[11px] text-white/90 focus:outline-none cursor-pointer"
                >
                  <option value="Python">Python ▾</option>
                  <option value="JavaScript">JavaScript ▾</option>
                  <option value="Java">Java ▾</option>
                  <option value="C++">C++ ▾</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRun}
                    disabled={isRunningCode}
                    className="px-3 py-1 rounded-md bg-obsidian-elevated hover:bg-white/10 text-white font-headline text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    {isRunningCode ? (
                      <span className="w-3 h-3 border-2 border-success border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="material-symbols-outlined text-[13px] text-success">play_arrow</span>
                    )}
                    <span>Run</span>
                  </button>

                  <button
                    onClick={() => {
                      handleRun();
                      setTimeout(() => nextQuestion(), 800);
                    }}
                    className="px-3 py-1 rounded-md bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[11px] font-bold shadow transition-all hover:brightness-110 active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Code Editor Workspace */}
              <div className="p-4 font-code text-[12px] leading-relaxed bg-dark-surface min-h-[300px]">
                <div className="grid grid-cols-[24px_1fr] gap-2 text-white/90">
                  <div className="text-white/30 text-right select-none space-y-1 font-code">
                    {code.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      rows={Math.max(10, code.split('\n').length)}
                      spellCheck={false}
                      className="w-full bg-transparent font-code text-[12px] text-white/90 leading-relaxed resize-none focus:outline-none border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Execution Output Console */}
              {runCodeOutput && (
                <div className="border-t border-obsidian-border bg-obsidian-sub p-3.5 font-code text-[11px]">
                  <div className="flex items-center justify-between text-white/50 mb-1.5 font-headline text-[11px] uppercase tracking-wider">
                    <span>Console Output</span>
                    <button onClick={() => setRunCodeOutput(null)} className="hover:text-white">Clear</button>
                  </div>
                  <pre className="text-success leading-relaxed whitespace-pre-wrap">{runCodeOutput}</pre>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Notepad */}
          {activeTab === 'notepad' && (
            <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-4 shadow-xl space-y-2">
              <div className="font-headline text-[13px] font-bold text-white flex items-center justify-between">
                <span>Scratchpad &amp; Notes</span>
                <span className="text-[11px] text-white/40 font-normal">Private to you</span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={12}
                placeholder="Jot down formulas, algorithmic edge cases, or complexity notes..."
                className="w-full bg-dark-surface border border-obsidian-border-sub rounded-xl p-3 font-code text-[12px] text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          )}

          {/* Tab 3: Resources & Formulas */}
          {activeTab === 'resources' && (
            <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-4 shadow-xl space-y-3 font-body text-[12px]">
              <div className="font-headline text-[13px] font-bold text-white">Quick Reference</div>
              <div className="space-y-2 text-white/80">
                <div className="p-2.5 rounded-lg bg-obsidian-elevated border border-obsidian-border-sub">
                  <div className="font-semibold text-primary">HashMap vs HashSet</div>
                  <div className="text-white/60 text-[11px] mt-0.5">Map stores key-value; Set stores unique elements backed by Map internally.</div>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-elevated border border-obsidian-border-sub">
                  <div className="font-semibold text-secondary">Time Complexities</div>
                  <div className="text-white/60 text-[11px] mt-0.5">Average lookup: O(1). Worst case with treeify: O(log n).</div>
                </div>
                <div className="p-2.5 rounded-lg bg-obsidian-elevated border border-obsidian-border-sub">
                  <div className="font-semibold text-success">Common Pitfall</div>
                  <div className="text-white/60 text-[11px] mt-0.5">Always override hashCode() whenever you override equals().</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Interview Progress Telemetry (3 cols) */}
        <div className="lg:col-span-3 bg-obsidian-card border border-obsidian-border rounded-2xl p-5 shadow-xl space-y-6">
          <div className="font-headline text-[15px] font-bold text-white border-b border-obsidian-border pb-3">
            AI Interview Progress
          </div>

          {/* Radial Donut Completion */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#222129" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="url(#room-gradient)"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeWidth="10"
                />
                <defs>
                  <linearGradient id="room-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5100" />
                    <stop offset="100%" stopColor="#FFA000" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline text-[24px] font-bold text-white">{progressPercent}%</span>
              </div>
            </div>
          </div>

          {/* Evaluation Factors */}
          <div className="space-y-3 font-body text-[12px] pt-2">
            <div className="flex items-center gap-2.5 text-white/80">
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              <span>Communication</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span>Technical Knowledge</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span>Problem Solving</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <span className="w-2 h-2 rounded-full bg-info shrink-0" />
              <span>Confidence</span>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-border">
            <button
              onClick={nextQuestion}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 hover:brightness-110 transition-all active:scale-95"
            >
              <span>{activeQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish & View Report'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
