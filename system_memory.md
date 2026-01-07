# CuePoint AI - System Memory 🧠

## 🚀 Project Overview
**CuePoint AI** is the "Operating System for Modern Music Creators." It is a unified ecosystem for music creators, from studio to stage, leveraging AI agents to enhance creativity through four core modules: Setlist Architect, Track Doctor, Discovery Engine, and Collab Hub.

### 🏗️ Technical Architecture
- **Frontend**: React (Vite) + Tailwind CSS + HeroIcons.
- **Backend**: FastAPI (Python) + SQLAlchemy ORM.
- **Task Queue**: Celery + Redis (for async AI simulations).
- **Database**: PostgreSQL.
- **Storage**: MinIO (S3-compatible) for audio files and assets.
- **Infrastructure**: Fully Dockerized (6 services).

---

## 🎨 Design System & UI Details
Adherence to these specs is **critical** for brand consistency.

### 1. Brand Philosophy
- **Aesthetic**: Futuristic sci-fi, glassmorphism, and high-end studio hardware feel.
- **Tone**: Professional, precise, and tech-forward.
- **"The Activation Sequence"**: Login/Signup isn't a form; it's a "system initialization."

### 2. Color Palette (Dark Mode Primary)
- **Void Black (#0A0A0F)**: Primary background. Deep, immersive.
- **Electric Cyan (#00F2FE)**: Brand primary. Actions, highlights, active states.
- **Signal Pink (#FF3366)**: Accent color. Alerts, "Live" indicators, errors.
- **Deep Navy (#1A1A2E)**: Panels, cards, sidebars.
- **Off-White (#EAEAEA)**: Primary text.
- **Muted Silver (#8D8D9B)**: Secondary text/metadata.

### 3. Typography
- **Headings**: Poppins (Bold/Semi-Bold).
- **Body/Labels**: Inter (Regular/Medium).
- **Data/Mono**: JetBrains Mono (Technical readouts).

### 4. "Wow Factor" Components
- **The Floating Pod**: Frosted glass (`backdrop-blur-[20px]`) centered login/signup container.
- **Track Doctor Radial**: Concentric rings visualizing Mix Clarity, Low-End, etc., with a central grade.
- **Setlist Timeline**: Horizontal sequence with an **Energy Arc SVG** and harmonic compatibility lines.
- **Micro-interactions**: Staggered fades, pulsing cue points, and glowing input focus borders.

---

## ✅ Current Progress (Update: Jan 7, 20:18)
- [x] **Infra**: Docker Compose service-ready. Added `web-client/Dockerfile`.
- [x] **Auth**: "Activation Sequence" screens (Login/Signup) fully functional with generative backgrounds.
- [x] **Dashboard**: Stat-counting Command Center implemented.
- [x] **Module 1 (Setlist Architect)**: Timeline + Energy Arc SVG completed.
- [x] **Module 2 (Track Doctor)**: Radial metrics + spectral scan animation completed.
- [x] **Module 3 (Discovery Engine)**: Marketplace grid + AI seed recommendations.
- [x] **Module 4 (Collab Hub)**: Discord-style forum/projects/messaging layout.

## 🏎️ Roadmap: Phase 2 (Ignition)
1. **Auth Integration**: Connect frontend to FastAPI `/token` for real persistence.
2. **Signal Live-Processing**: Integrate actual MinIO uploads for Track Doctor.
3. **Interactive Visuals**: Make radial Rings clickable to show spectrum charts.

## 📍 Coding Notes & Constraints
- **Universal CSS**: All components must use tokens defined in `index.css`.
- **Git Strategy**: Commit every 2 mins during active work.
- **Current SHA**: `3ef1469` (pre-snapshot update).
