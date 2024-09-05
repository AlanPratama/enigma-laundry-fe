import React from 'react';
import { useSelector } from 'react-redux';
import Analytics from './Analytics';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  // Styling inline
  const dashboardContainerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  };

  const dashboardTitleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: '20px',
  };

  const analyticsContainerStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
  };

  const analyticsTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  };

  const analyticsListStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const analyticsListItemStyle = {
    fontSize: '1rem',
    padding: '5px 0',
  };

  return (
    <div style={dashboardContainerStyle}>
      <h1 style={dashboardTitleStyle}>Enigma Laundry</h1>
      <div style={analyticsContainerStyle}>
        <h2 style={analyticsTitleStyle}>Admin Analytics</h2>
        <ul style={analyticsListStyle}>
          <li style={analyticsListItemStyle}>Total Orders: 123</li>
          <li style={analyticsListItemStyle}>Total Revenue: $4567</li>
          <li style={analyticsListItemStyle}>Active Users: 89</li>
        </ul>
      </div>
      <p>Welcome, {user.iss}</p>
    </div>
  );
};

export default DashboardPage;
