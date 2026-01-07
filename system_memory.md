# CuePoint AI - System Memory 🧠

## 🚀 Project Overview
**CuePoint AI** is the "Operating System for Modern Music Creators." It is a unified ecosystem for music creators, from studio to stage, leveraging AI agents to enhance creativity through four core modules: Setlist Architect, Track Doctor, Discovery Engine, and Collab Hub.

### 🏗️ Technical Architecture
- **Frontend**: React (Vite) + Tailwind CSS + HeroIcons.
- **Backend**: FastAPI (Python) + SQLAlchemy ORM (Custom) | **Auth**: Supabase Integration (Provided Jan 7).
- **Task Queue**: Celery + Redis (for async AI simulations).
- **Database**: PostgreSQL (Docker) & Supabase for user auth.
- **Storage**: MinIO (S3-compatible) for audio files and assets.
- **Infrastructure**: Fully Dockerized (6 services).

---

## 🎨 Design System & UI Details
### 1. Brand Philosophy
- **Aesthetic**: Futuristic sci-fi, glassmorphism, and high-end studio hardware feel.
- **Tone**: Professional, precise, and tech-forward.
- **"The Activation Sequence"**: Login/Signup is a "system initialization" flow.

### 2. Color Palette (Dark Mode Primary)
- **Void Black (#0A0A0F)**: Primary background.
- **Electric Cyan (#00F2FE)**: Brand primary.
- **Signal Pink (#FF3366)**: Accent color.
- **Deep Navy (#1A1A2E)**: Panels/Cards.

---

## ✅ Current Progress (Update: Jan 7, 20:25)
- [x] **Infra**: Docker Compose service-ready. Fixed `web-client` Build conflicts.
- [x] **Auth Prototype**: "Activation Sequence" screens (Login/Signup) fully functional with generative backgrounds.
- [x] **Modules**: Setlist Architect, Track Doctor, Discovery, and Collab Hub implemented as high-fidelity prototypes.
- [x] **Credentials**: Supabase credentials stored in `web-client/.env` for real auth integration.

## 🏎️ Roadmap: Phase 2 (Ignition)
1. **Supabase Integration**: Replace mock login with real Supabase Auth using the provided service role and project ref.
2. **Signal Live-Processing**: Integrate actual MinIO uploads for Track Doctor.
3. **Interactive Visuals**: Make radial Rings clickable to show spectrum charts.

## 📍 Coding Notes & Constraints
- **Universal CSS**: All components must use tokens defined in `index.css`.
- **Model Continuity**: UI Specs and System Overview are permanently baked into this file for AI resume.
- **Git Strategy**: Commit/Push every 2 mins during active work.
- **Current SHA**: `7478d81` -> `3ef1469` (Auth credential snapshot).
