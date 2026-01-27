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

## ✅ Current Progress (Update: Jan 27, 11:30)
- [x] **Auth Integration**: Supabase client initialized and integrated into `Login.tsx` and `Signup.tsx`.
- [x] **Global State**: `AuthContext` and `AuthProvider` implemented to manage real-time sessions.
- [x] **Infrastructure Fixes**: Created missing `index.html`, `main.tsx`, and `Dockerfile` for `web-client`.
- [x] **Dependency Conflict Resolved**: Added `--legacy-peer-deps` flag to `web-client/Dockerfile`.
- [x] **Auth Architecture Simplified**: Removed internal JWT system, using Supabase-only auth.
- [x] **API Client Created**: `api.ts` with Supabase token interceptor for all backend calls.
- [x] **Backend Auth Updated**: Created `supabase_auth.py` for JWT verification.
- [x] **UI Overhaul (Cyber-Analogue)**: Refactored `PlayerBar.tsx` with "Glass Cockpit" design, tactile controls, and holographic waveform.
- [x] **UX Improvements**: Made `RightPanel.tsx` unpinnable/collapsible via `DashboardLayout`.
- [x] **Metric Relocation**: Moved system stats (CPU, SSD, Latency) from RightPanel to PlayerBar for better spatial efficiency.
- [ ] **Docker Stack Verification**: Pending test of `docker-compose up --build`.

## 🏎️ Roadmap: Phase 2 (Ignition)
1. ~~Fix Dependency Conflicts~~: ✅ COMPLETE
2. ~~Resolve Dual Auth Integration~~: ✅ COMPLETE  
3. **Verify Server Ignition**: Test Docker stack startup (NEXT)
4. **Auth Guard Verification**: Implement protected routes
5. **MinIO Connection**: Transition Track Doctor to real file uploads.

## 📍 Coding Notes & Constraints
- **Model Continuity**: UI Specs and System Overview are permanently baked into this file.
- **Dependency Handling**: `web-client` uses `--legacy-peer-deps` for React 18 compatibility.
- **Auth Strategy**: Simplified to Supabase-only (removed internal JWT system).
- **Supabase JWT Secret**: Must be set in `docker-compose.yml` before running (get from Supabase dashboard).
- **Git Strategy**: Commit/Push every snapshot to ensure state recovery.
- **Current SHA**: `4a3a439` -> `7478d81` -> `Snapshot 06:20` -> `Phase 2.1 Complete`.
