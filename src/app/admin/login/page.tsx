'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaHotel, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AdminLoginPage = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo accounts for quick access
  const demoAccounts = [
    { email: 'admin@moonlit.com', password: 'admin123', role: 'Super Admin' },
    { email: 'manager@moonlit.com', password: 'manager123', role: 'Manager' },
    { email: 'receptionist@moonlit.com', password: 'receptionist123', role: 'Receptionist' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast.success('Login successful! Redirecting to dashboard...');
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel - Branding & Demo Accounts */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white/5 to-white/10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center lg:text-left"
              >
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                    <FaHotel className="text-2xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Moonlit Hotel</h1>
                    <p className="text-white/70 text-sm">Admin Portal</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Access your admin dashboard to manage bookings, rooms, guests, and analytics with our comprehensive hotel management system.
                </p>

                {/* Demo Accounts */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold mb-3">Quick Access - Demo Accounts</h3>
                  {demoAccounts.map((account, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{account.role}</p>
                          <p className="text-white/60 text-sm">{account.email}</p>
                        </div>
                        <FaSignInAlt className="text-white/40 group-hover:text-white/80 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
                  <p className="text-blue-100 text-sm">
                    <strong>Note:</strong> These are demo accounts for testing purposes. 
                    Use the credentials above or enter your own admin credentials.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Admin Sign In</h2>
                  <p className="text-white/70">Enter your credentials to access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="mr-2" />
                        Sign In to Dashboard
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-white/60 text-sm">
                    Need help? Contact your system administrator
                  </p>
                </div>

                {/* Security Features */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-green-400 text-2xl mb-2">🔒</div>
                    <p className="text-white/70 text-xs">Secure Login</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-blue-400 text-2xl mb-2">🛡️</div>
                    <p className="text-white/70 text-xs">Role-Based Access</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
