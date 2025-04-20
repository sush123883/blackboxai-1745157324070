const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const paymentUtil = require('../utils/payment');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, scheduledTime, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item not found: ${item.menuItem}` });
      }
      totalPrice += menuItem.price * (item.quantity || 1);
    }

    const order = new Order({
      user: userId,
      items,
      totalPrice,
      scheduledTime,
      paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',
    });

    await order.save();

    // Create Stripe payment intent
    const paymentIntent = await paymentUtil.createPaymentIntent(totalPrice);

    res.status(201).json({ 
      message: 'Order placed successfully', 
      orderId: order._id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ status: order.status, paymentStatus: order.paymentStatus, estimatedDeliveryTime: order.scheduledTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
