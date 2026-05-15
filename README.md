# 📞 Phone Screening Platform

**🚀 Live Demo:** [https://phone-screening-platform.onrender.com](https://phone-screening-platform.onrender.com)

A modern, fast, and sleek Next.js application built to streamline the preliminary recruitment process. This platform allows recruiters to effortlessly generate context-aware interview questions, manage active jobs, and collect both text and audio responses from candidates via unique public links.

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Derrickamponsah/Phone_Screening_Platform.git
   cd Phone_Screening_Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Approach

My approach to this project was to prioritize **Visual Excellence, UX, and Type Safety**. I built a highly modular Next.js application leveraging Tailwind CSS for a premium, responsive "blue and white" corporate aesthetic. I utilized `framer-motion` to inject life into the application through micro-interactions and smooth page transitions. 

To handle the core requirement of recruiter-to-candidate communication without a backend, I heavily abstracted browser `localStorage` behind a strongly-typed utility (`src/lib/local-storage.ts`). This ensures seamless state hydration across the application while avoiding server-client hydration mismatches.

---

## 🏗️ What I Built

I successfully implemented all core requirements and several bonus features:

### 1. Recruiter Jobs Dashboard (`/jobs`)
- A grid displaying all seeded jobs with dynamic stats (calculating exact numbers of applicants from storage).
- Search, filter, and sort capabilities.

### 2. Create Phone Screening Flow (`/jobs/create`)
- A robust 5-step flow with simulated AI generation delays.
- **Bonus:** Drag-and-drop question reordering using `framer-motion`.
- **Bonus:** Edit-in-place functionality for questions (inline editing).
- Custom question additions and response type selection (Text/Audio).

### 3. Job Detail & Applicant Management (`/jobs/[jobId]`)
- Job details and dynamic routing to view all submissions for that specific role.
- Generates a dynamic public screening link that auto-detects the current host environment.

### 4. Applicant Review & Analysis (`/jobs/[jobId]/applicants/[applicantId]`)
- Renders specific applicant responses.
- Simulated "Analyze Response" AI feature with loading states and actionable insights.

### 5. Candidate Screening Experience (`/screening/[jobId]`)
- Clean, paginated question-by-question flow.
- Full validation for Name/Email.
- **Massive Bonus:** A fully native, working Audio Recorder using the `MediaRecorder` API. Candidates can record their audio, play it back, delete it, and save it directly to local storage alongside text responses.
- **Bonus:** Beautiful `framer-motion` animations on question transitions.

---

## 🚧 What I Didn't Get To & Why

1. **Unit Testing (Jest/RTL)** 
   - *Why:* I prioritized delivering a highly polished, bug-free UX and implementing complex bonus features (like the native Audio Recorder and drag-and-drop). Writing comprehensive unit tests was skipped to ensure these complex visual features were flawlessly executed within the timeframe.
2. **Light/Dark Mode Toggle**
   - *Why:* The platform was intentionally designed with a strict, premium "blue and white" corporate aesthetic. Introducing a dark mode would require overhauling the bespoke color palettes (like the specific `#0A195E` navy blues) which were carefully tuned for this specific theme.

---

## ⚖️ Trade-Offs Made

1. **`localStorage` vs. Backend Database**
   - I opted to stick strictly to the requested `localStorage` implementation for data persistence. This makes the project incredibly easy to test and deploy instantly on Render without spinning up a PostgreSQL instance, but it means data is highly localized to the specific browser running it. To combat hydration errors from SSR vs Client rendering with `localStorage`, I implemented strict `mounted` states across all dynamic pages.
2. **Bundle Size vs. UX**
   - I aggressively utilized `framer-motion` and `lucide-react`. While this slightly increases the initial client JS bundle size, the trade-off was entirely worth it to achieve the "wow" factor through fluid transitions and high-quality iconography.
3. **Pre-Seeded Submissions**
   - I implemented logic to automatically populate `localStorage` with 12 mock applicant submissions if the storage is entirely empty. This trade-off bypasses the true "empty state" of the dashboard initially, but guarantees that anyone reviewing the project immediately sees a fully fleshed-out, active dashboard reflecting the metrics without having to manually take the test 12 times themselves.

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── applicants/       # Global applicants list
│   ├── jobs/             # Recruiter dashboards and creation flows
│   └── screening/        # Public candidate screening flows
├── components/           # Reusable UI components (Buttons, Inputs, Cards)
├── data/                 # Seed/mock data for Jobs and Submissions
├── hooks/                # Custom React hooks (e.g. Toast notifications)
├── lib/                  # Utilities, Constants, and Local Storage logic
└── types/                # TypeScript interface definitions
```
