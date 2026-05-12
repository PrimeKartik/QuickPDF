# QuickPDF | Tactical Document Engine

Welcome to **QuickPDF**, a cutting-edge mini toolkit engineered for immediate document synthesis and optimization. Built with a stunning "Kinetic HUD" front-end, QuickPDF allows operators to securely convert Word documents (`.docx`) into pristine PDF files, and seamlessly merge sequential PDF assets into a unified protocol.

---

## 🔥 Features
*   **Word to PDF Conversion:** Instantly synthesizes `.docx` resources into Ultra-HD PDF outputs.
*   **Merge Sequencing:** Drag-and-drop multiple `.pdf` modular files and order them for a fused continuous extraction.
*   **Kinetic Aesthetics:** A premium, glass-morphic UI interface built from heavily customized Tailwind CSS primitives.
*   **Secure Stateless Operations:** Zero traces left on the hard drive. Extracted artifacts are securely handled via temporary buffer streaming and instantly wiped off the file system upon successful transmission.

---

## 🛠️ Architecture

*   **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons + React-Dropzone.
*   **Backend**: Node.js + Express + Multer.
*   **Engines**: 
    *   `libreoffice-convert` dynamically executing OS-level `soffice` binaries.
    *   `pdf-lib` for programmatic multi-layer PDF fusion and slicing.

---

## 🚀 Environment Setup (Local Deploy)

Because this tactical app relies on LibreOffice Core packages, ensure you have LibreOffice installed on your workstation. By default, the Windows local development flow expects `soffice.exe` to reside at `C:\Program Files\LibreOffice\program\soffice.exe`.

### 1. Initialize the Backend
1. Open a terminal and navigate to the backend engine node.
   ```bash
   cd backend
   ```
2. Install mission-critical dependencies.
   ```bash
   npm install
   ```
3. Boot the Express API Server.
   ```bash
   node server.js
   ```
   *Your backend is now actively listening on port `3001`.*

### 2. Initiate the GUI Interface (Frontend)
1. Open a secondary terminal split.
   ```bash
   cd frontend
   ```
2. Inject front-end modules.
   ```bash
   npm install
   ```
3. Spin up the Vite HMR reactor.
   ```bash
   npm run dev
   ```
   *Interface deployed to `localhost:5173`.* Open this URL in Chrome/Edge/Firefox to execute operations.

---

## ☁️ Online Deployment Protocols

### Backend (Dockerizing on Railway / Render)
The Express backend relies heavily on an OS kernel feature (LibreOffice). Deploying traditional NodeJS services (like Vercel API or standard Heroku) isn't sufficient.
To accommodate this, the codebase contains a specialized `Dockerfile`.

1.   Push the entire repository up to GitHub.
2.   Log-in to a robust Docker host (e.g., [Railway](https://railway.app/)).
3.   Deploy from GitHub. The server recognizes the root `Dockerfile` and builds a Debian-Linux shell, installing `Node.js 20` alongside `libreoffice-core`.
4.   Take your final deployment endpoint URL (e.g., `https://my-quickpdf-engine.up.railway.app`).

### Frontend (Vercel / Netlify / Pages)
1.   Take the Railway Endpoint URL.
2.   In `frontend/src/components/WordToPdf.jsx` & `MergePdf.jsx`, refactor the hard-coded `http://localhost:3001` mapping to point dynamically to your newly generated URL.
3.   Connect the `frontend` directory inside Vercel, targeting standard Vite build parameters (`npm run build`).

---

**Protocol Access: AUTHORIZED.** 
