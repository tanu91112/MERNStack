const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const pageSize = 6; // Number of products per page
    const page = Number(req.query.page) || 1;
    
    const keyword = req.query.keyword ? {
      name: { $regex: req.query.keyword, $options: 'i' }
    } : {};
    
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (err) { next(err); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const p = req.body;
    const product = await Product.create(p);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product removed' });
  } catch (err) { next(err); }
};
