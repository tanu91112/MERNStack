require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());

// More explicit CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));