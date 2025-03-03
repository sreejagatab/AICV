import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'user' | 'admin';
export type SubscriptionTier = 'free' | 'standard' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: SubscriptionTier;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  resumeCount: number;
  resumeLimit: number | null; // null means unlimited
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, plan: SubscriptionTier) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      
      // Check if it's an admin login
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          subscription: 'premium',
          resumeCount: 0,
          resumeLimit: null
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return;
      }
      
      // Regular user login
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: 'user',
        subscription: 'free',
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        resumeCount: 0,
        resumeLimit: 1 // Free tier limit
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string, plan: SubscriptionTier = 'free') => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to create a new user
      // For demo purposes, we'll simulate a successful signup
      
      let resumeLimit: number | null;
      switch (plan) {
        case 'standard':
          resumeLimit = 30;
          break;
        case 'premium':
          resumeLimit = null; // Unlimited
          break;
        default:
          resumeLimit = 1; // Free tier
      }
      
      const newUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        name: name || email.split('@')[0],
        role: 'user',
        subscription: plan,
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        resumeCount: 0,
        resumeLimit
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}