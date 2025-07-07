const Cart = require('../models/Cart');
const Product = require('../models/Product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const CART_ID = 'default_cart_id';

exports.getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ cartId: CART_ID });
  if (!cart) {
    cart = await Cart.create({ cartId: CART_ID, items: [] });
  }
  res.status(200).json({ status: 'success', data: { cart } });
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const quantityNum = parseInt(quantity, 10);

  if (!quantityNum || quantityNum < 1) {
    return next(new AppError('Quantity must be a positive integer', 400));
  }

  const product = await Product.findById(productId);
  if (!product) return next(new AppError('Product not found', 404));
  if (product.stock < quantityNum) {
    return next(new AppError(`Only ${product.stock} items available`, 400));
  }

  let cart = await Cart.findOne({ cartId: CART_ID });
  if (!cart) cart = await Cart.create({ cartId: CART_ID, items: [] });

  const existingItemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += quantityNum;
  } else {
    cart.items.push({ product: productId, quantity: quantityNum, priceAtAddition: product.price });
  }

  await cart.save();
  res.status(200).json({ status: 'success', data: { cart } });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const quantityNum = parseInt(req.body.quantity, 10);
  const { itemId } = req.params;

  if (!quantityNum || quantityNum < 1) {
    return next(new AppError('Quantity must be a positive integer', 400));
  }

  const cart = await Cart.findOne({ cartId: CART_ID });
  if (!cart) return next(new AppError('Cart not found', 404));

  const item = cart.items.id(itemId);
  if (!item) return next(new AppError('Cart item not found', 404));

  const product = await Product.findById(item.product);
  if (product.stock < quantityNum) {
    return next(new AppError(`Only ${product.stock} items available`, 400));
  }

  item.quantity = quantityNum;
  await cart.save();

  res.status(200).json({ status: 'success', data: { cart } });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ cartId: CART_ID });
  if (!cart) return next(new AppError('Cart not found', 404));

  const item = cart.items.id(itemId);
  if (!item) return next(new AppError('Cart item not found', 404));

  item.remove();
  await cart.save();

  res.status(204).json({ status: 'success', data: null });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { cartId: CART_ID },
    { items: [] },
    { new: true, upsert: true }
  );
  res.status(200).json({ status: 'success', data: { cart } });
});
