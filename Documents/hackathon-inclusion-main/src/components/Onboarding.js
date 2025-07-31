import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Camera, 
  Mic, 
  Upload, 
  Check,
  Volume2,
  VolumeX,
  Heart,
  Users,
  Globe,
  Shield,
  Smartphone,
  Phone,
  Monitor,
  BookOpen,
  Star,
  Eye,
  EyeOff,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    phone: '',
    location: '',
    
    // Inclusive Identity Fields
    gender: '',
    otherGender: '',
    hasDisability: '',
    disabilityType: '',
    otherDisability: '',
    
    // Marginalized Group Identification
    userGroups: [],
    otherGroup: '',
    
    // Device & Access
    primaryDevice: '',
    internetAccess: '',
    literacyLevel: '',
    preferredFormat: 'text',
    
    // Trust & Social Proof
    hasReference: false,
    referenceName: '',
    referencePhone: '',
    referenceRelationship: '',
    
    // Creative Information
    creativeField: '',
    experience: '',
    bio: '',
    profileImage: null,
    voiceIntro: null,
    
    // Privacy & Consent
    privacyMode: false,
    consentDataCollection: false,
    consentContact: false
  });

  const steps = [
    {
      id: 1,
      title: t('onboardingStep1Title'),
      description: t('onboardingStep1Desc'),
      icon: <User size={24} />
    },
    {
      id: 2,
      title: t('onboardingStep2Title'),
      description: t('onboardingStep2Desc'),
      icon: <Heart size={24} />
    },
    {
      id: 3,
      title: t('onboardingStep3Title'),
      description: t('onboardingStep3Desc'),
      icon: <Smartphone size={24} />
    },
    {
      id: 4,
      title: t('onboardingStep4Title'),
      description: t('onboardingStep4Desc'),
      icon: <Users size={24} />
    },
    {
      id: 5,
      title: t('onboardingStep5Title'),
      description: t('onboardingStep5Desc'),
      icon: <Camera size={24} />
    },
    {
      id: 6,
      title: t('onboardingStep6Title'),
      description: t('onboardingStep6Desc'),
      icon: <Mic size={24} />
    },
    {
      id: 7,
      title: t('onboardingStep7Title'),
      description: t('onboardingStep7Desc'),
      icon: <Check size={24} />
    }
  ];

  const marginalizedGroups = [
    { value: 'refugee', label: t('groupRefugee'), icon: '🏕️' },
    { value: 'pwd', label: t('groupPWD'), icon: '♿' },
    { value: 'lgbtqi', label: t('groupLGBTQI'), icon: '🏳️‍🌈' },
    { value: 'creative', label: t('groupCreative'), icon: '🎨' },
    { value: 'lowIncome', label: t('groupLowIncome'), icon: '💰' },
    { value: 'lowLiteracy', label: t('groupLowLiteracy'), icon: '📚' },
    { value: 'rural', label: t('groupRural'), icon: '🌾' },
    { value: 'youth', label: t('groupYouth'), icon: '👨‍🎓' },
    { value: 'elderly', label: t('groupElderly'), icon: '👴' },
    { value: 'other', label: t('groupOther'), icon: '➕' }
  ];

  const genderOptions = [
    { value: 'male', label: t('genderMale') },
    { value: 'female', label: t('genderFemale') },
    { value: 'nonBinary', label: t('genderNonBinary') },
    { value: 'other', label: t('genderOther') },
    { value: 'preferNotToSay', label: t('genderPreferNotToSay') }
  ];

  const disabilityTypes = [
    { value: 'visual', label: t('disabilityVisual') },
    { value: 'hearing', label: t('disabilityHearing') },
    { value: 'mobility', label: t('disabilityMobility') },
    { value: 'cognitive', label: t('disabilityCognitive') },
    { value: 'speech', label: t('disabilitySpeech') },
    { value: 'other', label: t('disabilityOther') }
  ];

  const deviceOptions = [
    { value: 'smartphone', label: t('deviceSmartphone'), icon: '📱' },
    { value: 'featurePhone', label: t('deviceFeaturePhone'), icon: '📞' },
    { value: 'sharedDevice', label: t('deviceShared'), icon: '🏠' },
    { value: 'computer', label: t('deviceComputer'), icon: '💻' },
    { value: 'noDevice', label: t('deviceNone'), icon: '❌' }
  ];

  const formatOptions = [
    { value: 'text', label: t('formatText'), icon: '📝' },
    { value: 'audio', label: t('formatAudio'), icon: '🔊' },
    { value: 'video', label: t('formatVideo'), icon: '🎥' },
    { value: 'icons', label: t('formatIcons'), icon: '🎨' }
  ];

  const creativeFields = [
    t('creativeFieldVisualArts'),
    t('creativeFieldMusic'),
    t('creativeFieldDance'),
    t('creativeFieldTheater'),
    t('creativeFieldFilmVideo'),
    t('creativeFieldPhotography'),
    t('creativeFieldCrafts'),
    t('creativeFieldDigitalArts'),
    t('creativeFieldLiterature'),
    t('creativeFieldFashionDesign'),
    t('creativeFieldOther')
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGroupToggle = (groupValue) => {
    setFormData(prev => ({
      ...prev,
      userGroups: prev.userGroups.includes(groupValue)
        ? prev.userGroups.filter(g => g !== groupValue)
        : [...prev.userGroups, groupValue]
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleVoiceRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            handleFileUpload('voiceIntro', audioBlob);
            toast.success(t('voiceRecordedSuccess'));
          };

          mediaRecorder.start();
          setTimeout(() => mediaRecorder.stop(), 10000); // 10 seconds
        })
        .catch(error => {
          toast.error(t('microphoneAccessError'));
        });
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      const audio = new Audio('/sounds/onboarding-instructions.mp3');
      audio.play().catch(() => {});
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await login(formData, 'creative');
      if (result.success) {
        toast.success(t('profileCreatedSuccess'));
        navigate('/creative/dashboard');
      } else {
        toast.error(t('profileCreationFailed'));
      }
    } catch (error) {
      toast.error(t('profileCreationError'));
    }
  };

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep1Title')}</h2>
      <p>{t('onboardingStep1Desc')}</p>
      
      <div className="form-group">
        <label htmlFor="name">{t('labelFullName')} *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder={t('placeholderFullName')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">{t('labelEmail')}</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder={t('placeholderEmail')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">{t('labelPhone')} *</label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder={t('placeholderPhone')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">{t('labelLocation')}</label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder={t('placeholderLocation')}
        />
      </div>
    </div>
  );

  // Step 2: Inclusive Identity & Marginalized Groups
  const renderStep2 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep2Title')}</h2>
      <p>{t('onboardingStep2Desc')}</p>
      
      <div className="form-group">
        <label>{t('labelGender')}</label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
        >
          <option value="">{t('selectGender')}</option>
          {genderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {formData.gender === 'other' && (
          <input
            type="text"
            value={formData.otherGender}
            onChange={(e) => handleInputChange('otherGender', e.target.value)}
            placeholder={t('specifyGender')}
            className="mt-2"
          />
        )}
      </div>

      <div className="form-group">
        <label>{t('labelDisability')}</label>
        <select
          value={formData.hasDisability}
          onChange={(e) => handleInputChange('hasDisability', e.target.value)}
        >
          <option value="">{t('selectDisability')}</option>
          <option value="yes">{t('disabilityYes')}</option>
          <option value="no">{t('disabilityNo')}</option>
          <option value="preferNotToSay">{t('disabilityPreferNotToSay')}</option>
        </select>
        
        {formData.hasDisability === 'yes' && (
          <div className="mt-2">
            <select
              value={formData.disabilityType}
              onChange={(e) => handleInputChange('disabilityType', e.target.value)}
            >
              <option value="">{t('selectDisabilityType')}</option>
              {disabilityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {formData.disabilityType === 'other' && (
              <input
                type="text"
                value={formData.otherDisability}
                onChange={(e) => handleInputChange('otherDisability', e.target.value)}
                placeholder={t('specifyDisability')}
                className="mt-2"
              />
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <label>{t('labelMarginalizedGroups')}</label>
        <p className="help-text">{t('marginalizedGroupsHelp')}</p>
        <div className="checkbox-grid">
          {marginalizedGroups.map(group => (
            <label key={group.value} className="checkbox-item">
              <input
                type="checkbox"
                checked={formData.userGroups.includes(group.value)}
                onChange={() => handleGroupToggle(group.value)}
              />
              <span className="checkbox-label">
                <span className="group-icon">{group.icon}</span>
                {group.label}
              </span>
            </label>
          ))}
        </div>
        {formData.userGroups.includes('other') && (
          <input
            type="text"
            value={formData.otherGroup}
            onChange={(e) => handleInputChange('otherGroup', e.target.value)}
            placeholder={t('specifyOtherGroup')}
            className="mt-2"
          />
        )}
      </div>
    </div>
  );

  // Step 3: Device Access & Literacy
  const renderStep3 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep3Title')}</h2>
      <p>{t('onboardingStep3Desc')}</p>
      
      <div className="form-group">
        <label>{t('labelPrimaryDevice')}</label>
        <div className="device-options">
          {deviceOptions.map(device => (
            <label key={device.value} className="device-option">
              <input
                type="radio"
                name="primaryDevice"
                value={device.value}
                checked={formData.primaryDevice === device.value}
                onChange={(e) => handleInputChange('primaryDevice', e.target.value)}
              />
              <div className="device-option-content">
                <span className="device-icon">{device.icon}</span>
                <span className="device-label">{device.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>{t('labelInternetAccess')}</label>
        <select
          value={formData.internetAccess}
          onChange={(e) => handleInputChange('internetAccess', e.target.value)}
        >
          <option value="">{t('selectInternetAccess')}</option>
          <option value="always">{t('internetAlways')}</option>
          <option value="sometimes">{t('internetSometimes')}</option>
          <option value="rarely">{t('internetRarely')}</option>
          <option value="never">{t('internetNever')}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t('labelLiteracyLevel')}</label>
        <select
          value={formData.literacyLevel}
          onChange={(e) => handleInputChange('literacyLevel', e.target.value)}
        >
          <option value="">{t('selectLiteracyLevel')}</option>
          <option value="high">{t('literacyHigh')}</option>
          <option value="medium">{t('literacyMedium')}</option>
          <option value="low">{t('literacyLow')}</option>
          <option value="none">{t('literacyNone')}</option>
        </select>
      </div>

      <div className="form-group">
        <label>{t('labelPreferredFormat')}</label>
        <div className="format-options">
          {formatOptions.map(format => (
            <label key={format.value} className="format-option">
              <input
                type="radio"
                name="preferredFormat"
                value={format.value}
                checked={formData.preferredFormat === format.value}
                onChange={(e) => handleInputChange('preferredFormat', e.target.value)}
              />
              <div className="format-option-content">
                <span className="format-icon">{format.icon}</span>
                <span className="format-label">{format.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Trust & Social Proof
  const renderStep4 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep4Title')}</h2>
      <p>{t('onboardingStep4Desc')}</p>
      
      <div className="trust-section">
        <div className="trust-info">
          <Shield size={24} />
          <div>
            <h4>{t('trustBasedOnboarding')}</h4>
            <p>{t('trustBasedOnboardingDesc')}</p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.hasReference}
            onChange={(e) => handleInputChange('hasReference', e.target.checked)}
          />
          {t('hasReference')}
        </label>
      </div>

      {formData.hasReference && (
        <div className="reference-fields">
          <div className="form-group">
            <label htmlFor="referenceName">{t('labelReferenceName')}</label>
            <input
              type="text"
              id="referenceName"
              value={formData.referenceName}
              onChange={(e) => handleInputChange('referenceName', e.target.value)}
              placeholder={t('placeholderReferenceName')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="referencePhone">{t('labelReferencePhone')}</label>
            <input
              type="tel"
              id="referencePhone"
              value={formData.referencePhone}
              onChange={(e) => handleInputChange('referencePhone', e.target.value)}
              placeholder={t('placeholderReferencePhone')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="referenceRelationship">{t('labelReferenceRelationship')}</label>
            <select
              id="referenceRelationship"
              value={formData.referenceRelationship}
              onChange={(e) => handleInputChange('referenceRelationship', e.target.value)}
            >
              <option value="">{t('selectReferenceRelationship')}</option>
              <option value="communityLeader">{t('referenceCommunityLeader')}</option>
              <option value="peer">{t('referencePeer')}</option>
              <option value="mentor">{t('referenceMentor')}</option>
              <option value="family">{t('referenceFamily')}</option>
              <option value="other">{t('referenceOther')}</option>
            </select>
          </div>
        </div>
      )}

      <div className="privacy-section">
        <h4>{t('privacyOptions')}</h4>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.privacyMode}
              onChange={(e) => handleInputChange('privacyMode', e.target.checked)}
            />
            {t('enablePrivacyMode')}
          </label>
          <p className="help-text">{t('privacyModeHelp')}</p>
        </div>
      </div>
    </div>
  );

  // Step 5: Creative Information
  const renderStep5 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep5Title')}</h2>
      <p>{t('onboardingStep5Desc')}</p>
      
      <div className="form-group">
        <label htmlFor="creativeField">{t('labelCreativeField')} *</label>
        <select
          id="creativeField"
          value={formData.creativeField}
          onChange={(e) => handleInputChange('creativeField', e.target.value)}
          required
        >
          <option value="">{t('placeholderCreativeField')}</option>
          {creativeFields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="experience">{t('labelExperience')}</label>
        <select
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
        >
          <option value="">{t('placeholderExperience')}</option>
          <option value="beginner">{t('experienceBeginner')}</option>
          <option value="intermediate">{t('experienceIntermediate')}</option>
          <option value="advanced">{t('experienceAdvanced')}</option>
          <option value="expert">{t('experienceExpert')}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="bio">{t('labelBio')}</label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder={t('placeholderBio')}
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="profileImage">{t('labelProfileImage')}</label>
        <div className="file-upload">
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => handleFileUpload('profileImage', e.target.files[0])}
            style={{ display: 'none' }}
          />
          <label htmlFor="profileImage" className="file-upload-btn">
            <Upload size={20} />
            <span>{t('chooseImage')}</span>
          </label>
          {formData.profileImage && (
            <p className="file-name">{formData.profileImage.name}</p>
          )}
        </div>
      </div>
    </div>
  );

  // Step 6: Voice Introduction
  const renderStep6 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep6Title')}</h2>
      <p>{t('onboardingStep6Desc')}</p>
      
      <div className="voice-recording">
        <button 
          className="record-btn"
          onClick={handleVoiceRecording}
          disabled={formData.voiceIntro}
        >
          <Mic size={24} />
          {formData.voiceIntro ? t('reRecord') : t('startRecording')}
        </button>
        
        {formData.voiceIntro && (
          <div className="recording-preview">
            <audio controls src={URL.createObjectURL(formData.voiceIntro)} />
            <p>{t('voiceRecorded')}</p>
          </div>
        )}
        
        <p className="recording-help">
          {t('recordingHelp')}
        </p>
      </div>
    </div>
  );

  // Step 7: Review & Consent
  const renderStep7 = () => (
    <div className="onboarding-step">
      <h2>{t('onboardingStep7Title')}</h2>
      <p>{t('onboardingStep7Desc')}</p>
      
      <div className="review-section">
        <div className="review-item">
          <h4>{t('onboardingStep1Title')}</h4>
          <p><strong>{t('labelFullName')}:</strong> {formData.name}</p>
          <p><strong>{t('labelEmail')}:</strong> {formData.email || t('notProvided')}</p>
          <p><strong>{t('labelPhone')}:</strong> {formData.phone}</p>
          <p><strong>{t('labelLocation')}:</strong> {formData.location || t('notProvided')}</p>
        </div>
        
        <div className="review-item">
          <h4>{t('onboardingStep2Title')}</h4>
          <p><strong>{t('labelGender')}:</strong> {formData.gender ? genderOptions.find(g => g.value === formData.gender)?.label : t('notProvided')}</p>
          <p><strong>{t('labelDisability')}:</strong> {formData.hasDisability ? t(`disability${formData.hasDisability.charAt(0).toUpperCase() + formData.hasDisability.slice(1)}`) : t('notProvided')}</p>
          <p><strong>{t('labelMarginalizedGroups')}:</strong> {formData.userGroups.length > 0 ? formData.userGroups.map(g => marginalizedGroups.find(mg => mg.value === g)?.label).join(', ') : t('noneSelected')}</p>
        </div>
        
        <div className="review-item">
          <h4>{t('onboardingStep3Title')}</h4>
          <p><strong>{t('labelPrimaryDevice')}:</strong> {formData.primaryDevice ? deviceOptions.find(d => d.value === formData.primaryDevice)?.label : t('notProvided')}</p>
          <p><strong>{t('labelInternetAccess')}:</strong> {formData.internetAccess ? t(`internet${formData.internetAccess.charAt(0).toUpperCase() + formData.internetAccess.slice(1)}`) : t('notProvided')}</p>
          <p><strong>{t('labelPreferredFormat')}:</strong> {formData.preferredFormat ? formatOptions.find(f => f.value === formData.preferredFormat)?.label : t('notProvided')}</p>
        </div>
        
        <div className="review-item">
          <h4>{t('onboardingStep5Title')}</h4>
          <p><strong>{t('labelCreativeField')}:</strong> {formData.creativeField}</p>
          <p><strong>{t('labelExperience')}:</strong> {formData.experience || t('notSpecified')}</p>
          <p><strong>{t('labelBio')}:</strong> {formData.bio || t('notProvided')}</p>
          <p><strong>{t('labelProfileImage')}:</strong> {formData.profileImage ? t('uploaded') : t('notUploaded')}</p>
        </div>
        
        <div className="review-item">
          <h4>{t('onboardingStep6Title')}</h4>
          <p><strong>{t('status')}:</strong> {formData.voiceIntro ? t('recorded') : t('notRecorded')}</p>
        </div>
      </div>

      <div className="consent-section">
        <h4>{t('consentTitle')}</h4>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.consentDataCollection}
              onChange={(e) => handleInputChange('consentDataCollection', e.target.checked)}
              required
            />
            {t('consentDataCollection')}
          </label>
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.consentContact}
              onChange={(e) => handleInputChange('consentContact', e.target.checked)}
            />
            {t('consentContact')}
          </label>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="onboarding">
      <header className="onboarding-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/')}
          aria-label={t('back')}
        >
          <ArrowLeft size={24} />
          <span>{t('back')}</span>
        </button>
        
        <div className="header-controls">
          <button 
            className="audio-btn"
            onClick={toggleAudio}
            aria-label={isAudioEnabled ? t('disableAudio') : t('enableAudio')}
          >
            {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      <main className="onboarding-main">
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`progress-step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {currentStep > step.id ? <Check size={16} /> : step.icon}
              </div>
              <div className="step-info">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="onboarding-content">
          {renderCurrentStep()}
        </div>

        <div className="onboarding-actions">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={prevStep}>
              {t('previous')}
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button className="btn-primary" onClick={nextStep}>
              {t('next')}
            </button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={handleSubmit}
              disabled={!formData.consentDataCollection}
            >
              {t('completeProfile')}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Onboarding; 