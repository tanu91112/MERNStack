# Frontend - MERN E-Commerce (Vite + React + Tailwind)

## Prerequisites
- Node.js (v14 or higher)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Create a `.env` file in the frontend root directory
   - Add the following variable:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   - Adjust the URL if your backend runs on a different port

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Features
- Responsive design with Tailwind CSS
- User authentication (login/register)
- Product browsing with search and pagination
- Shopping cart functionality
- Checkout process with dummy payment
- User profile management
- Admin dashboard for product/orders management
- Light/dark mode toggle
- Real-time notifications

## Pages
- Home/Product Listing
- Product Details
- Cart
- Checkout
- User Profile
- Admin Dashboard
- Login/Register
