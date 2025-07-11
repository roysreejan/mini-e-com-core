require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require("../src/config/db");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorHandler = require('./middlewares/errorHandler');
const routeHandler = require('./middlewares/routeHandler');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🎉 Mini E-Com Core API is live!',
  });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Handle unmatched routes
app.use(routeHandler);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;