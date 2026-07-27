import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentAdmin, loginAdmin, logoutAdmin } from '@/services/auth/authApi';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await fetchCurrentAdmin();
        if (response.success) {
          setAdmin(response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setAdmin(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginAdmin(credentials);
      if (response.success) {
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
        toast.success(response.message || 'Login successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to login.';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAdmin(null);
      setIsAuthenticated(false);
      toast.info('Logged out successfully.');
    }
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
