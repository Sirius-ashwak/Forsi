import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  company: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
    timezone: string;
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    expiresAt: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, company: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('forsi_token');
        const userData = localStorage.getItem('forsi_user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('forsi_token');
        localStorage.removeItem('forsi_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: 'user-123',
        email,
        name: email.split('@')[0].replace(/[0-9]/g, '').replace(/\./g, ' '),
        role: 'Supply Chain Admin',
        company: 'Global Manufacturing Corp',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en',
          timezone: 'UTC'
        },
        subscription: {
          plan: 'pro',
          expiresAt: '2025-12-31T23:59:59Z'
        }
      };

      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('forsi_token', 'mock-jwt-token');
      localStorage.setItem('forsi_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, company: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'Supply Chain Admin',
        company,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en',
          timezone: 'UTC'
        },
        subscription: {
          plan: 'free',
          expiresAt: '2025-02-28T23:59:59Z'
        }
      };

      localStorage.setItem('forsi_token', 'mock-jwt-token');
      localStorage.setItem('forsi_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('forsi_token');
    localStorage.removeItem('forsi_user');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('forsi_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      localStorage.setItem('forsi_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Failed to update preferences');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    updatePreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};