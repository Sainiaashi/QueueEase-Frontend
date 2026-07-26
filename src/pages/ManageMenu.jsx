import { useState, useEffect } from 'react';
import { getAllMenu, createMenuItem, toggleAvailability, deleteMenuItem } from '../api/menuApi';

function ManageMenu() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getAllMenu();
      setItems(response.data);
    } catch (err) {
      setError('Failed to load menu items.');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createMenuItem({ name, description, price: Number(price), category });
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      fetchItems();
    } catch (err) {
      setError('Failed to add item. Make sure you are logged in as staff.');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleAvailability(id);
      fetchItems();
    } catch (err) {
      setError('Failed to update availability.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchItems();
    } catch (err) {
      setError('Failed to delete item.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Menu</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleCreate} className="bg-white p-4 rounded-lg shadow-sm mb-8 space-y-3">
          <h2 className="font-semibold text-gray-800">Add New Item</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded px-3 py-2"
  required
>
  <option value="">Select Category</option>
  <option value="Starters">Starters</option>
  <option value="Main Course">Main Course</option>
  <option value="Desserts">Desserts</option>
  <option value="Beverages">Beverages</option>
</select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Item
          </button>
        </form>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-900">
                  {item.name} — ₹{item.price}
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <span
                  className={`text-xs font-semibold ${
                    item.available ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(item.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageMenu;