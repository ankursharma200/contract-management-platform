# Contract Management Platform (MERN Stack)

A full-stack Contract Management Platform built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This application manages the complete lifecycle of contracts—from blueprint creation to final signature—enforcing strict state transitions and immutable audit logs.

## 🚀 Live Demo & Repository
- **GitHub Repo:** https://github.com/ankursharma200/contract-management-platform
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

## 🛠 Setup Instructions

Prerequisites:

-> Node.js (v18+)

 -> MongoDB (Local or Atlas URI)

  # 1. Backend Setup

  cd backend

  npm install

  Create a .env file with: MONGO_URI=your_mongodb_connection_string

  npm run dev

  The server will start on port 5000.

  # 2. Frontend Setup
   
   cd frontend

   npm install

   npm run dev

   The application will start on port 5173.

   ## 📂 Project Structure


```bash
contract-management-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Logic for API endpoints
│   │   ├── models/        # Mongoose Schemas (Blueprint, Contract)
│   │   ├── routes/        # API Route definitions
│   │   └── server.ts      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, Create Contract, Details
│   │   ├── services/      # Axios API calls
│   │   └── App.tsx        # Routing
└── README.md
