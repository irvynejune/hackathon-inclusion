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

// Context
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
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
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Language Selection */}
              <Route path="/language" element={<LanguageSelector />} />
              
              {/* Help */}
              <Route path="/help" element={<Help />} />
              
              {/* Creative User Flow */}
              <Route path="/creative/onboarding" element={<Onboarding />} />
              <Route path="/creative/dashboard" element={<CreativeDashboard />} />
              <Route path="/creative/story" element={<StorySubmission />} />
              <Route path="/creative/financial" element={<FinancialTracking />} />
              <Route path="/creative/support" element={<SupportApplication />} />
              <Route path="/creative/financial-literacy" element={<FinancialLiteracy />} />
              <Route path="/creative/marginalized-support" element={<MarginalizedGroupSupport />} />
              
              {/* Field Agent Flow */}
              <Route path="/agent/dashboard" element={<FieldAgentDashboard />} />
              <Route path="/agent/reports" element={<Reports />} />
              
              {/* HEVA Team Flow */}
              <Route path="/heva/dashboard" element={<HEVADashboard />} />
              <Route path="/heva/admin" element={<AdminPanel />} />
              <Route path="/heva/impact" element={<ImpactDashboard />} />
              <Route path="/heva/stories" element={<StoryViewer />} />
              <Route path="/heva/financial-tracker" element={<FinancialTracker />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
