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
  Volume2,
  VolumeX,
  Accessibility,
  HeartHandshake,
  Shield,
  Lightbulb,
  GraduationCap,
  Briefcase,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import apiService from '../services/api';
import './PWDDashboard.css';

const PWDDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  // PWD-specific data
  const [accessibilityTools, setAccessibilityTools] = useState([
    { id: 1, name: 'Screen Reader', enabled: true, type: 'screen_reader' },
    { id: 2, name: 'Voice Navigation', enabled: true, type: 'voice_nav' },
    { id: 3, name: 'High Contrast', enabled: false, type: 'high_contrast' },
    { id: 4, name: 'Large Text', enabled: false, type: 'large_text' },
    { id: 5, name: 'Keyboard Navigation', enabled: true, type: 'keyboard' }
  ]);

  const [pwdSupport, setPwdSupport] = useState([
    {
      id: 1,
      type: 'Accessibility Training',
      status: 'available',
      description: 'Learn to use assistive technologies effectively',
      icon: Accessibility
    },
    {
      id: 2,
      type: 'Skills Development',
      status: 'available',
      description: 'Build skills for inclusive employment',
      icon: GraduationCap
    },
    {
      id: 3,
      type: 'Legal Support',
      status: 'available',
      description: 'Access to legal rights and advocacy',
      icon: Shield
    },
    {
      id: 4,
      type: 'Community Network',
      status: 'available',
      description: 'Connect with other PWDs',
      icon: Users
    }
  ]);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-enable voice navigation for PWD users
    if (voiceEnabled) {
      // Initialize voice navigation
      initializeVoiceNavigation();
    }
    
    loadData();
  }, [voiceEnabled]);

  const initializeVoiceNavigation = () => {
    // Voice navigation setup
    if ('speechSynthesis' in window) {
      const welcomeMessage = `Welcome to your PWD dashboard. You have ${pwdSupport.length} support programs available.`;
      const utterance = new SpeechSynthesisUtterance(welcomeMessage);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const speakText = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load PWD-specific data
      const mockStories = [
        {
          id: 1,
          title: 'My Journey as a PWD Creative',
          content: 'Sharing my experience navigating the creative industry with a disability...',
          views: 45,
          date: '2024-01-15',
          status: 'published'
        }
      ];
      setStories(mockStories);

      const mockNotifications = [
        { id: 1, message: 'New accessibility training program available!', type: 'success', time: '2 hours ago' },
        { id: 2, message: 'Your legal support application has been approved', type: 'success', time: '1 day ago' },
        { id: 3, message: 'Community meetup for PWDs this weekend', type: 'info', time: '3 days ago' }
      ];
      setNotifications(mockNotifications);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    speakText('Logging out. Thank you for using the PWD dashboard.');
    logout();
    navigate('/');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    speakText(`Navigated to ${tab} section`);
  };

  const toggleVoiceNavigation = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speakText('Voice navigation enabled');
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
    speakText(`High contrast ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.body.style.fontSize = size === 'large' ? '18px' : size === 'medium' ? '16px' : '14px';
    speakText(`Font size changed to ${size}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const renderOverview = () => (
    <div className="pwd-overview">
      <div className="accessibility-controls">
        <h3>Accessibility Controls</h3>
        <div className="controls-grid">
          <button 
            className={`control-btn ${voiceEnabled ? 'active' : ''}`}
            onClick={toggleVoiceNavigation}
            onFocus={() => speakText('Voice navigation toggle')}
          >
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            Voice Navigation
          </button>
          <button 
            className={`control-btn ${highContrast ? 'active' : ''}`}
            onClick={toggleHighContrast}
            onFocus={() => speakText('High contrast toggle')}
          >
            <Accessibility size={20} />
            High Contrast
          </button>
          <div className="font-size-controls">
            <span>Font Size:</span>
            <button 
              className={`size-btn ${fontSize === 'small' ? 'active' : ''}`}
              onClick={() => changeFontSize('small')}
            >
              S
            </button>
            <button 
              className={`size-btn ${fontSize === 'medium' ? 'active' : ''}`}
              onClick={() => changeFontSize('medium')}
            >
              M
            </button>
            <button 
              className={`size-btn ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => changeFontSize('large')}
            >
              L
            </button>
          </div>
        </div>
      </div>

      <div className="pwd-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Accessibility size={32} />
          </div>
          <div className="stat-content">
            <h3>Accessibility Tools</h3>
            <p className="stat-value">{accessibilityTools.filter(tool => tool.enabled).length} Active</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <HeartHandshake size={32} />
          </div>
          <div className="stat-content">
            <h3>Support Programs</h3>
            <p className="stat-value">{pwdSupport.length} Available</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={32} />
          </div>
          <div className="stat-content">
            <h3>Community</h3>
            <p className="stat-value">PWD Network</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary"
            onClick={() => navigate('/creative/story')}
            onFocus={() => speakText('Share your story')}
          >
            <FileText size={20} />
            Share My Story
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/support')}
            onFocus={() => speakText('Apply for support')}
          >
            <Heart size={20} />
            Apply for Support
          </button>
          <button 
            className="action-btn secondary"
            onClick={() => navigate('/creative/financial-literacy')}
            onFocus={() => speakText('Financial literacy resources')}
          >
            <BookOpen size={20} />
            Financial Literacy
          </button>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="pwd-support">
      <div className="section-header">
        <h2>PWD Support Programs</h2>
        <p>Specialized support and resources for persons with disabilities</p>
      </div>

      <div className="support-grid">
        {pwdSupport.map((program) => {
          const IconComponent = program.icon;
          return (
            <div key={program.id} className="support-card" 
                 onFocus={() => speakText(`${program.type} - ${program.description}`)}>
              <div className="support-header">
                <IconComponent size={24} />
                <h3>{program.type}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(program.status) }}
                >
                  {getStatusText(program.status)}
                </span>
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

      <div className="accessibility-resources">
        <h3>Accessibility Resources</h3>
                 <div className="resources-grid">
           <div className="resource-card">
             <Monitor size={24} />
             <h4>Screen Reader Guide</h4>
             <p>Learn to use screen readers effectively</p>
           </div>
           <div className="resource-card">
             <Smartphone size={24} />
             <h4>Mobile Accessibility</h4>
             <p>Resources for mobile accessibility</p>
           </div>
           <div className="resource-card">
             <Lightbulb size={24} />
             <h4>Innovation Hub</h4>
             <p>Accessible technology solutions</p>
           </div>
         </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="pwd-stories">
      <div className="section-header">
        <h2>PWD Community Stories</h2>
        <button 
          className="btn-primary"
          onClick={() => navigate('/creative/story')}
          onFocus={() => speakText('Create new story')}
        >
          <Plus size={16} />
          Share My Story
        </button>
      </div>

      {stories.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} />
          <h3>No Stories Yet</h3>
          <p>Share your journey and inspire others in the PWD community</p>
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
            <div key={story.id} className="story-card"
                 onFocus={() => speakText(`Story: ${story.title}`)}>
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
    <div className="pwd-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <Accessibility size={48} />
        </div>
        <div className="profile-info">
          <h2>{user?.full_name || 'PWD User'}</h2>
          <p>{user?.email}</p>
          <p className="user-type">Person with Disability</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Accessibility Settings</h3>
          <div className="settings-grid">
            {accessibilityTools.map((tool) => (
              <div key={tool.id} className="setting-card">
                <h4>{tool.name}</h4>
                <p>Accessibility tool for better navigation</p>
                <button className={`btn-${tool.enabled ? 'primary' : 'secondary'}`}>
                  {tool.enabled ? 'Enabled' : 'Enable'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3>PWD Community</h3>
          <div className="community-section">
            <p>Connect with other persons with disabilities</p>
            <div className="community-actions">
              <button className="btn-primary">
                <Users size={16} />
                Join PWD Network
              </button>
              <button className="btn-secondary">
                <Briefcase size={16} />
                Find PWD-Friendly Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pwd-dashboard">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>PWD Dashboard</h2>
          <p>Accessible & Inclusive</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
            onFocus={() => speakText('Overview tab')}
          >
            <Home size={20} />
            Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => handleTabChange('support')}
            onFocus={() => speakText('Support programs tab')}
          >
                          <HeartHandshake size={20} />
            PWD Support
          </button>
          <button 
            className={`nav-item ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => handleTabChange('stories')}
            onFocus={() => speakText('Stories tab')}
          >
            <FileText size={20} />
            Community Stories
          </button>
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
            onFocus={() => speakText('Profile tab')}
          >
            <User size={20} />
            Profile
          </button>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item"
            onClick={handleLogout}
            onFocus={() => speakText('Logout button')}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.full_name || 'PWD User'}!</h1>
            <p>Your accessible dashboard for empowerment and support</p>
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

export default PWDDashboard; 