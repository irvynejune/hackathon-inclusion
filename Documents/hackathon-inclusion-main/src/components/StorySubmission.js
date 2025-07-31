import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Camera, Mic, Upload } from 'lucide-react';
import './StorySubmission.css';
import { useLanguage } from '../context/LanguageContext';

const StorySubmission = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="story-submission">
      <header className="page-header">
        <button onClick={() => navigate('/creative/dashboard')} className="back-btn">
          <ArrowLeft size={24} />
          {t('backToDashboard')}
        </button>
        <h1>{t('submitYourStory')}</h1>
      </header>

      <main className="page-content">
        <div className="submission-form">
          <div className="form-section">
            <h2>{t('shareYourCreativeJourney')}</h2>
            <p>{t('tellUsAboutYourCreativeWork')}</p>
            
            <div className="form-group">
              <label htmlFor="story-title">{t('storyTitle')}</label>
              <input type="text" id="story-title" placeholder={t('enterYourStoryTitle')} />
            </div>

            <div className="form-group">
              <label htmlFor="story-content">{t('yourStory')}</label>
              <textarea 
                id="story-content" 
                rows={6} 
                placeholder={t('shareYourCreativeJourneyPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label>{t('addMediaOptional')}</label>
              <div className="media-upload">
                <button className="upload-btn">
                  <Camera size={20} />
                  {t('addPhotos')}
                </button>
                <button className="upload-btn">
                  <Mic size={20} />
                  {t('recordAudio')}
                </button>
                <button className="upload-btn">
                  <Upload size={20} />
                  {t('uploadFiles')}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-secondary">{t('saveDraft')}</button>
              <button className="btn-primary">{t('submitStory')}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StorySubmission; 