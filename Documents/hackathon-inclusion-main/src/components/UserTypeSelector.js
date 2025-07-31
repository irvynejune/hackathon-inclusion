import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './UserTypeSelector.css';

const UserTypeSelector = () => {
  const { user, setUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'creative',
      name: 'Creative User',
      description: 'Access creative dashboard, story submission, and financial tools',
      path: '/creative/dashboard'
    },
    {
      type: 'field_agent',
      name: 'Field Agent',
      description: 'Access field agent dashboard and reports',
      path: '/agent/dashboard'
    },
    {
      type: 'admin',
      name: 'Admin/HEVA Team',
      description: 'Access admin panel, impact dashboard, and management tools',
      path: '/admin'
    }
  ];

  const handleUserTypeChange = (userType) => {
    const newUser = {
      ...user,
      user_type: userType
    };
    setUser(newUser);
  };

  const handleGoToDashboard = (path) => {
    navigate(path);
  };

  return (
    <div className="user-type-selector">
      <div className="selector-container">
        <h2>Select User Type</h2>
        <p>Choose your role to access the appropriate dashboard:</p>
        
        <div className="user-type-grid">
          {userTypes.map((userType) => (
            <div 
              key={userType.type}
              className={`user-type-card ${user?.user_type === userType.type ? 'active' : ''}`}
              onClick={() => handleUserTypeChange(userType.type)}
            >
              <h3>{userType.name}</h3>
              <p>{userType.description}</p>
              <div className="user-type-actions">
                <button 
                  className="dashboard-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserTypeChange(userType.type);
                    handleGoToDashboard(userType.path);
                  }}
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="current-user-info">
          <p>Currently logged in as: <strong>{user?.name || 'Demo User'}</strong></p>
          <p>User Type: <strong>{user?.user_type || 'creative'}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector; 