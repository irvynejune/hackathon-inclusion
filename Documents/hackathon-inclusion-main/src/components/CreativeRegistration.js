import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Phone, Users, Palette, Camera, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

const CreativeRegistration = () => {
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
    user_type: 'creative',
    gender: 'prefer_not_to_say',
    disability: false,
    disability_type: '',
    marginalized_groups: [],
    primary_device: 'smartphone',
    literacy_level: 'intermediate',
    consent_data_collection: true,
    consent_contact: true,
    // Creative-specific fields
    creative_skills: '',
    portfolio_url: '',
    experience_level: 'beginner',
    preferred_medium: 'digital'
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
      
      toast.success('Creative User registration successful! Please login with your credentials.');
      navigate('/login', { state: { userType: 'creative' } });
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
          <h1>Creative User Registration</h1>
          <p>Join our creative community and share your stories</p>
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
            <label>Creative Skills</label>
            <div className="input-group">
              <Palette className="input-icon" />
              <select
                name="creative_skills"
                value={formData.creative_skills}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your creative skills</option>
                <option value="photography">Photography</option>
                <option value="painting">Painting</option>
                <option value="drawing">Drawing</option>
                <option value="digital_art">Digital Art</option>
                <option value="writing">Writing</option>
                <option value="music">Music</option>
                <option value="video">Video</option>
                <option value="crafts">Crafts</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Experience Level</label>
            <div className="input-group">
              <Users className="input-icon" />
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleInputChange}
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Medium</label>
            <div className="input-group">
              <Camera className="input-icon" />
              <select
                name="preferred_medium"
                value={formData.preferred_medium}
                onChange={handleInputChange}
                required
              >
                <option value="digital">Digital</option>
                <option value="traditional">Traditional</option>
                <option value="mixed">Mixed Media</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Portfolio URL (Optional)</label>
            <div className="input-group">
              <input
                type="url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleInputChange}
                placeholder="https://your-portfolio.com"
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
            {loading ? 'Creating Account...' : 'Register as Creative User'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <button onClick={() => navigate('/login')} className="link-btn">Sign In</button></p>
        </div>
      </motion.div>
    </div>
  );
};

export default CreativeRegistration; 