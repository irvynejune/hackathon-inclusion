import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import './FinancialTracking.css';
import { useLanguage } from '../context/LanguageContext';

const FinancialTracking = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="financial-tracking">
      <header className="page-header">
        <button onClick={() => navigate('/creative/dashboard')} className="back-btn">
          <ArrowLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('financialTrackingTitle')}</h1>
      </header>

      <main className="page-content">
        <div className="financial-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <DollarSign size={32} />
              <h3>{t('totalEarnings')}</h3>
              <p className="stat-value">KES 45,000</p>
              <span className="stat-change positive">{t('plus12ThisMonth')}</span>
            </div>
            
            <div className="stat-card">
              <TrendingUp size={32} />
              <h3>{t('monthlyIncome')}</h3>
              <p className="stat-value">KES 8,500</p>
              <span className="stat-change positive">{t('plus8VsLastMonth')}</span>
            </div>
            
            <div className="stat-card">
              <TrendingDown size={32} />
              <h3>{t('expenses')}</h3>
              <p className="stat-value">KES 1,200</p>
              <span className="stat-change negative">{t('minus5VsLastMonth')}</span>
            </div>
          </div>

          <div className="actions-section">
            <h2>{t('quickActions')}</h2>
            <div className="action-buttons">
              <button className="action-btn">
                <Plus size={20} />
                {t('addIncome')}
              </button>
              <button className="action-btn">
                <Plus size={20} />
                {t('addExpense')}
              </button>
              <button className="action-btn">
                <DollarSign size={20} />
                {t('mpesaIntegration')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialTracking; 