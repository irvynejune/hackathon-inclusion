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
import './Help.css';

const Help = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useLanguage();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I create an account?',
      answer: 'Click on "I am a Creative" on the landing page, then follow the onboarding process to set up your profile with basic information, creative details, and optional voice introduction.'
    },
    {
      id: 2,
      question: 'How do I submit my creative story?',
      answer: 'Once logged in, go to your dashboard and click "Submit New Story". You can upload text, images, or voice recordings to share your creative journey.'
    },
    {
      id: 3,
      question: 'How do I apply for financial support?',
      answer: 'Navigate to the "Support" section in your dashboard and click "New Application". Choose the type of support you need and fill out the required information.'
    },
    {
      id: 4,
      question: 'How do I track my earnings?',
      answer: 'Use the "Financial Tracking" feature in your dashboard to log your income and expenses. The system will help you monitor your financial progress.'
    },
    {
      id: 5,
      question: 'Can I use the app offline?',
      answer: 'Yes! The mobile app supports offline mode. Your data will be saved locally and synced when you have internet connection.'
    },
    {
      id: 6,
      question: 'How do I change the language?',
      answer: 'Click the language button in the top-right corner of any page to select from English, Swahili, or French.'
    },
    {
      id: 7,
      question: 'How do I access USSD services?',
      answer: 'Dial *123*456# from your mobile phone to access basic services via USSD. You can check your balance, submit stories, and apply for support.'
    },
    {
      id: 8,
      question: 'What if I need technical support?',
      answer: 'Contact our support team via phone, email, or WhatsApp. Our team is available 24/7 to help you with any issues.'
    }
  ];

  const supportChannels = [
    {
      icon: <Phone size={24} />,
      title: 'Phone Support',
      contact: '+254 700 000 000',
      description: 'Call us for immediate assistance',
      available: '24/7'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Support',
      contact: 'support@heva-inclusion.org',
      description: 'Send us a detailed message',
      available: 'Within 24 hours'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'WhatsApp Support',
      contact: '+254 700 000 001',
      description: 'Chat with our support team',
      available: '8 AM - 8 PM EAT'
    }
  ];

  const userGuides = [
    {
      title: 'For Creatives',
      description: 'Learn how to use the platform as a creative professional',
      steps: [
        'Create your profile and portfolio',
        'Submit your creative stories',
        'Track your financial progress',
        'Apply for support and grants'
      ]
    },
    {
      title: 'For Field Agents',
      description: 'Guide for NGO officers and community workers',
      steps: [
        'Register new creative users',
        'Upload impact stories',
        'Generate reports',
        'Monitor community progress'
      ]
    },
    {
      title: 'For HEVA Team',
      description: 'Administrative and management features',
      steps: [
        'Manage user accounts',
        'Review applications',
        'Generate impact reports',
        'Monitor platform metrics'
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
          <h1>Help & Support</h1>
          <p>Msaada na Usaidizi / Aide et Support</p>
        </div>
        
        <div className="header-controls">
          <button 
            className="audio-btn"
            onClick={toggleAudio}
            aria-label={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
          >
            {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      <main className="help-main">
        {/* Quick Start Guide */}
        <section className="help-section">
          <h2>Quick Start Guide</h2>
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
          <h2>Frequently Asked Questions</h2>
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
          <h2>Contact Support</h2>
          <p>Need help? We're here to assist you through multiple channels:</p>
          
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