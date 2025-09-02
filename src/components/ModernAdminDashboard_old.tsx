'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Bed, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Bell,
  Crown,
  UserCheck,
  Shield,
  TrendingUp,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminUser {
  id: string;
  name: string;
  role: 'super_admin' | 'manager' | 'receptionist';
  email: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  status: 'new' | 'replied' | 'resolved';
}

interface ModernAdminDashboardProps {
  userRole: 'super_admin' | 'manager' | 'receptionist';
}

export default function ModernAdminDashboard({ userRole }: ModernAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'John Smith',
      role: 'super_admin',
      email: 'john@moonlit.com',
      status: 'active',
      lastLogin: '2024-12-20 10:30'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'manager',
      email: 'sarah@moonlit.com',
      status: 'active',
      lastLogin: '2024-12-20 09:15'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      role: 'receptionist',
      email: 'mike@moonlit.com',
      status: 'active',
      lastLogin: '2024-12-20 08:45'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Alice Brown',
      message: 'Hi, I need help with my booking for next week. Can someone assist me?',
      timestamp: new Date('2024-12-20T10:30:00'),
      status: 'new'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Bob Davis',
      message: 'What are your check-in and check-out times?',
      timestamp: new Date('2024-12-20T09:15:00'),
      status: 'replied'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Carol White',
      message: 'I would like to cancel my reservation. How do I proceed?',
      timestamp: new Date('2024-12-20T08:45:00'),
      status: 'new'
    }
  ]);

  const rolePermissions = {
    super_admin: ['overview', 'users', 'bookings', 'analytics', 'chat', 'admin_management', 'settings'],
    manager: ['overview', 'users', 'bookings', 'analytics', 'chat', 'settings'],
    receptionist: ['overview', 'bookings', 'chat']
  };

  const allowedTabs = rolePermissions[userRole];

  const stats = [
    {
      title: 'Total Bookings',
      value: '1,247',
      change: '+12%',
      color: '#3B82F6',
      icon: Calendar
    },
    {
      title: 'Active Users',
      value: '892',
      change: '+8%',
      color: '#10B981',
      icon: Users
    },
    {
      title: 'Available Rooms',
      value: '156',
      change: '-3%',
      color: '#F59E0B',
      icon: Bed
    },
    {
      title: 'Revenue',
      value: '$84,250',
      change: '+15%',
      color: '#8B5CF6',
      icon: DollarSign
    }
  ];

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'chat', label: 'Chat Support', icon: MessageSquare },
    { id: 'admin_management', label: 'Admin Users', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ].filter(item => allowedTabs.includes(item.id));

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Crown;
      case 'manager': return Users;
      case 'receptionist': return UserCheck;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return '#8B5CF6';
      case 'manager': return '#3B82F6';
      case 'receptionist': return '#10B981';
      default: return '#6B7280';
    }
  };

  const handleChatStatusUpdate = (id: string, status: 'replied' | 'resolved') => {
    setChatMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      )
    );
    toast.success(`Message marked as ${status}`);
  };

  const renderOverview = () => (
    <div className="admin-content">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="stat-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div className="stat-card-header">
                <div>
                  <p className="stat-card-title">
                    {stat.title}
                  </p>
                  <p className="stat-card-value">
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="stat-card-icon"
                  style={{
                    background: `${stat.color}15`,
                    borderRadius: '12px',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconComponent size={24} color={stat.color} />
                </div>
              </div>
              <div 
                className="stat-card-change"
                style={{
                  color: stat.change.startsWith('+') ? '#10B981' : '#EF4444'
                }}
              >
                {stat.change} from last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          fontWeight: '700',
          color: '#1F2937',
          marginBottom: '24px',
          fontFamily: "'Gilda Display', serif"
        }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { action: 'New booking', user: 'John Doe', time: '5 minutes ago', color: '#10B981' },
            { action: 'Room checkout', user: 'Jane Smith', time: '15 minutes ago', color: '#3B82F6' },
            { action: 'Payment received', user: 'Bob Johnson', time: '1 hour ago', color: '#8B5CF6' },
            { action: 'Booking cancelled', user: 'Alice Brown', time: '2 hours ago', color: '#EF4444' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: activity.color
                }}></div>
                <div>
                  <p style={{
                    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    fontWeight: '600',
                    color: '#1F2937',
                    fontFamily: "'Jost', sans-serif"
                  }}>
                    {activity.action}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                    color: '#6B7280',
                    fontFamily: "'Jost', sans-serif"
                  }}>
                    by {activity.user}
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                color: '#6B7280',
                fontFamily: "'Jost', sans-serif"
              }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChatSupport = () => (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          fontWeight: '700',
          color: '#1F2937',
          fontFamily: "'Gilda Display', serif"
        }}>
          Customer Support Messages
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{
            background: '#FEE2E2',
            color: '#DC2626',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)',
            fontWeight: '600',
            fontFamily: "'Jost', sans-serif"
          }}>
            {chatMessages.filter(msg => msg.status === 'new').length} New
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {chatMessages.map((message) => (
          <div
            key={message.id}
            style={{
              background: message.status === 'new' ? '#FEF3F2' : '#F9FAFB',
              border: message.status === 'new' ? '1px solid #FECACA' : '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h4 style={{
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
                  fontWeight: '600',
                  color: '#1F2937',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {message.userName}
                </h4>
                <p style={{
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                  color: '#6B7280',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {message.timestamp.toLocaleString()}
                </p>
              </div>
              <span style={{
                background: message.status === 'new' ? '#DC2626' : message.status === 'replied' ? '#F59E0B' : '#10B981',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: 'clamp(0.7rem, 1.6vw, 0.75rem)',
                fontWeight: '600',
                textTransform: 'capitalize',
                fontFamily: "'Jost', sans-serif"
              }}>
                {message.status}
              </span>
            </div>
            
            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: '#374151',
              lineHeight: '1.6',
              marginBottom: '16px',
              fontFamily: "'Jost', sans-serif"
            }}>
              {message.message}
            </p>
            
            {message.status === 'new' && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleChatStatusUpdate(message.id, 'replied')}
                  style={{
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif"
                  }}
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleChatStatusUpdate(message.id, 'resolved')}
                  style={{
                    background: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: "'Jost', sans-serif"
                  }}
                >
                  Resolve
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdminManagement = () => (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          fontWeight: '700',
          color: '#1F2937',
          fontFamily: "'Gilda Display', serif"
        }}>
          Admin User Management
        </h3>
        <button
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F1C40F)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Jost', sans-serif"
          }}
        >
          <Plus size={16} />
          Add Admin User
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {adminUsers.map((admin) => {
          const RoleIcon = getRoleIcon(admin.role);
          return (
            <div
              key={admin.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                background: '#F9FAFB',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  background: getRoleColor(admin.role),
                  borderRadius: '50%',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <RoleIcon size={20} color="white" />
                </div>
                <div>
                  <h4 style={{
                    fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
                    fontWeight: '600',
                    color: '#1F2937',
                    fontFamily: "'Jost', sans-serif"
                  }}>
                    {admin.name}
                  </h4>
                  <p style={{
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                    color: '#6B7280',
                    fontFamily: "'Jost', sans-serif"
                  }}>
                    {admin.email} • {admin.role.replace('_', ' ')}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.75rem, 1.6vw, 0.8rem)',
                    color: '#9CA3AF',
                    fontFamily: "'Jost', sans-serif"
                  }}>
                    Last login: {admin.lastLogin}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  background: admin.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                  color: admin.status === 'active' ? '#065F46' : '#DC2626',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.7rem, 1.6vw, 0.75rem)',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  fontFamily: "'Jost', sans-serif"
                }}>
                  {admin.status}
                </span>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      background: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    style={{
                      background: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'chat':
        return renderChatSupport();
      case 'admin_management':
        return renderAdminManagement();
      default:
        return (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '64px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <Activity size={48} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '8px',
              fontFamily: "'Gilda Display', serif"
            }}>
              {navigation.find(nav => nav.id === activeTab)?.label}
            </h3>
            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: '#6B7280',
              fontFamily: "'Jost', sans-serif"
            }}>
              This section is under development. More features coming soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'white',
        borderRight: '1px solid #E5E7EB',
        boxShadow: '4px 0 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '32px 24px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            fontWeight: '800',
            color: '#D4AF37',
            fontFamily: "'Gilda Display', serif"
          }}>
            Moonlit Admin
          </div>
          <div style={{
            fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
            color: '#6B7280',
            fontFamily: "'Jost', sans-serif"
          }}>
            {userRole.replace('_', ' ')} Portal
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '24px 0' }}>
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  background: activeTab === item.id ? 'linear-gradient(135deg, #D4AF37, #F1C40F)' : 'transparent',
                  color: activeTab === item.id ? 'white' : '#6B7280',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  fontWeight: '500',
                  fontFamily: "'Jost', sans-serif",
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = '#F3F4F6';
                    e.currentTarget.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#6B7280';
                  }
                }}
              >
                <IconComponent size={20} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(1.65rem, 4vw, 2.1rem)',
              fontWeight: '800',
              color: '#1F2937',
              fontFamily: "'Gilda Display', serif"
            }}>
              {navigation.find(nav => nav.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p style={{
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              color: '#6B7280',
              fontFamily: "'Jost', sans-serif"
            }}>
              Welcome back to your admin portal
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Bell size={20} color="#6B7280" />
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                background: '#EF4444',
                borderRadius: '50%'
              }}></div>
            </button>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
