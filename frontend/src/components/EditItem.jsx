import React, { useState } from 'react';

const EditItem = ({ item, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.quantity) {
      setError('All fields are required');
      return;
    }

    setSubmitting(true);
    setError('');

    const updatedItem = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      quantity: parseInt(formData.quantity)
    };

    const result = await onUpdate(item._id, updatedItem);
    
    if (!result.success) {
      setError(result.error || 'Error updating item');
    }
    
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              disabled={submitting}
              min="0"
            />
          </div>
          
          <div className="modal-actions">
            <button 
              type="submit" 
              className="btn-update"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Item'}
            </button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;