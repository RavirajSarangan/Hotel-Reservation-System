'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, FaUsers, FaCreditCard, FaCheck, 
  FaTimes, FaSpinner, FaArrowLeft, FaArrowRight,
  FaBed, FaWifi, FaCar, FaCoffee, FaSwimmingPool,
  FaDumbbell, FaUtensils, FaConciergeBell, FaLock,
  FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaUser, FaHome, FaGlobe, FaShieldAlt, FaHeart,
  FaCrown, FaSnowflake, FaTv, FaBath, FaBuilding,
  FaClock, FaGift, FaPercent, FaShoppingCart
} from 'react-icons/fa';
import { BookingService, PaymentService } from '../utils/businessLogic';
import { sendBookingConfirmation } from '../utils/emailService';
import toast from 'react-hot-toast';

// Types
interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  occupancy: number;
  beds: string;
  rating: number;
  reviews: number;
  description: string;
  amenities: { icon: any; name: string }[];
  features: string[];
  popular?: boolean;
  exclusive?: boolean;
  available: boolean;
  number?: string;
}

interface PriceBreakdown {
  roomPrice: number;
  extrasTotal: number;
  taxes: number;
  fees: number;
  discountAmount: number;
  totalAmount: number;
  nights: number;
}

interface BookingExtras {
  breakfast: boolean;
  airportTransfer: boolean;
  spa: boolean;
  carRental: boolean;
  wifi: boolean;
  lateCheckout: boolean;
  roomService: boolean;
  laundry: boolean;
  [key: string]: boolean;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  extras: BookingExtras;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    specialRequests: string;
  };
  payment: {
    method: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
    billingAddress?: string;
  };
}

const EnhancedBookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    roomPrice: 0,
    extrasTotal: 0,
    taxes: 0,
    fees: 0,
    discountAmount: 0,
    totalAmount: 0,
    nights: 0
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    roomType: '',
    roomId: '',
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      zipCode: '',
      specialRequests: '',
      idType: 'passport',
      idNumber: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      billingAddress: ''
    },
    totalAmount: 0,
    subtotal: 0,
    taxes: 0,
    fees: 0,
    discountAmount: 0,
    extras: {
      breakfast: false,
      airportTransfer: false,
      spa: false,
      carRental: false,
      wifi: false,
      lateCheckout: false,
      roomService: false,
      laundry: false
    } as BookingExtras
  });

  // Enhanced Theme Configuration
  const theme = {
    colors: {
      primary: '#D4AF37',
      secondary: '#F1C40F',
      accent: '#E67E22',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      surface: 'rgba(255, 255, 255, 0.95)',
      cardBg: 'rgba(255, 255, 255, 0.9)',
      text: '#2D3748',
      textSecondary: '#718096',
      border: '#E2E8F0',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#F56565',
      shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  };

  // Enhanced room types with luxury amenities
  const roomTypes = [
    {
      id: 'deluxe-ocean',
      name: 'Deluxe Ocean Suite',
      type: 'Luxury Suite',
      price: 599,
      originalPrice: 699,
      image: '/assets/images/pages/room/1.webp',
      size: '85 sqm',
      occupancy: 4,
      beds: '1 King Bed + Sofa Bed',
      rating: 4.9,
      reviews: 342,
      description: 'Breathtaking ocean views with premium amenities and exclusive butler service.',
      amenities: [
        { icon: FaWifi, name: 'High-Speed WiFi' },
        { icon: FaTv, name: 'Smart TV 65"' },
        { icon: FaSnowflake, name: 'Climate Control' },
        { icon: FaBath, name: 'Marble Bathroom' },
        { icon: FaConciergeBell, name: 'Butler Service' },
        { icon: FaCrown, name: 'Premium Location' },
        { icon: FaBuilding, name: 'Ocean Balcony' },
        { icon: FaCoffee, name: 'Nespresso Machine' }
      ],
      features: [
        'Private balcony with ocean view',
        'Marble bathroom with rain shower',
        'Complimentary minibar',
        'Daily housekeeping',
        'Priority check-in/out',
        '24/7 butler service'
      ],
      popular: true
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      type: 'Ultra Luxury',
      price: 1299,
      originalPrice: 1499,
      image: '/assets/images/pages/room/2.webp',
      size: '150 sqm',
      occupancy: 6,
      beds: '2 King Beds + Living Area',
      rating: 5.0,
      reviews: 128,
      description: 'The pinnacle of luxury with panoramic views and exclusive amenities.',
      amenities: [
        { icon: FaWifi, name: 'High-Speed WiFi' },
        { icon: FaTv, name: 'Smart TV 75"' },
        { icon: FaSnowflake, name: 'Climate Control' },
        { icon: FaBath, name: 'Spa Bathroom' },
        { icon: FaConciergeBell, name: 'Personal Butler' },
        { icon: FaCrown, name: 'VIP Location' },
        { icon: FaHeart, name: 'Romantic Setup' },
        { icon: FaShieldAlt, name: 'Private Security' }
      ],
      features: [
        'Panoramic city & ocean views',
        'Private jacuzzi and steam room',
        'Personal chef service',
        'Helicopter transfer included',
        'Private elevator access',
        'Dedicated concierge'
      ],
      exclusive: true
    },
    {
      id: 'garden-villa',
      name: 'Garden Villa',
      type: 'Private Villa',
      price: 899,
      originalPrice: 999,
      image: '/assets/images/pages/room/3.webp',
      size: '120 sqm',
      occupancy: 4,
      beds: '1 King Bed + Garden Access',
      rating: 4.8,
      reviews: 267,
      description: 'Secluded villa with private garden and pool access.',
      amenities: [
        { icon: FaWifi, name: 'High-Speed WiFi' },
        { icon: FaTv, name: 'Smart TV 55"' },
        { icon: FaSnowflake, name: 'Climate Control' },
        { icon: FaBath, name: 'Garden Bathroom' },
        { icon: FaSwimmingPool, name: 'Private Pool' },
        { icon: FaGlobe, name: 'Garden View' },
        { icon: FaBuilding, name: 'Private Terrace' },
        { icon: FaCoffee, name: 'Outdoor Dining' }
      ],
      features: [
        'Private garden and pool',
        'Outdoor dining area',
        'Direct beach access',
        'BBQ facilities',
        'Yoga deck',
        'Privacy guarantee'
      ]
    },
    {
      id: 'standard-deluxe',
      name: 'Standard Deluxe',
      type: 'Comfort Room',
      price: 299,
      originalPrice: 349,
      image: '/assets/images/pages/room/4.webp',
      size: '45 sqm',
      occupancy: 2,
      beds: '1 Queen Bed',
      rating: 4.6,
      reviews: 523,
      description: 'Elegantly designed room with modern amenities and city views.',
      amenities: [
        { icon: FaWifi, name: 'High-Speed WiFi' },
        { icon: FaTv, name: 'Smart TV 42"' },
        { icon: FaSnowflake, name: 'Air Conditioning' },
        { icon: FaBath, name: 'Modern Bathroom' },
        { icon: FaCoffee, name: 'Coffee Station' },
        { icon: FaGlobe, name: 'City View' },
        { icon: FaConciergeBell, name: 'Room Service' },
        { icon: FaShieldAlt, name: 'Safe Deposit' }
      ],
      features: [
        'City view window',
        'Work desk area',
        'Premium bedding',
        'Daily housekeeping',
        'Complimentary toiletries',
        '24/7 room service'
      ]
    }
  ];

  // Enhanced extras with pricing
  const extrasOptions = [
    {
      id: 'breakfast',
      name: 'Gourmet Breakfast',
      description: 'Daily continental breakfast for all guests',
      price: 45,
      icon: FaUtensils,
      category: 'dining'
    },
    {
      id: 'airportTransfer',
      name: 'Airport Transfer',
      description: 'Luxury vehicle pickup and drop-off',
      price: 125,
      icon: FaCar,
      category: 'transport'
    },
    {
      id: 'spa',
      name: 'Spa Package',
      description: 'Full day spa access with treatments',
      price: 285,
      icon: FaDumbbell,
      category: 'wellness'
    },
    {
      id: 'wifi',
      name: 'Premium WiFi',
      description: 'High-speed unlimited internet',
      price: 25,
      icon: FaWifi,
      category: 'technology'
    },
    {
      id: 'lateCheckout',
      name: 'Late Checkout',
      description: 'Checkout until 6 PM',
      price: 75,
      icon: FaClock,
      category: 'convenience'
    },
    {
      id: 'roomService',
      name: '24/7 Room Service',
      description: 'Round-the-clock dining service',
      price: 95,
      icon: FaConciergeBell,
      category: 'service'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Calculate pricing
  const calculatePricing = () => {
    if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) return;

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const roomPrice = selectedRoom.price * nights * bookingData.rooms;
    const extrasTotal = Object.keys(bookingData.extras)
      .filter(key => bookingData.extras[key])
      .reduce((total, key) => {
        const extra = extrasOptions.find(e => e.id === key);
        return total + (extra ? extra.price : 0);
      }, 0);

    const subtotal = roomPrice + extrasTotal;
    const taxes = subtotal * 0.12;
    const fees = 25;
    const discountAmount = promoDiscount > 0 ? subtotal * (promoDiscount / 100) : 0;
    const totalAmount = subtotal + taxes + fees - discountAmount;

    setPriceBreakdown({
      nights,
      roomPrice,
      extrasTotal,
      taxes,
      fees,
      discountAmount,
      totalAmount
    });

    setBookingData(prev => ({
      ...prev,
      subtotal,
      taxes,
      fees,
      discountAmount,
      totalAmount
    }));
  };

  // Apply promo code
  const applyPromoCode = () => {
    const validCodes: { [key: string]: number } = {
      'WELCOME20': 20,
      'SUMMER15': 15,
      'LUXURY10': 10
    };

    const upperCode = promoCode.toUpperCase();
    if (validCodes[upperCode]) {
      setPromoDiscount(validCodes[upperCode]);
      toast.success(`Promo code applied! ${validCodes[upperCode]}% discount`);
    } else {
      toast.error('Invalid promo code');
    }
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Search rooms
  const searchRooms = async () => {
    setIsLoading(true);
    try {
      // Use static room types with available property
      const availableRooms = roomTypes.map(room => ({
        ...room,
        available: true
      }));
      setAvailableRooms(availableRooms);
    } catch (error) {
      toast.error('Failed to search rooms');
    } finally {
      setIsLoading(false);
    }
  };

  // Process booking
  const processBooking = async () => {
    setIsPaymentProcessing(true);
    try {
      const bookingService = new BookingService();
      const paymentService = new PaymentService();

      // Process payment
      const paymentResult = await paymentService.processPayment({
        amount: bookingData.totalAmount,
        cardNumber: bookingData.payment.cardNumber,
        expiryDate: bookingData.payment.expiryDate,
        cvv: bookingData.payment.cvv,
        cardholderName: bookingData.payment.nameOnCard
      });

      if (paymentResult.success) {
        // Create booking
        const booking = await bookingService.createBooking({
          ...bookingData,
          roomId: selectedRoom?.id || '',
          paymentId: paymentResult.transactionId
        });

        // Send confirmation email
        if (booking.success && selectedRoom) {
          await sendBookingConfirmation({
            bookingId: booking.booking?.id || '',
            guestEmail: bookingData.guestInfo.email,
            guestName: `${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}`,
            roomName: selectedRoom.name,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            totalAmount: bookingData.totalAmount
          });
        }

        setBookingConfirmed(true);
        toast.success('Booking confirmed successfully!');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  // Calculate pricing when dependencies change
  useEffect(() => {
    calculatePricing();
  }, [selectedRoom, bookingData.checkIn, bookingData.checkOut, bookingData.rooms, bookingData.extras, promoDiscount]);

  // Step 1: Date and Guest Selection
  const DateGuestStep = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Find Your Perfect Stay
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          Select your dates and preferences to discover luxury accommodations
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold" style={{ color: theme.colors.text }}>
            <FaCalendarAlt className="inline mr-2" />
            Check-in Date
          </label>
          <input
            type="date"
            value={bookingData.checkIn}
            onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
            className="w-full p-4 rounded-xl border-2 focus:border-yellow-400 transition-all"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border
            }}
            min={new Date().toISOString().split('T')[0]}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold" style={{ color: theme.colors.text }}>
            <FaCalendarAlt className="inline mr-2" />
            Check-out Date
          </label>
          <input
            type="date"
            value={bookingData.checkOut}
            onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
            className="w-full p-4 rounded-xl border-2 focus:border-yellow-400 transition-all"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border
            }}
            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold" style={{ color: theme.colors.text }}>
            <FaUsers className="inline mr-2" />
            Guests
          </label>
          <select
            value={bookingData.guests}
            onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full p-4 rounded-xl border-2 focus:border-yellow-400 transition-all"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border
            }}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="block text-sm font-semibold" style={{ color: theme.colors.text }}>
            <FaBed className="inline mr-2" />
            Rooms
          </label>
          <select
            value={bookingData.rooms}
            onChange={(e) => setBookingData(prev => ({ ...prev, rooms: parseInt(e.target.value) }))}
            className="w-full p-4 rounded-xl border-2 focus:border-yellow-400 transition-all"
            style={{
              background: theme.colors.surface,
              borderColor: theme.colors.border
            }}
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>
                {num} Room{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="text-center">
        <button
          onClick={() => {
            if (bookingData.checkIn && bookingData.checkOut) {
              searchRooms();
              nextStep();
            } else {
              toast.error('Please select check-in and check-out dates');
            }
          }}
          disabled={isLoading}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Searching Rooms...
            </>
          ) : (
            <>
              Search Rooms
              <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );

  // Step 2: Room Selection
  const RoomSelectionStep = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Choose Your Room
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          Select from our luxury accommodations designed for your comfort
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {roomTypes.map((room) => (
          <motion.div
            key={room.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedRoom?.id === room.id 
                ? 'ring-4 ring-yellow-400 shadow-2xl' 
                : 'hover:shadow-xl'
            }`}
            style={{
              background: theme.colors.surface,
              boxShadow: theme.colors.shadow
            }}
            onClick={() => setSelectedRoom({ ...room, available: true })}
          >
            {room.popular && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                <FaCrown className="mr-1" />
                Most Popular
              </div>
            )}
            
            {room.exclusive && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                <FaHeart className="mr-1" />
                Exclusive
              </div>
            )}

            <div className="relative h-64">
              <img 
                src={room.image} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{room.name}</h3>
                <p className="text-sm opacity-90">{room.type}</p>
              </div>
              {room.originalPrice > room.price && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  <FaPercent className="mr-1" />
                  {Math.round((1 - room.price / room.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{room.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({room.reviews})</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaBed className="mr-1" />
                    {room.size}
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaUsers className="mr-1" />
                    Up to {room.occupancy}
                  </div>
                </div>
                <div className="text-right">
                  {room.originalPrice > room.price && (
                    <div className="text-sm text-gray-500 line-through">
                      ${room.originalPrice}/night
                    </div>
                  )}
                  <div className="text-2xl font-bold text-yellow-600">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500">/night</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{room.description}</p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {room.amenities.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <amenity.icon className="mr-2 text-yellow-600" />
                    {amenity.name}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {room.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2 text-xs" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedRoom?.id === room.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center text-yellow-800">
                    <FaCheck className="mr-2" />
                    <span className="font-semibold">Room Selected</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedRoom}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <FaArrowRight className="ml-2" />
        </button>
      </motion.div>
    </motion.div>
  );

  // Continue with other steps...
  const ExtrasStep = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Enhance Your Stay
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          Add premium services and amenities to make your experience unforgettable
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {extrasOptions.map((extra) => (
          <motion.div
            key={extra.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              bookingData.extras[extra.id] 
                ? 'border-yellow-400 bg-yellow-50' 
                : 'border-gray-200 hover:border-yellow-300'
            }`}
            style={{ background: theme.colors.surface }}
            onClick={() => setBookingData(prev => ({
              ...prev,
              extras: {
                ...prev.extras,
                [extra.id]: !prev.extras[extra.id]
              }
            }))}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  bookingData.extras[extra.id] ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <extra.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                    {extra.name}
                  </h3>
                  <p className="text-sm capitalize text-gray-500">{extra.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-600">
                  ${extra.price}
                </div>
                {bookingData.extras[extra.id] && (
                  <div className="text-green-600 text-sm font-semibold">
                    <FaCheck className="mr-1" />
                    Added
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600">{extra.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Promo Code Section */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-2xl"
        style={{ background: theme.colors.surface, boxShadow: theme.colors.shadow }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text }}>
          <FaGift className="mr-2" />
          Have a Promo Code?
        </h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
          />
          <button
            onClick={applyPromoCode}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Apply
          </button>
        </div>
        {promoDiscount > 0 && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
            <FaPercent className="mr-2" />
            Promo code applied! You're saving {promoDiscount}%
          </div>
        )}
      </motion.div>

      {/* Price Breakdown */}
      {priceBreakdown.totalAmount > 0 && (
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl"
          style={{ background: theme.colors.surface, boxShadow: theme.colors.shadow }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.text }}>
            <FaShoppingCart className="mr-2" />
            Price Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Room ({priceBreakdown.nights} nights)</span>
              <span>${priceBreakdown.roomPrice}</span>
            </div>
            {priceBreakdown.extrasTotal > 0 && (
              <div className="flex justify-between">
                <span>Extras & Services</span>
                <span>${priceBreakdown.extrasTotal}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>${(priceBreakdown.taxes + priceBreakdown.fees).toFixed(2)}</span>
            </div>
            {priceBreakdown.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${priceBreakdown.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-yellow-600">${priceBreakdown.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Continue to Payment
          <FaArrowRight className="ml-2" />
        </button>
      </motion.div>
    </motion.div>
  );

  // Guest Info and Payment Step
  const PaymentStep = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Complete Your Booking
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          Enter your details and payment information to secure your reservation
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guest Information */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl"
          style={{ background: theme.colors.surface, boxShadow: theme.colors.shadow }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: theme.colors.text }}>
            <FaUser className="mr-2" />
            Guest Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                First Name
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.firstName}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, firstName: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Last Name
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.lastName}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, lastName: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                <FaEnvelope className="mr-1" />
                Email
              </label>
              <input
                type="email"
                value={bookingData.guestInfo.email}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, email: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                <FaPhone className="mr-1" />
                Phone
              </label>
              <input
                type="tel"
                value={bookingData.guestInfo.phone}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, phone: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                <FaMapMarkerAlt className="mr-1" />
                Address
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.address}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, address: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                City
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.city}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, city: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Country
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.country}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, country: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Enter country"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Special Requests (Optional)
              </label>
              <textarea
                value={bookingData.guestInfo.specialRequests}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, specialRequests: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                rows={3}
                placeholder="Any special requests or preferences..."
              />
            </div>
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl"
          style={{ background: theme.colors.surface, boxShadow: theme.colors.shadow }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: theme.colors.text }}>
            <FaCreditCard className="mr-2" />
            Payment Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Cardholder Name
              </label>
              <input
                type="text"
                value={bookingData.payment.nameOnCard}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  payment: { ...prev.payment, nameOnCard: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Name on card"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Card Number
              </label>
              <input
                type="text"
                value={bookingData.payment.cardNumber}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  payment: { ...prev.payment, cardNumber: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={bookingData.payment.expiryDate}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    payment: { ...prev.payment, expiryDate: e.target.value }
                  }))}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                  CVV
                </label>
                <input
                  type="text"
                  value={bookingData.payment.cvv}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    payment: { ...prev.payment, cvv: e.target.value }
                  }))}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>
                Billing Address
              </label>
              <input
                type="text"
                value={bookingData.payment.billingAddress}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  payment: { ...prev.payment, billingAddress: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-400 focus:outline-none"
                placeholder="Billing address"
              />
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <FaLock className="text-green-600" />
              <span className="text-sm text-green-800">
                Your payment information is secure and encrypted
              </span>
            </div>
          </div>

          {/* Final Price Summary */}
          {priceBreakdown.totalAmount > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-3">Final Total</h4>
              <div className="text-3xl font-bold text-yellow-600">
                ${priceBreakdown.totalAmount.toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Including all taxes and fees
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <button
          onClick={processBooking}
          disabled={isPaymentProcessing}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPaymentProcessing ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            <>
              <FaLock className="mr-2" />
              Complete Booking (${priceBreakdown.totalAmount?.toFixed(2)})
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );

  // Success confirmation
  const ConfirmationStep = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center space-y-8"
    >
      <motion.div variants={itemVariants}>
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-4xl text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 text-green-600">
          Booking Confirmed!
        </h2>
        <p className="text-lg text-gray-600">
          Thank you for choosing Moonlit Hotel. Your reservation has been confirmed.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="max-w-md mx-auto p-6 rounded-2xl"
        style={{ background: theme.colors.surface, boxShadow: theme.colors.shadow }}
      >
        <h3 className="text-xl font-bold mb-4">Booking Details</h3>
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span>Room:</span>
            <span className="font-semibold">{selectedRoom?.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Guest:</span>
            <span className="font-semibold">
              {bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Check-in:</span>
            <span className="font-semibold">{bookingData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-out:</span>
            <span className="font-semibold">{bookingData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span>Guests:</span>
            <span className="font-semibold">{bookingData.guests}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-xl font-bold">
            <span>Total Paid:</span>
            <span className="text-green-600">${bookingData.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <p className="text-gray-600">
          A confirmation email has been sent to {bookingData.guestInfo.email}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 border-2 border-yellow-400 text-yellow-600 rounded-xl hover:bg-yellow-50 transition-all"
          >
            Print Confirmation
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Step Progress Indicator
  const StepIndicator = () => (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-8">
        {[
          { step: 1, label: 'Dates & Guests', icon: FaCalendarAlt },
          { step: 2, label: 'Select Room', icon: FaBed },
          { step: 3, label: 'Add Extras', icon: FaGift },
          { step: 4, label: 'Payment', icon: FaCreditCard }
        ].map(({ step, label, icon: Icon }) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
              currentStep >= step 
                ? 'bg-yellow-400 border-yellow-400 text-white' 
                : 'border-gray-300 text-gray-400'
            }`}>
              {currentStep > step ? <FaCheck /> : <Icon />}
            </div>
            <span className={`ml-2 text-sm font-semibold ${
              currentStep >= step ? 'text-yellow-600' : 'text-gray-400'
            }`}>
              {label}
            </span>
            {step < 4 && (
              <div className={`w-8 h-0.5 mx-4 ${
                currentStep > step ? 'bg-yellow-400' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render current step
  const renderStep = () => {
    if (bookingConfirmed) return <ConfirmationStep />;
    
    switch (currentStep) {
      case 1:
        return <DateGuestStep />;
      case 2:
        return <RoomSelectionStep />;
      case 3:
        return <ExtrasStep />;
      case 4:
        return <PaymentStep />;
      default:
        return <DateGuestStep />;
    }
  };

  return (
    <div 
      className="min-h-screen py-12"
      style={{ background: theme.colors.background }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {!bookingConfirmed && <StepIndicator />}
        
        <div 
          className="p-8 rounded-3xl"
          style={{ 
            background: theme.colors.cardBg,
            boxShadow: theme.colors.shadow,
            backdropFilter: 'blur(20px)'
          }}
        >
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookingPage;
