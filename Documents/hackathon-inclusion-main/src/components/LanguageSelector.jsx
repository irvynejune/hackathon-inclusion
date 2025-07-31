import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Languages } from 'lucide-react';
import './LanguageSelector.css';

const languages = [
  {
    code: 'en',
    label: 'English',
    native: 'English',
    flag: '🇺🇸',
    description: 'International language',
  },
  {
    code: 'sw',
    label: 'Swahili',
    native: 'Kiswahili',
    flag: '🇹🇿',
    description: 'East African language',
  },
  {
    code: 'fr',
    label: 'French',
    native: 'Français',
    flag: '🇫🇷',
    description: 'Francophone language',
  },
  {
    code: 'ar',
    label: 'Arabic',
    native: 'العربية',
    flag: '🇸🇦',
    description: 'لغة الشرق الأوسط',
  },
];

const LanguageSelector = () => {
  const { setLanguage, currentLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (code) => {
    setLanguage(code);
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  return (
    <div className="language-selector">
      <header className="language-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label={t('back')}>
          ← {t('back')}
        </button>
        <h1>{t('selectLanguage')}</h1>
        <p className="language-desc">{t('helpInstructions')}</p>
      </header>
      <main className="language-options">
        {languages.map(lang => (
          <motion.div
            key={lang.code}
            className={`language-option${currentLanguage === lang.code ? ' selected' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(lang.code)}
            tabIndex={0}
            role="button"
            aria-label={lang.native}
            onKeyPress={e => e.key === 'Enter' && handleSelect(lang.code)}
          >
            <span className="flag">{lang.flag}</span>
            <div className="lang-info">
              <span className="lang-native">{lang.native}</span>
              <span className="lang-label">{lang.label}</span>
              <span className="lang-desc">{lang.description}</span>
            </div>
            {currentLanguage === lang.code && <span className="selected-indicator">✓</span>}
          </motion.div>
        ))}
      </main>
      <footer className="language-footer">
        <p>{t('helpInstructions')}</p>
        <p style={{ fontSize: 13, opacity: 0.7 }}>{t('privacyPolicy')}</p>
      </footer>
    </div>
  );
};

export default LanguageSelector;