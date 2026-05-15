# 📞 Phone Screening Platform

**🚀 Live Demo:** [https://phone-screening-platform.onrender.com](https://phone-screening-platform.onrender.com)

A modern, fast, and sleek Next.js application built to streamline the preliminary recruitment process. This platform allows recruiters to effortlessly generate context-aware interview questions, manage active jobs, and collect both text and audio responses from candidates via unique public links.

## ✨ Features

### 🏢 For Recruiters
- **Dynamic Dashboards**: View vital statistics and manage all open roles, applicants, and generated screenings.
- **AI-Powered Generation**: Instantly generate 5-8 tailored interview questions based on the specific job role.
- **Rich Question Editing**: 
  - Inline text editing
  - Drag-and-drop question reordering
  - Support for custom questions
  - Define expected response types (`Text` or `Audio`)
- **Seamless Sharing**: Generate unique, public screening URLs for each job and copy them directly to the clipboard.
- **Applicant Management**: Review all applicant submissions and their respective answers in a clean tabular view.

### 👤 For Candidates
- **Step-by-Step Flow**: A stress-free, paginated interview experience.
- **Native Audio Recording**: Built-in `MediaRecorder` integration allows candidates to seamlessly record and playback their verbal responses directly within the browser.
- **Responsive Design**: Polished, mobile-friendly interface built with Tailwind CSS and Framer Motion.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Persistence**: Browser `localStorage` (No database required for local execution)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need Node.js installed on your machine.
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/phone-screening-platform.git
   ```

2. Navigate into the project directory:
   ```bash
   cd phone-screening-platform
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

**🌟 [CLICK HERE TO VIEW THE LIVE DEPLOYED PLATFORM](https://phone-screening-platform.onrender.com) 🌟**

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/phone-screening-platform/issues).

## 📄 License

This project is licensed under the MIT License.
