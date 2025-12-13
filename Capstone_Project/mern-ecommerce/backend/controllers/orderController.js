const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const {
      orderItems, shippingAddress, paymentMethod,
      itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: 'No order items' });

    const order = new Order({
      user: req.user._id, orderItems, shippingAddress, paymentMethod,
      itemsPrice, taxPrice, shippingPrice, totalPrice,
      isPaid: paymentMethod==='Dummy' ? true : false,
      paidAt: paymentMethod==='Dummy' ? new Date() : null
    });

    const created = await order.save();
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product', 'name price images');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (err) { next(err); }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) { next(err); }
};
