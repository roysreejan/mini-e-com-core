const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// POST /api/products
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { product: newProduct }
  });
});

// Get all products (simple)
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().select('-__v');
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products }
  });
});

// Get single product by ID
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).select('-__v');
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { product }
  });
});
