import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Upload, BarChart3, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import './FieldAgentDashboard.css';

const FieldAgentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="field-agent-dashboard">
      <header className="dashboard-header">
        <h1>{t('fieldAgentDashboardTitle')}</h1>
        <p>{t('welcomeFieldAgent', { name: user?.name })}</p>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          {t('logout')}
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <Users size={48} />
            <h3>{t('createNewUser')}</h3>
            <p>{t('registerNewCreativeUsers')}</p>
            <button className="card-btn">{t('startRegistration')}</button>
          </div>

          <div className="dashboard-card">
            <FileText size={48} />
            <h3>{t('editProfiles')}</h3>
            <p>{t('updateStoriesAndFinancialRecords')}</p>
            <button className="card-btn">{t('manageProfiles')}</button>
          </div>

          <div className="dashboard-card">
            <Upload size={48} />
            <h3>{t('uploadImpactStories')}</h3>
            <p>{t('collectTestimonialsAndVisualData')}</p>
            <button className="card-btn">{t('uploadStories')}</button>
          </div>

          <div className="dashboard-card">
            <BarChart3 size={48} />
            <h3>{t('reports')}</h3>
            <p>{t('trackUsersNeedingFollowUp')}</p>
            <button className="card-btn">{t('viewReports')}</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FieldAgentDashboard; 