'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

export type UserRole = 'guest' | 'user' | 'admin' | 'super_admin' | 'manager' | 'receptionist';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  isActive: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role hierarchy and permissions
const ROLE_PERMISSIONS = {
  guest: ['view_public'],
  user: ['view_public', 'make_booking', 'view_own_bookings', 'cancel_own_booking'],
  receptionist: [
    'view_public', 'make_booking', 'view_own_bookings', 'cancel_own_booking',
    'view_all_bookings', 'create_booking', 'modify_booking', 'check_in', 'check_out'
  ],
  manager: [
    'view_public', 'make_booking', 'view_own_bookings', 'cancel_own_booking',
    'view_all_bookings', 'create_booking', 'modify_booking', 'check_in', 'check_out',
    'view_reports', 'manage_rooms', 'view_analytics', 'manage_staff'
  ],
  admin: [
    'view_public', 'make_booking', 'view_own_bookings', 'cancel_own_booking',
    'view_all_bookings', 'create_booking', 'modify_booking', 'check_in', 'check_out',
    'view_reports', 'manage_rooms', 'view_analytics', 'manage_staff',
    'system_settings', 'user_management', 'financial_reports'
  ],
  super_admin: ['*'] // All permissions
};

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@moonlit.com',
    name: 'Super Admin',
    role: 'super_admin' as UserRole,
    permissions: ['*'],
    isActive: true,
    password: 'admin123'
  },
  {
    id: '2',
    email: 'manager@moonlit.com',
    name: 'Hotel Manager',
    role: 'manager' as UserRole,
    permissions: ROLE_PERMISSIONS.manager,
    isActive: true,
    password: 'manager123'
  },
  {
    id: '3',
    email: 'receptionist@moonlit.com',
    name: 'Front Desk',
    role: 'receptionist' as UserRole,
    permissions: ROLE_PERMISSIONS.receptionist,
    isActive: true,
    password: 'receptionist123'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        // Map Clerk user to our auth user
        const authUser: AuthUser = {
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          name: clerkUser.fullName || clerkUser.firstName || 'User',
          role: getUserRole(clerkUser.primaryEmailAddress?.emailAddress || ''),
          permissions: getRolePermissions(getUserRole(clerkUser.primaryEmailAddress?.emailAddress || '')),
          isActive: true
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }
  }, [clerkUser, isLoaded]);

  const getUserRole = (email: string): UserRole => {
    // Check if email matches admin users
    const mockUser = MOCK_USERS.find(u => u.email === email);
    if (mockUser) {
      return mockUser.role;
    }
    
    // Default role for regular users
    return 'user';
  };

  const getRolePermissions = (role: UserRole): string[] => {
    return ROLE_PERMISSIONS[role] || [];
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (mockUser && mockUser.isActive) {
        const authUser: AuthUser = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          permissions: mockUser.permissions,
          isActive: mockUser.isActive
        };
        setUser(authUser);
        
        // Store in localStorage for persistence
        localStorage.setItem('auth_user', JSON.stringify(authUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser && !clerkUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, [clerkUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
    hasRole,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthProvider;
