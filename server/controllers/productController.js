const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    const newProduct = new Product({
      name, description, price, category, image, stock
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getAllProducts, getProductById, addProduct };