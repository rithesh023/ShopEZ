const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:userId', getUserOrders);
router.get('/', getAllOrders);

module.exports = router;