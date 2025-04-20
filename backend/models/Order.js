const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, default: 1 },
      customization: { type: Object }, // e.g. toppings, size
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled'],
    default: 'pending',
  },
  scheduledTime: { type: Date },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
