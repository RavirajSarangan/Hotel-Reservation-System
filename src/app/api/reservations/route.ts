import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Reservation, Room } from '@/models/index';
import { generateReservationNumber } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');

    // Build filter query
    const filter: any = {};
    
    if (status) filter.status = status;
    if (customerId) filter.customerId = customerId;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get reservations with pagination
    const reservations = await Reservation.find(filter)
      .populate('roomId', 'roomNumber roomType')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReservations = await Reservation.countDocuments(filter);
    const totalPages = Math.ceil(totalReservations / limit);

    return NextResponse.json({
      reservations,
      pagination: {
        page,
        limit,
        totalReservations,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const reservationData = await request.json();
    
    // Validate room availability
    const room = await Room.findById(reservationData.roomId);
    if (!room || room.status !== 'available') {
      return NextResponse.json(
        { error: 'Room is not available' },
        { status: 400 }
      );
    }

    // Check for conflicting reservations
    const conflictingReservation = await Reservation.findOne({
      roomId: reservationData.roomId,
      status: { $in: ['confirmed', 'checked_in'] },
      $or: [
        {
          'dates.checkIn': {
            $lte: new Date(reservationData.dates.checkOut),
            $gte: new Date(reservationData.dates.checkIn)
          }
        },
        {
          'dates.checkOut': {
            $lte: new Date(reservationData.dates.checkOut),
            $gte: new Date(reservationData.dates.checkIn)
          }
        }
      ]
    });

    if (conflictingReservation) {
      return NextResponse.json(
        { error: 'Room is already booked for these dates' },
        { status: 400 }
      );
    }

    // Generate reservation number
    reservationData.reservationNumber = generateReservationNumber();
    
    // Create new reservation
    const reservation = new Reservation(reservationData);
    await reservation.save();

    // Update room status if immediate confirmation
    if (reservationData.status === 'confirmed') {
      await Room.findByIdAndUpdate(
        reservationData.roomId,
        { status: 'occupied' }
      );
    }
    
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('id');
    
    if (!reservationId) {
      return NextResponse.json(
        { error: 'Reservation ID is required' },
        { status: 400 }
      );
    }

    const updateData = await request.json();
    
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updateData,
      { new: true }
    );

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    );
  }
}
