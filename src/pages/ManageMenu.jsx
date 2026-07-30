import { useState, useEffect } from 'react';
import { getAllMenu, createMenuItem, toggleAvailability, deleteMenuItem } from '../api/menuApi';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';

function ManageMenu() {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getAllMenu();
      setItems(response.data);
    } catch (err) {
      showToast('Failed to load menu items.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createMenuItem({ name, description, price: Number(price), category, ingredients });
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setIngredients('');
      showToast('Item added successfully', 'success');
      fetchItems();
    } catch (err) {
      showToast('Failed to add item. Make sure you are logged in as staff.', 'error');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleAvailability(id);
      showToast('Availability updated', 'success');
      fetchItems();
    } catch (err) {
      showToast('Failed to update availability.', 'error');
    }
  };

  const confirmDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteMenuItem(deleteTarget.id);
      showToast('Item deleted', 'success');
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      showToast('Failed to delete item.', 'error');
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading menu items..." />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Menu</h1>

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
            type="text"
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
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

        {items.length === 0 ? (
          <EmptyState icon="🍽️" title="No menu items yet" description="Add your first item using the form above." />
        ) : (
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
                    onClick={() => confirmDelete(item)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete menu item?"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This cannot be undone.` : ''}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default ManageMenu;