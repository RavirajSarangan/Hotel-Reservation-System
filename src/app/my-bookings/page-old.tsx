'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  Phone,
  Mail,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils';

const MyBookings = () => {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isLoaded && user) {
      // Simulate fetching user bookings
      setTimeout(() => {
        setBookings([
          {
            id: '1',
            reservationNumber: 'RES123456',
            roomNumber: '204',
            roomType: 'Deluxe Ocean View',
            checkIn: '2024-02-15',
            checkOut: '2024-02-18',
            guests: 2,
            totalAmount: 750.00,
            status: 'confirmed',
            paymentStatus: 'paid',
            bookingDate: '2024-01-20',
            specialRequests: 'Late checkout if possible'
          },
          {
            id: '2',
            reservationNumber: 'RES123457',
            roomNumber: '156',
            roomType: 'Presidential Suite',
            checkIn: '2024-03-10',
            checkOut: '2024-03-15',
            guests: 4,
            totalAmount: 1250.00,
            status: 'pending',
            paymentStatus: 'pending',
            bookingDate: '2024-02-01',
            specialRequests: 'Anniversary celebration setup'
          },
          {
            id: '3',
            reservationNumber: 'RES123458',
            roomNumber: '301',
            roomType: 'Standard Room',
            checkIn: '2024-01-05',
            checkOut: '2024-01-08',
            guests: 1,
            totalAmount: 450.00,
            status: 'checked_out',
            paymentStatus: 'paid',
            bookingDate: '2023-12-15',
            specialRequests: ''
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hotel-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your bookings.</p>
            <Link href="/sign-in">
              <Button variant="hotel" size="lg">Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'checked_out':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 mt-2">
                Manage your hotel reservations and view booking history
              </p>
            </div>
            <Link href="/room">
              <Button variant="hotel" size="lg">
                Book New Room
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Bookings', count: bookings.length },
                { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
                { key: 'checked_out', label: 'Completed', count: bookings.filter(b => b.status === 'checked_out').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-hotel-primary text-hotel-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' ? 'You haven\'t made any bookings yet.' : `No ${filter} bookings found.`}
              </p>
              <Link href="/room">
                <Button variant="hotel">Make Your First Booking</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {booking.roomType} - Room {booking.roomNumber}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Reservation #{booking.reservationNumber}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Check-in & Check-out */}
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">Check-in</p>
                          <p>{formatDate(booking.checkIn)}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">Check-out</p>
                          <p>{formatDate(booking.checkOut)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Guests & Payment */}
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">Guests</p>
                          <p>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(booking.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Booking Date</p>
                        <p>{formatDate(booking.bookingDate)}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Payment Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 mr-2" />
                          Modify
                        </Button>
                      )}
                      {['pending', 'confirmed'].includes(booking.status) && (
                        <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-1">Special Requests:</p>
                      <p className="text-sm text-gray-600">{booking.specialRequests}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our customer support team is available 24/7 to assist you with your bookings.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call: (555) 123-4567
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyBookings;
