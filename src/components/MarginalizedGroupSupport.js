import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  Shield, 
  Globe,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Accessibility,
  Languages,
  Smartphone,
  Wifi,
  Clock,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './MarginalizedGroupSupport.css';

const MarginalizedGroupSupport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState('all');

  const marginalizedGroups = [
    {
      id: 'refugee',
      title: t('refugeeSupport'),
      icon: '🏕️',
      description: t('refugeeSupportDesc'),
      challenges: [
        t('refugeeChallenge1'),
        t('refugeeChallenge2'),
        t('refugeeChallenge3')
      ],
      solutions: [
        t('refugeeSolution1'),
        t('refugeeSolution2'),
        t('refugeeSolution3')
      ],
      resources: [
        {
          title: t('refugeeResource1'),
          description: t('refugeeResource1Desc'),
          icon: <BookOpen size={20} />
        },
        {
          title: t('refugeeResource2'),
          description: t('refugeeResource2Desc'),
          icon: <Phone size={20} />
        },
        {
          title: t('refugeeResource3'),
          description: t('refugeeResource3Desc'),
          icon: <Globe size={20} />
        }
      ]
    },
    {
      id: 'pwd',
      title: t('pwdSupport'),
      icon: '♿',
      description: t('pwdSupportDesc'),
      challenges: [
        t('pwdChallenge1'),
        t('pwdChallenge2'),
        t('pwdChallenge3')
      ],
      solutions: [
        t('pwdSolution1'),
        t('pwdSolution2'),
        t('pwdSolution3')
      ],
      resources: [
        {
          title: t('pwdResource1'),
          description: t('pwdResource1Desc'),
          icon: <Accessibility size={20} />
        },
        {
          title: t('pwdResource2'),
          description: t('pwdResource2Desc'),
          icon: <Shield size={20} />
        },
        {
          title: t('pwdResource3'),
          description: t('pwdResource3Desc'),
          icon: <Users size={20} />
        }
      ]
    },
    {
      id: 'lgbtqi',
      title: t('lgbtqiSupport'),
      icon: '🏳️‍🌈',
      description: t('lgbtqiSupportDesc'),
      challenges: [
        t('lgbtqiChallenge1'),
        t('lgbtqiChallenge2'),
        t('lgbtqiChallenge3')
      ],
      solutions: [
        t('lgbtqiSolution1'),
        t('lgbtqiSolution2'),
        t('lgbtqiSolution3')
      ],
      resources: [
        {
          title: t('lgbtqiResource1'),
          description: t('lgbtqiResource1Desc'),
          icon: <Heart size={20} />
        },
        {
          title: t('lgbtqiResource2'),
          description: t('lgbtqiResource2Desc'),
          icon: <Shield size={20} />
        },
        {
          title: t('lgbtqiResource3'),
          description: t('lgbtqiResource3Desc'),
          icon: <Users size={20} />
        }
      ]
    },
    {
      id: 'creative',
      title: t('creativeSupport'),
      icon: '🎨',
      description: t('creativeSupportDesc'),
      challenges: [
        t('creativeChallenge1'),
        t('creativeChallenge2'),
        t('creativeChallenge3')
      ],
      solutions: [
        t('creativeSolution1'),
        t('creativeSolution2'),
        t('creativeSolution3')
      ],
      resources: [
        {
          title: t('creativeResource1'),
          description: t('creativeResource1Desc'),
          icon: <DollarSign size={20} />
        },
        {
          title: t('creativeResource2'),
          description: t('creativeResource2Desc'),
          icon: <Globe size={20} />
        },
        {
          title: t('creativeResource3'),
          description: t('creativeResource3Desc'),
          icon: <Users size={20} />
        }
      ]
    }
  ];

  const accessibilityFeatures = [
    {
      title: t('accessibilityFeature1'),
      description: t('accessibilityFeature1Desc'),
      icon: <Accessibility size={24} />
    },
    {
      title: t('accessibilityFeature2'),
      description: t('accessibilityFeature2Desc'),
      icon: <Languages size={24} />
    },
    {
      title: t('accessibilityFeature3'),
      description: t('accessibilityFeature3Desc'),
      icon: <Smartphone size={24} />
    },
    {
      title: t('accessibilityFeature4'),
      description: t('accessibilityFeature4Desc'),
      icon: <Wifi size={24} />
    }
  ];

  const inclusionPrinciples = [
    {
      title: t('inclusionPrinciple1'),
      description: t('inclusionPrinciple1Desc'),
      icon: <Heart size={24} />
    },
    {
      title: t('inclusionPrinciple2'),
      description: t('inclusionPrinciple2Desc'),
      icon: <Shield size={24} />
    },
    {
      title: t('inclusionPrinciple3'),
      description: t('inclusionPrinciple3Desc'),
      icon: <Globe size={24} />
    },
    {
      title: t('inclusionPrinciple4'),
      description: t('inclusionPrinciple4Desc'),
      icon: <Users size={24} />
    }
  ];

  const selectedGroupData = marginalizedGroups.find(group => group.id === selectedGroup);

  return (
    <div className="marginalized-group-support">
      <header className="support-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/creative/dashboard')}
          aria-label={t('back')}
        >
          <ArrowLeft size={24} />
          <span>{t('back')}</span>
        </button>
        
        <div className="header-content">
          <h1>{t('marginalizedGroupSupportTitle')}</h1>
          <p>{t('marginalizedGroupSupportDesc')}</p>
        </div>
      </header>

      <main className="support-main">
        <div className="group-selector">
          <h2>{t('selectYourGroup')}</h2>
          <div className="group-buttons">
            <button
              className={`group-btn ${selectedGroup === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('all')}
            >
              <Users size={20} />
              <span>{t('allGroups')}</span>
            </button>
            {marginalizedGroups.map(group => (
              <button
                key={group.id}
                className={`group-btn ${selectedGroup === group.id ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group.id)}
              >
                <span className="group-icon">{group.icon}</span>
                <span>{group.title}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedGroup === 'all' ? (
          <div className="all-groups-overview">
            <h2>{t('overviewOfAllGroups')}</h2>
            <div className="groups-grid">
              {marginalizedGroups.map(group => (
                <div key={group.id} className="group-overview-card">
                  <div className="group-header">
                    <span className="group-icon-large">{group.icon}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <p>{group.description}</p>
                  <button
                    className="learn-more-btn"
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    {t('learnMore')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="group-detail">
            <div className="group-header-detail">
              <span className="group-icon-large">{selectedGroupData.icon}</span>
              <div>
                <h2>{selectedGroupData.title}</h2>
                <p>{selectedGroupData.description}</p>
              </div>
            </div>

            <div className="challenges-section">
              <h3>{t('keyChallenges')}</h3>
              <div className="challenges-list">
                {selectedGroupData.challenges.map((challenge, index) => (
                  <div key={index} className="challenge-item">
                    <AlertTriangle size={16} />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="solutions-section">
              <h3>{t('ourSolutions')}</h3>
              <div className="solutions-list">
                {selectedGroupData.solutions.map((solution, index) => (
                  <div key={index} className="solution-item">
                    <CheckCircle size={16} />
                    <span>{solution}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="resources-section">
              <h3>{t('availableResources')}</h3>
              <div className="resources-grid">
                {selectedGroupData.resources.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-icon">
                      {resource.icon}
                    </div>
                    <div className="resource-content">
                      <h4>{resource.title}</h4>
                      <p>{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="accessibility-section">
          <h2>{t('accessibilityFeatures')}</h2>
          <p>{t('accessibilityFeaturesDesc')}</p>
          
          <div className="accessibility-grid">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className="accessibility-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inclusion-principles">
          <h2>{t('inclusionPrinciples')}</h2>
          <p>{t('inclusionPrinciplesDesc')}</p>
          
          <div className="principles-grid">
            {inclusionPrinciples.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-icon">
                  {principle.icon}
                </div>
                <div className="principle-content">
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-support">
          <h2>{t('needHelp')}</h2>
          <p>{t('contactSupportDesc')}</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <Phone size={24} />
              <div>
                <h3>{t('phoneSupport')}</h3>
                <p>{t('phoneSupportDesc')}</p>
              </div>
            </div>
            
            <div className="contact-method">
              <Mail size={24} />
              <div>
                <h3>{t('emailSupport')}</h3>
                <p>{t('emailSupportDesc')}</p>
              </div>
            </div>
            
            <div className="contact-method">
              <MapPin size={24} />
              <div>
                <h3>{t('localSupport')}</h3>
                <p>{t('localSupportDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarginalizedGroupSupport; 