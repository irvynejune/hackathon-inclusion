import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import './FinancialTracker.css';

const FinancialTracker = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useUser();

  const mockData = {
    totalFunding: 2500000,
    activeLoans: 150,
    repaymentRate: 87.5,
    averageLoan: 16500,
    monthlyGrowth: 12.3,
    riskScore: 23
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'loan',
      amount: 50000,
      recipient: 'Sarah Mwangi',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: 2,
      type: 'repayment',
      amount: 15000,
      recipient: 'John Doe',
      date: '2024-01-14',
      status: 'completed'
    }
  ];

  return (
    <div className="financial-tracker">
      <header className="tracker-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/heva/dashboard')}
          aria-label={t('back')}
        >
          <ArrowLeft />
          {t('back')}
        </button>
        <h1>{t('financialTracker')}</h1>
      </header>

      <main className="tracker-content">
        <section className="overview-cards">
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign />
            </div>
            <div className="stat-content">
              <h3>Total Funding</h3>
              <p className="stat-value">${mockData.totalFunding.toLocaleString()}</p>
              <span className="stat-change positive">
                <TrendingUp />
                +{mockData.monthlyGrowth}%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Users />
            </div>
            <div className="stat-content">
              <h3>Active Loans</h3>
              <p className="stat-value">{mockData.activeLoans}</p>
              <span className="stat-change positive">
                <TrendingUp />
                +5 this month
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 />
            </div>
            <div className="stat-content">
              <h3>Repayment Rate</h3>
              <p className="stat-value">{mockData.repaymentRate}%</p>
              <span className="stat-change positive">
                <TrendingUp />
                +2.1%
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign />
            </div>
            <div className="stat-content">
              <h3>Average Loan</h3>
              <p className="stat-value">${mockData.averageLoan.toLocaleString()}</p>
              <span className="stat-change negative">
                <TrendingDown />
                -3.2%
              </span>
            </div>
          </div>
        </section>

        <section className="recent-transactions">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.recipient}</h4>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'loan' ? '-' : '+'}${transaction.amount.toLocaleString()}
                  </span>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="risk-analysis">
          <h2>Risk Analysis</h2>
          <div className="risk-score">
            <div className="score-circle">
              <span className="score">{mockData.riskScore}</span>
              <span className="score-label">Risk Score</span>
            </div>
            <div className="risk-details">
              <p>Low risk portfolio with strong repayment history</p>
              <div className="risk-indicators">
                <span className="indicator good">Good Credit</span>
                <span className="indicator good">On-time Payments</span>
                <span className="indicator warning">Some Delays</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FinancialTracker; 