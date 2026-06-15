# 🛒 ShopEZ - MERN E-Commerce Application

ShopEZ is a full-stack MERN e-commerce web application that allows users to browse products, add items to their cart, place orders, and manage their profiles. It also provides an admin dashboard for managing products and orders.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- Browse Products
- View Product Details
- Add to Cart
- Checkout System
- Multiple Payment Options
  - UPI
  - Card Payment
  - Cash on Delivery
- Order History
- Cancel Orders
- User Profile Management

### 👨‍💼 Admin Features
- Admin Dashboard
- Add Products
- Edit Products
- Delete Products
- View All Orders
- Manage Product Catalog

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Other Tools
- Git & GitHub
- Nodemon

---

## 📂 Project Structure

```text
ShopEZ/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AdminDashboard.jsx
│   │
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   └── App.jsx
│
├── server/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## 🏗 System Architecture

```text
React Frontend
       │
       ▼
Express.js API
       │
       ▼
MongoDB Database
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rithesh023/ShopEZ.git
cd ShopEZ
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
nodemon server.js
```

Backend runs on:

```text
http://localhost:8000
```

### 3️⃣ Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/users/register
POST /api/users/login
```

### Products

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart

```http
GET    /api/cart/:userId
POST   /api/cart
DELETE /api/cart
```

### Orders

```http
GET    /api/orders
GET    /api/orders/:userId
POST   /api/orders
PUT    /api/orders/cancel/:id
```

---

## 🗄 Database Collections

```text
users
products
carts
orders
admins
```

---

## 🎯 Future Enhancements

- Product Search & Filters
- Wishlist Functionality
- Online Payment Gateway Integration
- Product Reviews & Ratings
- Email Notifications
- Sales Analytics Dashboard

---

## 👨‍💻 Developer

**Rithesh**

GitHub:
https://github.com/rithesh023

---

## ⭐ Project Summary

ShopEZ is a full-stack MERN e-commerce platform developed as a learning project to understand real-world web application development, including authentication, CRUD operations, cart management, order processing, and admin functionalities.