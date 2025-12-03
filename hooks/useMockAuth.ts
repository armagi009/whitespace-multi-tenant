import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockDb } from '../services/mockDb';

const SESSION_KEY = 'whitespace_session_user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, companyName: string) => Promise<User>;
  logout: () => void;
  toggleBookmark: (oppId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock password check - in reality, we'd hash and compare
    // Hardcoded password from requirements: pa1234 for platform admin
    
    const foundUser = mockDb.findUserByEmail(email);
    
    if (foundUser) {
        // Simple password gate for demo
        // If platform admin, enforce specifically 'pa1234'
        if (foundUser.role === UserRole.PLATFORM_ADMIN && password !== 'pa1234') {
            return false;
        }
        
        setUser(foundUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(foundUser));
        return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (email: string, companyName: string): Promise<User> => {
    // 1. Create Tenant
    const newTenant = mockDb.createTenant(companyName);
    
    // 2. Create User as Tenant Admin
    const newUser = mockDb.createUser(email, newTenant.slug, UserRole.TENANT_ADMIN);
    
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    // Redirect handled by App.tsx router state observation
  }, []);

  const toggleBookmark = useCallback((oppId: string) => {
    if (!user) return;
    const updatedUser = mockDb.toggleBookmark(user.id, oppId);
    if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
    }
  }, [user]);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, isLoading, login, signup, logout, toggleBookmark } },
    children
  );
};

export const useMockAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within an AuthProvider');
  }
  return context;
};