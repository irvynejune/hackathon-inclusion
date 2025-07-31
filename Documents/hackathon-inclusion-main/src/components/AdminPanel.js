import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Settings, Shield, BarChart3 } from 'lucide-react';
import './AdminPanel.css';
import { useLanguage } from '../context/LanguageContext';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="admin-panel">
      <header className="page-header">
        <button onClick={() => navigate('/heva/dashboard')} className="back-btn">
          <ArrowLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('adminPanelTitle')}</h1>
      </header>

      <main className="page-content">
        <div className="admin-grid">
          <div className="admin-card">
            <Users size={48} />
            <h3>{t('userManagement')}</h3>
            <p>{t('manageCreativeUsers')}</p>
            <button className="card-btn">{t('manageUsers')}</button>
          </div>

          <div className="admin-card">
            <Settings size={48} />
            <h3>{t('systemSettings')}</h3>
            <p>{t('configurePlatformSettings')}</p>
            <button className="card-btn">{t('configure')}</button>
          </div>

          <div className="admin-card">
            <Shield size={48} />
            <h3>{t('security')}</h3>
            <p>{t('manageSecuritySettings')}</p>
            <button className="card-btn">{t('securityBtn')}</button>
          </div>

          <div className="admin-card">
            <BarChart3 size={48} />
            <h3>{t('analytics')}</h3>
            <p>{t('viewPlatformAnalytics')}</p>
            <button className="card-btn">{t('viewAnalytics')}</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel; 