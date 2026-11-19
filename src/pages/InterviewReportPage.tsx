import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const InterviewReportPage: React.FC = () => {
  const { setCurrentPage, questions } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(2);

  const handleDownload = () => {
    const reportData = {
      candidate: 'Harish',
      date: new Date().toLocaleDateString(),
      overallScore: '84%',
      status: 'Excellent Performance',
      scores: {
        technicalConcepts: '90%',
        codingSkills: '85%',
        communication: '88%',
        problemSolving: '80%',
      },
      strengths: ['Strong problem-solving skills', 'Good communication', 'Well-written code'],
      areasToImprove: ['DSA concepts', 'System Design', 'Time Management'],
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        score: q.score || 85,
        tips: q.tips,
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Interview_Report_Harish_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="px-8 py-8 flex-1 space-y-6">
      {/* Top Overall Score Hero Banner */}
      <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-6">
          {/* Golden Star Medal Icon Badge */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-secondary/20 to-primary/20 border border-secondary/40 flex items-center justify-center text-secondary shadow-lg shadow-secondary/20 shrink-0">
            <span className="material-symbols-outlined text-[36px]">workspace_premium</span>
          </div>

          <div>
            <div className="font-headline text-[13px] text-white/50 uppercase tracking-wider mb-0.5">
              Overall Score
            </div>
            <div className="flex items-center gap-4">
              <span className="font-headline text-[32px] font-bold text-white leading-tight">84%</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/15 border border-success/30 text-success font-headline text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span>Excellent Performance!</span>
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-obsidian-elevated border border-obsidian-border-sub hover:border-primary/50 text-white font-headline text-[13px] font-semibold shadow transition-all hover:bg-white/5 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px] text-primary">
            {downloadSuccess ? 'check_circle' : 'download'}
          </span>
          <span>{downloadSuccess ? 'Downloaded!' : 'Download Report'}</span>
        </button>
      </div>

      {/* 3-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Column 1: Strengths & Areas to Improve (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-6">
          {/* Strengths */}
          <div className="space-y-3">
            <div className="font-headline text-[15px] font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-success text-[19px]">thumb_up</span>
              <span>Strengths</span>
            </div>
            <ul className="space-y-2.5 font-body text-[13px]">
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span>Strong problem-solving skills</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span>Good communication</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                <span>Well-written code</span>
              </li>
            </ul>
          </div>

          {/* Areas to Improve */}
          <div className="space-y-3 pt-5 border-t border-obsidian-border">
            <div className="font-headline text-[15px] font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-warning text-[19px]">warning</span>
              <span>Areas to Improve</span>
            </div>
            <ul className="space-y-2.5 font-body text-[13px]">
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                <span>DSA concepts</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                <span>System Design</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                <span>Time Management</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Question-wise Analysis Progress Bars (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-5">
          <div className="font-headline text-[15px] font-bold text-white">
            Question-wise Analysis
          </div>
          <div className="space-y-4 font-body text-[13px]">
            <div>
              <div className="flex justify-between text-white/90 mb-1">
                <span>Technical Concepts</span>
                <span className="font-bold text-white">90%</span>
              </div>
              <div className="h-2 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[90%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white/90 mb-1">
                <span>Coding Skills</span>
                <span className="font-bold text-white">85%</span>
              </div>
              <div className="h-2 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white/90 mb-1">
                <span>Communication</span>
                <span className="font-bold text-white">88%</span>
              </div>
              <div className="h-2 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-white/90 mb-1">
                <span>Problem Solving</span>
                <span className="font-bold text-white">80%</span>
              </div>
              <div className="h-2 bg-obsidian-elevated rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-[80%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Next Steps & Mascot Celebration Trophy (4 cols) */}
        <div className="lg:col-span-4 bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="font-headline text-[15px] font-bold text-white mb-2">Next Steps</div>
            <p className="font-body text-[13px] text-white/70 leading-relaxed mb-4">
              Practice more on System Design and Advanced DSA topics to hit the 90%+ tier.
            </p>
            <button
              onClick={() => setCurrentPage('interview-setup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-on-primary font-headline text-[13px] font-bold shadow-md shadow-primary/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Start Practice →</span>
            </button>
          </div>

          {/* Mascot Elephant with Graduation Cap & Star Trophy */}
          <div className="relative pt-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-radial from-secondary/20 via-primary/10 to-transparent blur-xl pointer-events-none" />
            <img
              src="/images/elephant_graduation_star.jpg"
              alt="Graduation Mascot Elephant"
              className="relative z-10 w-32 h-32 object-cover rounded-2xl shadow-xl ring-2 ring-secondary/30"
            />
          </div>
        </div>
      </div>

      {/* Question Details Accordion Breakdown */}
      <div className="bg-obsidian-card border border-obsidian-border rounded-2xl p-6 shadow-xl space-y-4">
        <div className="font-headline text-[16px] font-bold text-white flex items-center justify-between">
          <span>Question-by-Question Evaluation</span>
          <span className="text-[12px] text-white/50 font-normal">Click a question to inspect AI critique</span>
        </div>

        <div className="space-y-3 font-body">
          {questions.map((q) => {
            const isExpanded = expandedQuestion === q.id;
            return (
              <div 
                key={q.id}
                className="border border-obsidian-border-sub rounded-xl overflow-hidden bg-obsidian-sub/40"
              >
                <div
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-obsidian-elevated border border-obsidian-border font-headline text-[11px] font-bold text-primary">
                      {q.category}
                    </span>
                    <span className="font-headline text-[14px] font-semibold text-white">
                      Question #{q.id}: {q.question.slice(0, 75)}...
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-headline font-bold text-success text-[14px]">
                      {q.score || 85}%
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-white/50">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-obsidian-border text-[13px] space-y-3 bg-dark-surface/50">
                    <div>
                      <span className="text-white/50 font-medium">Full Question: </span>
                      <span className="text-white font-medium">"{q.question}"</span>
                    </div>
                    <div className="p-3 rounded-lg bg-obsidian-card border border-obsidian-border-sub text-white/80">
                      <div className="text-primary font-semibold text-[12px] mb-1">AI Evaluator Feedback:</div>
                      <p className="text-[12px] leading-relaxed">
                        Excellent explanation of core concepts. You effectively outlined internal mechanics and time complexities. For full points, consider proactively mentioning thread safety (e.g. ConcurrentHashMap vs Collections.synchronizedMap).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
