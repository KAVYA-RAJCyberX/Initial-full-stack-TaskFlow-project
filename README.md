# TaskFlow - Full Stack Task Management System

**TaskFlow** is a modern **task management application** with user authentication, CRUD operations for tasks, and a responsive dashboard built for productivity.

---

## 🏗️ Tech Stack

**Backend:** Node.js + Express + MongoDB + JWT  
**Frontend:** React + Vite + Tailwind CSS  
**Database:** MongoDB  
**Auth:** JWT Tokens  
**API:** RESTful (versioned `/api/v1/`)

---

## 🚀 Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete (CRUD) tasks
- Task filtering by status/priority
- Responsive Dashboard with Task Stats
- JWT-protected API endpoints
- Real-time UI updates
- Password hashing with bcrypt
- CORS enabled & ready for production

---

## 🗂️ Project Structure

taskflow-fullstack/
├── README.md
├── .gitignore
├── backend/
│ ├── package.json
│ ├── server.js
│ ├── app.js
│ ├── .env.example
│ ├── config/connectdb.js
│ ├── models/User.js
│ ├── models/Task.js
│ ├── controllers/auth.controller.js
│ ├── controllers/task.controller.js
│ ├── routes/auth.routes.js
│ ├── routes/task.routes.js
│ └── middlewares/auth.middleware.js
│ middlewares/error.middleware.js
├── frontend/
│ ├── package.json
│ ├── vite.config.js
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── index.css
│ ├── api.js
│ ├── Dashboard.jsx
│ ├── pages/Login.jsx
│ ├── pages/Signup.jsx
│ └── components/
│ ├── Navbar.jsx
│ ├── StatsCard.jsx
│ ├── TaskList.jsx
│ └── TaskModal.jsx
├── postman_collection.json
└── deployment-notes.md

---

## ⚡ Quick Start

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

---

### Backend Setup

````bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev

Server runs at: http://localhost:5000


---

### Frontend Setup

```bash
Copy code
cd frontend
npm install
npm run dev

Frontend runs at: http://localhost:5173

---

API Documentation

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | /api/v1/auth/register | Register new user     |
| POST   | /api/v1/auth/login    | Login & get JWT token |

---

Task Endpoints (Protected)

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | /api/v1/tasks     | Get all tasks for user |
| POST   | /api/v1/tasks     | Create a new task      |
| PUT    | /api/v1/tasks/:id | Update task by ID      |
| DELETE | /api/v1/tasks/:id | Delete task by ID      |

---

🛡️ Security Features

Password hashing with bcrypt

JWT authentication

Protected routes

Environment variables (.env)

CORS enabled

---

🚀 Deployment Plan

Backend: Render / Railway / Heroku + MongoDB Atlas
Frontend: Vercel / Netlify
Production: PM2 + Nginx + Redis caching

---

🏋️ Scalability

Horizontal scaling with PM2 clusters

Redis caching for frequent queries

Microservices architecture possible

Load balancer with Nginx

Database sharding for millions of tasks

---

📈 Live Demo (Local)

Backend: http://localhost:5000

Frontend: http://localhost:5173

---

👨‍💻 Author

Kavyaraj Singh Chouhan
Full Stack Developer | React + Node.js Enthusiast

---