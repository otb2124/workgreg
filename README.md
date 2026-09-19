# WorkGreg Client (`workgreg-app`)

**WorkGreg** is a web-first job aggregation and intelligence platform that consolidates postings across multiple platforms into a single, deduplicated feed[cite: 2].

This repository contains the standalone frontend workspace built with **Angular 19+**[cite: 2]. It is designed as a single codebase that can be deployed as a standard web application or packaged into a cross-platform desktop application using **Tauri v2**[cite: 2].

> **Note:** The backend service (`workgreg-api`) has been moved to its own repository. This client communicates with the backend via REST API endpoints authenticated with JWT bearer tokens[cite: 2].

---

## 🏗️ Architecture Overview

* **Frontend Framework:** Angular 19+ Single Page Application (SPA) using signal-based state management and native control flow syntax (`@if`, `@for`)[cite: 2].
* **Desktop Wrapper:** Tauri v2 Rust shell that packages the compiled Angular application into a lightweight desktop executable[cite: 2].
* **Backend Integration:** Connects externally to the cloud-hosted `workgreg-api` (FastAPI + PostgreSQL + pgvector)[cite: 2].

---

## 📁 Directory Structure

```text
workgreg-app/
├── workgreg-app/            # Main Angular application & Tauri configuration
│   ├── src/                 # Angular SPA source code
│   ├── src-tauri/           # Tauri v2 Rust desktop shell configuration
│   └── package.json         # Angular dependencies & build configs
│
├── package.json             # Root workspace runner
└── README.md                # Client documentation

```

---

## ⚙️ Development Setup

### Prerequisites

* **Node.js:** v18+ & `npm`
* **Rust Toolchain:** Installed via `rustup` *(only required if running or building the Desktop app)*
* **Backend API:** An active instance of `workgreg-api` running locally or in the cloud



---

### Initial Installation

1. **Clone the repository:**
```powershell
git clone https://github.com/otb2124/workgreg
cd workgreg-app

```


2. **Install Dependencies:**
```powershell
npm install

```



---

## 🚀 Development Execution

### 1. Web Development (Default)

Launches the Angular web application development server:

```powershell
npm run dev

```

*(Or explicitly: `npm run dev:web`)*

* **Web UI:** `http://localhost:4200`

---

### 2. Desktop Development (Tauri Shell)

Launches the Angular application inside a native Tauri desktop window:

```powershell
npm run dev:desktop

```

---

## 📦 Production Builds

### Build Web Bundle

Compiles the production-ready Angular SPA assets for web deployment:

```powershell
npm run build:web

```

### Build Desktop Installer

Packages the Angular application into a standalone desktop executable (`.exe` / installer):

```powershell
npm run build:desktop

```

---

## 📜 Available Scripts Reference

| Command | Description |
| --- | --- |
| `npm run install` | Installs dependencies in the `workgreg-app` workspace. |
| `npm run dev` | Runs the Angular web development server (`dev:web`). |
| `npm run dev:web` | Starts the local Angular development server. |
| `npm run dev:desktop` | Launches the Tauri desktop app in development mode. |
| `npm run build` | Default build script (runs `build:web`). |
| `npm run build:web` | Generates web production assets (`dist/`). |
| `npm run build:desktop` | Compiles the native desktop executable via Tauri v2.
