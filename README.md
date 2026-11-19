# AI Interview Pro (AiInterviewReviewer)

An intelligent, AI-powered mock interview practice platform designed to help candidates prepare, perform, and progress through technical, behavioral, and system design interviews. Built from the Stitch "Full UI Design Prototype" design system.

## 🚀 Prototype & Design System Features

- **Obsidian Dark Palette & Wave Aesthetics**: Custom obsidian cards (`#141418`, `#1B1B22`), obsidian borders (`#27262E`), with radiant primary orange (`#FF6B00`) and amber (`#FFA000`) highlights.
- **Typography**: Afacad Flux (headlines & display titles), Instrument Sans (body & labels), and Spline Sans Mono (code & telemetry).
- **Google Material Symbols Outlined Icons**: Integrated high-fidelity glyphs.
- **Full SPA Navigation & State Management**: Seamless transitions across all platform sections with persistent configuration and live evaluation factors.

## 📱 Implemented Pages & Workflows

1. **Dashboard (`/dashboard` or `/`)**
   - Obsidian ambient glow backdrop
   - Hero Welcome Banner featuring Elephant Mascot (`cute_elephant_laptop.jpg`) and direct CTA
   - 3 Glanceable Metric Stat Cards: Interviews Done (12), Avg Score (78%), and Improvement (+12%)
   - Recent Activity feed with scores and report quick-links
   - Interactive Practice Goal radial donut meter (75% weekly progress, 3 of 8 completed)

2. **Interview Setup (`/interview/setup`)**
   - Resume Upload Dropzone with drag-and-drop, PDF/DOCX file picker, and file badge preview
   - Job Description input textarea
   - 3 Dropdown Selectors: Experience Level, Difficulty Level, and Target Package
   - Interview Type selector chips (Technical, HR, Behavioral, Mixed)
   - "Enable Coding Questions" animated pill toggle
   - Quick Tips guidance sidebar

3. **Live Interview Room (`/interview/room`)**
   - Live blinking badge, active stopwatch timer, and question progress stepper (e.g. Question 2 / 5)
   - AI Interviewer Video frame (`interviewer_woman.jpg`) with speech bubble overlay displaying questions
   - Call controls: Mic mute toggle, Camera toggle, End Call, and Fullscreen toggle
   - AI Tips collapsible coaching card
   - Tabbed Interactive Workspace:
     - **Coding IDE**: Language switcher (Python, JavaScript, Java, C++), code line numbering, editable buffer, Run button with simulated test runner, and Submit action
     - **Notepad**: Scratchpad for notes and algorithmic diagrams
     - **Resources**: Core cheat sheets and complexity references
   - AI Progress Telemetry card with radial completion donut and real-time evaluation factors (Communication, Technical Knowledge, Problem Solving, Confidence)

4. **Interview Report & Dossier (`/report`)**
   - Overall Score Hero Card (84%, "Excellent Performance!" badge)
   - Download Report button with JSON/Dossier export
   - 3-Column Performance Matrix:
     - Strengths vs. Areas to Improve
     - Question-wise Analysis score progress bars (Technical Concepts, Coding Skills, Communication, Problem Solving)
     - Next Steps & Mascot Celebration Trophy (`elephant_graduation_star.jpg`)
   - Expandable Question-by-Question critique breakdown

5. **Subscription & Pricing (`/subscription`)**
   - Billing cycle toggle (Monthly vs. Yearly with 20% discount)
   - 3 Tier Pricing Cards: Free (₹0), Pro (₹299/mo, "Most Popular" glow card), and Enterprise (₹999)
   - Feature checklists and interactive Pro upgrade modal with celebratory confetti

6. **Settings (`/settings`)**
   - Vertical navigation tabs: Profile, AI Configuration, Integrations, Preferences, Privacy & Security
   - AI Provider setup: OpenAI / Claude / Gemini API key inputs, interactive connection tester, model selector (GPT-4o, Claude 3.5 Sonnet, etc.), and voice persona selection

7. **Analytics (`/performance-analytics`) & History (`/my-interviews`)**
   - Complete competency radar, historical practice logs, and filterable session records

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS + Custom Obsidian Design Tokens
- **Icons**: Material Symbols Outlined + Lucide React
- **Confetti**: canvas-confetti

## 🏃 Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
git clone https://github.com/rateshrake/AiInterviewReviewer.git
cd AiInterviewReviewer
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```
