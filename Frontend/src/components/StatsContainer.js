import React from 'react';

const StatsContainer = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>{stats.totalBoxes}</h3>
        <p>Total Boxes</p>
      </div>
      <div className="stat-card">
        <h3>₹{stats.totalAmount}</h3>
        <p>Total Amount</p>
      </div>
      <div className="stat-card">
        <h3>{stats.totalDays}</h3>
        <p>Total Days</p>
      </div>
    </div>
  );
};

export default StatsContainer;
