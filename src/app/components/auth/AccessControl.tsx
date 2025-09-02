'use client';

import React, { ReactNode } from 'react';
import { useAuth, UserRole } from './AuthProvider';
import { motion } from 'framer-motion';

interface AccessControlProps {
  children: ReactNode;
  permission?: string;
  role?: UserRole | UserRole[];
  requireAuth?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

export function AccessControl({
  children,
  permission,
  role,
  requireAuth = false,
  fallback = null
}: AccessControlProps) {
  const { user, isAuthenticated, hasPermission, hasRole, isLoading } = useAuth();

  // Show loading spinner while auth is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this content.</p>
          <button
            onClick={() => window.location.href = '/sign-in'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

  // Check permission requirement
  if (permission && !hasPermission(permission)) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md"
        >
          <div className="text-6xl mb-4">⛔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this content.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Required permission: <code className="bg-gray-100 px-2 py-1 rounded">{permission}</code>
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  // Check role requirement
  if (role && !hasRole(role)) {
    const roleText = Array.isArray(role) ? role.join(', ') : role;
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md"
        >
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Insufficient Role</h2>
          <p className="text-gray-600 mb-6">
            Your current role doesn't have access to this content.
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Required role: <code className="bg-gray-100 px-2 py-1 rounded">{roleText}</code>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Your role: <code className="bg-gray-100 px-2 py-1 rounded">{user?.role || 'guest'}</code>
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  // All checks passed, render children
  return <>{children}</>;
}

// Higher-order component for protecting routes
export function withAccessControl<T extends {}>(
  Component: React.ComponentType<T>,
  accessConfig: Omit<AccessControlProps, 'children'>
) {
  return function ProtectedComponent(props: T) {
    return (
      <AccessControl {...accessConfig}>
        <Component {...props} />
      </AccessControl>
    );
  };
}

// Hook for conditional rendering based on permissions
export function useAccessControl() {
  const { user, hasPermission, hasRole, isAuthenticated } = useAuth();

  const canAccess = (config: {
    permission?: string;
    role?: UserRole | UserRole[];
    requireAuth?: boolean;
  }) => {
    if (config.requireAuth && !isAuthenticated) return false;
    if (config.permission && !hasPermission(config.permission)) return false;
    if (config.role && !hasRole(config.role)) return false;
    return true;
  };

  return {
    user,
    canAccess,
    hasPermission,
    hasRole,
    isAuthenticated
  };
}

export default AccessControl;
