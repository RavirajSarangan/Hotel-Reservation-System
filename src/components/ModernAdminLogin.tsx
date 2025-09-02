'use client';

import React, { useState } from 'react';
import { Shield, User, Lock, Eye, EyeOff, Crown, Users, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface AdminLoginProps {
  onLogin: (role: 'super_admin' | 'manager' | 'receptionist') => void;
}

export default function ModernAdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: 'manager' as 'super_admin' | 'manager' | 'receptionist'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock admin credentials
  const adminCredentials = {
    super_admin: { username: 'superadmin', password: 'super123', name: 'Super Administrator' },
    manager: { username: 'manager', password: 'manage123', name: 'Hotel Manager' },
    receptionist: { username: 'reception', password: 'front123', name: 'Front Desk' }
  };

  const roleConfig = {
    super_admin: {
      icon: Crown,
      title: 'Super Administrator',
      description: 'Full system access',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)'
    },
    manager: {
      icon: Users,
      title: 'Hotel Manager',
      description: 'Operations management',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
    },
    receptionist: {
      icon: UserCheck,
      title: 'Receptionist',
      description: 'Guest services',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #059669)'
    }
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const roleCredentials = adminCredentials[credentials.role];
      
      if (credentials.username === roleCredentials.username && 
          credentials.password === roleCredentials.password) {
        toast.success(`Welcome back, ${roleCredentials.name}!`);
        onLogin(credentials.role);
        router.push('/admin');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'rgba(212, 175, 55, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '150px',
        height: '150px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            background: roleConfig[credentials.role].gradient,
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: `0 12px 30px ${roleConfig[credentials.role].color}30`
          }}>
            <Shield size={32} color="white" />
          </div>
          
          <h1 style={{
            fontSize: 'clamp(1.65rem, 4vw, 2.1rem)',
            lineHeight: 'clamp(2.1rem, 4.5vw, 2.5rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '8px',
            letterSpacing: '0.015em',
            fontFamily: "'Gilda Display', serif"
          }}>
            Admin Portal
          </h1>
          
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: "'Jost', sans-serif",
            fontWeight: '500'
          }}>
            Secure access to hotel management
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '12px',
            fontFamily: "'Jost', sans-serif"
          }}>
            Select Role
          </label>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => {
              const config = roleConfig[role];
              const Icon = config.icon;
              
              return (
                <div
                  key={role}
                  onClick={() => setCredentials(prev => ({ ...prev, role }))}
                  style={{
                    background: credentials.role === role 
                      ? config.gradient
                      : 'rgba(255, 255, 255, 0.1)',
                    border: credentials.role === role 
                      ? `2px solid ${config.color}`
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    if (credentials.role !== role) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (credentials.role !== role) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <Icon size={20} color="white" />
                  <div>
                    <div style={{
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      fontWeight: '600',
                      color: 'white',
                      fontFamily: "'Jost', sans-serif"
                    }}>
                      {config.title}
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: "'Jost', sans-serif"
                    }}>
                      {config.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Username */}
          <div>
            <label style={{
              display: 'block',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '600',
              color: 'white',
              marginBottom: '8px',
              fontFamily: "'Jost', sans-serif"
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={20}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username"
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  fontFamily: "'Jost', sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = roleConfig[credentials.role].color;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '600',
              color: 'white',
              marginBottom: '8px',
              fontFamily: "'Jost', sans-serif"
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '16px 52px 16px 52px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  fontFamily: "'Jost', sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = roleConfig[credentials.role].color;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              background: roleConfig[credentials.role].gradient,
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              color: 'white',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              fontWeight: '600',
              fontFamily: "'Jost', sans-serif",
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: isLoading ? 0.7 : 1,
              boxShadow: `0 8px 25px ${roleConfig[credentials.role].color}30`
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 12px 35px ${roleConfig[credentials.role].color}40`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${roleConfig[credentials.role].color}30`;
            }}
          >
            {isLoading ? 'Authenticating...' : 'Access Admin Portal'}
          </button>
        </div>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '8px',
            fontFamily: "'Jost', sans-serif"
          }}>
            Demo Credentials:
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 1.6vw, 0.8rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: "'Jost', sans-serif",
            lineHeight: '1.4'
          }}>
            Super Admin: superadmin / super123<br />
            Manager: manager / manage123<br />
            Receptionist: reception / front123
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
