import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  DollarSign, 
  PiggyBank, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  Users,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FinancialLiteracy.css';

const FinancialLiteracy = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('basics');

  const financialTopics = [
    {
      id: 'basics',
      title: t('financialBasics'),
      icon: <BookOpen size={24} />,
      content: [
        {
          title: t('financialTip1'),
          description: t('financialTip1Desc'),
          icon: <PiggyBank size={20} />
        },
        {
          title: t('financialTip2'),
          description: t('financialTip2Desc'),
          icon: <TrendingUp size={20} />
        },
        {
          title: t('financialTip3'),
          description: t('financialTip3Desc'),
          icon: <Shield size={20} />
        }
      ]
    },
    {
      id: 'savings',
      title: t('savingsStrategies'),
      icon: <PiggyBank size={24} />,
      content: [
        {
          title: t('emergencyFund'),
          description: t('emergencyFundDesc'),
          icon: <Shield size={20} />
        },
        {
          title: t('goalSetting'),
          description: t('goalSettingDesc'),
          icon: <Star size={20} />
        },
        {
          title: t('automaticSavings'),
          description: t('automaticSavingsDesc'),
          icon: <TrendingUp size={20} />
        }
      ]
    },
    {
      id: 'credit',
      title: t('creditAndLoans'),
      icon: <DollarSign size={24} />,
      content: [
        {
          title: t('creditRights'),
          description: t('creditRightsDesc'),
          icon: <Shield size={20} />
        },
        {
          title: t('loanTypes'),
          description: t('loanTypesDesc'),
          icon: <Info size={20} />
        },
        {
          title: t('avoidingDebt'),
          description: t('avoidingDebtDesc'),
          icon: <AlertTriangle size={20} />
        }
      ]
    },
    {
      id: 'business',
      title: t('businessFinance'),
      icon: <TrendingUp size={24} />,
      content: [
        {
          title: t('businessBudget'),
          description: t('businessBudgetDesc'),
          icon: <BookOpen size={20} />
        },
        {
          title: t('pricingStrategy'),
          description: t('pricingStrategyDesc'),
          icon: <DollarSign size={20} />
        },
        {
          title: t('cashFlow'),
          description: t('cashFlowDesc'),
          icon: <TrendingUp size={20} />
        }
      ]
    }
  ];

  const marginalizedGroupTips = [
    {
      group: 'refugee',
      title: t('refugeeFinancialTips'),
      tips: [
        t('refugeeTip1'),
        t('refugeeTip2'),
        t('refugeeTip3')
      ]
    },
    {
      group: 'pwd',
      title: t('pwdFinancialTips'),
      tips: [
        t('pwdTip1'),
        t('pwdTip2'),
        t('pwdTip3')
      ]
    },
    {
      group: 'lgbtqi',
      title: t('lgbtqiFinancialTips'),
      tips: [
        t('lgbtqiTip1'),
        t('lgbtqiTip2'),
        t('lgbtqiTip3')
      ]
    },
    {
      group: 'creative',
      title: t('creativeFinancialTips'),
      tips: [
        t('creativeTip1'),
        t('creativeTip2'),
        t('creativeTip3')
      ]
    }
  ];

  return (
    <div className="financial-literacy">
      <header className="financial-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/creative/dashboard')}
          aria-label={t('back')}
        >
          <ArrowLeft size={24} />
          <span>{t('back')}</span>
        </button>
        
        <div className="header-content">
          <h1>{t('financialLiteracyTitle')}</h1>
          <p>{t('financialLiteracyDesc')}</p>
        </div>
      </header>

      <main className="financial-main">
        <div className="financial-tabs">
          {financialTopics.map(topic => (
            <button
              key={topic.id}
              className={`tab-btn ${activeTab === topic.id ? 'active' : ''}`}
              onClick={() => setActiveTab(topic.id)}
            >
              {topic.icon}
              <span>{topic.title}</span>
            </button>
          ))}
        </div>

        <div className="financial-content">
          {financialTopics.map(topic => (
            <div
              key={topic.id}
              className={`topic-content ${activeTab === topic.id ? 'active' : ''}`}
            >
              <h2>{topic.title}</h2>
              
              <div className="tips-grid">
                {topic.content.map((tip, index) => (
                  <div key={index} className="tip-card">
                    <div className="tip-icon">
                      {tip.icon}
                    </div>
                    <div className="tip-content">
                      <h3>{tip.title}</h3>
                      <p>{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="group-specific-tips">
          <h2>{t('groupSpecificTips')}</h2>
          <p>{t('groupSpecificTipsDesc')}</p>
          
          <div className="tips-accordion">
            {marginalizedGroupTips.map((group, index) => (
              <div key={index} className="group-tip">
                <h3>{group.title}</h3>
                <ul>
                  {group.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="transparency-section">
          <h2>{t('transparencyTitle')}</h2>
          <p>{t('transparencyDesc')}</p>
          
          <div className="transparency-grid">
            <div className="transparency-card">
              <Shield size={24} />
              <h3>{t('fraudPrevention')}</h3>
              <p>{t('fraudPreventionDesc')}</p>
            </div>
            
            <div className="transparency-card">
              <AlertTriangle size={24} />
              <h3>{t('reportingFraud')}</h3>
              <p>{t('reportingFraudDesc')}</p>
            </div>
            
            <div className="transparency-card">
              <TrendingUp size={24} />
              <h3>{t('fundTracking')}</h3>
              <p>{t('fundTrackingDesc')}</p>
            </div>
          </div>
        </div>

        <div className="cultural-adaptation">
          <h2>{t('culturalAdaptationTitle')}</h2>
          <p>{t('culturalAdaptationDesc')}</p>
          
          <div className="cultural-grid">
            <div className="cultural-card">
              <Globe size={24} />
              <h3>{t('localExamples')}</h3>
              <p>{t('localExamplesDesc')}</p>
            </div>
            
            <div className="cultural-card">
              <Users size={24} />
              <h3>{t('culturalSensitivity')}</h3>
              <p>{t('culturalSensitivityDesc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialLiteracy; 