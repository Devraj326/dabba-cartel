import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Disable all permission requests
if ('permissions' in navigator) {
  // Override permission requests to prevent prompts
  const originalQuery = navigator.permissions.query;
  navigator.permissions.query = function(permissionDesc) {
    return Promise.resolve({ state: 'denied' });
  };
}

// Disable notifications
if ('Notification' in window) {
  Notification.requestPermission = function() {
    return Promise.resolve('denied');
  };
}

// Disable geolocation
if ('geolocation' in navigator) {
  const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
  navigator.geolocation.getCurrentPosition = function() {
    // Do nothing - prevent permission requests
  };
}

// Disable media devices
if ('mediaDevices' in navigator) {
  const originalGetUserMedia = navigator.mediaDevices.getUserMedia;
  navigator.mediaDevices.getUserMedia = function() {
    return Promise.reject(new Error('Permission denied'));
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
