const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// No auth middleware here, open to all

// Get cart by cartId (passed as query param)
router.get('/', cartController.getCart);

// Add item to cart
router.post('/items', cartController.addItemToCart);

// Update item quantity in cart
router.patch('/items/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/items/:itemId', cartController.removeItemFromCart);

// Clear cart
router.delete('/', cartController.clearCart);

module.exports = router;
