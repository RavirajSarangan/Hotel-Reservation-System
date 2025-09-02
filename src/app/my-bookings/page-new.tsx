'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Star, Edit, Trash2, Eye, Plus, Download, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import TopBar from '../home-1/TopBar';
import HeaderOne from '../home-1/Header';
import FooterOne from '../home-1/FooterOne';

interface Booking {
  id: string;
  roomName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  location: string;
  image: string;
  reservationNumber: string;
}

export default function MyBookingsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: '1',
      reservationNumber: 'RES001234',
      roomName: 'Luxury Ocean Suite',
      roomType: 'Suite',
      checkIn: '2024-12-25',
      checkOut: '2024-12-30',
      guests: 2,
      totalPrice: 1250,
      status: 'confirmed',
      bookingDate: '2024-12-01',
      location: 'Moonlit Resort, Maldives',
      image: '/assets/images/room/01.webp'
    },
    {
      id: '2',
      reservationNumber: 'RES001235',
      roomName: 'Executive Business Room',
      roomType: 'Standard',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      guests: 1,
      totalPrice: 450,
      status: 'pending',
      bookingDate: '2024-12-15',
      location: 'Moonlit Hotel, Toronto',
      image: '/assets/images/room/02.webp'
    },
    {
      id: '3',
      reservationNumber: 'RES001236',
      roomName: 'Family Villa',
      roomType: 'Villa',
      checkIn: '2024-11-10',
      checkOut: '2024-11-15',
      guests: 4,
      totalPrice: 2100,
      status: 'cancelled',
      bookingDate: '2024-10-25',
      location: 'Moonlit Resort, Bali',
      image: '/assets/images/room/03.webp'
    }
  ];

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }

    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
      toast.success('✅ Bookings loaded successfully!', {
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
    }, 1000);
  }, [isLoaded, isSignedIn]);

  const handleCancelBooking = (bookingId: string, roomName: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3 p-2">
        <div className="text-hotel-base font-hotel-medium">
          Cancel booking for {roomName}?
        </div>
        <div className="text-hotel-sm font-hotel-normal text-gray-600">
          This action cannot be undone.
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700"
            onClick={() => {
              setBookings(prev => 
                prev.map(booking => 
                  booking.id === bookingId 
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
                )
              );
              toast.dismiss(t.id);
              toast.success('🚫 Booking cancelled successfully!', {
                style: {
                  background: '#EF4444',
                  color: '#fff',
                },
              });
            }}
          >
            Yes, Cancel
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.dismiss(t.id)}
          >
            Keep Booking
          </Button>
        </div>
      </div>
    ), {
      duration: 10000,
    });
  };

  const handleViewDetails = (booking: Booking) => {
    toast.success(`👀 Viewing details for ${booking.roomName}`, {
      duration: 2000,
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    });
    // Here you would typically navigate to a detailed view
  };

  const handleModifyBooking = (booking: Booking) => {
    toast.success(`✏️ Opening modification for ${booking.roomName}`, {
      duration: 2000,
      style: {
        background: '#8B5CF6',
        color: '#fff',
      },
    });
    // Here you would typically open a modification modal
  };

  const handleDownloadConfirmation = (booking: Booking) => {
    toast.success(`📄 Downloading confirmation for ${booking.reservationNumber}`, {
      duration: 2000,
      style: {
        background: '#059669',
        color: '#fff',
      },
    });
    // Simulate download
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-700 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✅';
      case 'pending': return '⏳';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  if (!isLoaded || loading) {
    return (
      <>
        <TopBar />
        <HeaderOne />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-hotel-primary mx-auto mb-4"></div>
            <p className="text-hotel-lg font-hotel-medium">Loading your bookings...</p>
          </div>
        </div>
        <FooterOne />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <HeaderOne />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-hotel-4xl font-hotel-bold tracking-hotel-normal mb-4">
              My Bookings
            </h1>
            <p className="text-hotel-lg font-hotel-normal text-gray-600 max-w-2xl mx-auto">
              Manage and track all your hotel reservations in one place
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="text-hotel-2xl font-hotel-bold text-blue-600">{bookings.length}</div>
              <div className="text-hotel-sm font-hotel-medium text-gray-600">Total Bookings</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-hotel-2xl font-hotel-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-hotel-sm font-hotel-medium text-gray-600">Confirmed</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-hotel-2xl font-hotel-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-hotel-sm font-hotel-medium text-gray-600">Pending</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-hotel-2xl font-hotel-bold text-red-600">
                {bookings.filter(b => b.status === 'cancelled').length}
              </div>
              <div className="text-hotel-sm font-hotel-medium text-gray-600">Cancelled</div>
            </Card>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => {
                  setFilter(status);
                  toast.success(`🔍 Filtering by ${status} bookings`, {
                    duration: 1500,
                  });
                }}
                className="text-hotel-sm font-hotel-medium capitalize"
              >
                <Filter className="mr-2 h-4 w-4" />
                {status === 'all' ? 'All Bookings' : status}
                <span className="ml-2 bg-white text-hotel-primary rounded-full px-2 py-1 text-xs">
                  {status === 'all' 
                    ? bookings.length 
                    : bookings.filter(b => b.status === status).length
                  }
                </span>
              </Button>
            ))}
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mb-6">
                <Calendar className="mx-auto h-20 w-20 text-gray-400" />
              </div>
              <h3 className="text-hotel-2xl font-hotel-semibold mb-4">No bookings found</h3>
              <p className="text-hotel-base font-hotel-normal text-gray-600 mb-6 max-w-md mx-auto">
                {filter === 'all' 
                  ? "You haven't made any bookings yet. Start planning your next getaway!"
                  : `No ${filter} bookings found. Try a different filter.`
                }
              </p>
              <Button 
                size="lg"
                onClick={() => {
                  toast.success('🏨 Redirecting to rooms page', {
                    duration: 2000,
                  });
                  window.location.href = '/room-two';
                }}
                className="text-hotel-base font-hotel-semibold"
              >
                <Plus className="mr-2 h-5 w-5" />
                Book a Room Now
              </Button>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-hotel-primary">
                  <div className="relative">
                    <img 
                      src={booking.image} 
                      alt={booking.roomName}
                      className="w-full h-48 object-cover"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-xs font-medium">
                      {booking.reservationNumber}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-hotel-xl font-hotel-semibold">
                      {booking.roomName}
                    </CardTitle>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-hotel-sm font-hotel-normal">{booking.location}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-hotel-xs font-hotel-medium">Check-in</span>
                        </div>
                        <p className="text-hotel-sm font-hotel-semibold">{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-hotel-xs font-hotel-medium">Check-out</span>
                        </div>
                        <p className="text-hotel-sm font-hotel-semibold">{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-4 border-t border-b">
                      <div>
                        <span className="text-hotel-xs font-hotel-medium text-gray-600">Total Price</span>
                        <p className="text-hotel-2xl font-hotel-bold text-hotel-primary">${booking.totalPrice}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-hotel-xs font-hotel-medium text-gray-600">Guests</span>
                        <p className="text-hotel-lg font-hotel-semibold">{booking.guests}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(booking)}
                          className="flex-1 text-hotel-xs font-hotel-medium"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadConfirmation(booking)}
                          className="flex-1 text-hotel-xs font-hotel-medium"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>

                      {booking.status !== 'cancelled' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModifyBooking(booking)}
                            className="flex-1 text-hotel-xs font-hotel-medium"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Modify
                          </Button>
                          
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleCancelBooking(booking.id, booking.roomName)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-16 text-center">
            <h2 className="text-hotel-2xl font-hotel-semibold mb-6">Quick Actions</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => {
                  toast.success('🏨 Redirecting to rooms page', {
                    duration: 2000,
                  });
                  window.location.href = '/room-two';
                }}
                className="text-hotel-base font-hotel-semibold"
              >
                <Plus className="mr-2 h-5 w-5" />
                Book Another Room
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => toast.success('💬 Opening support chat', {
                  duration: 2000,
                  style: {
                    background: '#6366F1',
                    color: '#fff',
                  },
                })}
                className="text-hotel-base font-hotel-medium"
              >
                Contact Support
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => toast.success('📧 Contact information sent to email', {
                  duration: 3000,
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                })}
                className="text-hotel-base font-hotel-medium"
              >
                Email Summary
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
    </>
  );
}
