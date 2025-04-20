const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. snacks, meals, beverages
  description: { type: String },
  ingredients: [String],
  nutritionalInfo: {
    calories: Number,
    fat: Number,
    carbs: Number,
    protein: Number,
  },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  customizationOptions: {
    toppings: [String],
    sizes: [String],
  },
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isGlutenFree: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
