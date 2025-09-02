'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
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
      toast.success('✅ Your bookings loaded successfully!', {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px' }}>
        <div style={{ fontSize: '16px', fontWeight: '500' }}>
          Cancel booking for {roomName}?
        </div>
        <div style={{ fontSize: '14px', color: '#6B7280' }}>
          This action cannot be undone.
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{
              backgroundColor: '#EF4444',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
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
          </button>
          <button
            style={{
              backgroundColor: 'white',
              color: '#374151',
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onClick={() => toast.dismiss(t.id)}
          >
            Keep Booking
          </button>
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
  };

  const handleModifyBooking = (booking: Booking) => {
    toast.success(`✏️ Opening modification for ${booking.roomName}`, {
      duration: 2000,
      style: {
        background: '#8B5CF6',
        color: '#fff',
      },
    });
  };

  const handleDownloadConfirmation = (booking: Booking) => {
    toast.success(`📄 Downloading confirmation for ${booking.reservationNumber}`, {
      duration: 2000,
      style: {
        background: '#059669',
        color: '#fff',
      },
    });
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return { color: '#047857', backgroundColor: '#D1FAE5', border: '1px solid #10B981' };
      case 'pending': return { color: '#92400E', backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' };
      case 'cancelled': return { color: '#B91C1C', backgroundColor: '#FEE2E2', border: '1px solid #EF4444' };
      default: return { color: '#374151', backgroundColor: '#F3F4F6', border: '1px solid #9CA3AF' };
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '128px',
              height: '128px',
              border: '4px solid #D4AF37',
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ fontSize: '18px', fontWeight: '500', letterSpacing: '0.01em' }}>Loading your bookings...</p>
          </div>
        </div>
        <FooterOne />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <HeaderOne />
      <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '4.2rem', 
              fontWeight: '700', 
              letterSpacing: '0.03em', 
              marginBottom: '16px',
              color: '#111827'
            }}>
              My Bookings
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              fontWeight: '400', 
              color: '#6B7280', 
              maxWidth: '672px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Manage and track all your hotel reservations in one place
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '750', color: '#3B82F6' }}>{bookings.length}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#6B7280', letterSpacing: '0.02em' }}>Total Bookings</div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '750', color: '#10B981' }}>
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#6B7280', letterSpacing: '0.02em' }}>Confirmed</div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '750', color: '#F59E0B' }}>
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#6B7280', letterSpacing: '0.02em' }}>Pending</div>
            </div>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '750', color: '#EF4444' }}>
                {bookings.filter(b => b.status === 'cancelled').length}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#6B7280', letterSpacing: '0.02em' }}>Cancelled</div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: filter === status ? '2px solid #D4AF37' : '1px solid #D1D5DB',
                  backgroundColor: filter === status ? '#D4AF37' : 'white',
                  color: filter === status ? 'white' : '#374151',
                  fontSize: '0.8rem',
                  fontWeight: '550',
                  textTransform: 'capitalize',
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => {
                  setFilter(status);
                  toast.success(`🔍 Filtering by ${status} bookings`, {
                    duration: 1500,
                  });
                }}
              >
                <Filter size={16} />
                {status === 'all' ? 'All Bookings' : status}
                <span style={{
                  backgroundColor: 'white',
                  color: '#D4AF37',
                  borderRadius: '50%',
                  padding: '2px 8px',
                  fontSize: '0.65rem',
                  fontWeight: '600'
                }}>
                  {status === 'all' 
                    ? bookings.length 
                    : bookings.filter(b => b.status === status).length
                  }
                </span>
              </button>
            ))}
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length === 0 ? (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '48px', 
              textAlign: 'center', 
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <Calendar size={80} style={{ color: '#9CA3AF', margin: '0 auto' }} />
              </div>
              <h3 style={{ 
                fontSize: '1.85rem', 
                fontWeight: '700', 
                marginBottom: '16px', 
                letterSpacing: '0.01em' 
              }}>No bookings found</h3>
              <p style={{ 
                fontSize: '1.05rem', 
                fontWeight: '400', 
                color: '#6B7280', 
                marginBottom: '24px', 
                maxWidth: '448px', 
                margin: '0 auto 24px',
                lineHeight: '1.6'
              }}>
                {filter === 'all' 
                  ? "You haven't made any bookings yet. Start planning your next getaway!"
                  : `No ${filter} bookings found. Try a different filter.`
                }
              </p>
              <button 
                style={{
                  backgroundColor: '#D4AF37',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => {
                  toast.success('🏨 Redirecting to rooms page', {
                    duration: 2000,
                  });
                  window.location.href = '/room-two';
                }}
              >
                <Plus size={20} />
                Book a Room Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
              {filteredBookings.map((booking) => (
                <div key={booking.id} style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={booking.image} 
                      alt={booking.roomName}
                      style={{ width: '100%', height: '192px', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      ...getStatusColor(booking.status)
                    }}>
                      {getStatusIcon(booking.status)} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {booking.reservationNumber}
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ 
                      fontSize: '1.35rem', 
                      fontWeight: '600', 
                      marginBottom: '8px' 
                    }}>
                      {booking.roomName}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#6B7280', marginBottom: '16px' }}>
                      <MapPin size={16} style={{ marginRight: '8px' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: '400' }}>{booking.location}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#6B7280', marginBottom: '8px' }}>
                          <Calendar size={16} style={{ marginRight: '8px' }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>Check-in</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#6B7280', marginBottom: '8px' }}>
                          <Calendar size={16} style={{ marginRight: '8px' }} />
                          <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>Check-out</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '16px 0',
                      borderTop: '1px solid #E5E7EB',
                      borderBottom: '1px solid #E5E7EB',
                      margin: '16px 0'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', fontWeight: '500', color: '#6B7280' }}>Total Price</span>
                        <p style={{ fontSize: '1.6rem', fontWeight: '700', color: '#D4AF37' }}>${booking.totalPrice}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '500', color: '#6B7280' }}>Guests</span>
                        <p style={{ fontSize: '1.15rem', fontWeight: '600' }}>{booking.guests}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #D1D5DB',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                          onClick={() => handleViewDetails(booking)}
                        >
                          <Eye size={12} />
                          Details
                        </button>
                        
                        <button
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid #D1D5DB',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                          onClick={() => handleDownloadConfirmation(booking)}
                        >
                          <Download size={12} />
                          Download
                        </button>
                      </div>

                      {booking.status !== 'cancelled' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid #D1D5DB',
                              backgroundColor: 'white',
                              color: '#374151',
                              fontSize: '0.7rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px'
                            }}
                            onClick={() => handleModifyBooking(booking)}
                          >
                            <Edit size={12} />
                            Modify
                          </button>
                          
                          <button
                            style={{
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: '#EF4444',
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onClick={() => handleCancelBooking(booking.id, booking.roomName)}
                          >
                            <Trash2 size={12} />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2.1rem', 
              fontWeight: '700', 
              marginBottom: '24px', 
              letterSpacing: '0.02em' 
            }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <button 
                style={{
                  backgroundColor: '#D4AF37',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '0.01em'
                }}
                onClick={() => {
                  toast.success('🏨 Redirecting to rooms page', {
                    duration: 2000,
                  });
                  window.location.href = '/room-two';
                }}
              >
                <Plus size={20} />
                Book Another Room
              </button>
              <button 
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  letterSpacing: '0.01em'
                }}
                onClick={() => toast.success('💬 Opening support chat', {
                  duration: 2000,
                  style: {
                    background: '#6366F1',
                    color: '#fff',
                  },
                })}
              >
                Contact Support
              </button>
              <button 
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB',
                  fontSize: '1.05rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  letterSpacing: '0.01em'
                }}
                onClick={() => toast.success('📧 Contact information sent to email', {
                  duration: 3000,
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                })}
              >
                Email Summary
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
    </>
  );
}
