import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const UserDashboard = ({ users }) => {
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats/all-users`);
      setUserStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user stats:', error);
      setLoading(false);
    }
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

  const getUserInitials = (userName) => {
    return userName.split(' ').map(name => name[0]).join('').toUpperCase();
  };

  const getTotalStats = () => {
    return userStats.reduce((total, user) => ({
      totalBoxes: total.totalBoxes + user.totalBoxes,
      totalAmount: total.totalAmount + user.totalAmount,
      totalDays: total.totalDays + user.totalDays
    }), { totalBoxes: 0, totalAmount: 0, totalDays: 0 });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2>👥 User Dashboard</h2>
        <div className="loading">Loading user statistics...</div>
      </div>
    );
  }

  const totalStats = getTotalStats();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👥 User Dashboard</h2>
        <p>Individual statistics for each user</p>
      </div>

      <div className="overall-stats">
        <h3>📊 Overall Summary</h3>
        <div className="overall-stats-grid">
          <div className="overall-stat-item">
            <span className="stat-value">{totalStats.totalBoxes}</span>
            <span className="stat-label">Total Tiffins</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-value">₹{totalStats.totalAmount}</span>
            <span className="stat-label">Total Amount</span>
          </div>
          <div className="overall-stat-item">
            <span className="stat-value">{totalStats.totalDays}</span>
            <span className="stat-label">Total Entries</span>
          </div>
        </div>
      </div>

      <div className="user-stats-grid">
        {userStats.map((user, index) => (
          <div key={user.user} className="user-stat-card">
            <div className="user-header">
              <div 
                className="user-avatar"
                style={{ backgroundColor: getUserColor(user.user) }}
              >
                {getUserInitials(user.user)}
              </div>
              <div className="user-info">
                <h3>{user.user}</h3>
                <p className="user-rank">#{index + 1} by spending</p>
              </div>
            </div>
            
            <div className="user-stats">
              <div className="stat-row">
                <span className="stat-icon">🍱</span>
                <span className="stat-text">Tiffins</span>
                <span className="stat-number">{user.totalBoxes}</span>
              </div>
              <div className="stat-row">
                <span className="stat-icon">💰</span>
                <span className="stat-text">Total Spent</span>
                <span className="stat-number">₹{user.totalAmount}</span>
              </div>
              <div className="stat-row">
                <span className="stat-icon">📅</span>
                <span className="stat-text">Days Active</span>
                <span className="stat-number">{user.totalDays}</span>
              </div>
              {user.totalDays > 0 && (
                <div className="stat-row">
                  <span className="stat-icon">📈</span>
                  <span className="stat-text">Avg per Day</span>
                  <span className="stat-number">{(user.totalBoxes / user.totalDays).toFixed(1)}</span>
                </div>
              )}
            </div>

            {user.totalAmount > 0 && (
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(user.totalAmount / Math.max(...userStats.map(u => u.totalAmount))) * 100}%`,
                    backgroundColor: getUserColor(user.user)
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
