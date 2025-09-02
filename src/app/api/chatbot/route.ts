import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const userMessage = message.toLowerCase().trim();

    // Enhanced Hotel AI Assistant Responses
    const responses = {
      greeting: {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'],
        response: "🌟 Welcome to Moonlit Hotel! I'm your personal hotel assistant. I can help you with bookings, room information, amenities, pricing, and much more. How may I assist you today?"
      },
      
      booking: {
        keywords: ['book', 'booking', 'reservation', 'reserve', 'room', 'availability', 'check in', 'check out', 'dates'],
        response: "🏨 I'd love to help you with your booking! Our luxury accommodations include:\n\n• Deluxe Rooms (₹8,999/night)\n• Executive Suites (₹15,999/night)\n• Presidential Suite (₹35,999/night)\n\nWould you like me to check availability for specific dates? You can also browse our rooms section for detailed information and virtual tours!"
      },
      
      services: {
        keywords: ['service', 'amenities', 'facilities', 'spa', 'restaurant', 'gym', 'pool', 'wifi', 'parking'],
        response: "✨ Moonlit Hotel offers world-class amenities:\n\n🏊‍♀️ Rooftop Infinity Pool\n🍽️ Fine Dining Restaurant & Bar\n💆‍♀️ Luxury Spa & Wellness Center\n🏋️‍♂️ 24/7 Modern Fitness Center\n🅿️ Complimentary Valet Parking\n📶 High-Speed WiFi Throughout\n🛎️ 24/7 Concierge Services\n🚗 Airport Transfer Service\n\nWhich amenity would you like to know more about?"
      },
      
      pricing: {
        keywords: ['price', 'cost', 'rate', 'fee', 'payment', 'discount', 'offer', 'deal', 'money', 'expensive', 'cheap'],
        response: "💰 Our competitive rates (per night):\n\n🏠 Standard Room: ₹8,999-₹12,999\n🏢 Deluxe Suite: ₹15,999-₹22,999\n👑 Presidential Suite: ₹35,999-₹45,999\n\n🎉 Current Special Offers:\n• Early Bird: 15% off (book 30 days ahead)\n• Extended Stay: 20% off (5+ nights)\n• Weekend Package: Includes breakfast & spa\n\nPrices vary by season and availability. Shall I check current rates for your dates?"
      },
      
      location: {
        keywords: ['location', 'address', 'directions', 'nearby', 'airport', 'transport', 'where', 'how to reach'],
        response: "📍 Moonlit Hotel - Prime City Location:\n\n🏢 123 Grand Boulevard, City Center\n✈️ 25 minutes from International Airport\n🏬 Walking distance to shopping districts\n🚇 5 minutes to Metro Station\n🏛️ Near major attractions & business district\n\n🚗 Transportation Options:\n• Complimentary airport shuttle\n• Taxi/Ride-sharing readily available\n• Public transport connections\n\nWould you like detailed directions or shuttle booking?"
      },
      
      food: {
        keywords: ['food', 'restaurant', 'dining', 'breakfast', 'lunch', 'dinner', 'menu', 'cuisine', 'eat'],
        response: "🍽️ Exceptional Dining at Moonlit Hotel:\n\n🌟 Azure Restaurant (Fine Dining)\n• International & Local Cuisine\n• Chef's Special Tasting Menu\n• Wine Pairing Available\n\n☕ Lobby Café (Casual)\n• Fresh Pastries & Coffee\n• Light Meals & Snacks\n• 24/7 Service\n\n🍸 Rooftop Bar\n• Craft Cocktails & Premium Spirits\n• Stunning City Views\n• Live Music Weekends\n\nWould you like to see our current menu or make a dining reservation?"
      },
      
      events: {
        keywords: ['event', 'meeting', 'conference', 'wedding', 'party', 'celebration', 'business', 'corporate'],
        response: "🎉 Moonlit Hotel - Perfect Event Venue:\n\n🏛️ Event Spaces:\n• Grand Ballroom (500 guests)\n• Executive Boardrooms (12-20 people)\n• Rooftop Terrace (outdoor events)\n• Private Dining Rooms\n\n💼 Services Include:\n• Professional event planning\n• Audio/visual equipment\n• Catering & beverage service\n• Decoration & setup\n\nPlanning a special occasion? Our events team would love to help create an unforgettable experience!"
      },
      
      contact: {
        keywords: ['contact', 'phone', 'email', 'reach', 'speak', 'talk', 'call', 'support'],
        response: "📞 Contact Moonlit Hotel:\n\n☎️ Main: +91-11-4567-8900\n📧 Email: info@moonlithotel.com\n🏨 Reservations: reservations@moonlithotel.com\n\n🕒 Front Desk: 24/7 Available\n💬 Live Chat: Right here!\n📱 WhatsApp: +91-98765-43210\n\nI'm here to help with immediate questions, or you can reach our team directly for detailed assistance!"
      },
      
      rooms: {
        keywords: ['room', 'suite', 'accommodation', 'bedroom', 'view', 'size', 'features'],
        response: "🏨 Our Luxury Accommodations:\n\n🏠 Deluxe Room (45 sqm)\n• King/Twin beds • City view • Marble bathroom\n• Work desk • Mini-bar • WiFi\n\n🏢 Executive Suite (75 sqm)\n• Separate living area • Premium amenities\n• Executive lounge access • Butler service\n\n👑 Presidential Suite (150 sqm)\n• Panoramic city views • Private terrace\n• Jacuzzi • Personal concierge\n• Dining area for 8 guests\n\nAll rooms feature luxury linens, smart TV, and premium toiletries. Which type interests you most?"
      }
    };

    // Find the best matching response
    let bestMatch = null;
    let maxMatches = 0;

    for (const [category, data] of Object.entries(responses)) {
      const matches = data.keywords.filter(keyword => userMessage.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = data.response;
      }
    }

    // Default response if no specific match found
    if (!bestMatch) {
      bestMatch = "🤖 I'm here to help you with everything about Moonlit Hotel! I can assist with:\n\n🏨 Room bookings & availability\n✨ Hotel amenities & services\n💰 Pricing & special offers\n📍 Location & directions\n🍽️ Dining options\n🎉 Events & meetings\n📞 Contact information\n\nWhat would you like to know more about?";
    }

    // Add contextual follow-up suggestions
    const followUps = [
      "Is there anything specific you'd like to know more about?",
      "Can I help you with booking a room?",
      "Would you like me to check availability for specific dates?",
      "Do you need assistance with anything else?"
    ];

    const randomFollowUp = followUps[Math.floor(Math.random() * followUps.length)];
    const finalResponse = `${bestMatch}\n\n${randomFollowUp}`;

    return NextResponse.json({
      response: finalResponse,
      timestamp: new Date().toISOString(),
      category: maxMatches > 0 ? 'specific' : 'general'
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or contact our front desk at +91-11-4567-8900 for immediate assistance."
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Moonlit Hotel Chatbot API is running",
    version: "2.0",
    features: [
      "Natural language processing",
      "Hotel-specific responses",
      "Booking assistance",
      "Amenities information",
      "Pricing details",
      "Location guidance",
      "Event planning support"
    ]
  });
}
