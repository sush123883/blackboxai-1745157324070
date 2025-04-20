const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res) => {
  try {
    const { category, vegetarian, vegan, glutenFree, search } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (vegetarian === 'true') {
      filter.isVegetarian = true;
    }
    if (vegan === 'true') {
      filter.isVegan = true;
    }
    if (glutenFree === 'true') {
      filter.isGlutenFree = true;
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const menuItems = await MenuItem.find(filter);
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
