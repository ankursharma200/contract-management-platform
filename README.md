# Contract Management Platform (MERN Stack)

A full-stack Contract Management Platform built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This application manages the complete lifecycle of contracts—from blueprint creation to final signature—enforcing strict state transitions and immutable audit logs.

## 🚀 Live Demo & Repository
- **GitHub Repo:** https://github.com/ankursharma200/contract-management-platform
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 🏗 Architecture Overview

The application follows a **Monorepo** structure with a clear separation of concerns:

```mermaid
graph TD
    User[User / Client] -->|HTTPS| Frontend[Frontend (React + Vite)]
    Frontend -->|REST API| Backend[Backend (Node.js + Express)]
    Backend -->|Mongoose| DB[(MongoDB)]

## 🛠 Setup Instructions

Prerequisites:

-> Node.js (v18+)

 -> MongoDB (Local or Atlas URI)

  # 1. Backend Setup
  
