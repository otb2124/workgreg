# WorkGreg Client (`workgreg-app`)

**WorkGreg** is a web-first job aggregation and intelligence platform that consolidates job listings across multiple platforms into a single, deduplicated feed[cite: 2].

This repository contains the standalone frontend workspace built with **Angular**[cite: 2]. It is designed as a single codebase that can be deployed as a standard web application or packaged into a cross-platform desktop application using **Tauri v2**[cite: 2].

---

## 🏗️ Architecture Overview

* **Frontend Framework:** Angular Single Page Application (SPA) using signal-based state management and modern native control flow syntax (`@if`, `@for`)[cite: 2].
* **Desktop Wrapper:** Tauri v2 Rust shell that packages the compiled Angular application into a lightweight native desktop executable[cite: 2].
* **Backend Integration:** Connects externally to the cloud-hosted `workgreg-api`[cite: 2].

---

## 📁 Repository Structure

```text
workgreg-app/
├── src/                     # Angular SPA source code
│   ├── app/                 # Components, services, and route views
│   └── assets/              # Static media and global styles
├── src-tauri/               # Tauri v2 Rust desktop shell configuration
│   ├── capabilities/        # Desktop window permissions
│   ├── src/                 # Rust entrypoint (lib.rs)
│   └── tauri.conf.json      # Tauri app metadata and window settings
├── package.json             # Application scripts & dependencies
└── README.md                # Client documentation

```

---

## ⚙️ Development Setup

### Prerequisites

* **Node.js:** v18+ & `npm`
* **Rust Toolchain:** Installed via `rustup` *(required only if running or building the Desktop app)*
* **Backend API:** An active instance of `workgreg-api` running locally or in the cloud



---

### Initial Setup

1. **Clone the repository:**
```powershell
git clone https://github.com/otb2124/workgreg-app.git
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

Compiles the production-ready Angular SPA assets for web hosting:

```powershell
npm run build:web

```

### Build Desktop Installer

Packages the Angular application into a standalone native desktop installer/executable:

```powershell
npm run build:desktop

```

---

## 📜 Available Scripts Reference

| Command | Description |
| --- | --- |
| `npm run start` / `npm run start:web` | Runs `ng serve` for web development. |
| `npm run start:desktop` | Runs `tauri dev` to open the app in a Tauri window. |
| `npm run dev` | Alias for `npm run dev:web` (runs `npm run start:web`). |
| `npm run dev:web` | Launches the local Angular web development server. |
| `npm run dev:desktop` | Launches the Tauri desktop application in development mode. |
| `npm run build` / `npm run build:web` | Generates web production assets via `ng build`. |
| `npm run build:desktop` | Compiles the native desktop executable via `tauri build`.
| `npm run watch` | Runs `ng build --watch` for continuous development builds. |
