import React from 'react';

const CalendarView = ({ calendarData, currentMonth, currentYear, onMonthChange, users }) => {
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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getRecordsForDate = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarData.filter(record => {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      return recordDate === dateStr;
    });
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayRecords = getRecordsForDate(day);
    const isToday = 
      day === new Date().getDate() && 
      currentMonth === new Date().getMonth() + 1 && 
      currentYear === new Date().getFullYear();

    days.push(
      <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
        <div className="day-number">{day}</div>
        <div className="day-records">
          {dayRecords.map(record => (
            <div
              key={record._id}
              className="record-badge"
              style={{ backgroundColor: getUserColor(record.user) }}
              title={`${record.user}: ${record.quantity} tiffin(s) - ₹${record.totalCost}`}
            >
              {getUserInitials(record.user)}
              <span className="quantity">{record.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>📅 Calendar View</h2>
        <div className="calendar-navigation">
          <button onClick={handlePrevMonth}>‹</button>
          <span className="month-year">
            {monthNames[currentMonth - 1]} {currentYear}
          </span>
          <button onClick={handleNextMonth}>›</button>
        </div>
      </div>

      <div className="calendar-legend">
        <h4>Users:</h4>
        <div className="legend-items">
          {users.map(user => (
            <div key={user} className="legend-item">
              <div 
                className="legend-color"
                style={{ backgroundColor: getUserColor(user) }}
              >
                {getUserInitials(user)}
              </div>
              <span>{user}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>

      <div className="calendar-grid">
        {days}
      </div>
    </div>
  );
};

export default CalendarView;
