import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './DashboardPage.css'; // Custom CSS

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  // Dummy data
  const [totalProducts] = useState(50);
  const [totalCustomers] = useState(120);
  const [totalTransactions] = useState(200);
  const [revenue] = useState(10000); // In currency
  const [weeklyRevenue] = useState(3000); // Weekly revenue
  const [feedbacks] = useState([
    { name: 'Customer A', feedback: 'Great service!' },
    { name: 'Customer B', feedback: 'Fast and reliable.' }
  ]);
  
  const [recentProducts] = useState([
    { name: 'Product A', price: '$25' },
    { name: 'Product B', price: '$30' },
    { name: 'Product C', price: '$45' },
  ]);

  const [recentTransactions] = useState([
    { id: 1, amount: '$150', status: 'Completed' },
    { id: 2, amount: '$200', status: 'Pending' },
    { id: 3, amount: '$100', status: 'Completed' },
  ]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Enigma Laundry Dashboard</h1>
      <h2 className="dashboard-subtitle">Welcome, {user.name}!</h2>

      {/* Summary section */}
      <div className="summary-cards">
        <div className="summary-card orange-gradient">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="summary-card blue-gradient">
          <h3>Total Customers</h3>
          <p>{totalCustomers}</p>
        </div>
        <div className="summary-card blue-solid">
          <h3>Total Transactions</h3>
          <p>{totalTransactions}</p>
        </div>
        <div className="summary-card orange-solid">
          <h3>Total Revenue</h3>
          <p>${revenue}</p>
        </div>
      </div>

      {/* Weekly Revenue */}
      <div className="weekly-revenue">
        <h3>Weekly Revenue</h3>
        <p>${weeklyRevenue}</p>
      </div>

      {/* Recent Feedback */}
      <div className="recent-feedback">
        <h3>Recent Feedbacks</h3>
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>{feedback.name}: {feedback.feedback}</li>
          ))}
        </ul>
      </div>

      {/* Recent section */}
      <div className="recent-section">
        <div className="recent-box">
          <h3>Recent Products</h3>
          <ul>
            {recentProducts.map((product, index) => (
              <li key={index}>{product.name} - {product.price}</li>
            ))}
          </ul>
        </div>
        <div className="recent-box">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.map((transaction, index) => (
              <li key={index}>Transaction {transaction.id}: {transaction.amount} - {transaction.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
