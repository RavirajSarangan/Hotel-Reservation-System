import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Room, User, TravelCompany } from '@/models/index';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Create sample rooms
    const sampleRooms = [
      {
        roomNumber: '101',
        roomType: 'standard',
        floor: 1,
        capacity: 2,
        bedType: 'queen',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
        price: { basePrice: 150 },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/standard-1.jpg'],
        description: 'Comfortable standard room with modern amenities',
        size: 300,
        features: ['City View', 'Balcony', 'Work Desk']
      },
      {
        roomNumber: '102',
        roomType: 'standard',
        floor: 1,
        capacity: 2,
        bedType: 'double',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Coffee Maker'],
        price: { basePrice: 150 },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/standard-2.jpg'],
        description: 'Cozy standard room perfect for couples',
        size: 280,
        features: ['Garden View', 'Sitting Area']
      },
      {
        roomNumber: '201',
        roomType: 'deluxe',
        floor: 2,
        capacity: 3,
        bedType: 'king',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Bathrobe'],
        price: { basePrice: 250 },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/deluxe-1.jpg'],
        description: 'Spacious deluxe room with premium amenities',
        size: 450,
        features: ['Ocean View', 'Balcony', 'Sitting Area', 'Work Desk']
      },
      {
        roomNumber: '202',
        roomType: 'deluxe',
        floor: 2,
        capacity: 4,
        bedType: 'king',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Bathrobe', 'Safe'],
        price: { basePrice: 280 },
        status: 'occupied',
        isActive: true,
        images: ['/assets/images/rooms/deluxe-2.jpg'],
        description: 'Luxurious deluxe room with city views',
        size: 500,
        features: ['City View', 'Balcony', 'Sitting Area', 'Work Desk', 'Sofa Bed']
      },
      {
        roomNumber: '301',
        roomType: 'suite',
        floor: 3,
        capacity: 4,
        bedType: 'king',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Bathrobe', 'Safe', 'Jacuzzi'],
        price: { basePrice: 450 },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/suite-1.jpg'],
        description: 'Executive suite with separate living area',
        size: 800,
        features: ['Ocean View', 'Balcony', 'Living Room', 'Work Desk', 'Dining Area']
      },
      {
        roomNumber: '401',
        roomType: 'presidential',
        floor: 4,
        capacity: 6,
        bedType: 'king',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Bathrobe', 'Safe', 'Jacuzzi', 'Butler Service'],
        price: { basePrice: 800 },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/presidential-1.jpg'],
        description: 'Luxury presidential suite with panoramic views',
        size: 1200,
        features: ['Panoramic View', 'Private Terrace', 'Living Room', 'Dining Room', 'Kitchen', 'Office']
      },
      {
        roomNumber: 'RS001',
        roomType: 'residential',
        floor: 5,
        capacity: 4,
        bedType: 'king',
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Full Kitchen', 'Washer/Dryer', 'Balcony'],
        price: { 
          basePrice: 200, 
          weeklyRate: 1200, 
          monthlyRate: 4500 
        },
        status: 'available',
        isActive: true,
        images: ['/assets/images/rooms/residential-1.jpg'],
        description: 'Residential suite for extended stays',
        size: 900,
        features: ['City View', 'Full Kitchen', 'Living Room', 'Balcony', 'Work Area']
      }
    ];

    // Create sample travel companies
    const sampleTravelCompanies = [
      {
        companyName: 'Global Travel Partners',
        contactInfo: {
          contactPerson: 'John Smith',
          email: 'john@globaltravelpartners.com',
          phone: '(555) 111-2222',
          address: {
            street: '123 Business Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          }
        },
        contractDetails: {
          discountPercentage: 15,
          minimumRooms: 3,
          minimumNights: 2,
          contractStartDate: new Date('2024-01-01'),
          contractEndDate: new Date('2024-12-31'),
          creditLimit: 50000
        },
        isActive: true,
        totalBookings: 45,
        totalRevenue: 125000,
        outstandingBalance: 2500
      },
      {
        companyName: 'Adventure Tours Inc',
        contactInfo: {
          contactPerson: 'Sarah Johnson',
          email: 'sarah@adventuretours.com',
          phone: '(555) 333-4444',
          address: {
            street: '456 Tourism Blvd',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90210',
            country: 'USA'
          }
        },
        contractDetails: {
          discountPercentage: 20,
          minimumRooms: 5,
          minimumNights: 3,
          contractStartDate: new Date('2024-01-01'),
          contractEndDate: new Date('2024-12-31'),
          creditLimit: 75000
        },
        isActive: true,
        totalBookings: 78,
        totalRevenue: 285000,
        outstandingBalance: 5200
      }
    ];

    // Clear existing data (optional - remove in production)
    await Room.deleteMany({});
    await TravelCompany.deleteMany({});

    // Insert sample data
    const createdRooms = await Room.insertMany(sampleRooms);
    const createdTravelCompanies = await TravelCompany.insertMany(sampleTravelCompanies);

    return NextResponse.json({
      success: true,
      message: 'Sample data seeded successfully',
      data: {
        roomsCreated: createdRooms.length,
        travelCompaniesCreated: createdTravelCompanies.length
      }
    });

  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}
