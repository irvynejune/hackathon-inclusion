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
  Eye,
  BookOpen,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import './CreativeDashboard.css';
import './Loading.css';

const CreativeDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  // Real data from API
  const [financialData, setFinancialData] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    pendingPayments: 0,
    expenses: 0
  });

  const [stories, setStories] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

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
    // Load real data from APIs
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Creative users don't have financial data - they focus on stories and content
        setFinancialData({
          totalEarnings: 0,
          monthlyEarnings: 0,
          pendingPayments: 0,
          expenses: 0
        });

        // Load stories
        try {
        const storiesData = await apiService.getStories();
        setStories(storiesData);
        } catch (error) {
          console.log('No stories available yet');
          setStories([]);
        }

        // Load analytics
        try {
        const analyticsData = await apiService.getUserAnalytics();
        setAnalytics(analyticsData);
        } catch (error) {
          console.log('Analytics not available');
          setAnalytics({});
        }

        // Load notifications (mock for now)
        const mockNotifications = [
          { id: 1, message: 'Your story "My Journey" has been approved!', type: 'success', time: '2 hours ago' },
          { id: 2, message: 'New support opportunity available', type: 'info', time: '1 day ago' },
          { id: 3, message: 'Welcome to HEVA Creative Community!', type: 'success', time: '3 days ago' }
        ];
        setNotifications(mockNotifications);

      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(t('errorLoadingData'));
      } finally {
        setLoading(false);
      }
    };

    if (apiService.isAuthenticated()) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [t]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success(t('logoutSuccess'));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUserTypeSwitch = () => {
    navigate('/user-selector');
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
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/financial-literacy')}
          >
            <BookOpen size={20} />
            {t('financialLiteracy')}
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/marginalized-support')}
          >
            <Users size={20} />
            {t('marginalizedGroupSupport')}
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
        <h2>My Stories & Content</h2>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/creative/story')}
          >
            <Upload size={16} />
            Upload Story
          </button>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/story')}
        >
          <Plus size={16} />
            New Story
        </button>
        </div>
      </div>

      {stories.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={64} />
          <h3>No Stories Yet</h3>
          <p>Start sharing your creative journey with the community</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/creative/story')}
          >
            <Plus size={16} />
            Create Your First Story
          </button>
        </div>
      ) : (
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
              <p className="story-excerpt">{story.content?.substring(0, 100)}...</p>
            <div className="story-stats">
                <span><Eye size={16} /> {story.views || 0} views</span>
              <span><Calendar size={16} /> {story.date}</span>
                <span><Award size={16} /> {story.likes || 0} likes</span>
            </div>
            <div className="story-actions">
                <button className="btn-secondary" onClick={() => navigate(`/creative/story/${story.id}/edit`)}>
                <Edit size={16} />
                  Edit
              </button>
                <button className="btn-secondary" onClick={() => navigate(`/creative/story/${story.id}`)}>
                <Eye size={16} />
                  View
                </button>
                <button className="btn-secondary" onClick={() => {
                  // Share story functionality
                  navigator.share({
                    title: story.title,
                    text: story.content?.substring(0, 100),
                    url: window.location.href
                  }).catch(() => {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Story link copied to clipboard!');
                  });
                }}>
                  <Users size={16} />
                  Share
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );

  const renderSupport = () => (
    <div className="dashboard-support">
      <div className="section-header">
        <h2>Support & Opportunities</h2>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/creative/financial-literacy')}
          >
            <BookOpen size={16} />
            Financial Literacy
          </button>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/support')}
        >
          <Plus size={16} />
            Apply for Support
        </button>
        </div>
      </div>

      <div className="support-overview">
        <div className="support-stats">
          <div className="stat-card">
            <h3>Active Applications</h3>
            <p className="stat-number">{supportApplications.filter(app => app.status === 'under_review').length}</p>
          </div>
          <div className="stat-card">
            <h3>Approved Support</h3>
            <p className="stat-number">{supportApplications.filter(app => app.status === 'approved').length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Received</h3>
            <p className="stat-number">KES {supportApplications.filter(app => app.status === 'approved').reduce((sum, app) => sum + app.amount, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="support-grid">
        {supportApplications.length === 0 ? (
          <div className="empty-state">
            <Heart size={64} />
            <h3>No Support Applications Yet</h3>
            <p>Apply for support to help grow your creative business</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/creative/support')}
            >
              <Plus size={16} />
              Apply for Support
            </button>
          </div>
        ) : (
          supportApplications.map((application) => (
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
                <p><strong>Amount:</strong> KES {application.amount.toLocaleString()}</p>
                <p><strong>Date Applied:</strong> {application.date}</p>
                <p><strong>Type:</strong> {application.type}</p>
            </div>
            <div className="support-actions">
                <button className="btn-secondary" onClick={() => navigate(`/creative/support/${application.id}`)}>
                  <Eye size={16} />
                  View Details
                </button>
                {application.status === 'under_review' && (
              <button className="btn-secondary">
                    <Edit size={16} />
                    Update Application
              </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="support-resources">
        <h3>Resources & Help</h3>
        <div className="resources-grid">
          <div className="resource-card" onClick={() => navigate('/creative/financial-literacy')}>
            <BookOpen size={24} />
            <h4>Financial Literacy</h4>
            <p>Learn about managing your creative business finances</p>
          </div>
          <div className="resource-card" onClick={() => navigate('/creative/marginalized-support')}>
            <Heart size={24} />
            <h4>Marginalized Group Support</h4>
            <p>Special programs for marginalized communities</p>
          </div>
          <div className="resource-card" onClick={() => navigate('/help')}>
            <Users size={24} />
            <h4>Community Support</h4>
            <p>Connect with other creatives and get help</p>
          </div>
        </div>
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
          <h2>{user?.full_name || 'Creative User'}</h2>
          <p>{user?.email}</p>
          <p className="user-type">Creative User</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Account Settings</h3>
          <div className="settings-grid">
            <div className="setting-card">
              <h4>Change Password</h4>
              <p>Update your account password</p>
              <button className="btn-secondary">
                <Edit size={16} />
                Change Password
              </button>
            </div>
            <div className="setting-card">
              <h4>Profile Information</h4>
              <p>Update your personal details</p>
              <button className="btn-secondary">
                <User size={16} />
                Edit Profile
              </button>
            </div>
            <div className="setting-card">
              <h4>Privacy Settings</h4>
              <p>Manage your privacy preferences</p>
              <button className="btn-secondary">
                <Settings size={16} />
                Privacy Settings
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Invite Others</h3>
          <div className="invite-section">
            <p>Help grow our creative community by inviting others</p>
            <div className="invite-actions">
              <button className="btn-primary" onClick={() => {
                const inviteLink = `${window.location.origin}/register?ref=${user?.username}`;
                navigator.share({
                  title: 'Join HEVA Creative Community',
                  text: 'I found this amazing platform for creatives. Join me!',
                  url: inviteLink
                }).catch(() => {
                  navigator.clipboard.writeText(inviteLink);
                  toast.success('Invite link copied to clipboard!');
                });
              }}>
                <Users size={16} />
                Invite Friends
              </button>
              <button className="btn-secondary" onClick={() => {
                const inviteLink = `${window.location.origin}/register?ref=${user?.username}`;
                navigator.clipboard.writeText(inviteLink);
                toast.success('Invite link copied to clipboard!');
              }}>
                <Edit size={16} />
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <h4>Stories Published</h4>
              <p className="stat-number">{stories.length}</p>
            </div>
            <div className="stat-item">
              <h4>Support Applications</h4>
              <p className="stat-number">{supportApplications.length}</p>
            </div>
            <div className="stat-item">
              <h4>Community Impact</h4>
              <p className="stat-number">{stories.reduce((sum, story) => sum + (story.views || 0), 0)} views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

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
            <p>{t('welcomeBack')}, {user?.full_name || user?.username || t('creativeUser')}</p>
          </div>
          
          <div className="header-actions">
            <button className="user-type-switch-btn" onClick={handleUserTypeSwitch}>
              <Users size={20} />
              <span>Switch User Type</span>
            </button>
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