const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
router.post('/', async (req, res) => {
try {
const newTable = new Table(req.body);
const savedTable = await newTable.save();
res.status(201).json(savedTable);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.get('/', async (req, res) => {
try {
const tables = await Table.find();
res.status(200).json(tables);
} catch (err) {
res.status(500).json({ message: err.message });
}
});
router.put('/:id', async (req, res) => {
try {
const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.status(200).json(updatedTable);
} catch (err) {
res.status(400).json({ message: err.message });
}
});
router.delete('/:id', async (req, res) => {
try {
await Table.findByIdAndDelete(req.params.id);
res.status(200).json({ message: 'Table Deleted Successfully' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});
module.exports = router;