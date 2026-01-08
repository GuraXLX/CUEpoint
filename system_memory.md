# CuePoint AI - System Memory 🧠

## 🚀 Project Overview
**CuePoint AI** is the "Operating System for Modern Music Creators." It is a unified ecosystem for music creators, from studio to stage, leveraging AI agents to enhance creativity through four core modules: Setlist Architect, Track Doctor, Discovery Engine, and Collab Hub.

### 🏗️ Technical Architecture
- **Frontend**: React (Vite) + Tailwind CSS + HeroIcons.
- **Backend**: FastAPI (Python) + SQLAlchemy ORM (Custom) | **Auth**: Supabase Integration.
- **Task Queue**: Celery + Redis (for async AI simulations).
- **Database**: PostgreSQL (Docker) & Supabase for user auth.
- **Storage**: MinIO (S3-compatible) for audio files and assets.
- **Infrastructure**: Fully Dockerized (6 services).

---

## 🎨 Design System & UI Details
### 1. Brand Philosophy
- **Aesthetic**: Futuristic sci-fi, glassmorphism, and high-end studio hardware feel.
- **"The Activation Sequence"**: Login/Signup is a "system initialization" flow.

### 2. Color Palette (Dark Mode Primary)
- **Void Black (#0A0A0F)**: Primary background.
- **Electric Cyan (#00F2FE)**: Brand primary.
- **Signal Pink (#FF3366)**: Accent color.

---

## ✅ Current Progress (Update: Jan 8, 06:20)
- [x] **Auth Integration**: Supabase client initialized and integrated into `Login.tsx` and `Signup.tsx`.
- [x] **Global State**: `AuthContext` and `AuthProvider` implemented to manage real-time sessions.
- [x] **Infrastructure Fixes**: Created missing `index.html`, `main.tsx`, and `Dockerfile` for `web-client`.
- [!] **Build Blocker**: `npm install` inside the `web-client` container is currently failing due to peer dependency conflicts (React 18 vs library requirements).

## 🏎️ Roadmap: Phase 2 (Ignition)
1. **Fix Dependency Conflicts**: Update `Dockerfile` or `package.json` to handle dependency resolution (e.g., `--legacy-peer-deps`).
2. **Verify Server Ignition**: Successfully start the `web-client` on `:5173`.
3. **Auth Guard Verification**: Test real login/signup flows against Supabase.
4. **MinIO Connection**: Transition Track Doctor to real file uploads.

## 📍 Coding Notes & Constraints
- **Model Continuity**: UI Specs and System Overview are permanently baked into this file.
- **Dependency Handling**: `web-client` requires strict version alignment for React 18 and HeroIcons v2.
- **Git Strategy**: Commit/Push every snapshot to ensure state recovery.
- **Current SHA**: `4a3a439` -> `7478d81` -> `Snapshot 06:20`.
