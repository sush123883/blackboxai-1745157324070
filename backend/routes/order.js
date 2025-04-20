const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orderController.placeOrder);
router.get('/status/:orderId', authMiddleware, orderController.getOrderStatus);
router.get('/history', authMiddleware, orderController.getOrderHistory);

module.exports = router;
