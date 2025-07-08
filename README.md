# Resume Builder App

An interactive resume builder application with a Node.js + Express backend and React frontend. Uses PostgreSQL as the database and Prisma ORM for database management.

---

## 🚀 Features

- User registration and authentication (JWT)
- Build and save multiple resumes
- Responsive and user-friendly UI
- Backend powered by Express and Prisma ORM
- PostgreSQL database for persistent storage

---

## 💻 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- PostgreSQL installed and running
- npm
- Git

---

### Setup Instructions

#### 1. Clone the repository

```bash
git clone <your-repository-url>
cd resume-builder
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a .env file in the backend folder with the following:
```bash
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
JWT_SECRET=your_jwt_secret
```

#### 3.Initialize Prisma and run migrations:

```bash
npx prisma init
npx prisma migrate dev
```

Start the backend server:

```bash
npm start
```

#### 4.Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```
