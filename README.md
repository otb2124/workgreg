# WorkGreg Monorepo

A cross-platform desktop job-fetching application built with a modern monorepo architecture. It packages an Angular frontend and a Python FastAPI backend into a single, seamless native Windows desktop executable using Tauri v2 sidecar orchestration.

---

## Architecture Overview

* **Frontend (`workgreg-app`):** Angular standalone components utilizing modern `@if` and `@for` native control flow syntax.
* **Backend (`workgreg-api`):** Python FastAPI service responsible for job scraping, API routes, and data aggregation.
* **Desktop Orchestrator:** Tauri v2 Rust shell that manages window rendering and automatically handles the child lifecycle (`spawn`/`kill`) of the PyInstaller-compiled Python sidecar.

---

## Directory Structure

```text
workgreg/
├── workgreg-api/            # FastAPI Python backend
│   ├── main.py              # Application entrypoint
│   ├── venv/                # Python virtual environment (ignored)
│   └── .gitignore           # Backend-specific ignore rules
│
├── workgreg-app/            # Angular + Tauri frontend
│   ├── src/                 # Angular source code
│   ├── src-tauri/           # Rust shell & Tauri configuration
│   │   ├── bin/             # Location for compiled PyInstaller binary
│   │   ├── capabilities/    # Tauri security & sidecar permissions
│   │   └── src/lib.rs       # Rust process management logic
│   └── .gitignore           # Frontend-specific ignore rules
│
├── package.json             # Root monorepo orchestrator
└── .gitignore               # Monorepo root ignore rules

```

---

## Development Setup

### Prerequisites

* **Node.js:** v18+ & `npm`
* **Python:** v3.10+
* **Rust Toolchain:** Installed via `rustup`
* **C++ Build Tools:** Visual Studio Build Tools with C++ workload (Windows)

### Initial Setup

1. **Clone the repository:**
```powershell
git clone <repository-url>
cd workgreg

```


2. **Install Frontend Dependencies:**
```powershell
cd workgreg-app
npm install
cd ..

```


3. **Set up Python Virtual Environment:**
```powershell
cd workgreg-api
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn pyinstaller
cd ..

```



---

## Running in Development Mode

Run both the Angular frontend (with Tauri dev window) and the FastAPI backend concurrently with a single command from the project root:

```powershell
npm run dev

```

* **Angular UI:** `http://localhost:1420`
* **FastAPI Backend:** `http://127.0.0.1:8000`

---

## Production Build & Packaging

To compile the entire application into a standalone Windows installer (`.exe`):

```powershell
npm run build:app

```

### What this script does automatically:

1. Compiles `workgreg-api` into a single binary executable using **PyInstaller**.
2. Copies and renames the binary to `workgreg-app/src-tauri/bin/app-backend-x86_64-pc-windows-msvc.exe`.
3. Builds the Angular production bundle.
4. Compiles the Rust executable, embedding both the frontend assets and backend sidecar into the installer.

**Output Executable Location:**

`workgreg-app/src-tauri/target/release/bundle/nsis/workgreg-app_0.1.0_x64-setup.exe`

---

## Useful Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Launches concurrent dev servers for backend and frontend. |
| `npm run build:app` | Executes full end-to-end production build pipeline. |
| `git check-ignore -v <path>` | Debugs Git tracking and `.gitignore` matching rules. |

```

```
