const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

router.post('/', async (req, res) => {
try {
const newMenu = new Menu(req.body);
const savedMenu = await newMenu.save();
res.status(201).json(savedMenu);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

router.get('/', async (req, res) => {
try {
const menus = await Menu.find();
res.status(200).json(menus);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

router.put('/:id', async (req, res) => {
try {
const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.status(200).json(updatedMenu);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

router.delete('/:id', async (req, res) => {
try {
await Menu.findByIdAndDelete(req.params.id);
res.status(200).json({ message: 'Item Deleted Successfully' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});

module.exports = router;