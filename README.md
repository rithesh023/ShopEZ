# ShopEZ - E-Commerce Application

A full stack MERN e-commerce application.

## Tech Stack
- MongoDB, Express.js, React.js, Node.js

## Setup Instructions

### Backend
cd server
npm install
nodemon server.js

### Frontend
cd client
npm install
npm run dev

## Features
- User Registration and Login
- Product Catalog
- Add to Cart
- Place Orders
- User Profile with Order History
- Admin Dashboard

## API Endpoints
- POST /api/users/register
- POST /api/users/login
- GET /api/products
- POST /api/products
- GET /api/cart/:userId
- POST /api/cart
- DELETE /api/cart
- POST /api/orders
- GET /api/orders/:userId
- GET /api/orders