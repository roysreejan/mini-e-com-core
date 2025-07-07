const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// POST /api/products - create new product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { product: newProduct }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().select('-__v'); // exclude __v field
    res.json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.json({
      status: 'success',
      data: { product }
    });
  } catch (err) {
    // If invalid ObjectId format, catch CastError and send 400
    if (err.name === 'CastError') {
      return res.status(400).json({ status: 'fail', message: 'Invalid product ID format' });
    }
    next(err);
  }
});

module.exports = router;
