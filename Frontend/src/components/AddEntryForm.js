import React, { useState } from 'react';

const AddEntryForm = ({ onAddRecord, users }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    user: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.user && formData.quantity) {
      onAddRecord({
        date: formData.date,
        user: formData.user,
        quantity: parseInt(formData.quantity)
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        user: '',
        quantity: ''
      });
    }
  };

  const calculateCost = () => {
    return (parseInt(formData.quantity) || 0) * 80;
  };

  return (
    <div className="form-container">
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Number of Lunch Boxes:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            placeholder="Enter quantity"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Cost: ₹{calculateCost()}</label>
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default AddEntryForm;
