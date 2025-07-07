const mongoose = require('mongoose');
const Product = require('./Product');
const AppError = require('../utils/appError');

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Cart item must reference a product']
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  priceAtAddition: {
    type: Number,
    required: [true, 'Price must be saved when adding to cart']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: [true, 'Cart must have a cartId'],
    unique: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-populate product details
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'items.product',
    select: 'title price image'
  });
  next();
});

// Add item to cart
cartSchema.methods.addItem = async function (productId, quantity = 1) {
  const product = await Product.findById(productId);
  if (!product) throw new AppError('No product found with that ID', 404);

  const index = this.items.findIndex(
    item => item.product.toString() === productId.toString()
  );

  if (index >= 0) {
    this.items[index].quantity += quantity;
  } else {
    this.items.push({
      product: productId,
      quantity,
      priceAtAddition: product.price
    });
  }

  return this.save();
};

// Remove item from cart
cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    item => item.product.toString() !== productId.toString()
  );
  return this.save();
};

// Update quantity
cartSchema.methods.updateItemQuantity = function (productId, quantity) {
  if (quantity < 1) {
    throw new AppError('Quantity must be at least 1', 400);
  }

  const item = this.items.find(
    item => item.product.toString() === productId.toString()
  );

  if (item) {
    item.quantity = quantity;
  }

  return this.save();
};

// Clear cart
cartSchema.methods.clearCart = function () {
  this.items = [];
  return this.save();
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
