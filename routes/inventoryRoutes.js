const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
router.post('/', async (req, res) => {
try {
const newItem = new Inventory(req.body);
const savedItem = await newItem.save();
res.status(201).json(savedItem);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.get('/', async (req, res) => {
try {
const items = await Inventory.find();
res.status(200).json(items);
} catch (err) {
res.status(500).json({ message: err.message });
}
});
router.put('/:id', async (req, res) => {
try {
const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.status(200).json(updatedItem);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.delete('/:id', async (req, res) => {
try {
await Inventory.findByIdAndDelete(req.params.id);
res.status(200).json({ message: 'Inventory Item Deleted Successfully' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});
module.exports = router;