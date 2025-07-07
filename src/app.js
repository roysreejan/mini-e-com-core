require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Routes
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.originalUrl 
  });
});

// Error Handling Middleware
// app.use(errorHandler);

module.exports = app;