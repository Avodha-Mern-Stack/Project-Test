import React from 'react';

const ItemList = ({ items, onDelete, onEdit }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items found. Add your first item above!</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-content">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="item-meta">
              <span className="quantity">Quantity: {item.quantity}</span>
              <span className="date">
                Added: {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="item-actions">
            <button 
              className="btn-edit"
              onClick={() => onEdit(item)}
            >
              ✏️ Edit
            </button>
            <button 
              className="btn-delete"
              onClick={() => onDelete(item._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;