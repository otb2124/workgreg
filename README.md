# WorkGreg Monorepo

**WorkGreg** is a web-first job aggregation and intelligence platform designed to consolidate job postings from multiple platforms into a single, deduplicated feed[cite: 2]. It pairs an **Angular 19+** frontend with a cloud-hosted **FastAPI** backend, utilizing **PostgreSQL + pgvector** for AI-driven semantic vector search and **Redis** for scheduled background scraping tasks[cite: 2].

The repository is structured as a monorepo that supports both standalone Web execution and a native Desktop installer via **Tauri v2**—built directly from the exact same Angular frontend codebase without needing separate desktop logic[cite: 2].

---

## 🏗️ Architecture Overview

* **Frontend (`workgreg-app`):** Web-first Angular 19+ SPA using modern `@if` and `@for` native control flow syntax[cite: 2]. It communicates exclusively with the FastAPI backend over REST using JWT Bearer authentication[cite: 2].
* **Desktop Wrapper (`src-tauri`):** A lightweight Tauri v2 shell that packages the compiled Angular Web distribution into a native desktop container[cite: 2].
* **Backend API (`workgreg-api`):** Python FastAPI service delivering REST endpoints for user authentication, job filtering, cloud profile presets, and vector search orchestration[cite: 2].
* **Data & Search Tier:** Hosted PostgreSQL instance with `pgvector` for co-located relational data and semantic embedding queries, alongside Redis for async Playwright scraper task queues[cite: 2].

---

## 📁 Directory Structure

```text
workgreg/
├── workgreg-api/            # FastAPI Python 3.10+ backend service
│   ├── main.py              # Backend entrypoint
│   ├── requirements.txt     # Python dependencies
│   ├── venv/                # Python virtual environment (git-ignored)
│   └── .gitignore           # Backend-specific ignore rules
│
├── workgreg-app/            # Angular 19+ SPA + Tauri v2 wrapper
│   ├── src/                 # Angular web application source code
│   ├── src-tauri/           # Tauri v2 Rust shell configuration
│   └── .gitignore           # Frontend-specific ignore rules
│
├── package.json             # Monorepo root script orchestrator
└── README.md                # Monorepo documentation

```

---

## ⚙️ Development Setup

### Prerequisites

* **Node.js:** v18+ & `npm`
* **Python:** v3.10+
* **Rust Toolchain:** Installed via `rustup` *(only required if developing/testing the Desktop Tauri shell)*
* **PostgreSQL:** Instance running with `pgvector` extension enabled


* **Redis:** Running instance for task queues



---

### Initial Setup & One-Command Installation

1. **Clone the repository:**
```powershell
git clone https://github.com/otb2124/workgreg
cd workgreg

```


2. **Install All Dependencies (Frontend & Backend):**
Run the root automated installer command to set up Node modules and the Python virtual environment with `requirements.txt` in a single step:
```powershell
npm run install

```



*(Alternatively, you can install individually with `npm run install:frontend` or `npm run install:backend`.)*

---

## 🚀 Running in Development Mode

The root `package.json` provides simple concurrent commands using `concurrently` to run the Python backend alongside either the Web or Desktop frontend target.

### 1. Web Development (Default)

Runs the Python FastAPI backend and the Angular Web application concurrently:

```powershell
npm run dev

```

*(Or explicitly: `npm run dev:web`)*

* **Angular Web App:** `http://localhost:4200`
* **FastAPI Docs:** `http://127.0.0.1:8000/docs`

---

### 2. Desktop Development (Tauri Shell)

Runs the Python FastAPI backend and launches the Tauri v2 Desktop wrapper window:

```powershell
npm run dev:desktop

```

---

### 3. Individual Component Execution

If you prefer running services in separate terminal windows:

* **Backend Only:**
```powershell
npm run start:backend

```


* **Angular Web Frontend Only:**
```powershell
npm run start:frontend:web

```


* **Tauri Desktop Window Only:**
```powershell
npm run start:frontend:desktop

```



---

## 📦 Production Packaging

To build the web frontend assets and bundle them into the native Tauri v2 desktop installer:

```powershell
npm run build

```

### Build Process Workflow:

1. Compiles the Angular SPA production build (`ng build`).
2. Bundles the production web dist into the Tauri v2 Rust executable shell.


3. Outputs the desktop installer package (e.g., NSIS installer on Windows).



> **Note:** The backend API (`workgreg-api`) is deployed independently to your cloud server cluster (Docker/Linux container). The desktop executable connects directly to your hosted API endpoints over HTTPS.
> 
> 

---

## 📜 Monorepo Scripts Reference

| Command | Description |
| --- | --- |
| `npm run install` | Creates Python venv, installs Python requirements, and runs `npm install` for Angular. |
| `npm run install:frontend` | Installs frontend dependencies in `workgreg-app`. |
| `npm run install:backend` | Creates virtual environment and installs Python packages in `workgreg-api`. |
| `npm run dev` | Runs backend API & Angular Web UI concurrently (`dev:web`). |
| `npm run dev:web` | Starts backend API (`:8000`) and Angular Web dev server. |
| `npm run dev:desktop` | Starts backend API (`:8000`) and Tauri v2 Desktop window. |
| `npm run start:backend` | Starts the Python FastAPI server locally using virtual environment. |
| `npm run start:frontend:web` | Starts only the Angular web development server. |
| `npm run start:frontend:desktop` | Starts only the Tauri desktop wrapper development mode. |
| `npm run build` | Builds Angular UI and packages the Tauri desktop installer (`build:app`). |
