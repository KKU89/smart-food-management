import { useState, useEffect } from 'react';
import './App.css';
function App() {
const [role, setRole] = useState(null);
const [menu, setMenu] = useState([]);
const [orders, setOrders] = useState([]);
const [tables, setTables] = useState([]);
const [inventory, setInventory] = useState([]);
const [newItem, setNewItem] = useState({ name: '', category: 'Main Course', price: '' });
const [newOrderTable, setNewOrderTable] = useState('');
const [selectedItems, setSelectedItems] = useState([]);
const [newTable, setNewTable] = useState({ tableNumber: '', capacity: '' });
const [newInvItem, setNewInvItem] = useState({ itemName: '', quantity: '', unit: '' });
useEffect(() => {
fetch('https://smart-food-backend-y4h5.onrender.com/api/menu').then(res => res.json()).then(data => setMenu(data)).catch(err => console.error(err));
fetch('https://smart-food-backend-y4h5.onrender.com/api/orders').then(res => res.json()).then(data => setOrders(data)).catch(err => console.error(err));
fetch('https://smart-food-backend-y4h5.onrender.com/api/tables').then(res => res.json()).then(data => setTables(data)).catch(err => console.error(err));
fetch('https://smart-food-backend-y4h5.onrender.com/api/inventory').then(res => res.json()).then(data => setInventory(data)).catch(err => console.error(err));
}, []);
const handleMenuSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('https://smart-food-backend-y4h5.onrender.com/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newItem, isAvailable: true }) });
const savedItem = await response.json();
setMenu([...menu, savedItem]);
setNewItem({ name: '', category: 'Main Course', price: '' });
} catch (error) { console.error(error); }
};
const handleMenuDelete = async (id) => {
try {
await fetch(`https://smart-food-backend-y4h5.onrender.com/api/menu/${id}`, { method: 'DELETE' });
setMenu(menu.filter(item => item._id !== id));
} catch (error) { console.error(error); }
};
const handleAddToOrder = (item) => {
const existingItem = selectedItems.find(i => i.name === item.name);
if (existingItem) {
setSelectedItems(selectedItems.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
} else {
setSelectedItems([...selectedItems, { name: item.name, price: item.price, quantity: 1 }]);
}
};
const handleRemoveFromCart = (itemName) => {
const existingItem = selectedItems.find(i => i.name === itemName);
if (existingItem.quantity > 1) {
setSelectedItems(selectedItems.map(i => i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i));
} else {
setSelectedItems(selectedItems.filter(i => i.name !== itemName));
}
};
const handleOrderSubmit = async (e) => {
e.preventDefault();
const totalAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
try {
const response = await fetch('https://smart-food-backend-y4h5.onrender.com/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tableNumber: Number(newOrderTable), items: selectedItems, totalAmount: totalAmount }) });
const savedOrder = await response.json();
setOrders([...orders, savedOrder]);
setNewOrderTable('');
setSelectedItems([]);
} catch (error) { console.error(error); }
};
const handleOrderDelete = async (id) => {
try {
await fetch(`https://smart-food-backend-y4h5.onrender.com/api/orders/${id}`, { method: 'DELETE' });
setOrders(orders.filter(order => order._id !== id));
} catch (error) { console.error(error); }
};
const handleTableSubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('https://smart-food-backend-y4h5.onrender.com/api/tables', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tableNumber: Number(newTable.tableNumber), capacity: Number(newTable.capacity), status: 'Available' }) });
const savedTable = await response.json();
setTables([...tables, savedTable]);
setNewTable({ tableNumber: '', capacity: '' });
} catch (error) { console.error(error); }
};
const handleTableDelete = async (id) => {
try {
await fetch(`https://smart-food-backend-y4h5.onrender.com/api/tables/${id}`, { method: 'DELETE' });
setTables(tables.filter(table => table._id !== id));
} catch (error) { console.error(error); }
};
const handleInventorySubmit = async (e) => {
e.preventDefault();
try {
const response = await fetch('https://smart-food-backend-y4h5.onrender.com/api/inventory', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ itemName: newInvItem.itemName, quantity: Number(newInvItem.quantity), unit: newInvItem.unit }) });
const savedItem = await response.json();
setInventory([...inventory, savedItem]);
setNewInvItem({ itemName: '', quantity: '', unit: '' });
} catch (error) { console.error(error); }
};
const handleInventoryDelete = async (id) => {
try {
await fetch(`https://smart-food-backend-y4h5.onrender.com/api/inventory/${id}`, { method: 'DELETE' });
setInventory(inventory.filter(item => item._id !== id));
} catch (error) { console.error(error); }
};
if (!role) {
return (
<div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
<h1 style={{ marginBottom: '50px' }}>Select Your Role</h1>
<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
<button onClick={() => setRole('Manager')} style={{ padding: '20px 40px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>Manager (Menu, Orders & Tables)</button>
<button onClick={() => setRole('Chef')} style={{ padding: '20px 40px', fontSize: '1.2rem', background: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' }}>Head Chef (Inventory)</button>
<button onClick={() => setRole('Admin')} style={{ padding: '20px 40px', fontSize: '1.2rem' }}>Super Admin (All Access)</button>
</div>
</div>
);
}
return (
<div className="container">
<div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<h1 style={{ marginBottom: '0' }}>Dashboard - {role}</h1>
<button onClick={() => setRole(null)} className="btn-delete" style={{ padding: '10px 20px', height: 'fit-content' }}>Logout / Switch Role</button>
</div>
{(role === 'Manager' || role === 'Admin') && (
<>
<div className="card">
<h2>Menu Management</h2>
<form onSubmit={handleMenuSubmit}>
<input type="text" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
<input type="text" placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required />
<input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
<button type="submit">Add Menu Item</button>
</form>
<ul>
{menu.map(item => (
<li key={item._id}>
<span>{item.name} - ₹{item.price}</span>
<div>
<button className="btn-add" onClick={() => handleAddToOrder(item)}>+ Add</button>
<button className="btn-delete" onClick={() => handleMenuDelete(item._id)}>Delete</button>
</div>
</li>
))}
</ul>
</div>
<div className="card">
<h2>Place New Order</h2>
<div style={{ marginBottom: '20px' }}>
<p style={{ marginBottom: '10px' }}>Cart Items:</p>
{selectedItems.length > 0 ? (
<ul>
{selectedItems.map((cartItem, index) => (
<li key={index} style={{ padding: '10px 15px', marginBottom: '8px' }}>
<span>{cartItem.name} (x{cartItem.quantity})</span>
<div>
<span style={{ marginRight: '10px' }}>₹{cartItem.price * cartItem.quantity}</span>
<button type="button" className="btn-delete" onClick={() => handleRemoveFromCart(cartItem.name)}>- Remove</button>
</div>
</li>
))}
</ul>
) : (
<span style={{ color: '#64748b', fontSize: '14px' }}>Cart is empty.</span>
)}
</div>
<form onSubmit={handleOrderSubmit}>
<input type="number" placeholder="Table Number" value={newOrderTable} onChange={(e) => setNewOrderTable(e.target.value)} required />
<button type="submit" disabled={selectedItems.length === 0}>Confirm Order</button>
</form>
<h3>Active Orders</h3>
<ul>
{orders.map(order => (
<li key={order._id}>
<span><strong>Table {order.tableNumber}</strong> ({order.status})</span>
<div>
<span style={{ marginRight: '15px' }}>₹{order.totalAmount}</span>
<button className="btn-delete" onClick={() => handleOrderDelete(order._id)}>Delete</button>
</div>
</li>
))}
</ul>
</div>
<div className="card">
<h2>Table Management</h2>
<form onSubmit={handleTableSubmit}>
<input type="number" placeholder="Table Number" value={newTable.tableNumber} onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })} required />
<input type="number" placeholder="Capacity" value={newTable.capacity} onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })} required />
<button type="submit">Add Table</button>
</form>
<ul>
{tables.map(table => (
<li key={table._id}>
<span>Table {table.tableNumber} (Cap: {table.capacity}) - {table.status}</span>
<button className="btn-delete" onClick={() => handleTableDelete(table._id)}>Delete</button>
</li>
))}
</ul>
</div>
</>
)}
{(role === 'Chef' || role === 'Admin') && (
<div className="card">
<h2>Inventory Management</h2>
<form onSubmit={handleInventorySubmit}>
<input type="text" placeholder="Item Name" value={newInvItem.itemName} onChange={(e) => setNewInvItem({ ...newInvItem, itemName: e.target.value })} required />
<input type="number" placeholder="Quantity" value={newInvItem.quantity} onChange={(e) => setNewInvItem({ ...newInvItem, quantity: e.target.value })} required />
<input type="text" placeholder="Unit" value={newInvItem.unit} onChange={(e) => setNewInvItem({ ...newInvItem, unit: e.target.value })} required />
<button type="submit">Add Inventory</button>
</form>
<ul>
{inventory.map(item => (
<li key={item._id}>
<span>{item.itemName} - {item.quantity} {item.unit}</span>
<button className="btn-delete" onClick={() => handleInventoryDelete(item._id)}>Delete</button>
</li>
))}
</ul>
</div>
)}
</div>
);
}
export default App;