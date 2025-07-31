import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, BarChart3, FileText, DollarSign, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './HEVADashboard.css';

const HEVADashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="heva-dashboard">
      <header className="dashboard-header">
        <h1>HEVA Team Dashboard</h1>
        <p>Welcome, {user?.name || 'HEVA Team Member'}</p>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <Users size={48} />
            <h3>Admin Panel</h3>
            <p>Manage users, permissions, and regions</p>
            <button className="card-btn">Access Admin</button>
          </div>

          <div className="dashboard-card">
            <BarChart3 size={48} />
            <h3>Impact Dashboard</h3>
            <p>Real-time metrics and analytics</p>
            <button className="card-btn">View Impact</button>
          </div>

          <div className="dashboard-card">
            <FileText size={48} />
            <h3>Story Viewer</h3>
            <p>Gallery of user-submitted content</p>
            <button className="card-btn">Browse Stories</button>
          </div>

          <div className="dashboard-card">
            <DollarSign size={48} />
            <h3>Financial Tracker</h3>
            <p>Alternative credit scoring and funding</p>
            <button className="card-btn">Track Finances</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HEVADashboard; 