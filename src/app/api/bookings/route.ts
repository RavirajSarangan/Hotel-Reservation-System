import { NextRequest, NextResponse } from 'next/server';
import { BookingService, PaymentService } from '../../utils/businessLogic';
import emailService from '../../utils/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, bookingData, paymentData } = body;

    switch (action) {
      case 'create':
        // Create new booking
        const bookingResult = await BookingService.createBooking(bookingData);
        
        if (bookingResult.success) {
          // Send confirmation email
          let emailSent = false;
          try {
            const emailResult = await emailService.sendBookingConfirmation({
              id: bookingResult.booking.id,
              email: bookingData.email,
              guestName: bookingData.guestName,
              roomType: bookingData.roomType,
              roomNumber: bookingData.roomNumber,
              checkIn: bookingData.checkIn,
              checkOut: bookingData.checkOut,
              guests: bookingData.guests,
              totalAmount: bookingData.totalAmount,
              specialRequests: bookingData.specialRequests
            });
            emailSent = emailResult.success;
          } catch (emailError) {
            console.log('Email sending failed:', emailError);
          }

          return NextResponse.json({
            success: true,
            booking: bookingResult.booking,
            emailSent: emailSent,
            message: 'Booking created successfully'
          });
        } else {
          return NextResponse.json({
            success: false,
            error: bookingResult.error
          }, { status: 400 });
        }

      case 'create_with_payment':
        // Create booking with payment processing
        if (!paymentData) {
          return NextResponse.json({
            success: false,
            error: 'Payment data is required'
          }, { status: 400 });
        }

        // Process payment first
        const paymentResult = await PaymentService.processPayment({
          ...paymentData,
          amount: bookingData.totalAmount
        });

        if (!paymentResult.success) {
          return NextResponse.json({
            success: false,
            error: 'Payment processing failed: ' + paymentResult.error
          }, { status: 400 });
        }

        // Create booking with payment info
        const bookingWithPayment = {
          ...bookingData,
          paymentStatus: 'paid',
          transactionId: paymentResult.transactionId
        };

        const bookingWithPaymentResult = await BookingService.createBooking(bookingWithPayment);

        if (bookingWithPaymentResult.success) {
          // Send confirmation email
          let emailSent = false;
          try {
            const emailResult = await emailService.sendBookingConfirmation({
              id: bookingWithPaymentResult.booking.id,
              email: bookingData.email,
              guestName: bookingData.guestName,
              roomType: bookingData.roomType,
              roomNumber: bookingData.roomNumber,
              checkIn: bookingData.checkIn,
              checkOut: bookingData.checkOut,
              guests: bookingData.guests,
              totalAmount: bookingData.totalAmount,
              specialRequests: bookingData.specialRequests
            });
            emailSent = emailResult.success;
          } catch (emailError) {
            console.log('Email sending failed:', emailError);
          }

          return NextResponse.json({
            success: true,
            booking: bookingWithPaymentResult.booking,
            payment: paymentResult.payment,
            emailSent: emailSent,
            message: 'Booking and payment processed successfully'
          });
        } else {
          // Refund payment if booking fails
          await PaymentService.refundPayment(paymentResult.transactionId, bookingData.totalAmount);
          
          return NextResponse.json({
            success: false,
            error: 'Booking failed after payment. Refund initiated.'
          }, { status: 400 });
        }

      case 'update_status':
        const { bookingId, status } = body;
        const updateResult = await BookingService.updateBookingStatus(bookingId, status);
        
        if (updateResult.success) {
          return NextResponse.json({
            success: true,
            booking: updateResult.booking,
            message: 'Booking status updated successfully'
          });
        } else {
          return NextResponse.json({
            success: false,
            error: updateResult.error
          }, { status: 400 });
        }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action specified'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const action = searchParams.get('action');

    if (bookingId) {
      // Get specific booking
      const result = await BookingService.getBookingById(bookingId);
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          booking: result.booking
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error
        }, { status: 404 });
      }
    } else if (action === 'all') {
      // Get all bookings
      const result = await BookingService.getAllBookings();
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          bookings: result.bookings
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error
        }, { status: 500 });
      }
    } else if (action === 'recent') {
      // Get recent bookings
      const limit = parseInt(searchParams.get('limit') || '10');
      const recentBookings = await BookingService.getRecentBookings(limit);
      
      return NextResponse.json({
        success: true,
        bookings: recentBookings
      });
    } else if (action === 'today') {
      // Get today's bookings
      const todayBookings = await BookingService.getTodayBookings();
      
      return NextResponse.json({
        success: true,
        data: todayBookings
      });
    } else if (action === 'pending_payments') {
      // Get pending payments
      const pendingPayments = await BookingService.getPendingPayments();
      
      return NextResponse.json({
        success: true,
        bookings: pendingPayments
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid request parameters'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Booking API GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, updateData } = body;

    if (!bookingId) {
      return NextResponse.json({
        success: false,
        error: 'Booking ID is required'
      }, { status: 400 });
    }

    // For now, only support status updates
    if (updateData.status) {
      const result = await BookingService.updateBookingStatus(bookingId, updateData.status);
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          booking: result.booking,
          message: 'Booking updated successfully'
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error
        }, { status: 400 });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: 'No valid update data provided'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Booking API PUT error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json({
        success: false,
        error: 'Booking ID is required'
      }, { status: 400 });
    }

    // Update booking status to cancelled
    const result = await BookingService.updateBookingStatus(bookingId, 'cancelled');
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        booking: result.booking,
        message: 'Booking cancelled successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Booking API DELETE error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
