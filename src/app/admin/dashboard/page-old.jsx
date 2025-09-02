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
import { BookingService, AnalyticsService, TravelCompanyService, SuiteReservationService } from '../../utils/businessLogic';
import { sendBookingConfirmation, processAutoCancellation, generateNoShowReport } from '../../utils/emailService';

const AdminDashboard = () => {
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
  const [userRole, setUserRole] = useState('super_admin'); // super_admin, manager, receptionist
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
    
    // Run auto-cancellation check on load
    processAutoCancellation();
    
    // Set up intervals for real-time updates
    const intervalId = setInterval(() => {
      loadDashboardData();
      loadRecentBookings();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const analytics = new AnalyticsService();
      const bookingService = new BookingService();
      
      // Get analytics data
      const analyticsData = await analytics.getDashboardStats();
      const revenue = await analytics.getRevenueStats();
      const occupancy = await analytics.getOccupancyStats();
      
      // Get booking data
      const todayBookings = await bookingService.getTodayBookings();
      const pendingPayments = await bookingService.getPendingPayments();
      
      setDashboardData({
        totalBookings: analyticsData.totalBookings || 0,
        totalRevenue: revenue.totalRevenue || 0,
        occupancyRate: occupancy.currentOccupancy || 0,
        totalRooms: analyticsData.totalRooms || 50,
        availableRooms: analyticsData.availableRooms || 25,
        checkInsToday: todayBookings.checkIns || 0,
        checkOutsToday: todayBookings.checkOuts || 0,
        pendingPayments: pendingPayments.length || 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentBookings = async () => {
    try {
      const bookingService = new BookingService();
      const bookings = await bookingService.getRecentBookings(10);
      setRecentBookings(bookings);
    } catch (error) {
      console.error('Error loading recent bookings:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      // Simulate loading notifications
      const mockNotifications = [
        { id: 1, type: 'booking', message: 'New booking received for Room 101', time: '5 minutes ago', unread: true },
        { id: 2, type: 'payment', message: 'Payment received for Booking #12345', time: '15 minutes ago', unread: true },
        { id: 3, type: 'cancellation', message: 'Booking #12340 auto-cancelled due to non-payment', time: '1 hour ago', unread: false },
        { id: 4, type: 'noshow', message: 'No-show detected for Booking #12338', time: '2 hours ago', unread: false }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', icon: FaHome, label: 'Dashboard', roles: ['super_admin', 'manager', 'receptionist'], color: '#3B82F6' },
    { id: 'bookings', icon: FaCalendarAlt, label: 'Bookings', roles: ['super_admin', 'manager', 'receptionist'], color: '#10B981' },
    { id: 'rooms', icon: FaBed, label: 'Rooms', roles: ['super_admin', 'manager', 'receptionist'], color: '#F59E0B' },
    { id: 'users', icon: FaUsers, label: 'Users', roles: ['super_admin', 'manager'], color: '#8B5CF6' },
    { id: 'analytics', icon: FaChartBar, label: 'Analytics', roles: ['super_admin', 'manager'], color: '#EF4444' },
    { id: 'travel-companies', icon: FaHotel, label: 'Travel Companies', roles: ['super_admin', 'manager'], color: '#06B6D4' },
    { id: 'suites', icon: FaUserShield, label: 'Suite Reservations', roles: ['super_admin', 'manager'], color: '#84CC16' },
    { id: 'cars', icon: FaCar, label: 'Car Rentals', roles: ['super_admin', 'manager', 'receptionist'], color: '#F97316' },
    { id: 'ai-features', icon: FaRobot, label: 'AI Features', roles: ['super_admin'], color: '#EC4899' },
    { id: 'reports', icon: FaClipboardList, label: 'Reports', roles: ['super_admin', 'manager'], color: '#6366F1' },
    { id: 'settings', icon: FaCog, label: 'Settings', roles: ['super_admin'], color: '#64748B' }
  ];

  // Enhanced StatCard with glassmorphism effect
  const StatCard = ({ title, value, icon: Icon, color, change, trend, description }) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`relative overflow-hidden rounded-2xl p-6 ${
        darkMode 
          ? 'bg-gray-800/60 backdrop-blur-xl border border-gray-700/50' 
          : 'bg-white/80 backdrop-blur-xl border border-gray-200/50'
      } shadow-xl hover:shadow-2xl transition-all duration-300`}
      style={{
        background: darkMode 
          ? `linear-gradient(135deg, ${color}15, ${color}05)` 
          : `linear-gradient(135deg, ${color}10, ${color}05)`
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div 
              className="p-3 rounded-xl mr-4"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="h-6 w-6" style={{ color }} />
            </div>
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {title}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </p>
            {change && (
              <div className="flex items-center">
                {trend === 'up' ? (
                  <div className="flex items-center text-green-500">
                    <FaTrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-semibold">+{change}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <FaTrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-sm font-semibold">-{change}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated background element */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-blue-100">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 hover:opacity-5 transition-opacity duration-300"
        whileHover={{ opacity: 0.05 }}
      />
    </motion.div>
  );

  const RecentBookingCard = ({ booking }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${
          booking.status === 'confirmed' ? 'bg-green-500' :
          booking.status === 'pending' ? 'bg-yellow-500' :
          booking.status === 'cancelled' ? 'bg-red-500' : 'bg-gray-500'
        }`} />
        <div>
          <p className="font-medium text-gray-900">{booking.guestName}</p>
          <p className="text-sm text-gray-600">Room {booking.roomNumber} • {booking.checkIn}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">${booking.amount}</p>
        <p className="text-sm text-gray-600 capitalize">{booking.status}</p>
      </div>
    </motion.div>
  );

  const NotificationCard = ({ notification }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border-l-4 ${
        notification.type === 'booking' ? 'border-blue-500 bg-blue-50' :
        notification.type === 'payment' ? 'border-green-500 bg-green-50' :
        notification.type === 'cancellation' ? 'border-red-500 bg-red-50' :
        'border-yellow-500 bg-yellow-50'
      } ${notification.unread ? 'ring-2 ring-blue-200' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
        </div>
        {notification.unread && (
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-lg fixed h-full z-50"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Hotel Admin</h1>
          <p className="text-sm text-gray-600 capitalize">{userRole.replace('_', ' ')}</p>
        </div>
        <nav className="mt-6 overflow-y-auto">
          {sidebarItems
            .filter(item => item.roles.includes(userRole))
            .map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 10 }}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                  activeModule === item.id ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700' : 'text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </motion.button>
            ))
          }
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <motion.header
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {activeModule.replace('-', ' ')}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <FaBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="p-6 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Bookings"
                value={dashboardData.totalBookings}
                icon={FaCalendarAlt}
                change={12}
                trend="up"
              />
              <StatCard
                title="Total Revenue"
                value={`$${dashboardData.totalRevenue.toLocaleString()}`}
                icon={FaDollarSign}
                change={8}
                trend="up"
              />
              <StatCard
                title="Occupancy Rate"
                value={`${dashboardData.occupancyRate}%`}
                icon={FaBed}
                change={3}
                trend="down"
              />
              <StatCard
                title="Available Rooms"
                value={`${dashboardData.availableRooms}/${dashboardData.totalRooms}`}
                icon={FaHome}
                change={5}
                trend="up"
              />
            </div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'New Booking', icon: FaPlus, color: 'blue', module: 'bookings' },
                  { label: 'Check In', icon: FaCalendarAlt, color: 'green', module: 'bookings' },
                  { label: 'Check Out', icon: FaCalendarAlt, color: 'orange', module: 'bookings' },
                  { label: 'View Reports', icon: FaChartBar, color: 'purple', module: 'reports' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModule(action.module)}
                    className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <action.icon className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                    <p className="text-sm font-medium text-blue-700">{action.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                  <button
                    onClick={() => setActiveModule('bookings')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {recentBookings.slice(0, 5).map((booking, index) => (
                    <RecentBookingCard key={index} booking={booking} />
                  ))}
                  {recentBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No recent bookings</p>
                  )}
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {notifications.filter(n => n.unread).length} new
                  </span>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No notifications</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Today's Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{dashboardData.checkInsToday}</div>
                  <p className="text-gray-600">Check-ins Today</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{dashboardData.checkOutsToday}</div>
                  <p className="text-gray-600">Check-outs Today</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{dashboardData.pendingPayments}</div>
                  <p className="text-gray-600">Pending Payments</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
