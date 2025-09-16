# ✅ Team Task Manager – Requirements Document

---

## 📘 Project Overview

**Team Task Manager** is a full-stack web application designed for small to mid-sized teams to manage tasks efficiently. It supports role-based access control (RBAC), email notifications, and task assignment workflows with full CRUD operations.

---

## 🎯 Goals

* Simple but powerful UI for managing tasks
* Role-based permission system (Admin, Manager, Employee, Viewer)
* Email notifications for onboarding and task assignment
* Scalable backend with RESTful APIs
* Frontend using React + Redux + React Router

---

## 🧩 User Roles and Permissions

| Role         | Description                   | Permissions                                              |
| ------------ | ----------------------------- | -------------------------------------------------------- |
| **Admin**    | Superuser, manages everything | Full access: Users, Tasks (CRUD), Roles, System settings |
| **Manager**  | Task/project manager          | Can create and manage tasks, assign to team members      |
| **Employee** | Team member                   | Can view and update their own tasks (status only)        |
| **Viewer**   | Read-only access              | Can only view tasks and users (limited info)             |

---

## 🛠️ Features & Functional Requirements

### 🧑‍💼 Authentication

* [x] User registration (name, email, password)
* [x] User login (returns JWT token)
* [x] JWT-based route protection
* [x] Get current logged-in user (`/me`)

### 👥 User Management (Admin only)

* [x] List all users
* [x] Update user roles
* [x] Delete users
* [x] Send welcome email on registration

### 📋 Task Management

* [x] Create task (Admin, Manager)
* [x] Assign task to users
* [x] View tasks (filtered by role):

  * Admin: all tasks
  * Manager: tasks created by them
  * Employee: tasks assigned to them
  * Viewer: read-only access to all tasks
* [x] Update task:

  * Admin: any
  * Manager: tasks they created
  * Employee: can only update `status`
* [x] Delete task (Admin only)
* [x] Send email when task is assigned

### 📧 Notifications

* [x] Welcome email on registration
* [x] Email on task assignment

---

## 📚 API Endpoints (High-level)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/me`

### Users (Admin only)

* `GET /api/users`
* `PUT /api/users/:id/role`
* `DELETE /api/users/:id`

### Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

## 🗃️ Database Models

### 1. **User**

```js
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (Admin | Manager | Employee | Viewer)
}
```

### 2. **Task**

```js
{
  title: String,
  description: String,
  status: String (Pending | In Progress | Completed),
  dueDate: Date,
  assignedTo: ObjectId (User),
  createdBy: ObjectId (User)
}
```

---

## 🔐 Security & RBAC

* Protected routes using JWT
* Role middleware to restrict access
* Passwords hashed with bcrypt
* Input validation (can be enhanced)

---

## 💡 Optional Future Features

| Feature              | Priority | Notes                               |
| -------------------- | -------- | ----------------------------------- |
| File attachments     | Low      | Upload docs/screenshots to tasks    |
| Comments on tasks    | Medium   | Discussion thread for each task     |
| Notifications page   | Low      | Store and show in-app notifications |
| Task activity logs   | Medium   | Who updated what, when              |
| Dashboard widgets    | Low      | Stats for tasks, users, etc.        |
| Assign by team/group | Medium   | Hierarchical user/team structure    |

---

## 🌐 Tech Stack

| Layer          | Tech                                    |
| -------------- | --------------------------------------- |
| **Frontend**   | React, Redux, React Router              |
| **Backend**    | Node.js, Express, MongoDB (Mongoose)    |
| **Auth**       | JWT, bcrypt                             |
| **Email**      | Nodemailer + Gmail/SMTP                 |
| **API Tool**   | Postman                                 |
| **Deployment** | Optional: Render, Vercel, MongoDB Atlas |

---
