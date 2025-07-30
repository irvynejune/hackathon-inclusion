import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Monitor, 
  Phone,
  Lock,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Globe,
  Heart,
  Users,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // Safety & Accessibility States
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30); // minutes

  // Security & Privacy Features
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [secureSession, setSecureSession] = useState(false);

  useEffect(() => {
    // Auto-logout for security after inactivity
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastActivity;
      const timeoutMs = sessionTimeout * 60 * 1000;
      
      if (timeDiff > timeoutMs && secureSession) {
        toast.error(t('sessionExpired'));
        setSecureSession(false);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInactivity);
  }, [lastActivity, sessionTimeout, secureSession, t]);

  // Track user activity for security
  const updateActivity = () => {
    setLastActivity(Date.now());
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  // Accessibility Features
  const toggleAccessibility = () => {
    setAccessibilityMode(!accessibilityMode);
    document.body.classList.toggle('accessibility-mode');
    toast.success(t('accessibilityMode') + (accessibilityMode ? t('disabled') : t('enabled')));
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
    toast.success(t('highContrast') + (highContrast ? t('disabled') : t('enabled')));
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    document.body.classList.toggle('reduced-motion');
    toast.success(t('reducedMotion') + (reducedMotion ? t('disabled') : t('enabled')));
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.body.className = document.body.className.replace(/font-size-\w+/g, '');
    document.body.classList.add(`font-size-${size}`);
    toast.success(t('fontSizeChanged'));
  };

  const toggleVoiceAssistant = () => {
    setVoiceAssistant(!voiceAssistant);
    if (!voiceAssistant) {
      // Initialize voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = currentLanguage === 'sw' ? 'sw-KE' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          // Voice commands
          if (transcript.toLowerCase().includes('creative')) {
            handleUserTypeSelect('creative');
          } else if (transcript.toLowerCase().includes('agent')) {
            handleUserTypeSelect('agent');
          } else if (transcript.toLowerCase().includes('heva')) {
            handleUserTypeSelect('heva');
          }
        };
        
        recognition.start();
      }
    }
    toast.success(t('voiceAssistant') + (voiceAssistant ? t('disabled') : t('enabled')));
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      // Play welcome audio
      const audio = new Audio('/audio/welcome.mp3');
      audio.play().catch(() => {
        toast.error(t('audioNotSupported'));
      });
    }
    toast.success(t('audio') + (audioEnabled ? t('disabled') : t('enabled')));
  };

  const handleUserTypeSelect = (type) => {
    // Map user types to backend user types
    let userType;
    switch (type) {
      case 'creative':
        userType = 'creative';
        break;
      case 'agent':
        userType = 'field_agent';
        break;
      case 'heva':
        userType = 'admin';
        break;
      default:
        userType = 'creative';
    }
    
    // Navigate to login page with user type pre-selected
    navigate('/login', { state: { userType: userType } });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const acceptPrivacyNotice = () => {
    setShowPrivacyNotice(false);
    setSecureSession(true);
    localStorage.setItem('privacyAccepted', 'true');
    localStorage.setItem('sessionStart', Date.now().toString());
    toast.success(t('privacyAccepted'));
  };

  const declinePrivacyNotice = () => {
    toast.error(t('privacyRequired'));
    // Redirect to a limited version or exit
  };

  // Emergency Exit Function
  const emergencyExit = () => {
    // Clear all sensitive data
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to safe page
    window.location.href = 'https://www.google.com';
  };

  // Keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + 1-3 for user types
      if (e.altKey) {
        switch (e.key) {
          case '1':
            handleUserTypeSelect('creative');
            break;
          case '2':
            handleUserTypeSelect('agent');
            break;
          case '3':
            handleUserTypeSelect('heva');
            break;
          case 'h':
            navigate('/help');
            break;
          case 'l':
            navigate('/language');
            break;
          case 'Escape':
            emergencyExit();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  if (showPrivacyNotice) {
    return (
      <motion.div 
        className="privacy-notice-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="privacy-notice"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="privacy-header">
            <Shield className="privacy-icon" />
            <h2>{t('privacyNotice')}</h2>
          </div>
          
          <div className="privacy-content">
            <p><strong>{t('dataProtection')}</strong></p>
            <ul>
              <li>{t('dataCollection')}</li>
              <li>{t('dataUsage')}</li>
              <li>{t('dataSecurity')}</li>
              <li>{t('dataRights')}</li>
            </ul>
            
            <p><strong>{t('safetyFeatures')}</strong></p>
            <ul>
              <li>{t('secureSession')}</li>
              <li>{t('autoLogout')}</li>
              <li>{t('dataEncryption')}</li>
              <li>{t('emergencyExit')}</li>
            </ul>
          </div>
          
          <div className="privacy-actions">
            <button 
              className="btn btn-primary"
              onClick={acceptPrivacyNotice}
              aria-label={t('acceptPrivacy')}
            >
              <CheckCircle />
              {t('acceptAndContinue')}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={declinePrivacyNotice}
              aria-label={t('declinePrivacy')}
            >
              <AlertTriangle />
              {t('decline')}
            </button>
          </div>
          
          <div className="emergency-exit">
            <button 
              className="btn btn-danger"
              onClick={emergencyExit}
              aria-label={t('emergencyExit')}
            >
              <AlertTriangle />
              {t('emergencyExit')} (Esc)
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={`landing-page ${accessibilityMode ? 'accessibility-mode' : ''} ${highContrast ? 'high-contrast' : ''} ${reducedMotion ? 'reduced-motion' : ''} font-size-${fontSize}`}>
      {/* Security Status Bar */}
      <div className="security-status">
        <div className="security-indicators">
          <span className={`security-indicator ${secureSession ? 'secure' : 'insecure'}`}>
            <Lock size={16} />
            {secureSession ? t('secureSession') : t('insecureSession')}
          </span>
          <span className="session-timer">
            {Math.max(0, Math.floor((sessionTimeout * 60 * 1000 - (Date.now() - lastActivity)) / 60000))} {t('minutesLeft')}
          </span>
        </div>
        <button 
          className="emergency-exit-btn"
          onClick={emergencyExit}
          aria-label={t('emergencyExit')}
        >
          <AlertTriangle size={16} />
          {t('emergencyExit')}
        </button>
      </div>

      {/* Accessibility Toolbar */}
      <div className="accessibility-toolbar">
        <div className="accessibility-controls">
          <button 
            className={`accessibility-btn ${accessibilityMode ? 'active' : ''}`}
            onClick={toggleAccessibility}
            aria-label={t('accessibilityMode')}
          >
            <Heart size={20} />
            {t('accessibility')}
          </button>
          
          <button 
            className={`accessibility-btn ${highContrast ? 'active' : ''}`}
            onClick={toggleHighContrast}
            aria-label={t('highContrast')}
          >
            <Eye size={20} />
            {t('highContrast')}
          </button>
          
          <button 
            className={`accessibility-btn ${reducedMotion ? 'active' : ''}`}
            onClick={toggleReducedMotion}
            aria-label={t('reducedMotion')}
          >
            <EyeOff size={20} />
            {t('reducedMotion')}
          </button>
          
          <div className="font-size-controls">
            <button onClick={() => changeFontSize('small')} aria-label={t('smallFont')}>A-</button>
            <button onClick={() => changeFontSize('medium')} aria-label={t('mediumFont')}>A</button>
            <button onClick={() => changeFontSize('large')} aria-label={t('largeFont')}>A+</button>
          </div>
          
          <button 
            className={`accessibility-btn ${voiceAssistant ? 'active' : ''}`}
            onClick={toggleVoiceAssistant}
            aria-label={t('voiceAssistant')}
          >
            <Volume2 size={20} />
            {t('voiceAssistant')}
          </button>
          
          <button 
            className={`accessibility-btn ${audioEnabled ? 'active' : ''}`}
            onClick={toggleAudio}
            aria-label={t('audioInstructions')}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {t('audio')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="landing-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <header className="landing-header">
          <motion.div 
            className="logo-section"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logo">
              <Heart className="logo-icon" />
              <h1>HEVA Inclusion</h1>
            </div>
            <p className="tagline">{t('empoweringCreatives')}</p>
          </motion.div>
        </header>

        <main className="landing-main">
          <section className="welcome-section">
            <motion.h2 
              className="welcome-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('welcomeToHEVA')}
            </motion.h2>
            <motion.p 
              className="welcome-description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('inclusivePlatform')}
            </motion.p>
          </section>

          <section className="user-options">
            <h3>{t('selectUserType')}</h3>
            <div className="user-options-grid">
              <motion.div 
                className="user-option creative"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('creative')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleUserTypeSelect('creative')}
                aria-label={t('iAmCreative')}
              >
                <div className="option-icon">
                  <Heart />
                </div>
                <h4>{t('iAmCreative')}</h4>
                <p>{t('creativeDescription')}</p>
                <div className="accessibility-info">
                  <span className="accessibility-badge">{t('accessible')}</span>
                  <span className="accessibility-badge">{t('multilingual')}</span>
                </div>
              </motion.div>

              <motion.div 
                className="user-option agent"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('agent')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleUserTypeSelect('agent')}
                aria-label={t('iAmFieldAgent')}
              >
                <div className="option-icon">
                  <Users />
                </div>
                <h4>{t('iAmFieldAgent')}</h4>
                <p>{t('agentDescription')}</p>
                <div className="accessibility-info">
                  <span className="accessibility-badge">{t('offlineMode')}</span>
                  <span className="accessibility-badge">{t('secure')}</span>
                </div>
              </motion.div>

              <motion.div 
                className="user-option heva"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleUserTypeSelect('heva')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleUserTypeSelect('heva')}
                aria-label={t('hevaTeam')}
              >
                <div className="option-icon">
                  <Building />
                </div>
                <h4>{t('hevaTeam')}</h4>
                <p>{t('hevaDescription')}</p>
                <div className="accessibility-info">
                  <span className="accessibility-badge">{t('adminPanel')}</span>
                  <span className="accessibility-badge">{t('analytics')}</span>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="additional-options">
            <h3>{t('additionalOptions')}</h3>
            <div className="additional-options-grid">
              <motion.div 
                className="additional-option"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/language')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && navigate('/language')}
                aria-label={t('selectLanguage')}
              >
                <Globe />
                <span>{t('selectLanguage')}</span>
              </motion.div>

              <motion.div 
                className="additional-option"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/help')}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && navigate('/help')}
                aria-label={t('helpInstructions')}
              >
                <AlertTriangle />
                <span>{t('helpInstructions')}</span>
              </motion.div>

              {!isAuthenticated && (
                <motion.div 
                  className="additional-option login-option"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  aria-label={t('login')}
                >
                  <UserCheck />
                  <span>{t('login')}</span>
                </motion.div>
              )}

              <motion.div 
                className="additional-option"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSecurityInfo(true)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && setShowSecurityInfo(true)}
                aria-label={t('securityInfo')}
              >
                <Shield />
                <span>{t('securityInfo')}</span>
              </motion.div>
            </div>
          </section>

          <section className="accessibility-features">
            <h3>{t('accessibilityFeatures')}</h3>
            <div className="features-grid">
              <div className="feature">
                <Smartphone />
                <span>{t('mobileOptimized')}</span>
              </div>
              <div className="feature">
                <Monitor />
                <span>{t('desktopCompatible')}</span>
              </div>
              <div className="feature">
                <Phone />
                <span>{t('ussdSupport')}</span>
              </div>
              <div className="feature">
                <Volume2 />
                <span>{t('voiceAssistance')}</span>
              </div>
            </div>
          </section>
        </main>

        <footer className="landing-footer">
          <div className="footer-content">
            <p>{t('securePlatform')}</p>
            <div className="footer-links">
              <button onClick={() => setShowPrivacyNotice(true)}>{t('privacyPolicy')}</button>
              <button onClick={() => setShowSecurityInfo(true)}>{t('securityInfo')}</button>
              <button onClick={() => navigate('/help')}>{t('help')}</button>
            </div>
          </div>
        </footer>
      </motion.div>

      {/* Security Information Modal */}
      <AnimatePresence>
        {showSecurityInfo && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecurityInfo(false)}
          >
            <motion.div 
              className="security-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <Shield className="modal-icon" />
                <h3>{t('securityFeatures')}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowSecurityInfo(false)}
                  aria-label={t('close')}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="security-feature">
                  <Lock />
                  <div>
                    <h4>{t('dataEncryption')}</h4>
                    <p>{t('dataEncryptionDesc')}</p>
                  </div>
                </div>
                
                <div className="security-feature">
                  <UserCheck />
                  <div>
                    <h4>{t('secureAuthentication')}</h4>
                    <p>{t('secureAuthenticationDesc')}</p>
                  </div>
                </div>
                
                <div className="security-feature">
                  <AlertTriangle />
                  <div>
                    <h4>{t('autoLogout')}</h4>
                    <p>{t('autoLogoutDesc')}</p>
                  </div>
                </div>
                
                <div className="security-feature">
                  <Shield />
                  <div>
                    <h4>{t('emergencyExit')}</h4>
                    <p>{t('emergencyExitDesc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowSecurityInfo(false)}
                >
                  {t('understand')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage; 