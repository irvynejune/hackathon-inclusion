import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Phone, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { login, register, loading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    full_name: '',
    phone: '',
    user_type: 'creative', // Will be auto-set based on route
    gender: 'prefer_not_to_say',
    disability: false,
    marginalized_groups: [],
    primary_device: 'smartphone',
    literacy_level: 'intermediate',
    consent_data_collection: true,
    consent_contact: true
  });

  // Auto-set user type based on route
  useEffect(() => {
    if (location.state?.userType) {
      setFormData(prev => ({
        ...prev,
        user_type: location.state.userType
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear password error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validateForm = () => {
    if (!isLogin) {
      // Check password confirmation
      if (formData.password !== formData.confirmPassword) {
        setPasswordError(t('passwordMismatch'));
        return false;
      }
      
      // Check password strength
      if (formData.password.length < 8) {
        setPasswordError(t('passwordTooShort'));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        // Remove confirmPassword from registration data
        const { confirmPassword, ...registrationData } = formData;
        await register(registrationData);
      }
      
      // Redirect based on user type
      const userType = formData.user_type;
      if (userType === 'admin' || userType === 'heva_team') {
        navigate('/admin');
      } else if (userType === 'field_agent') {
        navigate('/agent/dashboard');
      } else {
        navigate('/creative/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setPasswordError('');
    setFormData(prev => ({
      ...prev,
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      full_name: '',
      phone: ''
    }));
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 'creative': return t('userTypeCreative');
      case 'field_agent': return t('userTypeFieldAgent');
      case 'admin': return t('userTypeAdmin');
      case 'heva_team': return t('userTypeHEVATeam');
      default: return t('userTypeCreative');
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h1>{isLogin ? t('loginTitle') : t('registerTitle')}</h1>
          <p>{isLogin ? t('loginSubtitle') : t('registerSubtitle')}</p>
          {!isLogin && formData.user_type && (
            <p className="user-type-indicator">
              {t('registeringAs')}: <strong>{getUserTypeLabel(formData.user_type)}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>{t('labelFullName')}</label>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder={t('placeholderFullName')}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t('labelUsername')}</label>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder={t('placeholderUsername')}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t('labelPhone')}</label>
                <div className="input-group">
                  <Phone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('placeholderPhone')}
                    required
                  />
                </div>
              </div>

              {/* Hidden user type field - auto-set from route */}
              <input type="hidden" name="user_type" value={formData.user_type} />

              <div className="form-group">
                <label>{t('labelGender')}</label>
                <div className="input-group">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="prefer_not_to_say">{t('genderPreferNotToSay')}</option>
                    <option value="male">{t('genderMale')}</option>
                    <option value="female">{t('genderFemale')}</option>
                    <option value="non_binary">{t('genderNonBinary')}</option>
                    <option value="other">{t('genderOther')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="disability"
                    checked={formData.disability}
                    onChange={handleInputChange}
                  />
                  {t('labelDisability')}
                </label>
              </div>

              <div className="form-group">
                <label>{t('labelPrimaryDevice')}</label>
                <div className="input-group">
                  <select
                    name="primary_device"
                    value={formData.primary_device}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="smartphone">{t('deviceSmartphone')}</option>
                    <option value="feature_phone">{t('deviceFeaturePhone')}</option>
                    <option value="tablet">{t('deviceTablet')}</option>
                    <option value="computer">{t('deviceComputer')}</option>
                    <option value="shared_device">{t('deviceShared')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('labelLiteracyLevel')}</label>
                <div className="input-group">
                  <select
                    name="literacy_level"
                    value={formData.literacy_level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="basic">{t('literacyBasic')}</option>
                    <option value="intermediate">{t('literacyIntermediate')}</option>
                    <option value="advanced">{t('literacyAdvanced')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="consent_data_collection"
                    checked={formData.consent_data_collection}
                    onChange={handleInputChange}
                    required
                  />
                  {t('consentDataCollection')}
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="consent_contact"
                    checked={formData.consent_contact}
                    onChange={handleInputChange}
                    required
                  />
                  {t('consentContact')}
                </label>
              </div>
            </>
          )}

          <div className="form-group">
            <label>{t('labelEmail')}</label>
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('placeholderEmail')}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('labelPassword')}</label>
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('placeholderPassword')}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>{t('labelConfirmPassword')}</label>
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t('placeholderConfirmPassword')}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? t('loading') : (isLogin ? t('login') : t('register'))}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? t('noAccount') : t('haveAccount')}
            <button 
              type="button" 
              className="toggle-btn"
              onClick={toggleMode}
            >
              {isLogin ? t('register') : t('login')}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 