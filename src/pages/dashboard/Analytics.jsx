import React from 'react';
import './DashboardPage.css'; 

const Analytics = () => {
  // Gantikan data ini dengan data analitik yang sebenarnya
  const analyticsData = {
    totalOrders: 12312,
    totalRevenue: '$4567',
    activeUsers: 89,
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Admin Analytics</h2>
      <ul className="analytics-list">
        <li>Total Orders: {analyticsData.totalOrders}</li>
        <li>Total Revenue: {analyticsData.totalRevenue}</li>
        <li>Active Users: {analyticsData.activeUsers}</li>
      </ul>
    </div>
  );
};

export default Analytics;
