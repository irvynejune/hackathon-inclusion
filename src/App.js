import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import CreativeDashboard from './components/CreativeDashboard';
import FieldAgentDashboard from './components/FieldAgentDashboard';
import HEVADashboard from './components/HEVADashboard';
import LanguageSelector from './components/LanguageSelector';
import Onboarding from './components/Onboarding';
import StorySubmission from './components/StorySubmission';
import FinancialTracking from './components/FinancialTracking';
import SupportApplication from './components/SupportApplication';
import AdminPanel from './components/AdminPanel';
import ImpactDashboard from './components/ImpactDashboard';
import StoryViewer from './components/StoryViewer';
import FinancialTracker from './components/FinancialTracker';
import Reports from './components/Reports';
import Help from './components/Help';
import FinancialLiteracy from './components/FinancialLiteracy';
import MarginalizedGroupSupport from './components/MarginalizedGroupSupport';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontSize: '16px',
                },
              }}
            />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/language" element={<LanguageSelector />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Creative User Routes */}
              <Route path="/creative/onboarding" element={
                <ProtectedRoute requiredRole="creative">
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/creative/dashboard" element={
                <ProtectedRoute requiredRole="creative">
                  <CreativeDashboard />
                </ProtectedRoute>
              } />
              <Route path="/creative/story" element={
                <ProtectedRoute requiredRole="creative">
                  <StorySubmission />
                </ProtectedRoute>
              } />
              <Route path="/creative/financial" element={
                <ProtectedRoute requiredRole="creative">
                  <FinancialTracking />
                </ProtectedRoute>
              } />
              <Route path="/creative/support" element={
                <ProtectedRoute requiredRole="creative">
                  <SupportApplication />
                </ProtectedRoute>
              } />
              <Route path="/creative/financial-literacy" element={
                <ProtectedRoute requiredRole="creative">
                  <FinancialLiteracy />
                </ProtectedRoute>
              } />
              <Route path="/creative/marginalized-support" element={
                <ProtectedRoute requiredRole="creative">
                  <MarginalizedGroupSupport />
                </ProtectedRoute>
              } />
              
              {/* Protected Field Agent Routes */}
              <Route path="/agent/dashboard" element={
                <ProtectedRoute requiredRole="agent">
                  <FieldAgentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/agent/reports" element={
                <ProtectedRoute requiredRole="agent">
                  <Reports />
                </ProtectedRoute>
              } />
              
              {/* Protected Admin/HEVA Team Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <HEVADashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/panel" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/admin/impact" element={
                <ProtectedRoute requiredRole="admin">
                  <ImpactDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/stories" element={
                <ProtectedRoute requiredRole="admin">
                  <StoryViewer />
                </ProtectedRoute>
              } />
              <Route path="/admin/financial-tracker" element={
                <ProtectedRoute requiredRole="admin">
                  <FinancialTracker />
                </ProtectedRoute>
              } />
              
              {/* Legacy HEVA routes for backward compatibility */}
              <Route path="/heva/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <HEVADashboard />
                </ProtectedRoute>
              } />
              <Route path="/heva/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/heva/impact" element={
                <ProtectedRoute requiredRole="admin">
                  <ImpactDashboard />
                </ProtectedRoute>
              } />
              <Route path="/heva/stories" element={
                <ProtectedRoute requiredRole="admin">
                  <StoryViewer />
                </ProtectedRoute>
              } />
              <Route path="/heva/financial-tracker" element={
                <ProtectedRoute requiredRole="admin">
                  <FinancialTracker />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
