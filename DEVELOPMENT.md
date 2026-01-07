# Development Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local frontend dev outside container)
- Python 3.10+ (for local backend dev outside container)

## Quick Start (Docker)
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd cuepoint-ai
   ```

2. **Start the environment**:
   ```bash
   docker-compose up --build
   ```
   This starts:
   - API Service: http://localhost:8000
   - Web Client: http://localhost:5173
   - MinIO Console: http://localhost:9001
   - PostgreSQL & Redis

3. **Access the App**:
   Open a browser to `http://localhost:5173`.

## Local Development (Hybrid)
To run services individually:
1. Start infrastructure (DB, Redis, MinIO):
   ```bash
   docker-compose up -d postgres redis minio
   ```
2. Run API Service:
   ```bash
   cd api-service
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
3. Run Web Client:
   ```bash
   cd web-client
   npm install
   npm run dev
   ```
