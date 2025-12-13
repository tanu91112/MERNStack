const { body, validationResult } = require('express-validator');

// Validation rules for registration
const registerValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ];
};

// Validation rules for login
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required')
  ];
};

// Validation rules for product creation/update
const productValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('countInStock').isInt({ min: 0 }).withMessage('Count in stock must be a non-negative integer')
  ];
};

// Validation rules for order creation
const orderValidationRules = () => {
  return [
    body('orderItems').isArray({ min: 1 }).withMessage('Order must have at least one item'),
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required')
  ];
};

// Validation handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return the first error message to match frontend expectations
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  productValidationRules,
  orderValidationRules,
  validate
};