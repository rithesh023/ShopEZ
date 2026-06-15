const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, cancelOrder } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:userId', getUserOrders);
router.get('/', getAllOrders);
router.put('/cancel/:id', cancelOrder);

module.exports = router;