import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './components/Header';
import StatsContainer from './components/StatsContainer';
import AddEntryForm from './components/AddEntryForm';
import RecordsList from './components/RecordsList';
import CalendarView from './components/CalendarView';
import UserDashboard from './components/UserDashboard';

const USERS = ['Devraj', 'Anuj', 'Akshat', 'Shaksham', 'Mayur'];

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalBoxes: 0,
    totalAmount: 0,
    totalDays: 0
  });
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'calendar', or 'dashboard'
  const [calendarData, setCalendarData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchCalendarData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/lunchbox/calendar/${currentYear}/${currentMonth}`);
      setCalendarData(response.data);
    } catch (error) {
      toast.error('Error fetching calendar data');
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchStats();
    if (currentView === 'calendar') {
      fetchCalendarData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView, currentMonth, currentYear]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/lunchbox`);
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching records');
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      toast.error('Error fetching statistics');
    }
  };

  const handleAddRecord = async (formData) => {
    try {
      await axios.post(`${API_BASE_URL}/api/lunchbox`, formData);
      toast.success('Record added successfully!');
      fetchRecords();
      fetchStats();
      if (currentView === 'calendar') {
        fetchCalendarData();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error adding record');
    }
  };

  const handleUpdateRecord = async (id, quantity) => {
    try {
      await axios.put(`${API_BASE_URL}/api/lunchbox/${id}`, { quantity });
      toast.success('Record updated successfully!');
      fetchRecords();
      fetchStats();
      if (currentView === 'calendar') {
        fetchCalendarData();
      }
    } catch (error) {
      toast.error('Error updating record');
    }
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/lunchbox/${id}`);
        toast.success('Record deleted successfully!');
        fetchRecords();
        fetchStats();
        if (currentView === 'calendar') {
          fetchCalendarData();
        }
      } catch (error) {
        toast.error('Error deleting record');
      }
    }
  };

  const handleMonthChange = (newMonth, newYear) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        
        <div className="view-toggle">
          <button 
            className={currentView === 'list' ? 'active' : ''}
            onClick={() => setCurrentView('list')}
          >
            📋 List View
          </button>
          <button 
            className={currentView === 'calendar' ? 'active' : ''}
            onClick={() => setCurrentView('calendar')}
          >
            📅 Calendar View
          </button>
          <button 
            className={currentView === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentView('dashboard')}
          >
            👥 Dashboard
          </button>
        </div>

        <StatsContainer stats={stats} />
        <AddEntryForm onAddRecord={handleAddRecord} users={USERS} />
        
        {currentView === 'list' ? (
          <RecordsList 
            records={records}
            loading={loading}
            onUpdateRecord={handleUpdateRecord}
            onDeleteRecord={handleDeleteRecord}
            users={USERS}
          />
        ) : currentView === 'calendar' ? (
          <CalendarView 
            calendarData={calendarData}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
            users={USERS}
          />
        ) : (
          <UserDashboard users={USERS} />
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
