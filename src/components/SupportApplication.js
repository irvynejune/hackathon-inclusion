import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, FileText, DollarSign } from 'lucide-react';
import './SupportApplication.css';
import { useLanguage } from '../context/LanguageContext';

const SupportApplication = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="support-application">
      <header className="page-header">
        <button onClick={() => navigate('/creative/dashboard')} className="back-btn">
          <ArrowLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('applyForSupport')}</h1>
      </header>

      <main className="page-content">
        <div className="application-form">
          <div className="form-section">
            <h2>{t('supportApplication')}</h2>
            <p>{t('tellUsAboutSupportYouNeed')}</p>
            
            <div className="form-group">
              <label htmlFor="support-type">{t('typeOfSupport')}</label>
              <select id="support-type">
                <option value="">{t('selectSupportType')}</option>
                <option value="equipment">{t('equipmentGrant')}</option>
                <option value="training">{t('trainingProgram')}</option>
                <option value="mentorship">{t('mentorship')}</option>
                <option value="funding">{t('projectFunding')}</option>
                <option value="other">{t('other')}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount">{t('requestedAmountKES')}</label>
              <input type="number" id="amount" placeholder={t('enterAmount')} />
            </div>

            <div className="form-group">
              <label htmlFor="description">{t('description')}</label>
              <textarea 
                id="description" 
                rows={4} 
                placeholder={t('describeHowSupportWillHelp')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeline">{t('timeline')}</label>
              <input type="text" id="timeline" placeholder={t('whenDoYouNeedSupport')} />
            </div>

            <div className="form-actions">
              <button className="btn-secondary">{t('saveDraft')}</button>
              <button className="btn-primary">{t('submitApplication')}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportApplication; 