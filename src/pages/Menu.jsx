import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableMenu } from '../api/menuApi';

function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getAvailableMenu();
      setItems(response.data);
    } catch (err) {
      setError('Failed to load menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupedByCategory = items.reduce((groups, item) => {
    const category = item.category || 'Other';
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Our Menu</h1>
          <Link
            to="/join-queue"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Join Queue
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {items.length === 0 && !error && (
          <p className="text-gray-500">No items available right now.</p>
        )}

        {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{category}</h2>
            <div className="space-y-3">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>
                    <span className="font-semibold text-blue-600">₹{item.price}</span>
                  </div>
                  {item.ingredients && (
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="font-medium">Ingredients:</span> {item.ingredients}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;