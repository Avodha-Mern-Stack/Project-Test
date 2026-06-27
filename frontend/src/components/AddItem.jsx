import React, { useState } from 'react';

const AddItem = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: ''
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

    const newItem = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      quantity: parseInt(formData.quantity)
    };

    const result = await onAdd(newItem);
    
    if (result.success) {
      setFormData({ name: '', description: '', quantity: '' });
      setError('');
    } else {
      setError(result.error || 'Error adding item');
    }
    
    setSubmitting(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
      
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
};

export default AddItem;