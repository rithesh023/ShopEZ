const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

router.post('/', addToCart);
router.get('/:userId', getCart);
router.delete('/', removeFromCart);

module.exports = router;