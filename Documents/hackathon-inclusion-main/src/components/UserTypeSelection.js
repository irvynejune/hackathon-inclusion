import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Users, Shield, ArrowRight } from 'lucide-react';
import './UserTypeSelection.css';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'creative',
      title: 'Creative User',
      description: 'Share your stories, art, and creative content with the community',
      icon: Palette,
      color: '#8B5CF6',
      route: '/register/creative'
    },
    {
      id: 'field_agent',
      title: 'Field Agent',
      description: 'Support communities and collect data in the field',
      icon: Users,
      color: '#10B981',
      route: '/register/field-agent'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage the platform and support users',
      icon: Shield,
      color: '#F59E0B',
      route: '/register/admin'
    }
  ];

  return (
    <div className="user-type-selection">
      <motion.div 
        className="selection-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="selection-header">
          <h1>Choose Your Role</h1>
          <p>Select the type of account you want to create</p>
        </div>

        <div className="user-types-grid">
          {userTypes.map((userType, index) => {
            const IconComponent = userType.icon;
            return (
              <motion.div
                key={userType.id}
                className="user-type-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(userType.route)}
              >
                <div className="card-icon" style={{ backgroundColor: userType.color }}>
                  <IconComponent size={32} color="white" />
                </div>
                <h3>{userType.title}</h3>
                <p>{userType.description}</p>
                <div className="card-action">
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="selection-footer">
          <p>Already have an account? <button onClick={() => navigate('/login')} className="link-btn">Sign In</button></p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserTypeSelection; 