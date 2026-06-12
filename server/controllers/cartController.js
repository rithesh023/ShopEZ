const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  try {
    const { userId, productId, productName, price, quantity, image } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProduct = cart.products.find(
        p => p.productId.toString() === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, productName, price, quantity, image });
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, productName, price, quantity, image }]
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.products = cart.products.filter(
      p => p.productId.toString() !== productId
    );
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addToCart, getCart, removeFromCart };