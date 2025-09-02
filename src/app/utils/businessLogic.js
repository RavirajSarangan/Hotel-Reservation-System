// Business Logic Services for Hotel Booking System

// Mock database simulation
let mockDatabase = {
  bookings: [],
  payments: [],
  rooms: [
    {
      id: '1',
      name: 'Luxury Ocean Suite',
      type: 'Suite',
      price: 12999,
      available: true,
      number: '101'
    },
    {
      id: '2',
      name: 'Deluxe Mountain View',
      type: 'Deluxe',
      price: 8999,
      available: true,
      number: '201'
    },
    {
      id: '3',
      name: 'Standard City Room',
      type: 'Standard',
      price: 5999,
      available: true,
      number: '301'
    }
  ],
  analytics: {
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0
  }
};

// Booking Service
export class BookingService {
  static generateBookingId() {
    return 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  static async createBooking(bookingData) {
    try {
      const booking = {
        id: this.generateBookingId(),
        ...bookingData,
        status: 'confirmed',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockDatabase.bookings.push(booking);
      mockDatabase.analytics.totalBookings += 1;

      console.log('✅ Booking created successfully:', booking.id);
      
      return {
        success: true,
        booking: booking,
        message: 'Booking created successfully'
      };
    } catch (error) {
      console.error('❌ Booking creation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getBookingById(bookingId) {
    try {
      const booking = mockDatabase.bookings.find(b => b.id === bookingId);
      
      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      return {
        success: true,
        booking: booking
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getAllBookings() {
    try {
      return {
        success: true,
        bookings: mockDatabase.bookings
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async updateBookingStatus(bookingId, status) {
    try {
      const bookingIndex = mockDatabase.bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex === -1) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      mockDatabase.bookings[bookingIndex].status = status;
      mockDatabase.bookings[bookingIndex].updatedAt = new Date().toISOString();

      return {
        success: true,
        booking: mockDatabase.bookings[bookingIndex]
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getTodayBookings() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const todayBookings = mockDatabase.bookings.filter(booking => {
        const bookingDate = new Date(booking.createdAt).toISOString().split('T')[0];
        return bookingDate === today;
      });

      return {
        checkIns: todayBookings.filter(b => b.checkIn === today).length,
        checkOuts: todayBookings.filter(b => b.checkOut === today).length,
        total: todayBookings.length
      };
    } catch (error) {
      return {
        checkIns: 0,
        checkOuts: 0,
        total: 0
      };
    }
  }

  static async getPendingPayments() {
    try {
      return mockDatabase.bookings.filter(b => b.paymentStatus === 'pending');
    } catch (error) {
      return [];
    }
  }

  static async getRecentBookings(limit = 10) {
    try {
      return mockDatabase.bookings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    } catch (error) {
      return [];
    }
  }
}

// Payment Service
export class PaymentService {
  static generateTransactionId() {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  static async processPayment(paymentData) {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock payment validation
      const isValidCard = paymentData.cardNumber && paymentData.cardNumber.length >= 16;
      const isValidAmount = paymentData.amount && paymentData.amount > 0;

      if (!isValidCard || !isValidAmount) {
        return {
          success: false,
          error: 'Invalid payment details'
        };
      }

      const payment = {
        id: this.generateTransactionId(),
        transactionId: this.generateTransactionId(),
        ...paymentData,
        status: 'completed',
        processedAt: new Date().toISOString()
      };

      mockDatabase.payments.push(payment);
      mockDatabase.analytics.totalRevenue += paymentData.amount;

      console.log('💳 Payment processed successfully:', payment.transactionId);

      return {
        success: true,
        transactionId: payment.transactionId,
        payment: payment,
        message: 'Payment processed successfully'
      };
    } catch (error) {
      console.error('❌ Payment processing failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getPaymentByTransactionId(transactionId) {
    try {
      const payment = mockDatabase.payments.find(p => p.transactionId === transactionId);
      
      if (!payment) {
        return {
          success: false,
          error: 'Payment not found'
        };
      }

      return {
        success: true,
        payment: payment
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async refundPayment(transactionId, amount) {
    try {
      const paymentIndex = mockDatabase.payments.findIndex(p => p.transactionId === transactionId);
      
      if (paymentIndex === -1) {
        return {
          success: false,
          error: 'Payment not found'
        };
      }

      const refund = {
        id: this.generateTransactionId(),
        originalTransactionId: transactionId,
        amount: amount,
        status: 'completed',
        processedAt: new Date().toISOString()
      };

      mockDatabase.payments[paymentIndex].refunded = true;
      mockDatabase.payments[paymentIndex].refundAmount = amount;
      
      console.log('💰 Refund processed successfully:', refund.id);

      return {
        success: true,
        refund: refund
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Analytics Service
export class AnalyticsService {
  static async getDashboardStats() {
    try {
      const totalRooms = mockDatabase.rooms.length;
      const occupiedRooms = mockDatabase.bookings.filter(b => b.status === 'confirmed').length;
      const availableRooms = totalRooms - occupiedRooms;
      const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

      return {
        totalBookings: mockDatabase.analytics.totalBookings,
        totalRevenue: mockDatabase.analytics.totalRevenue,
        totalRooms: totalRooms,
        occupiedRooms: occupiedRooms,
        availableRooms: availableRooms,
        occupancyRate: occupancyRate
      };
    } catch (error) {
      return {
        totalBookings: 0,
        totalRevenue: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        availableRooms: 0,
        occupancyRate: 0
      };
    }
  }

  static async getRevenueStats() {
    try {
      const currentMonth = new Date().getMonth();
      const monthlyRevenue = mockDatabase.payments
        .filter(p => new Date(p.processedAt).getMonth() === currentMonth)
        .reduce((sum, p) => sum + p.amount, 0);

      return {
        totalRevenue: mockDatabase.analytics.totalRevenue,
        monthlyRevenue: monthlyRevenue,
        averageBookingValue: mockDatabase.analytics.totalBookings > 0 ? 
          mockDatabase.analytics.totalRevenue / mockDatabase.analytics.totalBookings : 0
      };
    } catch (error) {
      return {
        totalRevenue: 0,
        monthlyRevenue: 0,
        averageBookingValue: 0
      };
    }
  }

  static async getOccupancyStats() {
    try {
      const stats = await this.getDashboardStats();
      return {
        currentOccupancy: stats.occupancyRate,
        totalRooms: stats.totalRooms,
        occupiedRooms: stats.occupiedRooms,
        availableRooms: stats.availableRooms
      };
    } catch (error) {
      return {
        currentOccupancy: 0,
        totalRooms: 0,
        occupiedRooms: 0,
        availableRooms: 0
      };
    }
  }
}

// Travel Company Service (for corporate bookings)
export class TravelCompanyService {
  static async createCorporateBooking(companyData, bookingData) {
    try {
      const corporateBooking = {
        ...bookingData,
        companyName: companyData.name,
        companyDiscount: companyData.discount || 10,
        bookingType: 'corporate'
      };

      return await BookingService.createBooking(corporateBooking);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getCompanyBookings(companyName) {
    try {
      const companyBookings = mockDatabase.bookings.filter(
        b => b.companyName === companyName
      );

      return {
        success: true,
        bookings: companyBookings
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Suite Reservation Service (for premium bookings)
export class SuiteReservationService {
  static async createSuiteReservation(suiteData) {
    try {
      const premiumBooking = {
        ...suiteData,
        roomType: 'suite',
        premiumServices: true,
        conciergeService: true
      };

      return await BookingService.createBooking(premiumBooking);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export mock database for testing
export const getMockDatabase = () => mockDatabase;

// Initialize with some sample data
const initializeSampleData = () => {
  // Add some sample bookings
  const sampleBookings = [
    {
      id: 'BK001',
      guestName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      roomType: 'Luxury Ocean Suite',
      roomNumber: '101',
      checkIn: '2024-12-25',
      checkOut: '2024-12-30',
      guests: 2,
      totalAmount: 64995,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date('2024-12-20').toISOString(),
      updatedAt: new Date('2024-12-20').toISOString()
    },
    {
      id: 'BK002',
      guestName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      roomType: 'Deluxe Mountain View',
      roomNumber: '201',
      checkIn: '2024-12-28',
      checkOut: '2025-01-02',
      guests: 3,
      totalAmount: 44995,
      status: 'confirmed',
      paymentStatus: 'pending',
      createdAt: new Date('2024-12-21').toISOString(),
      updatedAt: new Date('2024-12-21').toISOString()
    }
  ];

  mockDatabase.bookings = sampleBookings;
  mockDatabase.analytics.totalBookings = sampleBookings.length;
  mockDatabase.analytics.totalRevenue = sampleBookings.reduce((sum, b) => sum + b.totalAmount, 0);
};

// Initialize sample data
initializeSampleData();

console.log('🏨 Business Logic Services initialized successfully');
