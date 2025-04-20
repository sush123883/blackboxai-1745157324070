const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to check admin role can be added here

// Menu management
router.post('/menu', authMiddleware, adminController.addMenuItem);
router.put('/menu/:id', authMiddleware, adminController.updateMenuItem);
router.delete('/menu/:id', authMiddleware, adminController.deleteMenuItem);

// Order management
router.get('/orders', authMiddleware, adminController.getAllOrders);
router.put('/orders/:id/status', authMiddleware, adminController.updateOrderStatus);

// Inventory management
router.get('/inventory', authMiddleware, adminController.getInventory);
router.put('/inventory/:id', authMiddleware, adminController.updateInventory);

module.exports = router;
