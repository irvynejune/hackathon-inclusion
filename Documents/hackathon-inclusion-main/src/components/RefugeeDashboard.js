import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  FileText, 
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
  Users,
  Globe,
  MapPin,
  Flag,
  Shield,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Languages,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import './RefugeeDashboard.css';

const RefugeeDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  // Refugee-specific data
  const [refugeeSupport, setRefugeeSupport] = useState([
    {
      id: 1,
      type: 'Legal Documentation',
      status: 'available',
      description: 'Help with refugee status documentation and legal rights',
      icon: Shield,
      priority: 'high'
    },
    {
      id: 2,
      type: 'Language Learning',
      status: 'available',
      description: 'Learn local languages and improve communication skills',
      icon: Languages,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'Skills Training',
      status: 'available',
      description: 'Develop skills for employment and self-sufficiency',
      icon: GraduationCap,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'Community Integration',
      status: 'available',
      description: 'Connect with local communities and support networks',
      icon: Users,
      priority: 'high'
    },
    {
      id: 5,
      type: 'Emergency Support',
      status: 'available',
      description: 'Immediate assistance for urgent needs',
      icon: AlertCircle,
      priority: 'critical'
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Refugee Support Hotline', number: '+254-700-000-000', type: 'emergency' },
    { name: 'Legal Aid Office', number: '+254-700-000-001', type: 'legal' },
    { name: 'Community Center', number: '+254-700-000-002', type: 'community' }
  ]);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load refugee-specific data
      const mockStories = [
        {
          id: 1,
          title: 'My Journey to Safety',
          content: 'Sharing my experience of finding safety and building a new life...',
          views: 23,
          date: '2024-01-10',
          status: 'published'
        }
      ];
      setStories(mockStories);

      const mockNotifications = [
        { id: 1, message: 'Your legal documentation appointment is tomorrow', type: 'info', time: '2 hours ago' },
        { id: 2, message: 'New language learning class available', type: 'success', time: '1 day ago' },
        { id: 3, message: 'Community integration workshop this weekend', type: 'info', time: '3 days ago' }
      ];
      setNotifications(mockNotifications);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'urgent': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'urgent': return 'Urgent';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderOverview = () => (
    <div className="refugee-overview">
      <div className="emergency-section">
        <h3>Emergency Contacts</h3>
        <div className="emergency-grid">
          {emergencyContacts.map((contact) => (
            <div key={contact.name} className="emergency-card">
              <div className="contact-icon">
                {contact.type === 'emergency' ? <AlertCircle size={20} /> : 
                 contact.type === 'legal' ? <Shield size={20} /> : <Users size={20} />}
              </div>
              <div className="contact-info">
                <h4>{contact.name}</h4>
                <p>{contact.number}</p>
              </div>
              <button className="contact-btn">
                <Phone size={16} />
                Call
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="refugee-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Shield size={32} />
          </div>
          <div className="stat-content">
            <h3>Legal Support</h3>
            <p className="stat-value">Documentation Help</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Languages size={32} />
          </div>
          <div className="stat-content">
            <h3>Language Learning</h3>
            <p className="stat-value">Communication Skills</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Community</h3>
            <p className="stat-value">Integration Support</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary"
            onClick={() => navigate('/creative/story')}
          >
            <FileText size={20} />
            Share My Story
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/support')}
          >
            <Heart size={20} />
            Request Support
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/financial-literacy')}
          >
            <BookOpen size={20} />
            Basic Financial Guide
          </button>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="refugee-support">
      <div className="section-header">
        <h2>Refugee Support Programs</h2>
        <p>Specialized support and resources for refugees and displaced persons</p>
      </div>

      <div className="support-grid">
        {refugeeSupport.map((program) => {
          const IconComponent = program.icon;
          return (
            <div key={program.id} className="support-card">
              <div className="support-header">
                <IconComponent size={24} />
                <h3>{program.type}</h3>
                <div className="priority-badge" style={{ backgroundColor: getPriorityColor(program.priority) }}>
                  {program.priority}
                </div>
              </div>
              <p className="support-description">{program.description}</p>
              <div className="support-actions">
                <button className="btn-primary">
                  Learn More
                </button>
                <button className="btn-secondary">
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="refugee-resources">
        <h3>Essential Resources</h3>
        <div className="resources-grid">
          <div className="resource-card">
            <Globe size={24} />
            <h4>Local Information</h4>
            <p>Learn about your new community and local services</p>
          </div>
          <div className="resource-card">
            <MapPin size={24} />
            <h4>Safe Spaces</h4>
            <p>Find safe locations and community centers</p>
          </div>
          <div className="resource-card">
            <Flag size={24} />
            <h4>Rights & Advocacy</h4>
            <p>Understand your rights and legal protections</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="refugee-stories">
      <div className="section-header">
        <h2>Refugee Community Stories</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/story')}
        >
          <Plus size={16} />
          Share My Story
        </button>
      </div>

      {stories.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} />
          <h3>No Stories Yet</h3>
          <p>Share your journey and inspire other refugees</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/creative/story')}
          >
            <Plus size={16} />
            Share Your Story
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
              <p className="story-excerpt">{story.content}</p>
              <div className="story-stats">
                <span><Eye size={16} /> {story.views} views</span>
                <span><Calendar size={16} /> {story.date}</span>
              </div>
              <div className="story-actions">
                <button className="btn-secondary">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="btn-secondary">
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="refugee-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <Globe size={48} />
        </div>
        <div className="profile-info">
          <h2>{user?.full_name || 'Refugee User'}</h2>
          <p>{user?.email}</p>
          <p className="user-type">Refugee</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Essential Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Legal Status</h4>
              <p>Documentation and legal rights information</p>
              <button className="btn-secondary">
                <Shield size={16} />
                Check Status
              </button>
            </div>
            <div className="info-card">
              <h4>Language Support</h4>
              <p>Translation services and language learning</p>
              <button className="btn-secondary">
                <Languages size={16} />
                Language Help
              </button>
            </div>
            <div className="info-card">
              <h4>Community Network</h4>
              <p>Connect with other refugees and local communities</p>
              <button className="btn-secondary">
                <Users size={16} />
                Join Network
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Safety & Support</h3>
          <div className="safety-section">
            <p>Emergency contacts and safety resources</p>
            <div className="safety-actions">
              <button className="btn-primary">
                <AlertCircle size={16} />
                Emergency Help
              </button>
              <button className="btn-secondary">
                <HeartHandshake size={16} />
                Request Support
              </button>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Progress Tracking</h3>
          <div className="progress-grid">
            <div className="progress-item">
              <h4>Documentation</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <p>75% Complete</p>
            </div>
            <div className="progress-item">
              <h4>Language Skills</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <p>60% Complete</p>
            </div>
            <div className="progress-item">
              <h4>Community Integration</h4>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <p>45% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="refugee-dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Refugee Dashboard</h2>
          <p>Support & Integration</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <Home size={20} />
            Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => handleTabChange('support')}
          >
            <HeartHandshake size={20} />
            Refugee Support
          </button>
          <button 
            className={`nav-item ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => handleTabChange('stories')}
          >
            <FileText size={20} />
            Community Stories
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            <User size={20} />
            Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.full_name || 'Refugee User'}!</h1>
            <p>Your safe space for support and community integration</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">{notifications.length}</span>
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'support' && renderSupport()}
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
};

export default RefugeeDashboard; 