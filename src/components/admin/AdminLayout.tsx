'use client';

import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  Building,
  CreditCard,
  UserCheck,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel-primary"></div>
      </div>
    );
  }

  if (!user) {
    redirect('/sign-in');
  }

  // Check if user has admin role
  const userRole = user.publicMetadata?.role as string;
  if (!['super_admin', 'manager', 'receptionist', 'admin'].includes(userRole)) {
    redirect('/');
  }

  const sidebarItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', roles: ['super_admin', 'manager', 'receptionist', 'admin'] },
    { href: '/admin/rooms', icon: Bed, label: 'Room Management', roles: ['super_admin', 'manager', 'receptionist', 'admin'] },
    { href: '/admin/reservations', icon: Calendar, label: 'Reservations', roles: ['super_admin', 'manager', 'receptionist', 'admin'] },
    { href: '/admin/customers', icon: Users, label: 'Customers', roles: ['super_admin', 'manager', 'receptionist', 'admin'] },
    { href: '/admin/billing', icon: CreditCard, label: 'Billing & Payments', roles: ['super_admin', 'manager', 'admin'] },
    { href: '/admin/checkin', icon: UserCheck, label: 'Check In/Out', roles: ['super_admin', 'manager', 'receptionist', 'admin'] },
    { href: '/admin/travel-companies', icon: Building, label: 'Travel Companies', roles: ['super_admin', 'manager', 'admin'] },
    { href: '/admin/staff', icon: Briefcase, label: 'Staff Management', roles: ['super_admin', 'manager'] },
    { href: '/admin/reports', icon: BarChart3, label: 'Reports & Analytics', roles: ['super_admin', 'manager', 'admin'] },
    { href: '/admin/settings', icon: Settings, label: 'System Settings', roles: ['super_admin', 'manager'] },
  ];

  const filteredSidebarItems = sidebarItems.filter(item => 
    item.roles.includes(userRole)
  );

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'manager': return 'Manager';
      case 'receptionist': return 'Receptionist';
      case 'admin': return 'Admin';
      default: return 'Staff';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'manager': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'receptionist': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'admin': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 admin-sidebar text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-yellow-400">Moonlit Hotel</h1>
              <p className="text-xs text-gray-300">Management System</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white hover:bg-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-3">
          {filteredSidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-3 mb-1 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 group"
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User role badge */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className={cn(
            "px-3 py-2 rounded-lg border text-center text-sm font-medium",
            getRoleBadgeColor(userRole)
          )}>
            {getRoleDisplay(userRole)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:shadow-md">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            {/* Left side */}
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
                  Hotel Management System
                </h2>
                <p className="text-sm text-gray-600">
                  Welcome back, {user.firstName}!
                </p>
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hotel-primary focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-gray-100"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 bg-hotel-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {getRoleDisplay(userRole)}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <Link
                      href="/admin/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <UserIcon className="h-4 w-4 mr-3" />
                      Profile Settings
                    </Link>
                    <div className="border-t border-gray-100">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
