import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Phone, Users, MapPin, Building, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

const FieldAgentRegistration = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register, loading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',

    full_name: '',
    phone: '',
    user_type: 'field_agent',
    gender: 'prefer_not_to_say',
    disability: false,
    disability_type: '',
    marginalized_groups: [],
    primary_device: 'smartphone',
    literacy_level: 'intermediate',
    consent_data_collection: true,
    consent_contact: true,
    // Field Agent-specific fields
    region: '',
    organization: '',
    experience_years: '0-1',
    languages: '',
    specializations: '',
    supervisor_name: '',
    supervisor_contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t('passwordMismatch'));
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError(t('passwordTooShort'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      
      toast.success('Field Agent registration successful! Please login with your credentials.');
      navigate('/login', { state: { userType: 'field_agent' } });
    } catch (error) {
      console.error('Registration error:', error);
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
          <h1>Field Agent Registration</h1>
          <p>Join our field team to support communities</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-group">
              <User className="input-icon" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>



          <div className="form-group">
            <label>Email</label>
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-group">
              <Phone className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {passwordError && <p className="error-message">{passwordError}</p>}

          <div className="form-group">
            <label>Region/Area</label>
            <div className="input-group">
              <MapPin className="input-icon" />
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                placeholder="Enter your region or area"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Organization</label>
            <div className="input-group">
              <Building className="input-icon" />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Enter your organization name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <div className="input-group">
              <Award className="input-icon" />
              <select
                name="experience_years"
                value={formData.experience_years}
                onChange={handleInputChange}
                required
              >
                <option value="0-1">0-1 years</option>
                <option value="2-5">2-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Languages Spoken</label>
            <div className="input-group">
              <Users className="input-icon" />
              <select
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                required
              >
                <option value="">Select languages</option>
                <option value="english">English</option>
                <option value="swahili">Swahili</option>
                <option value="french">French</option>
                <option value="arabic">Arabic</option>
                <option value="local">Local Languages</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Specializations</label>
            <div className="input-group">
              <Award className="input-icon" />
              <select
                name="specializations"
                value={formData.specializations}
                onChange={handleInputChange}
                required
              >
                <option value="">Select specializations</option>
                <option value="community_outreach">Community Outreach</option>
                <option value="data_collection">Data Collection</option>
                <option value="training">Training & Capacity Building</option>
                <option value="monitoring">Monitoring & Evaluation</option>
                <option value="advocacy">Advocacy</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Supervisor Name</label>
            <div className="input-group">
              <User className="input-icon" />
              <input
                type="text"
                name="supervisor_name"
                value={formData.supervisor_name}
                onChange={handleInputChange}
                placeholder="Enter supervisor name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Supervisor Contact</label>
            <div className="input-group">
              <Phone className="input-icon" />
              <input
                type="tel"
                name="supervisor_contact"
                value={formData.supervisor_contact}
                onChange={handleInputChange}
                placeholder="Enter supervisor contact"
                required
              />
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
              I consent to data collection for improving services
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
              I consent to being contacted about opportunities
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register as Field Agent'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <button onClick={() => navigate('/login')} className="link-btn">Sign In</button></p>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldAgentRegistration; 