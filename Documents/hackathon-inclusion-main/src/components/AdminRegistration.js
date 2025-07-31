import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Phone, Users, Shield, Building, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Login.css';

const AdminRegistration = () => {
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
    user_type: 'admin',
    gender: 'prefer_not_to_say',
    disability: false,
    disability_type: '',
    marginalized_groups: [],
    primary_device: 'smartphone',
    literacy_level: 'intermediate',
    consent_data_collection: true,
    consent_contact: true,
    // Admin-specific fields
    organization: '',
    department: '',
    role: '',
    access_level: 'standard',
    emergency_contact: '',
    security_clearance: false
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
      
      toast.success('Admin registration successful! Please login with your credentials.');
      navigate('/login', { state: { userType: 'admin' } });
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
          <h1>Admin Registration</h1>
          <p>Join our administrative team</p>
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
            <label>Organization</label>
            <div className="input-group">
              <Building className="input-icon" />
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Department</label>
            <div className="input-group">
              <Users className="input-icon" />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter department"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Role</label>
            <div className="input-group">
              <Award className="input-icon" />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your role</option>
                <option value="system_admin">System Administrator</option>
                <option value="data_admin">Data Administrator</option>
                <option value="user_admin">User Administrator</option>
                <option value="content_admin">Content Administrator</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Access Level</label>
            <div className="input-group">
              <Shield className="input-icon" />
              <select
                name="access_level"
                value={formData.access_level}
                onChange={handleInputChange}
                required
              >
                <option value="standard">Standard</option>
                <option value="elevated">Elevated</option>
                <option value="admin">Administrator</option>
                <option value="super_admin">Super Administrator</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Emergency Contact</label>
            <div className="input-group">
              <Phone className="input-icon" />
              <input
                type="tel"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleInputChange}
                placeholder="Enter emergency contact"
                required
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="security_clearance"
                checked={formData.security_clearance}
                onChange={handleInputChange}
                required
              />
              I have security clearance for this role
            </label>
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
            {loading ? 'Creating Account...' : 'Register as Administrator'}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <button onClick={() => navigate('/login')} className="link-btn">Sign In</button></p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegistration; 