import React from 'react';

const RecordItem = ({ record, onUpdate, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUserInitials = (userName) => {
    return userName.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  const getUserColor = (userName) => {
    const colors = {
      'Devraj': '#ff6b6b',
      'Anuj': '#4ecdc4',
      'Akshat': '#45b7d1',
      'Shaksham': '#96ceb4',
      'Mayur': '#ffeaa7'
    };
    return colors[userName] || '#gray';
  };

  const handleEdit = () => {
    const newQuantity = prompt(`Edit quantity (current: ${record.quantity}):`, record.quantity);
    
    if (newQuantity === null || newQuantity === '') return;
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      alert('Please enter a valid quantity');
      return;
    }

    onUpdate(record._id, quantity);
  };

  const handleDelete = () => {
    onDelete(record._id);
  };

  return (
    <div className="record-item">
      <div className="record-info">
        <div className="record-header">
          <div className="record-date">{formatDate(record.date)}</div>
          <div 
            className="user-badge"
            style={{ backgroundColor: getUserColor(record.user) }}
          >
            {getUserInitials(record.user)}
          </div>
        </div>
        <div className="record-details">
          <strong>{record.user}</strong> • {record.quantity} lunch box{record.quantity > 1 ? 'es' : ''} • ₹{record.totalCost}
        </div>
      </div>
      <div className="record-actions">
        <button className="btn-edit" onClick={handleEdit}>Edit</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default RecordItem;
