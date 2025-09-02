import mongoose, { Schema, Document } from 'mongoose';

// User Interface
export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'receptionist' | 'manager' | 'admin' | 'super_admin';
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Customer Interface
export interface ICustomer extends Document {
  userId: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    dateOfBirth?: Date;
    idType?: string;
    idNumber?: string;
  };
  preferences: {
    roomType?: string;
    smokingPreference?: 'smoking' | 'non-smoking';
    specialRequests?: string[];
  };
  loyaltyPoints: number;
  totalSpent: number;
  totalStays: number;
  vipStatus: 'regular' | 'silver' | 'gold' | 'platinum';
  createdAt: Date;
  updatedAt: Date;
}

// Room Interface
export interface IRoom extends Document {
  roomNumber: string;
  roomType: 'standard' | 'deluxe' | 'suite' | 'presidential' | 'residential';
  floor: number;
  capacity: number;
  bedType: 'single' | 'double' | 'queen' | 'king' | 'twin';
  amenities: string[];
  price: {
    basePrice: number;
    weeklyRate?: number;
    monthlyRate?: number;
  };
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning' | 'out_of_order';
  isActive: boolean;
  images: string[];
  description: string;
  size: number; // in square feet
  features: string[];
  lastCleaned?: Date;
  maintenanceNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Reservation Interface
export interface IReservation extends Document {
  reservationNumber: string;
  customerId: string;
  roomId: string;
  roomNumber: string;
  guestDetails: {
    primaryGuest: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    additionalGuests: number;
    totalGuests: number;
  };
  dates: {
    checkIn: Date;
    checkOut: Date;
    bookingDate: Date;
    actualCheckIn?: Date;
    actualCheckOut?: Date;
  };
  pricing: {
    roomRate: number;
    numberOfNights: number;
    subtotal: number;
    taxes: number;
    fees: number;
    totalAmount: number;
    discountAmount?: number;
    finalAmount: number;
  };
  paymentInfo: {
    paymentMethod?: 'cash' | 'credit_card' | 'debit_card' | 'online';
    paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
    creditCardDetails?: {
      lastFourDigits: string;
      cardType: string;
      expiryDate: string;
    };
    transactionId?: string;
    depositPaid?: number;
  };
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show';
  specialRequests?: string;
  source: 'website' | 'phone' | 'walk_in' | 'travel_company' | 'online_platform';
  isCompanyBooking: boolean;
  companyDetails?: {
    companyName: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    billingAddress: string;
  };
  cancellationReason?: string;
  notes?: string;
  createdBy?: string;
  modifiedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Billing Interface
export interface IBilling extends Document {
  billNumber: string;
  reservationId: string;
  customerId: string;
  roomCharges: {
    roomRate: number;
    numberOfNights: number;
    roomTotal: number;
  };
  additionalCharges: {
    restaurant: number;
    roomService: number;
    laundry: number;
    telephone: number;
    minibar: number;
    spa: number;
    parking: number;
    internet: number;
    other: { description: string; amount: number }[];
  };
  subtotal: number;
  taxes: number;
  discounts: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded';
  paymentMethod: 'cash' | 'credit_card' | 'debit_card' | 'company_billing';
  paymentDate?: Date;
  isNoShow: boolean;
  lateCheckoutFee?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Travel Company Interface
export interface ITravelCompany extends Document {
  companyName: string;
  contactInfo: {
    contactPerson: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  contractDetails: {
    discountPercentage: number;
    minimumRooms: number;
    minimumNights: number;
    contractStartDate: Date;
    contractEndDate: Date;
    creditLimit: number;
  };
  isActive: boolean;
  totalBookings: number;
  totalRevenue: number;
  outstandingBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['customer', 'receptionist', 'manager', 'admin', 'super_admin'], 
    default: 'customer' 
  },
  profileImage: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Customer Schema
const CustomerSchema = new Schema<ICustomer>({
  userId: { type: String, required: true, unique: true },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    dateOfBirth: { type: Date },
    idType: { type: String },
    idNumber: { type: String },
  },
  preferences: {
    roomType: { type: String },
    smokingPreference: { type: String, enum: ['smoking', 'non-smoking'] },
    specialRequests: [{ type: String }],
  },
  loyaltyPoints: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  totalStays: { type: Number, default: 0 },
  vipStatus: { 
    type: String, 
    enum: ['regular', 'silver', 'gold', 'platinum'], 
    default: 'regular' 
  },
}, { timestamps: true });

// Room Schema
const RoomSchema = new Schema<IRoom>({
  roomNumber: { type: String, required: true, unique: true },
  roomType: { 
    type: String, 
    enum: ['standard', 'deluxe', 'suite', 'presidential', 'residential'], 
    required: true 
  },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  bedType: { 
    type: String, 
    enum: ['single', 'double', 'queen', 'king', 'twin'], 
    required: true 
  },
  amenities: [{ type: String }],
  price: {
    basePrice: { type: Number, required: true },
    weeklyRate: { type: Number },
    monthlyRate: { type: Number },
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'maintenance', 'cleaning', 'out_of_order'], 
    default: 'available' 
  },
  isActive: { type: Boolean, default: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  size: { type: Number, required: true },
  features: [{ type: String }],
  lastCleaned: { type: Date },
  maintenanceNotes: { type: String },
}, { timestamps: true });

// Reservation Schema
const ReservationSchema = new Schema<IReservation>({
  reservationNumber: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  roomId: { type: String, required: true },
  roomNumber: { type: String, required: true },
  guestDetails: {
    primaryGuest: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    additionalGuests: { type: Number, default: 0 },
    totalGuests: { type: Number, required: true },
  },
  dates: {
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    bookingDate: { type: Date, default: Date.now },
    actualCheckIn: { type: Date },
    actualCheckOut: { type: Date },
  },
  pricing: {
    roomRate: { type: Number, required: true },
    numberOfNights: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    fees: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
  },
  paymentInfo: {
    paymentMethod: { type: String, enum: ['cash', 'credit_card', 'debit_card', 'online'] },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'partial', 'paid', 'refunded'], 
      default: 'pending' 
    },
    creditCardDetails: {
      lastFourDigits: { type: String },
      cardType: { type: String },
      expiryDate: { type: String },
    },
    transactionId: { type: String },
    depositPaid: { type: Number, default: 0 },
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'], 
    default: 'pending' 
  },
  specialRequests: { type: String },
  source: { 
    type: String, 
    enum: ['website', 'phone', 'walk_in', 'travel_company', 'online_platform'], 
    default: 'website' 
  },
  isCompanyBooking: { type: Boolean, default: false },
  companyDetails: {
    companyName: { type: String },
    contactPerson: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    billingAddress: { type: String },
  },
  cancellationReason: { type: String },
  notes: { type: String },
  createdBy: { type: String },
  modifiedBy: { type: String },
}, { timestamps: true });

// Billing Schema
const BillingSchema = new Schema<IBilling>({
  billNumber: { type: String, required: true, unique: true },
  reservationId: { type: String, required: true },
  customerId: { type: String, required: true },
  roomCharges: {
    roomRate: { type: Number, required: true },
    numberOfNights: { type: Number, required: true },
    roomTotal: { type: Number, required: true },
  },
  additionalCharges: {
    restaurant: { type: Number, default: 0 },
    roomService: { type: Number, default: 0 },
    laundry: { type: Number, default: 0 },
    telephone: { type: Number, default: 0 },
    minibar: { type: Number, default: 0 },
    spa: { type: Number, default: 0 },
    parking: { type: Number, default: 0 },
    internet: { type: Number, default: 0 },
    other: [{
      description: { type: String },
      amount: { type: Number },
    }],
  },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  discounts: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'partial', 'paid', 'refunded'], 
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'credit_card', 'debit_card', 'company_billing'], 
    required: true 
  },
  paymentDate: { type: Date },
  isNoShow: { type: Boolean, default: false },
  lateCheckoutFee: { type: Number, default: 0 },
}, { timestamps: true });

// Travel Company Schema
const TravelCompanySchema = new Schema<ITravelCompany>({
  companyName: { type: String, required: true, unique: true },
  contactInfo: {
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  contractDetails: {
    discountPercentage: { type: Number, required: true },
    minimumRooms: { type: Number, required: true },
    minimumNights: { type: Number, required: true },
    contractStartDate: { type: Date, required: true },
    contractEndDate: { type: Date, required: true },
    creditLimit: { type: Number, default: 0 },
  },
  isActive: { type: Boolean, default: true },
  totalBookings: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  outstandingBalance: { type: Number, default: 0 },
}, { timestamps: true });

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
export const Room = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
export const Reservation = mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);
export const Billing = mongoose.models.Billing || mongoose.model<IBilling>('Billing', BillingSchema);
export const TravelCompany = mongoose.models.TravelCompany || mongoose.model<ITravelCompany>('TravelCompany', TravelCompanySchema);
