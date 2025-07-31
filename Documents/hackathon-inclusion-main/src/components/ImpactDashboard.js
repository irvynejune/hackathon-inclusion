import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, DollarSign, MapPin } from 'lucide-react';
import './ImpactDashboard.css';
import { useLanguage } from '../context/LanguageContext';

const ImpactDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="impact-dashboard">
      <header className="page-header">
        <button onClick={() => navigate('/heva/dashboard')} className="back-btn">
          <ArrowLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('impactDashboardTitle')}</h1>
      </header>

      <main className="page-content">
        <div className="impact-overview">
          <div className="metrics-grid">
            <div className="metric-card">
              <Users size={32} />
              <h3>{t('totalCreatives')}</h3>
              <p className="metric-value">1,247</p>
              <span className="metric-change positive">{t('plus15ThisMonth')}</span>
            </div>
            
            <div className="metric-card">
              <DollarSign size={32} />
              <h3>{t('totalFunding')}</h3>
              <p className="metric-value">KES 2.5M</p>
              <span className="metric-change positive">{t('plus23ThisQuarter')}</span>
            </div>
            
            <div className="metric-card">
              <MapPin size={32} />
              <h3>{t('regionsCovered')}</h3>
              <p className="metric-value">12</p>
              <span className="metric-change positive">{t('plus2NewRegions')}</span>
            </div>
            
            <div className="metric-card">
              <TrendingUp size={32} />
              <h3>{t('successRate')}</h3>
              <p className="metric-value">87%</p>
              <span className="metric-change positive">{t('plus5Improvement')}</span>
            </div>
          </div>

          <div className="filters-section">
            <h2>{t('filterByDemographics')}</h2>
            <div className="filter-options">
              <button className="filter-btn active">{t('all')}</button>
              <button className="filter-btn">{t('gender')}</button>
              <button className="filter-btn">{t('location')}</button>
              <button className="filter-btn">{t('identity')}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImpactDashboard; 