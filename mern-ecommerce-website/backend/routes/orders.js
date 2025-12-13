const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createOrder, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { orderValidationRules, validate } = require('../middleware/validationMiddleware');

router.post('/', protect, orderValidationRules(), validate, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
