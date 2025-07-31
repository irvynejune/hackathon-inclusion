import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Filter, Calendar, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useUser();

  const mockReports = [
    {
      id: 1,
      title: "Monthly Impact Report",
      type: "impact",
      date: "2024-01-15",
      status: "completed",
      downloads: 45
    },
    {
      id: 2,
      title: "Financial Performance Q4 2023",
      type: "financial",
      date: "2024-01-10",
      status: "completed",
      downloads: 32
    },
    {
      id: 3,
      title: "Creative Community Survey",
      type: "survey",
      date: "2024-01-08",
      status: "in-progress",
      downloads: 18
    }
  ];

  const reportTypes = [
    { id: 'all', label: 'All Reports', icon: <Users /> },
    { id: 'impact', label: 'Impact Reports', icon: <TrendingUp /> },
    { id: 'financial', label: 'Financial Reports', icon: <Calendar /> },
    { id: 'survey', label: 'Survey Reports', icon: <Users /> }
  ];

  return (
    <div className="reports">
      <header className="reports-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/agent/dashboard')}
          aria-label={t('back')}
        >
          <ArrowLeft />
          {t('back')}
        </button>
        <h1>{t('reports')}</h1>
      </header>

      <main className="reports-content">
        <section className="reports-filters">
          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="report-type">Report Type</label>
              <select id="report-type" className="filter-select">
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="date-range">Date Range</label>
              <select id="date-range" className="filter-select">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>

            <button className="filter-btn" aria-label="Apply filters">
              <Filter />
              Apply Filters
            </button>
          </div>
        </section>

        <section className="reports-list">
          <div className="reports-grid">
            {mockReports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h3>{report.title}</h3>
                  <span className={`status ${report.status}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="report-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{report.date}</span>
                  </div>
                  <div className="meta-item">
                    <Download size={16} />
                    <span>{report.downloads} downloads</span>
                  </div>
                </div>

                <div className="report-actions">
                  <button 
                    className="btn btn-primary"
                    aria-label={`Download ${report.title}`}
                  >
                    <Download />
                    Download
                  </button>
                  <button 
                    className="btn btn-secondary"
                    aria-label={`View details for ${report.title}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reports-summary">
          <h2>Reports Summary</h2>
          <div className="summary-stats">
            <div className="summary-card">
              <h3>Total Reports</h3>
              <p className="stat-number">24</p>
              <span className="stat-change positive">+3 this month</span>
            </div>
            
            <div className="summary-card">
              <h3>Downloads</h3>
              <p className="stat-number">1,247</p>
              <span className="stat-change positive">+12% this month</span>
            </div>
            
            <div className="summary-card">
              <h3>Active Reports</h3>
              <p className="stat-number">8</p>
              <span className="stat-change neutral">No change</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports; 