# Backend - MERN E-Commerce (Dummy Payment)

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Setup Instructions

1. **Copy Environment Variables**
   - Copy `.env.template` to `.env`
   - Update values as needed (default values should work for local development)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Make sure MongoDB is running on your system
   - Run the seeding script to populate initial data:
   ```bash
   npm run seed
   ```
   This will create:
   - Admin user: admin@example.com / admin123
   - Regular user: user@example.com / user123
   - Sample products

4. **Start the Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

## Available Scripts
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm run seed`: Seed database with initial data

## API Endpoints
- Authentication: `/api/auth`
- Products: `/api/products`
- Orders: `/api/orders`

## Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token generation
- `CLIENT_URL`: Frontend URL for CORS
