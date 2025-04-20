const Stripe = require('stripe');
const config = require('../config');

const stripe = Stripe(config.stripeSecretKey);

exports.createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  } catch (err) {
    throw err;
  }
};
