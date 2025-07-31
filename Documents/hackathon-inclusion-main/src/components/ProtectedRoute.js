import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Loading.css';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { loading, user, isAdmin, isAgent, isCreative } = useAuth();
  const location = useLocation();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  // Remove authentication check - allow all users to access
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // Check role-based access
  if (requiredRole) {
    let hasAccess = false;
    
    switch (requiredRole) {
      case 'admin':
        hasAccess = isAdmin();
        break;
      case 'agent':
        hasAccess = isAgent();
        break;
      case 'creative':
        hasAccess = isCreative();
        break;
      default:
        hasAccess = true;
    }

    if (!hasAccess) {
      return (
        <div className="access-denied">
          <h2>{t('accessDenied')}</h2>
          <p>{t('accessDeniedMessage')}</p>
          <Navigate to="/" replace />
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute; 