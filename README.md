# 🍽️ QueueEase – Smart Restaurant Management Platform (Frontend)

QueueEase is a modern restaurant management platform built during **VibeAthon 6.0 – Vibecoding Hackathon 2026**.

It provides a seamless digital dining experience for customers while helping restaurant staff efficiently manage menus, queues, orders, and billing through an intuitive web interface.

---

# 👥 Team

**Team Name:** TeachEra

**Team Leader:** Aashi (Solo Participant)

**Hackathon:** VibeAthon 6.0 – Vibecoding Hackathon 2026

---

# 🚀 Live Demo

**Frontend**

https://queue-ease-frontend.vercel.app

**Backend API**

https://queueease-backend-ifx3.onrender.com

---

# ✨ Features

## 👤 Customer Features

- Secure Login & Registration
- Email OTP Verification
- Google OAuth Login
- Live Digital Menu
- Real-Time Dish Availability
- Ingredient Transparency
- Category-wise Menu
- AI Dish Recommendations
- Join Virtual Queue
- Live Queue Status Tracking
- Automatic Table Assignment
- Place Orders
- View Live Bill
- Responsive UI

---

## 👨‍🍳 Staff Features

- Staff Login
- Dashboard
- Menu Management
- Add New Menu Items
- Delete Menu Items
- Toggle Item Availability
- Take Customer Orders
- View Table Bills
- Queue Management
- Role-Based Access Control

---

# 📸 Application Flow

### Customer

```
Login/Register
        ↓
Browse Menu
        ↓
Join Queue
        ↓
Receive Table
        ↓
Order Food
        ↓
View Bill
```

### Staff

```
Login
      ↓
Dashboard
      ↓
Manage Menu
      ↓
Take Orders
      ↓
View Bills
      ↓
Manage Restaurant
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Context API

---

## Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Google OAuth2
- Spring Data JPA
- MySQL (Aiven Cloud)
- REST APIs

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → Aiven MySQL

---

# 📁 Project Structure

```
src
│
├── api
│
├── components
│
│   ├── Navbar
│   ├── ProtectedRoute
│   ├── StaffRoute
│   ├── ConfirmModal
│   ├── LoadingSpinner
│   └── EmptyState
│
├── context
│
│   ├── AuthContext
│   └── ToastContext
│
├── pages
│
│   ├── Login
│   ├── Register
│   ├── VerifyOtp
│   ├── OAuthSuccess
│   ├── Dashboard
│   ├── Menu
│   ├── JoinQueue
│   ├── QueueStatus
│   ├── CustomerOrder
│   ├── CustomerBill
│   ├── MyTable
│   ├── ManageMenu
│   ├── TakeOrder
│   └── TableBill
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone <your-frontend-repository-url>

cd queueease-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create a `.env` file.

```env
VITE_API_BASE_URL=http://localhost:8080
```

For production

```env
VITE_API_BASE_URL=https://queueease-backend-ifx3.onrender.com
```

---

## Start Development Server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# 🔐 Authentication

QueueEase supports

- Email Registration
- OTP Verification
- JWT Authentication
- Google OAuth Login
- Role-Based Authorization

Roles:

- Customer
- Staff
- Admin

---

# 🍽 Restaurant Features

### Digital Menu

- Category-wise display
- Availability status
- Ingredient information
- AI recommendations

---

### Queue Management

Customers can

- Join queue
- Track live status
- Receive table allocation

---

### Ordering System

- Place food orders
- Multiple items
- Quantity selection
- Automatic bill calculation

---

### Billing

- View table bill
- Live total calculation
- Order history for current table

---

### Staff Dashboard

Staff members can

- Manage menu
- Add new items
- Delete items
- Toggle availability
- Take orders
- View customer bills

---

# 📱 Responsive Design

QueueEase is fully responsive for

- Desktop
- Tablet
- Mobile

---

# 🚧 Project Status

## ✅ Completed

- Authentication
- Google Login
- OTP Verification
- JWT Security
- Digital Menu
- Ingredient Transparency
- AI Recommendations
- Queue Management
- Order Management
- Bill Generation
- Staff Dashboard
- Responsive UI

---

# 🤖 AI Features

## Currently Implemented

- AI-powered Dish Recommendations

---

## Planned Future AI Features

- AI Wait Time Prediction
- Smart Inventory Forecasting
- Demand Prediction
- Restaurant Analytics
- AI Restaurant Assistant
- Personalized Dining Suggestions

---

# 🧠 AI Usage

This project was developed with assistance from AI tools during the hackathon.

### AI Tools

- ChatGPT (OpenAI)
- Claude (Anthropic)

### AI Assisted In

- System Architecture
- UI/UX Planning
- Feature Brainstorming
- Debugging
- Documentation
- Code Review
- API Design
- Presentation Preparation

All AI-generated suggestions were reviewed, modified, tested, and integrated by the developer before submission.

---

# 🔮 Future Enhancements

- QR Code Table Ordering
- Online Payments
- Push Notifications
- Kitchen Dashboard
- Multi-Branch Support
- Restaurant Analytics
- AI Insights
- Customer Feedback System
- Sales Dashboard

---

# 🏆 Hackathon

Built for

**VibeAthon 6.0 – Vibecoding Hackathon 2026**

---

# 👨‍💻 Evaluator Login

## Staff Account

```
Email:
evaluator1@gmail.com

Password:
evaluator@123
```

---

# 📄 License

This project was developed exclusively for educational and hackathon purposes as part of **VibeAthon 6.0 – Vibecoding Hackathon 2026**.

Feel free to explore the codebase and learn from the implementation.
