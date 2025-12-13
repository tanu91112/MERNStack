const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById,
  createProduct, updateProduct, deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { productValidationRules, validate } = require('../middleware/validationMiddleware');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, productValidationRules(), validate, createProduct);
router.put('/:id', protect, admin, productValidationRules(), validate, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
