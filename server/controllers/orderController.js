const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    const { userId, productId, productName, price, quantity, address, paymentMethod } = req.body;

    const newOrder = new Order({
      userId,
      productId,
      productName,
      price,
      quantity,
      address,
      paymentMethod
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order already cancelled' });
    }
    order.status = 'Cancelled';
    await order.save();
    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, cancelOrder };