import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import VoiceAssistant from './VoiceAssistant';
import './Help.css';

const Help = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: t('faqCreateAccount'),
      answer: t('faqCreateAccountAnswer')
    },
    {
      id: 2,
      question: t('faqSubmitStory'),
      answer: t('faqSubmitStoryAnswer')
    },
    {
      id: 3,
      question: t('faqApplySupport'),
      answer: t('faqApplySupportAnswer')
    },
    {
      id: 4,
      question: t('faqTrackEarnings'),
      answer: t('faqTrackEarningsAnswer')
    },
    {
      id: 5,
      question: t('faqOfflineMode'),
      answer: t('faqOfflineModeAnswer')
    },
    {
      id: 6,
      question: t('faqChangeLanguage'),
      answer: t('faqChangeLanguageAnswer')
    },
    {
      id: 7,
      question: t('faqUSSD'),
      answer: t('faqUSSDAnswer')
    },
    {
      id: 8,
      question: t('faqTechnicalSupport'),
      answer: t('faqTechnicalSupportAnswer')
    }
  ];

  const supportChannels = [
    {
      icon: <Phone size={24} />,
      title: t('phoneSupportTitle'),
      contact: t('phoneSupportContact'),
      description: t('phoneSupportDesc'),
      available: t('phoneSupportAvailable')
    },
    {
      icon: <Mail size={24} />,
      title: t('emailSupportTitle'),
      contact: t('emailSupportContact'),
      description: t('emailSupportDesc'),
      available: t('emailSupportAvailable')
    },
    {
      icon: <MessageCircle size={24} />,
      title: t('whatsappSupportTitle'),
      contact: t('whatsappSupportContact'),
      description: t('whatsappSupportDesc'),
      available: t('whatsappSupportAvailable')
    }
  ];

  const userGuides = [
    {
      title: t('userGuideCreatives'),
      description: t('userGuideCreativesDesc'),
      steps: [
        t('userGuideCreativesStep1'),
        t('userGuideCreativesStep2'),
        t('userGuideCreativesStep3'),
        t('userGuideCreativesStep4')
      ]
    },
    {
      title: t('userGuideAgents'),
      description: t('userGuideAgentsDesc'),
      steps: [
        t('userGuideAgentsStep1'),
        t('userGuideAgentsStep2'),
        t('userGuideAgentsStep3'),
        t('userGuideAgentsStep4')
      ]
    },
    {
      title: t('userGuideHEVA'),
      description: t('userGuideHEVADesc'),
      steps: [
        t('userGuideHEVAStep1'),
        t('userGuideHEVAStep2'),
        t('userGuideHEVAStep3'),
        t('userGuideHEVAStep4')
      ]
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      // Play help audio
      const audio = new Audio('/sounds/help-instructions.mp3');
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="help-page">
      <header className="help-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
          aria-label="Go back to landing page"
        >
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        
        <div className="header-content">
          <HelpCircle size={32} />
          <h1>{t('helpTitle')}</h1>
          <p>{t('helpDesc')}</p>
        </div>
        
        <div className="header-controls">
          <VoiceAssistant 
            text={`${t('helpTitle')}. ${t('helpDesc')}`}
            autoPlay={false}
          />
        </div>
      </header>

      <main className="help-main">
        {/* Quick Start Guide */}
        <section className="help-section">
          <h2>{t('userGuidesTitle')}</h2>
          <div className="guide-cards">
            {userGuides.map((guide, index) => (
              <motion.div 
                key={guide.title}
                className="guide-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <ol>
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="help-section">
          <div className="section-header">
            <h2>{t('faqTitle')}</h2>
            <VoiceAssistant 
              text={t('faqTitle')}
              autoPlay={false}
            />
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={expandedFaq === faq.id}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="help-section">
          <h2>{t('supportChannelsTitle')}</h2>
          <p>{t('needHelp')} {t('contactSupportDesc')}</p>
          
          <div className="support-channels">
            {supportChannels.map((channel, index) => (
              <motion.div 
                key={channel.title}
                className="support-channel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="channel-icon">
                  {channel.icon}
                </div>
                <div className="channel-info">
                  <h3>{channel.title}</h3>
                  <p className="channel-contact">{channel.contact}</p>
                  <p className="channel-description">{channel.description}</p>
                  <p className="channel-availability">Available: {channel.available}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Accessibility Features */}
        <section className="help-section">
          <h2>Accessibility Features</h2>
          <div className="accessibility-features">
            <div className="feature-item">
              <h3>🎨 Visual Accessibility</h3>
              <ul>
                <li>High contrast mode support</li>
                <li>Large text and button options</li>
                <li>Color-blind friendly design</li>
                <li>Clear visual hierarchy</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h3>🔊 Audio Accessibility</h3>
              <ul>
                <li>Screen reader compatibility</li>
                <li>Audio instructions and feedback</li>
                <li>Voice recording capabilities</li>
                <li>Audio descriptions for content</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h3>⌨️ Keyboard Navigation</h3>
              <ul>
                <li>Full keyboard accessibility</li>
                <li>Logical tab order</li>
                <li>Keyboard shortcuts</li>
                <li>Focus indicators</li>
              </ul>
            </div>
            
            <div className="feature-item">
              <h3>📱 Mobile Accessibility</h3>
              <ul>
                <li>Touch-friendly interface</li>
                <li>Voice commands support</li>
                <li>Offline functionality</li>
                <li>USSD access for basic phones</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Language Support */}
        <section className="help-section">
          <h2>Language Support</h2>
          <div className="language-support">
            <div className="language-info">
              <Globe size={24} />
              <div>
                <h3>Multilingual Platform</h3>
                <p>Our platform supports multiple languages to ensure inclusivity:</p>
                <ul>
                  <li><strong>English:</strong> International language support</li>
                  <li><strong>Swahili:</strong> East African language support</li>
                  <li><strong>French:</strong> Francophone language support</li>
                </ul>
                <p>You can change the language at any time using the language selector in the top-right corner.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help; 