const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
router.post('/', async (req, res) => {
try {
const newOrder = new Order(req.body);
const savedOrder = await newOrder.save();
res.status(201).json(savedOrder);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.get('/', async (req, res) => {
try {
const orders = await Order.find();
res.status(200).json(orders);
} catch (err) {
res.status(500).json({ message: err.message });
}
});
router.put('/:id', async (req, res) => {
try {
const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.status(200).json(updatedOrder);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.delete('/:id', async (req, res) => {
try {
await Order.findByIdAndDelete(req.params.id);
res.status(200).json({ message: 'Order Deleted Successfully' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});
module.exports = router;