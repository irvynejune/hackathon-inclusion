import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage, t } = useLanguage();

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      description: 'International language'
    },
    {
      code: 'sw',
      name: 'Swahili',
      nativeName: 'Kiswahili',
      flag: '🇹🇿',
      description: 'East African language'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      description: 'Francophone language'
    }
  ];

  const handleSelect = (languageCode) => {
    setLanguage(languageCode);
    
    // Play audio feedback
    const audio = new Audio('/sounds/language-change.mp3');
    audio.play().catch(() => {});
    
    // Navigate back to landing page
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  return (
    <div className="language-selector">
      <header className="language-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
          aria-label="Go back to landing page"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        
        <div className="header-content">
          <Globe size={32} />
          <h1>{t('selectLanguage')}</h1>
          <p>{t('selectLanguageDesc')}</p>
        </div>
      </header>

      <main className="language-main">
        <div className="language-options">
          {languages.map((language, index) => (
            <motion.button
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'selected' : ''}`}
              onClick={() => handleSelect(language.code)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Select ${language.name} language`}
              aria-pressed={currentLanguage === language.code}
            >
              <div className="language-flag">
                <span className="flag-emoji">{language.flag}</span>
              </div>
              
              <div className="language-info">
                <h3 className="language-name">{language.name}</h3>
                <p className="language-native">{language.nativeName}</p>
                <p className="language-description">{language.description}</p>
              </div>
              
              {currentLanguage === language.code && (
                <div className="selected-indicator">
                  <Check size={24} />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="language-help">
          <h3>{t('needHelpLanguage')}</h3>
          <p>{t('languageHelpText1')}</p>
          <p>{t('languageHelpText2')}</p>
          <p>{t('languageHelpText3')}</p>
        </div>
      </main>
    </div>
  );
};

export default LanguageSelector; 