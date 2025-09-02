'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaBed, FaUsers, FaCalendarAlt, FaChartBar, 
  FaCog, FaBell, FaSearch, FaPlus, FaEdit, FaTrash,
  FaDollarSign, FaEye, FaDownload, FaCar, FaRobot,
  FaHotel, FaUserShield, FaClipboardList, FaMoneyBillWave,
  FaCheck, FaSpinner, FaArrowUp, FaArrowDown, FaMoon,
  FaSun, FaSignOutAlt, FaFilter, FaCalendar, FaClock,
  FaTrendingUp, FaTrendingDown, FaUserCog, FaChevronRight,
  FaGlobe, FaWifi, FaCoffee, FaConciergeBell, FaStar
} from 'react-icons/fa';
import { useAuth } from '../../components/auth/AuthProvider';
import AccessControl from '../../components/auth/AccessControl';

const AdminDashboard = () => {
  const { user, logout, hasPermission, hasRole } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    totalRooms: 0,
    availableRooms: 0,
    checkInsToday: 0,
    checkOutsToday: 0,
    pendingPayments: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('today');

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  const sidebarVariants = {
    open: {
      width: "280px",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: {
      width: "80px",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadRecentBookings();
    loadNotifications();
    
    // Set up intervals for real-time updates
    const intervalId = setInterval(() => {
      loadDashboardData();
      loadRecentBookings();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data for demonstration
      setTimeout(() => {
        setDashboardData({
          totalBookings: 234,
          totalRevenue: 125000,
          occupancyRate: 78.5,
          totalRooms: 50,
          availableRooms: 12,
          checkInsToday: 8,
          checkOutsToday: 5,
          pendingPayments: 3
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setIsLoading(false);
    }
  };

  const loadRecentBookings = async () => {
    // Mock recent bookings
    const mockBookings = [
      { id: 1, guest: 'John Doe', room: '101', checkIn: '2024-12-20', status: 'confirmed' },
      { id: 2, guest: 'Jane Smith', room: '205', checkIn: '2024-12-21', status: 'pending' },
      { id: 3, guest: 'Bob Johnson', room: '303', checkIn: '2024-12-22', status: 'confirmed' }
    ];
    setRecentBookings(mockBookings);
  };

  const loadNotifications = async () => {
    // Mock notifications
    const mockNotifications = [
      { id: 1, message: 'New booking received', type: 'info', time: '2 min ago' },
      { id: 2, message: 'Payment overdue for Room 205', type: 'warning', time: '15 min ago' },
      { id: 3, message: 'Maintenance request for Room 101', type: 'alert', time: '1 hour ago' }
    ];
    setNotifications(mockNotifications);
  };

  // Sidebar menu items with role-based visibility
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: FaHome, 
      permission: 'view_reports',
      roles: ['admin', 'super_admin', 'manager', 'receptionist']
    },
    { 
      id: 'bookings', 
      label: 'Bookings', 
      icon: FaCalendarAlt, 
      permission: 'view_all_bookings',
      roles: ['admin', 'super_admin', 'manager', 'receptionist']
    },
    { 
      id: 'rooms', 
      label: 'Rooms', 
      icon: FaBed, 
      permission: 'manage_rooms',
      roles: ['admin', 'super_admin', 'manager']
    },
    { 
      id: 'guests', 
      label: 'Guests', 
      icon: FaUsers, 
      permission: 'view_all_bookings',
      roles: ['admin', 'super_admin', 'manager', 'receptionist']
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: FaChartBar, 
      permission: 'view_analytics',
      roles: ['admin', 'super_admin', 'manager']
    },
    { 
      id: 'staff', 
      label: 'Staff', 
      icon: FaUserShield, 
      permission: 'manage_staff',
      roles: ['admin', 'super_admin', 'manager']
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: FaCog, 
      permission: 'system_settings',
      roles: ['admin', 'super_admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.permission && !hasPermission(item.permission)) return false;
    if (item.roles && !hasRole(item.roles)) return false;
    return true;
  });

  const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-300`} />
        </div>
      </div>
    </motion.div>
  );

  const renderDashboardContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      );
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Quick Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Bookings" 
            value={dashboardData.totalBookings} 
            icon={FaCalendarAlt} 
            trend={12}
            color="blue"
          />
          <StatCard 
            title="Total Revenue" 
            value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
            icon={FaDollarSign} 
            trend={8}
            color="green"
          />
          <StatCard 
            title="Occupancy Rate" 
            value={`${dashboardData.occupancyRate}%`} 
            icon={FaBed} 
            trend={-3}
            color="purple"
          />
          <StatCard 
            title="Available Rooms" 
            value={dashboardData.availableRooms} 
            icon={FaHome} 
            color="orange"
          />
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{booking.guest}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Room {booking.room} • {booking.checkIn}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {hasPermission('create_booking') && (
                <button className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                  <FaPlus className="w-5 h-5 text-blue-600 dark:text-blue-300 mr-2" />
                  <span className="text-blue-600 dark:text-blue-300 font-medium">New Booking</span>
                </button>
              )}
              {hasPermission('check_in') && (
                <button className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                  <FaCheck className="w-5 h-5 text-green-600 dark:text-green-300 mr-2" />
                  <span className="text-green-600 dark:text-green-300 font-medium">Check In</span>
                </button>
              )}
              {hasPermission('view_reports') && (
                <button className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                  <FaDownload className="w-5 h-5 text-purple-600 dark:text-purple-300 mr-2" />
                  <span className="text-purple-600 dark:text-purple-300 font-medium">Reports</span>
                </button>
              )}
              {hasPermission('manage_rooms') && (
                <button className="flex items-center justify-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                  <FaCog className="w-5 h-5 text-orange-600 dark:text-orange-300 mr-2" />
                  <span className="text-orange-600 dark:text-orange-300 font-medium">Room Setup</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <AccessControl requireAuth={true} role={['admin', 'super_admin', 'manager', 'receptionist']}>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="flex bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            animate={sidebarCollapsed ? "closed" : "open"}
            className="bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 min-h-screen"
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FaHotel className="text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div className="ml-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Moonlit Admin</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user?.role?.replace('_', ' ').toUpperCase()}</p>
                  </div>
                )}
              </div>
            </div>

            <nav className="mt-8">
              {filteredMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    activeModule === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900 border-r-2 border-blue-600 text-blue-600 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5" />
                {!sidebarCollapsed && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaChevronRight className={`w-5 h-5 text-gray-600 dark:text-gray-400 transform transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                  </button>
                  <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    {activeModule}
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <FaBell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {darkMode ? (
                      <FaSun className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <FaMoon className="w-5 h-5 text-gray-600" />
                    )}
                  </button>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">{user?.name?.charAt(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-6">
              {activeModule === 'dashboard' && renderDashboardContent()}
              {activeModule === 'bookings' && (
                <div className="text-center py-12">
                  <FaCalendarAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bookings Management</h3>
                  <p className="text-gray-600 dark:text-gray-400">Coming Soon...</p>
                </div>
              )}
              {activeModule === 'rooms' && (
                <div className="text-center py-12">
                  <FaBed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Room Management</h3>
                  <p className="text-gray-600 dark:text-gray-400">Coming Soon...</p>
                </div>
              )}
              {/* Add other module content as needed */}
            </div>
          </div>
        </div>
      </div>
    </AccessControl>
  );
};

export default AdminDashboard;
