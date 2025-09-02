import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Room } from '@/models/index';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const roomType = searchParams.get('roomType');
    const status = searchParams.get('status');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    // Build filter query
    const filter: any = { isActive: true };
    
    if (roomType) filter.roomType = roomType;
    if (status) filter.status = status;

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get rooms with pagination
    const rooms = await Room.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ roomNumber: 1 });

    const totalRooms = await Room.countDocuments(filter);
    const totalPages = Math.ceil(totalRooms / limit);

    return NextResponse.json({
      rooms,
      pagination: {
        page,
        limit,
        totalRooms,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const roomData = await request.json();
    
    // Create new room
    const room = new Room(roomData);
    await room.save();
    
    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
