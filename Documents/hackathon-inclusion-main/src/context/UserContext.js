import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'creative', 'fieldAgent', 'unilinkTeam'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('unilinkUser');
    const savedUserType = localStorage.getItem('unilinkUserType');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    if (savedUserType) {
      setUserType(savedUserType);
    }
  }, []);

  const login = async (credentials, type) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        name: credentials.name || 'User',
        email: credentials.email || '',
        phone: credentials.phone || '',
        type: type,
        createdAt: new Date().toISOString(),
      };
      
      setUser(userData);
      setUserType(type);
      setIsAuthenticated(true);
      
      // Save to localStorage
      localStorage.setItem('unilinkUser', JSON.stringify(userData));
      localStorage.setItem('unilinkUserType', type);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('unilinkUser');
    localStorage.removeItem('unilinkUserType');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('unilinkUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    userType,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    setUserType,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 