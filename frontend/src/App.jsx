import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import './App.css';

const API_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setItems(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching items');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add new item
  const addItem = async (newItem) => {
    try {
      const response = await axios.post(API_URL, newItem);
      setItems([response.data, ...items]);
      setError('');
      return { success: true };
    } catch (error) {
      setError('Error adding item');
      console.error('Error adding item:', error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  // Update item
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      setItems(items.map(item => item._id === id ? response.data : item));
      setEditingItem(null);
      setError('');
      return { success: true };
    } catch (error) {
      setError('Error updating item');
      console.error('Error updating item:', error);
      return { success: false, error: error.response?.data?.error || error.message };
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter(item => item._id !== id));
      setError('');
    } catch (error) {
      setError('Error deleting item');
      console.error('Error deleting item:', error);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📦 Inventory Management</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="content">
          <div className="add-section">
            <h2>Add New Item</h2>
            <AddItem onAdd={addItem} />
          </div>

          <div className="list-section">
            <h2>Item List</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <ItemList
                items={items}
                onDelete={deleteItem}
                onEdit={startEditing}
              />
            )}
          </div>
        </div>

        {editingItem && (
          <EditItem
            item={editingItem}
            onUpdate={updateItem}
            onCancel={cancelEditing}
          />
        )}
      </div>
    </div>
  );
}

export default App;