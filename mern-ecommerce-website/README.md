# MERN E-Commerce (Full Professional - Dummy Payment)

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce web application with modern features and clean architecture.

## Features

### Backend (Node.js + Express.js + MongoDB)
- RESTful API architecture
- JWT-based authentication with bcrypt password hashing
- User roles (user and admin)
- CRUD operations for products (admin only)
- Shopping cart management
- Order processing with dummy payment system
- User profile management
- Input validation and error handling
- Database seeding for initial data
- Environment-based configuration

### Frontend (React.js + Tailwind CSS)
- Responsive UI with mobile-first design
- Modern React with functional components and hooks
- React Router for navigation
- Context API for state management
- Axios for API requests
- Product search and filtering
- Pagination for product listings
- Shopping cart with quantity management
- Checkout process with form validation
- User profile management
- Admin dashboard for product and order management
- Light/dark mode toggle
- Real-time notifications
- Proper loading states and error handling

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory
2. Copy `.env.template` to `.env` and update values if needed
3. Install dependencies: `npm install`
4. Seed database: `npm run seed`
5. Start server: `npm run dev`

### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Create `.env` file with `VITE_API_URL=http://localhost:5000/api`
4. Start development server: `npm run dev`

## Default Credentials
- Admin: admin@example.com / admin123
- User: user@example.com / user123

## Project Structure
```
.
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── seed/            # Database seeding
│   ├── .env             # Environment variables
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── api/         # Axios configuration
    │   ├── components/  # Reusable components
    │   ├── contexts/    # React context providers
    │   ├── pages/       # Page components
    │   └── App.jsx      # Main app component
    └── tailwind.config.js # Tailwind CSS configuration
```

## API Endpoints
- Authentication: `/api/auth`
- Products: `/api/products`
- Orders: `/api/orders`

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Authentication**: JWT, bcryptjs
- **Validation**: express-validator
- **Development**: Vite (frontend), Nodemon (backend)

## Notes
- Payment flow uses a dummy payment module (no real payment processing)
- Images are referenced by path (implement actual image upload/storage as needed)
- Designed for local development (adjust URLs/config for production deployment)
