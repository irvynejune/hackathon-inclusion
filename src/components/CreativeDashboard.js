import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  FileText, 
  DollarSign, 
  Heart, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  TrendingUp,
  Calendar,
  Award,
  Upload,
  Edit,
  Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';
import './CreativeDashboard.css';

const CreativeDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  // Mock data for demonstration
  const [financialData, setFinancialData] = useState({
    totalEarnings: 45000,
    monthlyEarnings: 8500,
    pendingPayments: 3200,
    expenses: 1200
  });

  const [stories, setStories] = useState([
    {
      id: 1,
      title: t('mockStory1Title'),
      status: 'published',
      views: 156,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: t('mockStory2Title'),
      status: 'pending',
      views: 0,
      date: '2024-01-20'
    }
  ]);

  const [supportApplications, setSupportApplications] = useState([
    {
      id: 1,
      type: t('mockSupportType1'),
      status: 'approved',
      amount: 50000,
      date: '2024-01-10'
    },
    {
      id: 2,
      type: t('mockSupportType2'),
      status: 'under_review',
      amount: 25000,
      date: '2024-01-25'
    }
  ]);

  useEffect(() => {
    // Load notifications
    const mockNotifications = [
      { id: 1, message: t('mockNotif1'), type: 'success', time: t('mockNotif1Time') },
      { id: 2, message: t('mockNotif2'), type: 'success', time: t('mockNotif2Time') },
      { id: 3, message: t('mockNotif3'), type: 'info', time: t('mockNotif3Time') }
    ];
    setNotifications(mockNotifications);
  }, [t]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success(t('logoutSuccess'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
      case 'published':
        return '#10b981';
      case 'pending':
      case 'under_review':
        return '#f59e0b';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return t('statusApproved');
      case 'pending':
        return t('statusPending');
      case 'under_review':
        return t('statusUnderReview');
      case 'published':
        return t('statusPublished');
      case 'rejected':
        return t('statusRejected');
      default:
        return status;
    }
  };

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>{t('totalEarnings')}</h3>
            <p className="stat-value">KES {financialData.totalEarnings.toLocaleString()}</p>
            <p className="stat-change positive">+12% this month</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>{t('storiesPublished')}</h3>
            <p className="stat-value">{stories.filter(s => s.status === 'published').length}</p>
            <p className="stat-change positive">+2 this month</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">
            <Heart size={24} />
          </div>
          <div className="stat-content">
            <h3>{t('supportApplications')}</h3>
            <p className="stat-value">{supportApplications.length}</p>
            <p className="stat-change neutral">{t('activeApplications')}</p>
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{t('monthlyGrowth')}</h3>
            <p className="stat-value">+18%</p>
            <p className="stat-change positive">vs last month</p>
          </div>
        </motion.div>
      </div>

      <div className="quick-actions">
        <h3>{t('quickActions')}</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary"
            onClick={() => navigate('/creative/story')}
          >
            <Plus size={20} />
            {t('submitNewStory')}
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/financial')}
          >
            <DollarSign size={20} />
            {t('trackFinances')}
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/support')}
          >
            <Heart size={20} />
            {t('applyForSupport')}
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h3>{t('recentActivity')}</h3>
        <div className="activity-list">
          {notifications.slice(0, 5).map((notification) => (
            <div key={notification.id} className="activity-item">
              <div className="activity-icon">
                <Bell size={16} />
              </div>
              <div className="activity-content">
                <p>{notification.message}</p>
                <span className="activity-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="dashboard-stories">
      <div className="section-header">
        <h2>{t('myStories')}</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/story')}
        >
          <Plus size={16} />
          {t('newStory')}
        </button>
      </div>

      <div className="stories-grid">
        {stories.map((story) => (
          <div key={story.id} className="story-card">
            <div className="story-header">
              <h3>{story.title}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(story.status) }}
              >
                {getStatusText(story.status)}
              </span>
            </div>
            <div className="story-stats">
              <span><Eye size={16} /> {story.views} views</span>
              <span><Calendar size={16} /> {story.date}</span>
            </div>
            <div className="story-actions">
              <button className="btn-secondary">
                <Edit size={16} />
                {t('edit')}
              </button>
              <button className="btn-secondary">
                <Eye size={16} />
                {t('view')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="dashboard-support">
      <div className="section-header">
        <h2>{t('supportApplications')}</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/support')}
        >
          <Plus size={16} />
          {t('newApplication')}
        </button>
      </div>

      <div className="support-grid">
        {supportApplications.map((application) => (
          <div key={application.id} className="support-card">
            <div className="support-header">
              <h3>{application.type}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(application.status) }}
              >
                {getStatusText(application.status)}
              </span>
            </div>
            <div className="support-details">
              <p><strong>{t('amount')}:</strong> KES {application.amount.toLocaleString()}</p>
              <p><strong>{t('date')}:</strong> {application.date}</p>
            </div>
            <div className="support-actions">
              <button className="btn-secondary">
                <Eye size={16} />
                {t('viewDetails')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="dashboard-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <div className="profile-info">
          <h2>{user?.name || t('creativeUser')}</h2>
          <p>{t('creativeProfessional')}</p>
          <p>{user?.email || t('userEmail')}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <h4>{t('memberSince')}</h4>
          <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : t('memberSinceYear')}</p>
        </div>
        <div className="stat-item">
          <h4>{t('storiesPublished')}</h4>
          <p>{stories.filter(s => s.status === 'published').length}</p>
        </div>
        <div className="stat-item">
          <h4>{t('totalEarnings')}</h4>
          <p>KES {financialData.totalEarnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn-secondary">
          <Edit size={16} />
          {t('editProfile')}
        </button>
        <button className="btn-secondary">
          <Settings size={16} />
          {t('settings')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="creative-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>{t('sidebarTitle')}</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <Home size={20} />
            <span>{t('tabOverview')}</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => handleTabChange('stories')}
          >
            <FileText size={20} />
            <span>{t('tabMyStories')}</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => handleTabChange('support')}
          >
            <Heart size={20} />
            <span>{t('tabSupport')}</span>
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <User size={20} />
            <span>{t('tabProfile')}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout}>
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>{t(`tab${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`)}</h1>
            <p>{t('welcomeBack')}, {user?.name || t('creativeUser')}</p>
          </div>
          
          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'support' && renderSupport()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </main>
    </div>
  );
};

export default CreativeDashboard; 