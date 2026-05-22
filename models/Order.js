const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
tableNumber: { type: Number, required: true },
items: [{
name: { type: String, required: true },
quantity: { type: Number, required: true },
price: { type: Number, required: true }
}],
totalAmount: { type: Number, required: true },
status: { type: String, default: 'Pending' }
});
module.exports = mongoose.model('Order', orderSchema);