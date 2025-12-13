const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      qty: Number,
      price: Number,
      image: String
    }
  ],
  shippingAddress: {
    address: String, city: String, postalCode: String, country: String
  },
  paymentMethod: String,
  paymentResult: Object,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  status: { type: String, default: 'Processing' } // e.g., Processing, Shipped, Delivered
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
